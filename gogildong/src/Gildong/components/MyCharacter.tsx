type Props = {
  headImg?: string;
  dressImg?: string;
};

export default function MyCharacter({headImg, dressImg}: Props) {
  if (!headImg && !dressImg) return null;
  return (
    <div className="flex flex-col items-center justify-center">
      
        {headImg && <img className='w-20 h-20 z-2' src={headImg} alt="길동이 머리" />}
        {dressImg && <img className='w-20 h-20 mt-[-5px]' src={dressImg} alt="길동이 머리" />}
     
    </div>
  );
}
