import step1 from '@/Report/assets/imgs/step1.png';

export default function Step1() {
  return (
    <div className='flex flex-col items-center text-center text-neon-100 gap-[108px]'>
      <p className='text-body-lg'>
        화장실 문 앞<br />
        살짝 떨어진 곳에서
        <br /> 촬영해 주세요
      </p>
      <img src={step1} alt='촬영 가이드 1' />
    </div>
  );
}
