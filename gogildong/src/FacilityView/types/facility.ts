export interface FacilityDetail {
  buildingName: string;
  floorName: string;
  facilityId: number;
  facilityName: string;
  facilityNickName: string;
  facilityType: string; // 'restroom' | 'elevator' | 'clssroom' | 'etc'
  reviewSummary: string | null;
  createdAt: string;
  facilityImage?: string;
  facilityImages?: string[];
}

export type Gender = 'female' | 'male';
export type DoorType = 'sliding' | 'hinged' | 'automatic';

export interface FacilityInfo {
  facilityDetail: FacilityDetail;
  
  // 화장실(Restroom)일 때만 내려오는 정보이므로 Optional(?)로 변경
  doorWidth?: number;
  gender?: Gender;
  accessible?: boolean;
  doorType?: DoorType;
}