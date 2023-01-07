import {createContext, useState} from "react";

export const UserContext = createContext({
    user: null,
    setUser: () => null
})

export const Provider = ({children}) => {
    const [userState, setUserState] = useState(null);
    const value = {userState, setUserState};
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}