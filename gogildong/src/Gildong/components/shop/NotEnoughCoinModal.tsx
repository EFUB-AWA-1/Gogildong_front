import Portal from '@/common/components/Portal';

type Props = {
  onClose: () => void;
};

export default function NotEnoughCoinModal({ onClose }: Props) {
  return (
    <Portal>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="flex flex-col items-center justify-center w-72 px-8 py-5 bg-white rounded-[20px] shadow-[0px_0px_12px_0px_rgba(170,235,47,0.30)] inline-flex rounded-2xl bg-white text-center">
          <p className="mb-4 text-lg font-semibold">
            코인이 충분하지 않습니다!
          </p>

          <button
            onClick={onClose}
            className="w-20 px-2 rounded-full bg-lime-400 py-2 font-semibold text-black"
          >
            닫기
          </button>
        </div>
      </div>
    </Portal>
  );
}
