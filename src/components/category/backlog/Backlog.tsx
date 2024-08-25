import {
  FC,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import s from "../styles.module.css";
import { DatabaseContext, Category } from "../../../context/DatabaseContext";
import BacklogList from "./BacklogList";
import Button from "../Button";

const Backlog: FC = (): JSX.Element => {
  const [status, setStatus] = useState<boolean>(false);
  const [newInput, setNewInput] = useState<string>("");
  const { database, setDatabase } = useContext(DatabaseContext);

  const newCategoryItem = useMemo(
    (): Category => ({
      id: (Date.now() + Math.floor(Math.random() * 10)).toString(),
      value: newInput,
      category: "backlog",
      text: "This task has no description",
    }),
    [newInput]
  );

  const addNewItem = useCallback((): void => {
    setDatabase((prev) => ({
      ...prev,
      backlog: [...prev.backlog, newCategoryItem],
    }));

    setNewInput("");
    setStatus(false);
  }, [newCategoryItem, setDatabase]);

  useEffect(() => {
    localStorage.setItem("database", JSON.stringify(database));
  }, [database]);

  return (
    <div className={s.category}>
      <h3 className={s.title}>Backlog</h3>
      <BacklogList
        status={status}
        database={database}
        setNewInput={setNewInput}
      />
      {status ? (
        <Button
          type="secondary"
          onClick={addNewItem}
          disabled={!newInput.trim()}
        >
          Submit
        </Button>
      ) : (
        <Button type="primary" onClick={() => setStatus(true)} disabled={false}>
          + Add card
        </Button>
      )}
    </div>
  );
};

export default memo(Backlog);
