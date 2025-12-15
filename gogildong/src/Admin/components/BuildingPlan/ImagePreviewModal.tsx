type Props = {
  imageUrl: string;
  onClose: () => void;
};

export default function ImagePreviewModal({ imageUrl, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center">
      {/* overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative z-9999 bg-white p-1">
        <img
          src={imageUrl}
          alt="도면 확대보기"
          className="h-auto max-h-[70vh] w-auto max-w-[50vw] object-contain"
        />
      </div>
    </div>
  );
}
