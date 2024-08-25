import { FC } from "react";
import s from "./styles.module.css";
import { ReactNode, MouseEventHandler } from "react";

interface ButtonProps {
  children: ReactNode;
  type: string;
  disabled: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const Button: FC<ButtonProps> = ({
  children,
  type,
  disabled,
  onClick,
}): JSX.Element => {
  return (
    <button
      className={`${s.card_btn} ${s[type]}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
