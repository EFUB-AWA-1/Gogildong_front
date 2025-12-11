export const FACILITY_MAP = {
  restroom: '화장실',
  elevator: '엘리베이터',
  classroom: '교실',
  other: '기타'
} as const;

export type FacilityTypeParam = keyof typeof FACILITY_MAP;
export type FacilityType = (typeof FACILITY_MAP)[FacilityTypeParam];

export const toFacilityLabel = (
  param?: string | null
): FacilityType | undefined => {
  if (!param) return undefined;
  if (param in FACILITY_MAP) return FACILITY_MAP[param as FacilityTypeParam];
  return undefined;
};

export const toFacilityParam = (
  label?: FacilityType | null
): FacilityTypeParam | undefined => {
  if (!label) return undefined;
  const entry = Object.entries(FACILITY_MAP).find(([, v]) => v === label);
  return entry ? (entry[0] as FacilityTypeParam) : undefined;
};
