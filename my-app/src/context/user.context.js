import {createContext, useEffect, useReducer} from "react";
import {createUserDocumentFromAuth, onAuthStateChangeListener} from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
    userState: null,
    setUserState: () => null
})
export const userConstant = {
    USER_IS_LOGIN: 'USER_IS_LOGIN'
}
export const userReducer = (state, action) => {
    const {type, payload} = action;
    switch (type) {
        case userConstant.USER_IS_LOGIN:
            return {
                ...state,
                userState: payload
            }
        default:
            throw new Error(`UserReducer:-${type} error`);
    }
}

export const Provider = ({children}) => {
    const INITIAL_USER_STATE = {
        userState: null
    }
    /*const [userState, setUserState] = useState(null);*/
    const[{userState},dispatch] = useReducer(userReducer,INITIAL_USER_STATE);
    const setUserState = (userState) => {
        dispatch({type:userConstant.USER_IS_LOGIN,payload:userState})
    }
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