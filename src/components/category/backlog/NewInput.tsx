import { FC, useCallback, useEffect, useRef } from "react";
import s from "../styles.module.css";

const NewInput: FC<{
  setNewInput: React.Dispatch<React.SetStateAction<string>>;
}> = ({ setNewInput }): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current && inputRef.current.focus();
  }, [inputRef]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setNewInput(e.target.value),
    [setNewInput]
  );

  return (
    <input
      className={s.input}
      ref={inputRef}
      type="text"
      onChange={handleChange}
      placeholder="______________________________________"
      data-testid="backlog-input"
    />
  );
};

export default NewInput;
