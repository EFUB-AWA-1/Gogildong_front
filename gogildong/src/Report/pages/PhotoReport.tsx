import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Header from '@/common/components/Header';
import ActionButton from '@/common/components/ActionButton';
import Webcam from 'react-webcam';
import ShotBtn from '@/Report/assets/svgs/btn_shot.svg?react';
import {
  toFacilityLabel,
  type FacilityTypeParam
} from '@/Report/types/facilityTypes';
import type { ReportFlowFormState } from '@/Report/types/report';
import {
  dataUrlToFile,
  getPresignedUrl,
  uploadFileToPresignedUrl
} from '@/Report/api/getPresignedUrl';

export default function PhotoReport() {
  const navigate = useNavigate();
  const location = useLocation();
  const previousFormState = (
    (location.state as { formState?: ReportFlowFormState } | null) ?? null
  )?.formState;
  const { id, facilityType: facilityTypeParam } = useParams<{
    id: string;
    facilityType: FacilityTypeParam;
  }>();
  const facilityType = toFacilityLabel(facilityTypeParam) ?? null;
  const [status, setStatus] = useState<
    'capture' | 'processing' | 'captured' | 'failed'
  >('capture');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [pendingFile, setPendingFile] = useState<{
    file: File;
    contentType: string;
    filename: string;
  } | null>(null);
  const webcamRef = useRef<Webcam>(null);

  const videoConstraints = {
    facingMode: { ideal: 'environment' },
    //* 모바일 브라우저 후면카메라 기준 지원하는 최대 해상도 설정 
    advanced: [
      { width: { exact: 2560 }, height: { exact: 1440 } }, // QHD
      { width: { exact: 1920 }, height: { exact: 1080 } }, // Full HD
      { width: { exact: 1280 }, height: { exact: 720 } }, // HD
      { width: { exact: 1024 }, height: { exact: 576 } }, // 1024x576
      { width: { exact: 900 }, height: { exact: 506 } }, // 900x506
      { width: { exact: 800 }, height: { exact: 450 } }, // 800x450
      { width: { exact: 640 }, height: { exact: 360 } }, // nHD
      { width: { exact: 320 }, height: { exact: 180 } } // QVGA
    ]
  };

  const takePhoto = () => {
    const imageData = webcamRef.current?.getScreenshot();
    if (!imageData) {
      alert('사진을 가져오지 못했습니다. 다시 시도해 주세요.');
      setStatus('capture');
      return;
    }

    const contentType = imageData.startsWith('data:image/png')
      ? 'image/png'
      : 'image/jpeg';
    const ext = contentType === 'image/png' ? 'png' : 'jpg';
    const filename = `report-${Date.now()}.${ext}`;
    const file = dataUrlToFile(imageData, filename, contentType);

    setCapturedImage(imageData);
    setPendingFile({ file, contentType, filename });
    setUploadedUrl(null);
    setStatus('captured');
  };

  const handleBack = () => {
    if (status === 'captured') {
      setCapturedImage(null);
      setUploadedUrl(null);
      setPendingFile(null);
      setStatus('capture');
      return;
    }

    navigate(-1);
  };

  const handleGoToReportInfo = async () => {
    if (!facilityTypeParam || !id) return;
    if (uploadedUrl) {
      navigate(`/school/${id}/report/${facilityTypeParam}/form`, {
        state: {
          photo: uploadedUrl,
          formState: previousFormState
        }
      });
      return;
    }

    if (!pendingFile) return;

    try {
      setStatus('processing');
      const { data } = await getPresignedUrl(
        pendingFile.filename,
        pendingFile.contentType
      );
      await uploadFileToPresignedUrl(
        data.uploadUrl,
        pendingFile.file,
        pendingFile.contentType
      );

      setUploadedUrl(data.fileUrl);

      navigate(`/school/${id}/report/${facilityTypeParam}/form`, {
        state: {
          photo: data.fileUrl,
          formState: previousFormState
        }
      });
    } catch (err) {
      console.error('이미지 업로드 실패', err);
      alert('이미지 업로드에 실패했습니다. 다시 시도해 주세요.');
      setStatus('capture');
      setPendingFile(null);
      setCapturedImage(null);
    }
  };

  useEffect(() => {
    return () => {
      const stream = webcamRef.current?.video?.srcObject as MediaStream | null;
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-black text-white">
      <Header
        title={facilityType ? `${facilityType} 촬영` : '촬영'}
        darkMode
        onBackClick={handleBack}
      />

      <div className="flex w-full flex-1 flex-col items-center justify-center px-[51px]">
        {status === 'capture' && (
          <Webcam
            ref={webcamRef}
            audio={false}
            videoConstraints={videoConstraints}
            screenshotFormat="image/png"
            onUserMediaError={(err) => {
              console.error('카메라 접근 오류:', err);
              alert(
                '후면 카메라를 사용할 수 없습니다. 브라우저 권한 또는 장치 상태를 확인해주세요.'
              );
              setStatus('failed');
            }}
            className="aspect-112/183 w-full rounded-2xl border-[3px] border-neon-100 bg-black object-cover"
          />
        )}

        {['captured', 'processing'].includes(status) && capturedImage && (
          <div className="relative flex w-full flex-col items-center">
            <img
              src={capturedImage}
              alt="촬영된 이미지"
              className="aspect-112/183 w-full rounded-2xl border-[3px] border-neon-100 object-cover"
            />
          </div>
        )}
      </div>

      <div className="sticky bottom-0 flex w-full items-center justify-center p-4">
        {status === 'capture' && (
          <button onClick={takePhoto}>
            <ShotBtn />
          </button>
        )}

        {status === 'processing' && (
          <ActionButton label="업로드 중..." disabled />
        )}

        {status === 'captured' && (
          <ActionButton label="다음" onClick={handleGoToReportInfo} />
        )}
      </div>
    </div>
  );
}
