import { useState } from 'react';

export default function Step0() {
  const types = ['화장실', '엘리베이터', '경사로계단', '기타'];
  const [selectedType, setSelectedType] = useState<string | null>(null);
  return (
    <div className='flex flex-col items-center gap-11'>
      <p className='text-heading-md'>어떤 것을 제보할까요?</p>
      <div className='grid grid-cols-2 gap-x-4 gap-y-3'>
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setSelectedType(t)}
            className={`w-[158px] h-[171px] bg-white border rounded-3xl flex justify-center items-center text-black transition
              ${selectedType === t ? 'border-neon-100' : 'border-gray-20'}`}>
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}
