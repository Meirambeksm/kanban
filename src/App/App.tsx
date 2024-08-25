import { FC } from "react";
import s from "./styles.module.css";
import { DatabaseProvider } from "../context/DatabaseContext";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Layout from "../components/layout/Layout";

const App: FC = (): JSX.Element => {
  return (
    <DatabaseProvider>
      <div className={s.app}>
        <Header />
        <Layout />
        <Footer />
      </div>
    </DatabaseProvider>
  );
};

export default App;
