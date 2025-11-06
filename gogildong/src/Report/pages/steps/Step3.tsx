import step3 from '@/Report/assets/imgs/step3.png';

export default function Step3() {
  return (
    <div className='flex flex-col items-center text-center text-neon-100 gap-11'>
      <p className='text-body-lg'>
        화장실 칸 안에
        <br />
        사람이 없는 것을
        <br /> 꼭 확인해 주세요!
      </p>
      <img src={step3} alt='촬영 가이드 3' />
    </div>
  );
}
