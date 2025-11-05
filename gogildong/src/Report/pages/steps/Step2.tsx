import step2 from '@/Report/assets/imgs/step2.png';

export default function Step2() {
  return (
    <div className='flex flex-col items-center text-center text-neon-100 gap-20'>
      <p className='text-body-lg'>
        가이드에 맞춰
        <br />
        문의 양 옆 테두리가
        <br /> 나오도록 촬영해 주세요
      </p>
      <div className='w-100 flex justify-end'>
        <img src={step2} alt='촬영 가이드 2' />
      </div>
    </div>
  );
}
