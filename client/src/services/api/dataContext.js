import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/reports/")
      .then((response) => setData(response.data))
      .catch((error) => console.error(error));
  }, []);

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};
