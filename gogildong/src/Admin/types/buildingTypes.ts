export type Building = {
  buildingId: number;
  buildingName: string;
};

export type FloorPlan = {
  floorId: number;
  floorName: string;
  floorPlanImage: string;
};

export type BuildingsResponse = {
  buildings: Building[];
};

export type FloorPlansResponse = {
  floorPlans: FloorPlan[];
};
