import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '@/common/components/Header';
import SampleImg from '@/Report/assets/imgs/img_sample.png';
import LocationIcon from '@/Report/assets/svgs/location.svg?react';
import {
  buildVerifyMetadata,
  postClassroomNewFacility,
  postClassroomReport,
  postElevatorNewFacility,
  postElevatorReport,
  postEtcNewFacility,
  postRestroomNewFacility,
  postRestroomReport,
  verifyReportImage
} from '@/Report/api/postReport';

import AlertDialog from '../components/AlertDialog';
import ReportForm2 from '../components/ReportForm2';
import ReportForm1 from '../components/ReportForm1';
import EtcReportForm from '../components/EtcReportForm';
import MeasurementInputSection from '@/Report/components/MeasurementInputSection';
import {
  toFacilityLabel,
  toFacilityParam,
  type FacilityTypeParam
} from '@/Report/types/facilityTypes';
import type { Measurements } from '@/Report/types/measurement';
import type { LocationData, ReportFlowFormState } from '@/Report/types/report';
import {
  genderLabelToEnum,
  grabBarLabelToBool
} from '@/Report/types/reportPayload';
import type {
  DoorTypeEnum,
  GenderEnum,
  StaffApprovalEnum
} from '@/Report/types/reportPayload';

const createEmptyLocation = (): LocationData => ({
  building: '',
  buildingId: null,
  floor: '',
  floorId: null,
  facility: '',
  facilityId: null,
  extraDescription: ''
});

const DOOR_TYPE_LABEL_MAP: Record<string, DoorTypeEnum> = {
  미닫이문: 'SLIDING',
  '미닫이 문': 'SLIDING',
  여닫이문: 'HINGED',
  '양쪽 여닫이문': 'HINGED',
  '단일 여닫이문': 'HINGED',
  자동문: 'AUTO'
};

const STAFF_APPROVAL_MAP: Record<string, StaffApprovalEnum> = {
  '이용 가능': 'TRUE',
  '제한 있음': 'FALSE',
  모르겠음: 'UNKNOWN'
};

const isGenderLabel = (label: string): label is '여자' | '남자' =>
  label === '여자' || label === '남자';

const isGrabBarLabel = (
  label: string
): label is '손잡이 있음' | '손잡이 없음' =>
  label === '손잡이 있음' || label === '손잡이 없음';

