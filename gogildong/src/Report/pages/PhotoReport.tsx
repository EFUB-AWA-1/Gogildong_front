import { useEffect, useRef, useState } from 'react';
import Header from '@/common/components/Header';
import ActionButton from '@/common/components/ActionButton';

export default function PhotoReport() {
  const [status, setStatus] = useState<'capture' | 'processing' | 'failed'>(
    'capture'
  );
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const localVideoRef = videoRef.current;

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (localVideoRef) localVideoRef.srcObject = stream;
      })
      .catch((err) => console.error(err));

    return () => {
      if (localVideoRef?.srcObject) {
        const tracks = (localVideoRef.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  const takePhoto = () => {
    if (!videoRef.current) return;
    setStatus('processing');

    const canvas = document.createElement('canvas');
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);

    setTimeout(() => {
      const success = Math.random() > 0.5;
      setStatus(success ? 'capture' : 'failed');
    }, 2000);
  };

  return (
    <div className='w-full h-full flex flex-col items-center justify-between bg-black text-white relative'>
      <Header title='화장실 촬영' darkMode />

      <div className='flex-1 w-full flex flex-col justify-center items-center mt-16'>
        {status === 'capture' && (
          <div className='relative flex flex-col items-center'>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className='w-[90%] max-w-sm aspect-9/16 rounded-2xl border-[3px] border-neon-100 object-cover bg-black'
            />
          </div>
        )}

        {status === 'processing' && (
          <div className='flex flex-col items-center justify-center'>
            <div className='w-[90%] max-w-sm aspect-9/16 rounded-2xl border border-neon-60 flex flex-col justify-center items-center whitespace-nowrap'>
              <p className='text-neon-100 text-body-bold-md mb-2 '>
                인식 중...
              </p>
              <div className='w-1/2 h-0.5 bg-neon-100 animate-pulse' />
            </div>
          </div>
        )}

        {status === 'failed' && (
          <div className='flex flex-col items-center justify-center'>
            <div className='w-[80%] max-w-xs aspect-9/16 rounded-2xl border border-neon-60 flex flex-col justify-center items-center'>
              <p className='text-neon-100 text-body-bold-md mb-2'>인식 실패</p>
              <p className='text-white text-body-sm text-center leading-tight'>
                가이드에 맞춰 <br /> 다시 촬영해 주세요
              </p>
            </div>
          </div>
        )}
      </div>

      <div className='w-full fixed bottom-8 flex justify-center items-center'>
        {status === 'capture' && (
          <button
            onClick={takePhoto}
            className='w-16 h-16 rounded-full border-[3px] border-neon-100 bg-neon-100 active:bg-neon-60 transition'
          />
        )}

        {status === 'failed' && (
          <ActionButton
            label='다시 촬영하기'
            onClick={() => setStatus('capture')}
          />
        )}
      </div>
    </div>
  );
}
