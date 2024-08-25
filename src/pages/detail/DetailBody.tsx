import s from "./styles.module.css";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { Database, Category } from "../../context/DatabaseContext";
import Button from "./Button";

interface DetailBodyProps {
  item: Category | undefined;
  database: Database;
  setDatabase: React.Dispatch<React.SetStateAction<Database>>;
}

const DetailBody: FC<DetailBodyProps> = ({
  item,
  database,
  setDatabase,
}): JSX.Element => {
  console.log("DetailBody Component of Detail");
  const pRef = useRef<HTMLParagraphElement>(null);
  const [isEditable, setEditable] = useState<boolean>(false);

  const handleEdit = useCallback((): void => {
    setEditable(true);

    !isEditable &&
      setTimeout(() => {
        pRef.current?.focus();
      }, 0);
  }, [isEditable]);

  const handleSave = useCallback((): void => {
    const newText = pRef.current?.textContent;

    setDatabase((prev) => ({
      ...prev,
      [item!.category]: prev[item!.category].map((task) =>
        task.id === item!.id ? { ...task, text: newText } : task
      ),
    }));
    setEditable(false);
  }, [item, setDatabase]);

  useEffect(() => {
    localStorage.setItem("database", JSON.stringify(database));
  }, [database]);

  return (
    <div className={s.detail_body}>
      <p
        className={s.text}
        ref={pRef}
        contentEditable={isEditable}
        suppressHydrationWarning={true}
      >
        {item?.text}
      </p>
      {isEditable ? (
        <Button onClick={handleSave}>
          <img src="/assets/save-btn.svg" alt="save icon" />
        </Button>
      ) : (
        <Button onClick={handleEdit}>
          <img src="/assets/edit-btn.svg" alt="edit icon" />
        </Button>
      )}
    </div>
  );
};

export default DetailBody;
