import { FC, useCallback } from "react";
import { useState } from "react";
import s from "./styles.module.css";
import Menu from "./Menu";

const Header: FC = (): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);
  const toggleMenu = useCallback(() => setOpen((prev) => !prev), []);

  return (
    <header className={s.header}>
      <h1 className={s.heading}>Awesome Kanban Board</h1>
      <div className={s.profile}>
        <img
          className={s.avatar}
          src="/assets/user-avatar.svg"
          alt="avatar icon"
        />
        <button
          className={`${s.profile_btn} ${open && s.rotate}`}
          onClick={toggleMenu}
        >
          <img src="/assets/profile-btn.svg" alt="profile button" />
        </button>
        {open && <Menu />}
      </div>
    </header>
  );
};

export default Header;
