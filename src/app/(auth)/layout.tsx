import type { ReactNode } from 'react';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return <main id="main-content">{children}</main>;
};

export default AuthLayout;
