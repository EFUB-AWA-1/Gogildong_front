import React from 'react';

type StatsCardLargeProps = {
  children: React.ReactNode;
};

export default function StatsCardLarge({ children }: StatsCardLargeProps) {
  return (
    <div className="flex shrink-0 items-center justify-center gap-2 rounded-[1.25rem] bg-white p-8 shadow-[0_0_12px_0_rgba(170,235,47,0.3)]">
      {children}
    </div>
  );
}
