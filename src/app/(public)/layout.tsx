import Header from '@/features/navigation/header';
import type { ReactNode } from 'react';

const PublicLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">
        {children}
      </main>
    </>
  );
};

export default PublicLayout;
