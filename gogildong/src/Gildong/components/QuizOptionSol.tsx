type QuizOption = {
  correctAnswer: string;
  selectedAnswer: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  descriptionA: string;
  descriptionB: string;
  descriptionC: string;
  descriptionD: string;
};

export default function QuizOptionSol({
  correctAnswer,
  selectedAnswer,
  optionA,
  optionB,
  optionC,
  optionD,
  descriptionA,
  descriptionB,
  descriptionC,
  descriptionD
}: QuizOption) {
  const options = [
    { key: 'A', label: 'A', choice: optionA, description: descriptionA },
    { key: 'B', label: 'B', choice: optionB, description: descriptionB },
    { key: 'C', label: 'C', choice: optionC, description: descriptionC },
    { key: 'D', label: 'D', choice: optionD, description: descriptionD }
  ];

  return (
    <div className="flex w-full flex-col gap-4 mt-4">
      {options.map((opt) => {
        const isCorrect = opt.key === correctAnswer;
        const isSelectedWrong =
          opt.key === selectedAnswer && selectedAnswer !== correctAnswer;

        return (
          <div key={opt.key} className="flex flex-col">
            <div
              className={`font-medium ${isCorrect ? 'text-green-600' : ''} ${isSelectedWrong ? 'text-red-500' : ''} `}
            >
              {opt.label}) {opt.choice}
              {isCorrect && ' ✔️'}
            </div>

            <div
              className={`text-sm leading-5 font-medium`}
            >
              {opt.description}
            </div>
          </div>
        );
      })}
    </div>
  );
}
