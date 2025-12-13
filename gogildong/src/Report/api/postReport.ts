import axiosInstance from '@/common/api/axiosInstance';
import type {
  ClassroomReportPayload,
  DoorTypeEnum,
  ElevatorReportPayload,
  EtcFacilityReportPayload,
  RestroomReportPayload
} from '@/Report/types/reportPayload';

export const postRestroomReport = (payload: RestroomReportPayload) =>
  axiosInstance.post('/reports/restroom', payload);

export const postRestroomNewFacility = (payload: RestroomReportPayload) =>
  axiosInstance.post('/reports/restroom/new-facility', payload);

export const postElevatorReport = (payload: ElevatorReportPayload) =>
  axiosInstance.post('/reports/elevator', payload);

export const postElevatorNewFacility = (payload: ElevatorReportPayload) =>
  axiosInstance.post('/reports/elevator/new-facility', payload);

export const postClassroomReport = (payload: ClassroomReportPayload) =>
  axiosInstance.post('/reports/classroom', payload);

export const postClassroomNewFacility = (payload: ClassroomReportPayload) =>
  axiosInstance.post('/reports/classroom/new-facility', payload);

export const postEtcNewFacility = (payload: EtcFacilityReportPayload) =>
  axiosInstance.post('/reports/etc/new-facility', payload);

type ReportType = 'restroom' | 'elevator' | 'classroom' | 'etc';
type VerifyFacilityType = ReportType;
type VerifyDoorType = DoorTypeEnum | null;

export interface VerifyReportImageMetadata {
  reportedFacilityType: VerifyFacilityType | string;
  reportedDoorType: VerifyDoorType;
}

export interface VerifyReportImagePayload {
  image: string;
  metadata: string;
}

export const buildVerifyMetadata = (
  metadata: VerifyReportImageMetadata
): string => JSON.stringify(metadata);

export interface VerifyReportImageResponse {
  matched: boolean;
  predictedType?: string;
  predictedDoorType?: string | null;
  isDoorMatched?: boolean | null;
  confidence?: number | null;
  reason?: string;
}

export const verifyReportImage = (payload: VerifyReportImagePayload) => {
  const formData = new FormData();
  formData.append('image', payload.image);
  formData.append('metadata', payload.metadata);

  return axiosInstance.post<VerifyReportImageResponse>('/verify', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};
