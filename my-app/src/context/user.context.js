import {createContext, useEffect, useState} from "react";
import {createUserDocumentFromAuth, onAuthStateChangeListener} from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
    userState: null,
    setUserState: () => null
})

export const Provider = ({children}) => {
    const [userState, setUserState] = useState(null);
    const value = {userState, setUserState};
    useEffect(() => {
        const unsubscribe = onAuthStateChangeListener((user) => {
            if (user) {
                createUserDocumentFromAuth(user);
            }
            setUserState(user);
        })
        return unsubscribe;
    }, [])
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}