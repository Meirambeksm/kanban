import { FC } from "react";
import s from "./styles.module.css";
import Backlog from "../../components/category/backlog/Backlog";
import Category from "../../components/category/Category";

const Categories: FC = (): JSX.Element => {
  return (
    <div className={s.categories}>
      <Backlog />
      <Category category="ready" prevCategory="backlog" />
      <Category category="progress" prevCategory="ready" />
      <Category category="finished" prevCategory="progress" />
    </div>
  );
};

export default Categories;
