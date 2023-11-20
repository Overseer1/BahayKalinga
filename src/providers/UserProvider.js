import React from "react";

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);

  const updateUser = (newUser) => {
    setUser(newUser);
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
