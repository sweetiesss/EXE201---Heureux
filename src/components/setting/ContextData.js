import { createContext, useEffect, useState } from "react";

const DataContext = createContext({});

export function LocalStorageDataProvider(props) {
  const [data, setData] = useState(() => {
    const storedData = localStorage.getItem("DATA");
    return storedData ? JSON.parse(storedData) : {};
  });
  useEffect(() => {
    localStorage.setItem("DATA", JSON.stringify(data));
  }, [data]);

  return (
    <DataContext.Provider value={{ data, setData }}>
            {props.children}
    </DataContext.Provider>
  );
}

export default DataContext;
