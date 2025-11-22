import SignupTextField from "./SignupTextField";
import ActionButton from "@/common/components/ActionButton";
import { useState } from "react";
import { signupAdmin, signupExternal, signupInternal } from "../api/signupUser";
import EmailVerificationResendModal from "./modals/EmailVerificationResendModal";
import EmailField from "./EmailField";
import formatPhoneNumeber from "../utils/formatPhoneNumber";

interface SignupFormValues {
  id: string;
  password: string;
  passwordConfirm: string;
  name: string;
  phone: string;
  email: string;
  emailCode: string;
  schoolCode?: string;
  adminCode?: string;
}

type SignupFormErrors = Partial<Record<keyof SignupFormValues, string>>;

const INITIAL_VALUES: SignupFormValues = {
  id: "",
  password: "",
  passwordConfirm: "",
  name: "",
  phone: "",
  email: "",
  emailCode: "",
  schoolCode: "",
  adminCode: ""
};

const REQUIRED_BY_ROLE = {
  external: [] as const,
  internal: ["schoolCode"] as const,
  admin: ["schoolCode", "adminCode"] as const
} as const;

const BASE_REQUIRED_FIELDS = [
  "id",
  "password",
  "passwordConfirm",
  "name",
  "phone",
  "email",
  "emailCode"
] as const satisfies readonly (keyof SignupFormValues)[];

const validators: Partial<
  Record<keyof SignupFormValues, (values: SignupFormValues) => string>
> = {
  id: ({ id }) =>
    !id.trim()
      ? "아이디를 입력해 주세요."
      : id.length < 6
        ? "아이디는 최소 6글자 이상이어야 해요."
        : "",

  password: ({ password }) =>
    /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(password)
      ? ""
      : "영문과 숫자를 포함하여 8자 이상 입력해 주세요.",

  passwordConfirm: ({ passwordConfirm, password }) =>
    !passwordConfirm
      ? ""
      : passwordConfirm !== password
        ? "동일한 비밀번호를 다시 입력해 주세요."
        : "",

  name: ({ name }) => (!name.trim() ? "이름을 입력해 주세요." : ""),

  phone: ({ phone }) =>
    !/^01[0-9]-?\d{3,4}-?\d{4}$/.test(phone)
      ? "휴대폰 번호 형식을 확인해 주세요."
      : "",

  email: ({ email }) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      ? ""
      : "유효한 이메일 주소를 입력해 주세요.",

  emailCode: ({ emailCode }) =>
    /^[0-9]{4,}$/.test(emailCode) ? "" : "유효하지 않은 이메일 코드입니다.",

  schoolCode: ({ schoolCode }) =>
    !schoolCode?.trim() ? "학교 코드를 입력해 주세요." : "",

  adminCode: ({ adminCode }) =>
    !adminCode?.trim() ? "관리자 코드를 입력해 주세요." : ""
};

