import { FC } from "react";
import s from "./style.module.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Categories from "../../pages/categories/Categories";
import Detail from "../../pages/detail/Detail";

const Layout: FC = (): JSX.Element => {
  return (
    <main className={s.layout}>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Categories />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
};

export default Layout;
