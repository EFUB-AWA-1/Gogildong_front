type SmallSchoolCardProps = {
  name: string;
  address: string;
};

export default function SmallSchoolCard({
  name,
  address
}: SmallSchoolCardProps) {
  return (
    <>
      <div className="flex h-22 w-full shrink-0 items-center gap-2 rounded-2xl bg-white px-3 py-2.75 shadow-[0_0_8px_0_rgba(0,0,0,0.08)]">
        <div className="ml-1 flex h-18 flex-1 shrink-0 flex-col items-start justify-center">
          <div className="mb-1 text-[0.875rem] leading-5.25 font-bold text-black">
            {name}
          </div>
          <div className="text-caption-sm leading-3.75 font-normal text-black">
            {address}
          </div>
        </div>
      </div>
    </>
  );
}
