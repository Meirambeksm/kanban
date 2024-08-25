import { FC, useCallback, useMemo } from "react";
import s from "./styles.module.css";
import { Database, Category } from "../../context/DatabaseContext";

interface NewSelectProps {
  database: Database;
  setNewItem: React.Dispatch<React.SetStateAction<Category | undefined>>;
  category: keyof Database;
  prevCategory: keyof Database;
}

const NewSelect: FC<NewSelectProps> = ({
  database,
  setNewItem,
  category,
  prevCategory,
}): JSX.Element => {
  const addOption = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>): void => {
      const index = e.target.options.selectedIndex;

      const item = database[prevCategory].find(
        (item) => `${item.id}` === e.target.options[index].id
      );

      if (item) {
        const selectedItem: Category = {
          id: e.target.options[index].id,
          value: e.target.value,
          category: category,
          text: item.text,
        };
        setNewItem(selectedItem);
      }
    },
    [database, prevCategory, category, setNewItem]
  );

  const options = useMemo(() => {
    return database[prevCategory].map((item, i) => (
      <option key={i} id={item.id} value={item.value}>
        {item.value}
      </option>
    ));
  }, [database, prevCategory]);

  return (
    <select
      className={s.input}
      data-testid="category-input"
      name="Ready"
      onChange={(e) => addOption(e)}
    >
      <option value="">Choose an option...</option>
      {options}
    </select>
  );
};

export default NewSelect;
