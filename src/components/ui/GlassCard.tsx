import { ReactNode } from 'react';

export const GlassCard = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
      {children}
    </div>
  );
};
