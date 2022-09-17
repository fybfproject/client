import { FC, PropsWithChildren } from 'react';

export interface ButtonProps {}

export const Button: FC<PropsWithChildren<ButtonProps>> = ({ children }) => {
  return <button>{children}</button>;
};
