import { FC, useMemo } from "react";
import s from "./styles.module.css";
import { useContext } from "react";
import { DatabaseContext } from "../../context/DatabaseContext";

const Footer: FC = (): JSX.Element => {
  const { database } = useContext(DatabaseContext);
  const currentDate: Date = useMemo(() => new Date(), []);
  const activeTasksCount = useMemo(() => database.backlog.length, [database]);
  const finishedTasksCount = useMemo(
    () => database.finished.length,
    [database]
  );

  return (
    <footer className={s.footer}>
      <div className={s.total}>
        <p>Active tasks: {activeTasksCount}</p>
        <p>Finished tasks: {finishedTasksCount}</p>
      </div>
      <p>Kanban board by Meirambek, {currentDate.getFullYear()}</p>
    </footer>
  );
};

export default Footer;
