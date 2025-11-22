import { useState } from "react";
import LoginInputField from "./LoginInputField";
import { signInUser } from "../api/signInUser";
import ActionButton from "@/common/components/ActionButton";
import LoginSupportLinks from "./LoginSupportLinks";

const INITIAL_VALUES = { id: "", password: "" };

export default function LoginForm() {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (name: "id" | "password") => (value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const submitDisabled = !values.id.trim() || !values.password.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!values.id || !values.password) {
      setError("아이디와 비밀번호를 모두 입력해 주세요.");
      return;
    }

    try {
      const payload = {
        loginId: values.id,
        password: values.password
      };
      await signInUser(payload);
    } catch (err) {
      setError("아이디 또는 비밀번호가 일치하지 않습니다.");
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-1 flex-col gap-4">
      <div className="flex flex-1 flex-col">
        <LoginInputField
          label="아이디"
          value={values.id}
          onChange={handleChange("id")}
        />
        <LoginInputField
          label="비밀번호"
          value={values.password}
          type="password"
          onChange={handleChange("password")}
        />
        {error && <p className="text-sm text-warning-100">{error}</p>}
        <div className="flex justify-center">
          <LoginSupportLinks />
        </div>
      </div>
      <div className="bg-white py-6">
        <ActionButton
          type="submit"
          disabled={submitDisabled}
          className="h-12 rounded-3xl bg-black text-white"
          label="로그인하기"
        ></ActionButton>
      </div>
    </form>
  );
}
