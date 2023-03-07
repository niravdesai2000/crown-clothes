import {Route, Routes} from "react-router-dom";
import Authentication from "./routing/authentication/authentication.component";
import Home from "./routing/home/home.component";
import Navigation from "./routing/navigation";
import Shop from "./routing/shop";
import Checkout from "./routing/checkout";
import {useEffect} from "react";
import {createUserDocumentFromAuth, onAuthStateChangeListener} from "./utils/firebase/firebase.utils";
import {useDispatch} from "react-redux";
import {currentUser} from "./redux/action/user/user.action";

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const unsubscribe = onAuthStateChangeListener((user) => {
            if (user) {
                createUserDocumentFromAuth(user);
            }
            dispatch(currentUser(user));
        })
        return unsubscribe;
    }, [])
    return (
        <Routes>
            <Route path="/" element={<Navigation/>}>
                <Route index element={<Home/>}/>
                <Route path="/shop/*" element={<Shop/>}/>
                <Route path="/auth" element={<Authentication/>}/>
                <Route path="/checkout" element={<Checkout/>}/>
            </Route>
        </Routes>
    );
};

export default App;
