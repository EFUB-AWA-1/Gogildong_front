import axiosInstance from "@/common/api/axiosInstance";

// 각 시설별 응답 타입 정의
export type RestroomSummaryDto = {
  entranceDoorWidth: number | null;
  entranceDoorHeight: number | null;
  innerDoorWidth: number | null;
  innerDoorHeight: number | null;
  toiletHeight: number | null;
};

export type ElevatorSummaryDto = {
  doorWidth: number | null;
  interiorDepth: number | null;
  maxControlPanelHeight: number | null;
};

export type ClassroomSummaryDto = {
  doorWidth: number | null;
  doorHandleHeight: number | null;
  minAisleWidth: number | null;
};

export type EtcSummaryDto = {
  note: string;
};

// 통합 타입 (필요 시 사용)
export type AnySummaryDto = RestroomSummaryDto | ElevatorSummaryDto | ClassroomSummaryDto | EtcSummaryDto;

export const getReportSummary = async (
  facilityType: string, 
  reportId: number
) => {
  // GET /reports/summary/{facilityType}/{reportId}
  // facilityType은 소문자로 변환해서 호출 (RESTROOM -> restroom)
  const typeParam = facilityType.toLowerCase();
  
  const { data } = await axiosInstance.get<AnySummaryDto>(
    `/reports/summary/${typeParam}/${reportId}`
  );
  return data;
};