export type GenderEnum = 'MALE' | 'FEMALE';

export type DoorTypeEnum = 'SLIDING' | 'HINGED' | 'AUTO' | string;
export type StaffApprovalEnum = 'TRUE' | 'FALSE' | 'UNKNOWN';

export const genderLabelToEnum: Record<'여자' | '남자', GenderEnum> = {
  여자: 'FEMALE',
  남자: 'MALE'
};

export const grabBarLabelToBool: Record<
  '손잡이 있음' | '손잡이 없음',
  boolean
> = {
  '손잡이 있음': true,
  '손잡이 없음': false
};

export interface RestroomReportPayload {
  facilityId?: number;
  floorId: number;
  facilityNickname: string;
  restRoomReportImage: string;
  gender: GenderEnum;
  isAccessible: boolean;
  doorType: DoorTypeEnum;
  entranceDoorWidth: number;
  entranceDoorHeight: number;
  innerDoorWidth: number;
  innerDoorHeight: number;
  toiletHeight: number;
  grabBar: boolean;
}

export interface ElevatorReportPayload {
  facilityId?: number;
  floorId: number;
  facilityNickname: string;
  elevatorReportImage: string;
  doorWidth: number;
  interiorDepth: number;
  maxControlPanelHeight: number;
  isStaffApproved: StaffApprovalEnum;
  isAvailableDuringClass: boolean;
}

export interface ClassroomReportPayload {
  facilityId?: number;
  floorId: number;
  facilityNickname: string;
  classroomReportImage: string;
  doorWidth: number;
  doorHandleHeight: number;
  minAisleWidth: number;
  hasThreshold: boolean;
  doorType: DoorTypeEnum;
}

export interface EtcFacilityReportPayload {
  floorId: number;
  facilityNickname: string;
  etcReportImage: string;
  note?: string;
}

export type ReportPayload =
  | RestroomReportPayload
  | ElevatorReportPayload
  | ClassroomReportPayload
  | EtcFacilityReportPayload;
