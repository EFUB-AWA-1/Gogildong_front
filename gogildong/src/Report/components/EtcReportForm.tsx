import { useEffect, useState } from 'react';
import ActionButton from '@/common/components/ActionButton';

interface EtcReportFormProps {
  initialNote?: string;
  onChange?: (note: string) => void;
  onSubmit: (note: string) => void;
}

export default function EtcReportForm({
  initialNote,
  onChange,
  onSubmit
}: EtcReportFormProps) {
  const [note, setNote] = useState('');

  useEffect(() => {
    if (initialNote !== undefined) {
      setNote(initialNote);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  

  useEffect(() => {
    onChange?.(note);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [note]);

  return (
    <div className="flex min-h-screen flex-col gap-6">
      <div className="flex flex-1 flex-col gap-2">
        <p className="text-body-bold-lg text-black">제보 설명</p>
        <textarea
          className="min-h-50 w-full rounded-20 border border-gray-40 px-[18px] py-3 text-body-md text-black outline-none"
          placeholder="제보 내용을 입력해 주세요"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>

      <div className="sticky bottom-0 py-4">
        <ActionButton
          label="다음"
          disabled={!note.trim()}
          onClick={() => onSubmit(note.trim())}
        />
      </div>
    </div>
  );
}
