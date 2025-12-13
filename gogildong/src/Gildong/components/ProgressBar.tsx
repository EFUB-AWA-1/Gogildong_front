export default function ProgressBar({ percent }: { percent: number }) {
  return (
    <div className="relative h-4 w-52 overflow-hidden rounded-full bg-gray-200">
      <div
        className="absolute top-0 left-0 h-4 rounded-full bg-lime-400 transition-all duration-500"
        style={{ width: `${100 - percent}%` }}
      ></div>
    </div>
  );
}
