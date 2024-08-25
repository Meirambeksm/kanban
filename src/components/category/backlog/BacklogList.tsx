import { FC, useCallback, useMemo } from "react";
import s from "../styles.module.css";
import { useNavigate } from "react-router-dom";
import { Database } from "../../../context/DatabaseContext";
import NewInput from "./NewInput";

interface BacklogListProps {
  status: boolean;
  database: Database;
  setNewInput: React.Dispatch<React.SetStateAction<string>>;
}

const BacklogList: FC<BacklogListProps> = ({
  status,
  database,
  setNewInput,
}): JSX.Element => {
  const navigate = useNavigate();
  const handleNavigate = useCallback(
    (id: string): void => navigate(`/detail/${id}`),
    [navigate]
  );

  const backlogItems = useMemo(() => {
    return database.backlog.map((item, i) => (
      <li
        className={s.item}
        key={i}
        id={item.id}
        onClick={() => handleNavigate(item.id)}
      >
        {item.value}
      </li>
    ));
  }, [database.backlog, handleNavigate]);

  return (
    <ul className={s.list}>
      {backlogItems}
      {status && <NewInput setNewInput={setNewInput} />}
    </ul>
  );
};

export default BacklogList;
