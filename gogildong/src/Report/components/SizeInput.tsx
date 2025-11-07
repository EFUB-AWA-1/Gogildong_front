import { useEffect, useRef, useState } from 'react';

interface SizeInputProps {
  onChange: (data: { width: string; height: string }) => void;
}

export default function SizeInput({ onChange }: SizeInputProps) {
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');

  const widthSpanRef = useRef<HTMLSpanElement>(null);
  const widthInputRef = useRef<HTMLInputElement>(null);

  const heightSpanRef = useRef<HTMLSpanElement>(null);
  const heightInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (widthSpanRef.current && widthInputRef.current) {
      const spanWidth = widthSpanRef.current.getBoundingClientRect().width;
      widthInputRef.current.style.width = `${spanWidth + 20}px`;
    }
    onChange({ width, height });
  }, [width]);

  useEffect(() => {
    if (heightSpanRef.current && heightInputRef.current) {
      const spanWidth = heightSpanRef.current.getBoundingClientRect().width;
      heightInputRef.current.style.width = `${spanWidth + 20}px`;
    }
    onChange({ width, height });
  }, [height]);

  return (
    <div className='flex flex-col justify-center items-center'>
      <p className='text-heading-sm text-black'>화장실 칸 폭은</p>
      <div className='flex items-center gap-2 text-heading-sm text-neon-100'>
        <p className='border border-gray-40 rounded-xl px-2 py-1 inline-block'>
          <input
            className='text-center outline-none bg-transparent'
            type='tel'
            ref={widthInputRef}
            value={width}
            onChange={(e) => setWidth(e.target.value)}
          />
          <span
            ref={widthSpanRef}
            className='absolute opacity-0 whitespace-pre text-heading-sm'>
            {width || '0'}
          </span>
        </p>
        <span className='text-neon-100'>cm</span>
        <span className='text-black'>x</span>
        <p className='border border-gray-40 rounded-xl px-2 py-1 inline-block'>
          <input
            className='text-center outline-none bg-transparent'
            type='tel'
            ref={heightInputRef}
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
          <span
            ref={heightSpanRef}
            className='absolute opacity-0 whitespace-pre text-heading-sm'>
            {height || '0'}
          </span>
        </p>
        <span className='text-neon-100'>cm</span>
      </div>
    </div>
  );
}
