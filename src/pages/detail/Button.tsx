import { FC, MouseEventHandler, ReactNode } from "react";
import s from "./styles.module.css";

interface ButtonProps {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const Button: FC<ButtonProps> = ({ children, onClick }): JSX.Element => {
  return (
    <button className={s.btn} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
