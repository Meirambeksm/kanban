import { FC } from "react";
import { createContext, useEffect, useState, ReactNode } from "react";

export interface Category {
  id: string;
  value: string;
  category: keyof Database;
  text: string;
}

export interface Database {
  backlog: Category[];
  ready: Category[];
  progress: Category[];
  finished: Category[];
}

interface DatabaseContextType {
  database: Database;
  setDatabase: React.Dispatch<React.SetStateAction<Database>>;
}

interface DatabaseProviderProps {
  children: ReactNode;
}

const defaultDatabase: Database = {
  backlog: [],
  ready: [],
  progress: [],
  finished: [],
};

const defaultContextValue: DatabaseContextType = {
  database: defaultDatabase,
  setDatabase: () => {},
};

const DatabaseContext = createContext<DatabaseContextType>(defaultContextValue);

const DatabaseProvider: FC<DatabaseProviderProps> = ({ children }) => {
  const [database, setDatabase] = useState<Database>(() => {
    const data = localStorage.getItem("database");
    return data ? JSON.parse(data) : defaultDatabase;
  });

  useEffect(() => {
    localStorage.setItem("database", JSON.stringify(database));
  }, [database]);

  return (
    <DatabaseContext.Provider value={{ database, setDatabase }}>
      {children}
    </DatabaseContext.Provider>
  );
};

export { DatabaseContext, DatabaseProvider };
