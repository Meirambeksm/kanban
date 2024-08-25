import { FC, useCallback, useMemo } from "react";
import s from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { Database, Category } from "../../context/DatabaseContext";
import NewSelect from "./NewSelect";

interface ListProps {
  status: boolean;
  database: Database;
  setNewItem: React.Dispatch<React.SetStateAction<Category | undefined>>;
  category: keyof Database;
  prevCategory: keyof Database;
}

const List: FC<ListProps> = ({
  status,
  database,
  setNewItem,
  category,
  prevCategory,
}): JSX.Element => {
  console.log(`List Component of ${category}`);
  const navigate = useNavigate();
  const handleNavigate = useCallback(
    (id: string): void => navigate(`/detail/${id}`),
    [navigate]
  );

  const listItems = useMemo(() => {
    return database[category].map((item, i) => (
      <li
        className={s.item}
        key={i}
        id={item.id}
        onClick={() => handleNavigate(item.id)}
      >
        {item.value}
      </li>
    ));
  }, [category, database, handleNavigate]);

  return (
    <ul className={s.list}>
      {listItems}
      {status && (
        <NewSelect
          database={database}
          setNewItem={setNewItem}
          category={category}
          prevCategory={prevCategory}
        />
      )}
    </ul>
  );
};

export default List;
