import { FC } from "react";
import s from "./styles.module.css";

const Menu: FC = (): JSX.Element => {
  console.log("Menu Component of Header");

  return (
    <ul className={s.menu}>
      <li>
        <button className={s.menuItem}>Profile</button>
      </li>

      <li>
        <button className={s.menuItem}>Log Out</button>
      </li>
    </ul>
  );
};

export default Menu;
