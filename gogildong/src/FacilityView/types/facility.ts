export interface FacilityDetail {
  buildingName: string;
  floorName: string;
  facilityId: number;
  facilityName: string;
  facilityNickName: string;
  facilityType: string;
  reviewSummary: string | null;
  createdAt: string;
  facilityImage?: string;
  facilityImages?: string[];
}

export type Gender = 'female' | 'male';
export type DoorType = 'sliding' | 'hinged' | 'automatic';

export interface FacilityInfo {
  facilityDetail: FacilityDetail;
  doorWidth: number;
  gender: Gender;
  isAccessible: boolean;
  doorType: DoorType;
}
