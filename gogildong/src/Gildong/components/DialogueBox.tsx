import { useMemo } from 'react';

export default function DialogueBox() {
  const greetings = [
    '오늘도 와 줘서 고마워! ✨',
    '길동이 등장! 😎',
    '코인 모으기 도전 고고~ 🪙',
    '새로운 옷 입구 싶다..👕🪙',
    '오늘의 기분은 어땠어?',
    '너를 기다리고 있었어!'
  ];

  const randomGreeting = useMemo(() => {
    const index = Math.floor(Math.random() * greetings.length);
    return greetings[index];
  }, []);

  return (
    <div className="m-2 inline-flex h-14 w-28 flex-col items-center justify-center gap-2 rounded-[20px] bg-white px-2.5 py-1.5">
      <div className="justify-center text-center font-['Pretendard_Variable'] text-sm font-normal text-zinc-800">
        {randomGreeting.split('\n').map((line, i) => (
          <span key={i}>
            {line}
            <br />
          </span>
        ))}
      </div>
    </div>
  );
}
