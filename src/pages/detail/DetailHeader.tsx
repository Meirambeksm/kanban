import s from "./styles.module.css";
import { FC } from "react";
import { Category } from "../../context/DatabaseContext";
import { Link } from "react-router-dom";

interface DetailHeaderProps {
  item: Category | undefined;
}

const DetailHeader: FC<DetailHeaderProps> = ({ item }): JSX.Element => {
  console.log("DetailHeader Component of Detail");

  return (
    <div className={s.detail_header}>
      <h1 className={s.name}>{item?.value}</h1>
      <Link to="/">
        <button className={s.btn}>x</button>
      </Link>
    </div>
  );
};

export default DetailHeader;