export default function SignupForm({
  role
}: {
  role: "admin" | "internal" | "external";
}) {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState<SignupFormErrors>({});
  const [touched, setTouched] = useState<
    Partial<Record<keyof SignupFormValues, boolean>>
  >({});
  const [submitting, setSubmitting] = useState(false);
  const [emailRequested, setEmailRequested] = useState(false);
  const [resendOpen, setResendOpen] = useState(false);

  const requiredFields: (keyof SignupFormValues)[] = [
    ...BASE_REQUIRED_FIELDS,
    ...REQUIRED_BY_ROLE[role]
  ];

  const runValidation = (
    field: keyof SignupFormValues,
    nextValues: SignupFormValues
  ) => {
    const validator = validators[field];
    const message = validator ? validator(nextValues) : "";
    setErrors((prev) => ({ ...prev, [field]: message }));
    return message;
  };

  const handleChange = (field: keyof SignupFormValues) => (value: string) => {
    setValues((prev) => {
      const nextValues = { ...prev, [field]: value };
      runValidation(field, nextValues);

      if (field === "password") {
        if (touched.passwordConfirm) {
          runValidation("passwordConfirm", nextValues);
        }
      }
      return nextValues;
    });
  };

  const hasEmptyRequired = requiredFields.some((field) => {
    const value = values[field];
    return !value?.trim();
  });

  const hasValidationError = requiredFields.some((field) => {
    const validator = validators[field];
    return validator ? Boolean(validator(values)) : false;
  });
  const handleBlur = (field: keyof SignupFormValues) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    runValidation(field, values);
  };
  const submitDisabled = hasEmptyRequired || hasValidationError || submitting;

  const handleEmailRequestClick = () => {
    setTouched((prev) => ({ ...prev, email: true }));
    const emailError = runValidation("email", values);
    if (emailError) return;

    if (!emailRequested) {
      console.log("request verification email");
      setEmailRequested(true);
      return;
    }
    setResendOpen(true);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const hasErrors = requiredFields.some((field) =>
      Boolean(runValidation(field, values))
    );
    if (hasErrors) return;

    try {
      setSubmitting(true);
      const basePayload = {
        loginId: values.id,
        password: values.password,
        username: values.name,
        email: values.email,
        phone: values.phone
      };

      if (role === "admin") {
        const payload = {
          ...basePayload,
          schoolCode: values.schoolCode ?? "",
          adminCode: values.adminCode ?? ""
        };
        console.log("signup admin payload", payload);
        await signupAdmin(payload);
      } else if (role === "internal") {
        const payload = { ...basePayload, schoolCode: values.schoolCode ?? "" };
        console.log("signup internal payload", payload);
        await signupInternal(payload);
      } else {
        console.log("signup external payload", basePayload);
        await signupExternal(basePayload);
      }

      console.log("signup success");
    } catch (error) {
      console.error("signup failed", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <SignupTextField
        label="아이디"
        placeholder="최소 6글자 이상"
        value={values.id}
        onChange={handleChange("id")}
        error={Boolean(errors.id)}
        hint={errors.id}
      />

      <SignupTextField
        label="비밀번호"
        type="password"
        placeholder="영문, 숫자 조합 8글자 이상"
        value={values.password}
        onChange={handleChange("password")}
        error={Boolean(errors.password)}
        hint={errors.password}
      />

      <SignupTextField
        label="비밀번호 확인"
        type="password"
        placeholder="비밀번호를 다시 입력해 주세요."
        value={values.passwordConfirm}
        onChange={handleChange("passwordConfirm")}
        error={Boolean(errors.passwordConfirm)}
        hint={errors.passwordConfirm}
        onBlur={handleBlur("passwordConfirm")}
      />

      <SignupTextField
        label="이름"
        value={values.name}
        placeholder="이름을 입력해주세요."
        onChange={handleChange("name")}
        error={Boolean(errors.name)}
        hint={errors.name}
      />

      <SignupTextField
        label="휴대폰 번호"
        type="tel"
        placeholder="예) 010-1234-5678"
        value={values.phone}
        onChange={(v) => handleChange("phone")(formatPhoneNumeber(v))}
        error={Boolean(errors.phone)}
        hint={errors.phone}
      />

      <EmailField
        value={values.email}
        onChange={handleChange("email")}
        hint={errors.email}
        error={Boolean(errors.email)}
        requested={emailRequested}
        onRequestClick={handleEmailRequestClick}
      />
      <SignupTextField
        label="이메일 확인"
        placeholder="인증 코드를 입력해 주세요."
        value={values.emailCode}
        onChange={handleChange("emailCode")}
        error={Boolean(errors.emailCode)}
        hint={errors.emailCode}
      />

      {(role === "internal" || role === "admin") && (
        <SignupTextField
          label="학교 코드"
          placeholder="예) ABCD12"
          value={values.schoolCode ?? ""}
          onChange={handleChange("schoolCode")}
          error={Boolean(errors.schoolCode)}
          hint={errors.schoolCode}
        />
      )}

      {role === "admin" && (
        <SignupTextField
          label="Admin 코드"
          placeholder="관리자 전용 코드"
          value={values.adminCode ?? ""}
          onChange={handleChange("adminCode")}
          error={Boolean(errors.adminCode)}
          hint={errors.adminCode}
        />
      )}

      <div className="sticky bottom-0 bg-white py-6">
        <ActionButton
          label="회원가입"
          type="submit"
          disabled={submitDisabled}
        />
      </div>
      <EmailVerificationResendModal
        open={resendOpen}
        onClose={() => setResendOpen(false)}
        onConfirm={() => {
          console.log("resend verification email");
          setResendOpen(false);
        }}
      />
    </form>
  );
}
