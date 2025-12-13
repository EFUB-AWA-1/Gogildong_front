import ActionButton from '@/common/components/ActionButton';
import ResetIcon from '../assets/resetIcon.svg';
import { useCharacterStore } from '@/Gildong/stores/useCharacterStore';

export default function UpdateClotheBtn() {
    const clearPreview = useCharacterStore((state) => state.clearPreview);
  return (
    <div className="fixed bottom-0 z-50 flex w-full max-w-120 flex-row p-4">
      <div className="mr-5 inline-flex h-12 w-12 items-center justify-center gap-2 overflow-hidden rounded-[100px] bg-neutral-200 px-2 py-3.5">
        <div className="relative h-6 w-6">
          <div className="absolute top-0 left-0 h-6 w-6 overflow-hidden">
            <div className="absolute top-[2.25px] left-[2px] h-5 w-5">
              <img onClick={clearPreview} src={ResetIcon} alt="새로고침" />
            </div>
          </div>
        </div>
      </div>
      <ActionButton label="저장하기" type="button" />
    </div>
  );
}