const toNumberValue = (value?: string): number => {
  if (!value) return 0;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const getDoorTypeValue = (label?: string): DoorTypeEnum =>
  DOOR_TYPE_LABEL_MAP[label ?? ''] ?? 'HINGED';

const getStaffApprovalValue = (label?: string): StaffApprovalEnum =>
  STAFF_APPROVAL_MAP[label ?? ''] ?? 'UNKNOWN';

const getGenderValue = (label?: string): GenderEnum =>
  label && isGenderLabel(label)
    ? genderLabelToEnum[label]
    : genderLabelToEnum['여자'];

const getGrabBarValue = (label?: string): boolean =>
  label && isGrabBarLabel(label) ? grabBarLabelToBool[label] : false;

type ReportFlowLocationState = {
  photo?: string;
  formState?: ReportFlowFormState;
};

export default function ReportFlow() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id, facilityType: facilityTypeParam } = useParams<{
    id: string;
    facilityType: FacilityTypeParam;
  }>();

  const facilityType = toFacilityLabel(facilityTypeParam);
  const locationPayload =
    (location.state as ReportFlowLocationState | null) ?? null;
  const { photo } = locationPayload ?? {};
  const restoredFormState = locationPayload?.formState;

  const [step, setStep] = useState(0);
  const [locationData, setLocationData] = useState<LocationData>(
    createEmptyLocation()
  );
  const [measurements, setMeasurements] = useState<Measurements>({});
  const [detailData, setDetailData] = useState<Record<string, string>>({});
  const [pendingDetailData, setPendingDetailData] = useState<Record<
    string,
    string
  > | null>(null);
  const [floorId, setFloorId] = useState<number | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [flowStatus, setFlowStatus] = useState<
    'idle' | 'processing' | 'failed'
  >('idle');
  const [failReason, setFailReason] = useState<string | null>(null);

  useEffect(() => {
    if (restoredFormState) {
      const savedLocation =
        restoredFormState.locationData ?? createEmptyLocation();
      setStep(restoredFormState.step ?? 0);
      setLocationData({ ...createEmptyLocation(), ...savedLocation });
      setMeasurements({ ...(restoredFormState.measurements ?? {}) });
      setDetailData({ ...(restoredFormState.detailData ?? {}) });
      setPendingDetailData(
        restoredFormState.pendingDetailData
          ? { ...restoredFormState.pendingDetailData }
          : null
      );
      setFloorId(restoredFormState.floorId ?? null);
      setShowAlert(false);
      setFlowStatus('idle');
      return;
    }

    setStep(0);
    setLocationData(createEmptyLocation());
    setMeasurements({});
    setDetailData({});
    setPendingDetailData(null);
    setFloorId(null);
    setShowAlert(false);
    setFlowStatus('idle');
  }, [facilityType, location.key, restoredFormState]);

  if (!facilityType) return null;

  type StepKey = 'location' | 'detail' | 'etcDetail';

  const formSequence: StepKey[] =
    facilityType === '기타' ? ['etcDetail'] : ['location', 'detail'];

  const goToSuccess = (detail = detailData) => {
    if (!id || !facilityTypeParam) return;
    navigate(`/school/${id}/report/${facilityTypeParam}/success`, {
      state: {
        photo,
        facilityType,
        locationData,
        detail,
        dimensions: measurements
      }
    });
  };

  const handleNext = () => {
    if (formSequence.length === 1) {
      setShowAlert(true);
      return;
    }
    setStep((prev) => prev + 1);
  };

  const handleSubmit = (data: Record<string, string>) => {
    setDetailData(data);
    setPendingDetailData(data);
    setShowAlert(true);
  };

  const submitReport = async (detail: Record<string, string>) => {
    if (!facilityType) throw new Error('시설 타입을 선택해 주세요');
    if (!photo) throw new Error('제보 사진을 다시 촬영해 주세요');
    const targetFloorId = floorId ?? locationData.floorId ?? null;
    if (!targetFloorId) throw new Error('층 정보를 선택해 주세요');
    if (!locationData.facility) throw new Error('시설을 선택해 주세요');

    const isNewFacility = !locationData.facilityId;
    const facilityNickname =
      locationData.extraDescription?.trim() || locationData.facility;

    if (facilityType === '화장실') {
      const gender = getGenderValue(detail.gender);
      const grabBar = getGrabBarValue(detail.grabBar);
      const payload = {
        facilityId: locationData.facilityId ?? undefined,
        floorId: targetFloorId,
        facilityNickname,
        restRoomReportImage: photo,
        gender,
        isAccessible: detail.stallType === '장애인 화장실',
        doorType: getDoorTypeValue(detail.doorType),
        entranceDoorWidth: toNumberValue(measurements.entranceDoorWidth),
        entranceDoorHeight: toNumberValue(measurements.entranceDoorHeight),
        innerDoorWidth: toNumberValue(measurements.innerDoorWidth),
        innerDoorHeight: toNumberValue(measurements.innerDoorHeight),
        toiletHeight: toNumberValue(measurements.toiletHeight),
        grabBar
      };
      return isNewFacility
        ? postRestroomNewFacility(payload)
        : postRestroomReport(payload);
    }

    if (facilityType === '엘리베이터') {
      const payload = {
        facilityId: locationData.facilityId ?? undefined,
        floorId: targetFloorId,
        facilityNickname,
        elevatorReportImage: photo,
        doorWidth: toNumberValue(measurements.doorWidth),
        interiorDepth: toNumberValue(measurements.interiorDepth),
        maxControlPanelHeight: toNumberValue(
          measurements.maxControlPanelHeight
        ),
        isStaffApproved: getStaffApprovalValue(detail.accessApproval),
        isAvailableDuringClass: detail.classUse === '이용 가능'
      };
      return isNewFacility
        ? postElevatorNewFacility(payload)
        : postElevatorReport(payload);
    }

    if (facilityType === '교실') {
      const payload = {
        facilityId: locationData.facilityId ?? undefined,
        floorId: targetFloorId,
        facilityNickname,
        classroomReportImage: photo,
        doorWidth: toNumberValue(measurements.maxDoorWidth),
        doorHandleHeight: toNumberValue(measurements.doorHandleHeight),
        minAisleWidth: toNumberValue(measurements.minAisleWidth),
        hasThreshold: detail.threshold === '턱 있음',
        doorType: getDoorTypeValue(detail.doorType)
      };
      return isNewFacility
        ? postClassroomNewFacility(payload)
        : postClassroomReport(payload);
    }

    // 기타 시설은 신규 제보만 존재
    const payload = {
      floorId: targetFloorId,
      facilityNickname,
      etcReportImage: photo,
      note: detail.note ?? ''
    };
    return postEtcNewFacility(payload);
  };

  const handleConfirmSubmit = async () => {
    setShowAlert(false);
    setFlowStatus('processing');
    setFailReason(null);
    const detail = pendingDetailData ?? detailData;

    try {
      if (!photo) throw new Error('제보 사진이 없습니다');
      const facilityParam =
        facilityTypeParam ?? toFacilityParam(facilityType) ?? '';
      const reportedDoorType =
        facilityType === '엘리베이터' || facilityType === '기타'
          ? null
          : getDoorTypeValue(detail.doorType);
      const metadata = buildVerifyMetadata({
        reportedFacilityType: facilityParam.toUpperCase(),
        reportedDoorType
      });
      const verifyPayload = { image: photo, metadata };
      console.log('verify payload', verifyPayload);
      const { data } = await verifyReportImage(verifyPayload);
      if (!data?.matched) {
        setFailReason(
          data?.reason ?? '인식 실패\n가이드에 맞춰 다시 작성해 주세요'
        );
        setFlowStatus('failed');
        return;
      }
    } catch (e) {
      console.error('제보 사진 검수 실패', e);
      setFailReason(
        e instanceof Error
          ? e.message
          : '제보 사진 검수에 실패했어요. 다시 시도해 주세요.'
      );
      setFlowStatus('failed');
      return;
    }

    try {
      await submitReport(detail);
      goToSuccess(detail);
    } catch (e) {
      console.error('제보 제출 실패', e);
      setFailReason('제보 등록에 실패했어요. 다시 시도해 주세요.');
      setFlowStatus('failed');
    }
  };

  const handleRetryCapture = () => {
    if (flowStatus !== 'failed') return;
    if (!facilityTypeParam || !id) return;
    const formState: ReportFlowFormState = {
      step,
      locationData,
      measurements,
      detailData,
      pendingDetailData,
      floorId
    };
    navigate(`/school/${id}/report/${facilityTypeParam}/camera`, {
      state: { formState }
    });
  };

  const renderStep = () => {
    const current = formSequence[step];

    if (current === 'location') {
      return (
        <ReportForm1
          locationData={locationData}
          facilityTypeParam={facilityTypeParam}
          schoolId={id ? Number(id) : undefined}
          floorId={floorId ?? undefined}
          onFloorSelect={setFloorId}
          onChange={handleLocationChange}
          onNext={handleNext}
        />
      );
    }

    if (current === 'detail') {
      return (
        <ReportForm2
          facilityType={facilityType}
          initialValues={detailData}
          onChange={setDetailData}
          onSubmit={handleSubmit}
        />
      );
    }

    if (current === 'etcDetail') {
      return (
        <EtcReportForm
          initialNote={detailData.note}
          onChange={(val) => setDetailData({ note: val })}
          onSubmit={(note) => {
            const data = { note };
            setDetailData(data);
            handleSubmit(data);
          }}
        />
      );
    }

    return null;
  };
  const handleLocationChange = (data: LocationData) => {
    setLocationData((prev: LocationData) => ({ ...prev, ...data }));
  };

  return (
    <div className="relative">
      {flowStatus !== 'idle' && (
        <div
          className={`absolute inset-0 z-40 bg-black/80 ${
            flowStatus === 'failed' ? 'cursor-pointer' : 'pointer-events-none'
          }`}
          onClick={flowStatus === 'failed' ? handleRetryCapture : undefined}
        />
      )}
      <Header title={facilityType ? `${facilityType} 촬영` : '촬영'} />
      <div className="z-0 flex flex-col bg-white px-[30px]">
        <div className="mt-10 flex flex-col items-center gap-5">
          <div className="h-[183px] w-28 overflow-hidden rounded-3xl border-[6px] border-neon-100">
            <img
              src={photo ?? SampleImg}
              alt="촬영된 사진"
              className="h-auto w-full object-cover"
            />
          </div>
          <div className="text-body-bold-sm flex items-center text-black">
            <LocationIcon />
            {facilityType ?? '이화여자대학교부속초등학교'}
          </div>
          {(flowStatus === 'processing' || flowStatus === 'failed') && (
            <div className="z-80 flex flex-col items-center rounded-2xl px-6 py-4 text-center">
              {flowStatus === 'processing' && (
                <p className="text-body-bold-md text-neon-100">
                  제보 내용 인식 중...
                </p>
              )}
              {flowStatus === 'failed' && (
                <>
                  <p className="text-heading-sm text-white">ERROR</p>
                  <p className="text-body-bold-md whitespace-pre-line text-neon-100">
                    {failReason ??
                      '인식 실패\n가이드에 맞춰 다시 작성해 주세요'}
                  </p>
                  <p className="mt-2 text-caption-md text-gray-20">
                    *화면을 누르면 재촬영하러 이동해요
                  </p>
                </>
              )}
            </div>
          )}
        </div>

        <div className="mt-8">
          <MeasurementInputSection
            facilityType={facilityType}
            value={measurements}
            onChange={setMeasurements}
          />
        </div>

        <div className="mt-10">{renderStep()}</div>

        {showAlert && <AlertDialog onConfirm={handleConfirmSubmit} />}
      </div>
    </div>
  );
}
