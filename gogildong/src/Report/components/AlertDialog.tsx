export default function AlertDialog() {
  return (
    <div className='w-[300px] h-[212px] rounded-[20px] flex flex-col gap-4 bg-white border-neon-100'>
      <div className='flex flex-col gap-2'>
        <p className='text-body-bold-lg'>등록 전 주의사항</p>
        <p className='text-body-sm'>
          허위 정보 등록 시 <br /> 제보가 제한될 수 있습니다. <br /> 3회 이상
          누적될 경우,
          <br /> 게시글 삭제 및 이용이 제한됩니다.
        </p>
      </div>
      <button className='bg-neon-100 text-body-sm rounded-[30px]'>확인</button>
    </div>
  );
}
