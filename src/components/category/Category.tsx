import { FC, memo, useCallback, useContext, useEffect, useState } from "react";
import s from "./styles.module.css";
import {
  Category as CategoryTypes,
  Database,
  DatabaseContext,
} from "../../context/DatabaseContext";
import List from "./List";
import Button from "./Button";

interface CategoryProps {
  category: keyof Database;
  prevCategory: keyof Database;
}

const Category: FC<CategoryProps> = ({
  category,
  prevCategory,
}): JSX.Element => {
  console.log(`${category} Component`);

  const [status, setStatus] = useState<boolean>(false);
  const [newItem, setNewItem] = useState<CategoryTypes | undefined>(undefined);
  const { database, setDatabase } = useContext(DatabaseContext);

  const addItem = useCallback((): void => {
    if (newItem) {
      setDatabase((prev) => ({
        ...prev,
        [category]: [...prev[category], newItem],
      }));

      const updatedItems = database[prevCategory].filter(
        (item) => `${item.id}` !== newItem?.id
      );

      setDatabase((prev) => ({
        ...prev,
        [prevCategory]: updatedItems,
      }));

      setNewItem(undefined);
      setStatus(false);
    }
  }, [newItem, category, prevCategory, database, setDatabase]);

  useEffect(() => {
    localStorage.setItem("database", JSON.stringify(database));
  }, [database]);

  const handleStatusToggle = useCallback(() => setStatus(true), []);

  return (
    <div className={s.category}>
      <h3 className={s.title}>{category}</h3>
      <List
        status={status}
        database={database}
        setNewItem={setNewItem}
        category={category}
        prevCategory={prevCategory}
      />
      {status ? (
        <Button type="secondary" onClick={addItem} disabled={!newItem?.value}>
          Submit
        </Button>
      ) : (
        <Button
          type="primary"
          onClick={handleStatusToggle}
          disabled={database[prevCategory].length === 0}
        >
          + Add card
        </Button>
      )}
    </div>
  );
};

export default memo(Category);
