import s from "./styles.module.css";
import { FC, useContext, useMemo } from "react";
import { useParams } from "react-router-dom";
import { DatabaseContext, Category } from "../../context/DatabaseContext";
import DetailHeader from "./DetailHeader";
import DetailBody from "./DetailBody";

const Detail: FC = (): JSX.Element => {
  console.log("Detail Component");

  const { id } = useParams<{ id: string }>();
  const { database, setDatabase } = useContext(DatabaseContext);

  const item: Category | undefined = useMemo(() => {
    return Object.values(database)
      .flat()
      .find((item) => `${item.id}` === id);
  }, [database, id]);

  return (
    <div className={s.detail}>
      <DetailHeader item={item} />
      <DetailBody item={item} database={database} setDatabase={setDatabase} />
    </div>
  );
};

export default Detail;
