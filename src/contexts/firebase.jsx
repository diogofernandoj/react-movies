import { createContext, useEffect, useState } from "react";

export const FirebaseContext = createContext({});

export default function FirebaseProvider({ children }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getLocalStorage = JSON.parse(localStorage.getItem("@userData")) ?? null;
    setUserData(getLocalStorage);
  }, []);

  return <FirebaseContext.Provider value={{ userData, setUserData }}>{children}</FirebaseContext.Provider>;
}
