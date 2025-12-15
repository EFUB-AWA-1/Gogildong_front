import BuildingPlanContainer from '@/Admin/components/BuildingPlan/BuildingPlanContainer';
import DesktopHeader from '@/Admin/components/DesktopHeader';

export default function BuildingPlan() {
  return (
    <>
      <DesktopHeader title="건물 도면 관리" />
      <BuildingPlanContainer />
    </>
  );
}
