import { createContext, useEffect, useState } from "react";

const DataContext = createContext({});

export function LocalStorageDataProvider({children}) {
  const [data, setData] = useState(() => {
    const storedData = localStorage.getItem("DATA");
    return storedData ? JSON.parse(storedData) : {};
  });
  const [othersId,setOthersId]=useState(()=>{
    const storedData = localStorage.getItem("OTHERS");
    return storedData ? JSON.parse(storedData) : {};
  })
  useEffect(() => {
    localStorage.setItem("DATA", JSON.stringify(data));
  }, [data]);
  useEffect(() => {
    localStorage.setItem("OTHERS", JSON.stringify(othersId));
  }, [othersId]);

  return (
    <DataContext.Provider value={{ data, setData,othersId,setOthersId }}>
            {children}
    </DataContext.Provider>
  );
}

export default DataContext;
