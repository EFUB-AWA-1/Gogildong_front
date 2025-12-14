import type { Measurements } from './measurement';

export interface LocationData {
  building: string;
  buildingId?: number | null;
  floor: string;
  floorId?: number | null;
  facility: string;
  facilityId?: number | null;
  extraDescription?: string;
}

export interface ReportFlowFormState {
  step: number;
  locationData: LocationData;
  measurements: Measurements;
  detailData: Record<string, string>;
  pendingDetailData: Record<string, string> | null;
  floorId: number | null;
}
