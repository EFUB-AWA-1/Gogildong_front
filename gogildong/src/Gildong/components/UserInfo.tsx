
type UserInfoProps = {
  username : string | undefined;
  coin : number;
};

export default function UserInfo({username, coin} : UserInfoProps) {
  return (
    <div className="inline-flex h-14 w-full items-center justify-center gap-2.5 overflow-hidden rounded-[20px] bg-white p-4 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.10)] outline outline-1 outline-offset-[-1px] outline-lime-400">
      <div className="flex items-center justify-center gap-2 overflow-hidden p-2.5">
        <div className="justify-center text-lg leading-7 font-bold text-zinc-800">
          {username}
        </div>
        <div className="justify-center text-lg leading-7 font-medium text-zinc-800">
          님
        </div>
      </div>
      <div className="flex flex-1 items-center justify-end gap-2.5 overflow-hidden p-2.5">
        <div className="justify-center text-right text-base leading-6 font-medium text-zinc-800">
          {coin.toLocaleString()} 코인
        </div>
      </div>
    </div>
  );
}
