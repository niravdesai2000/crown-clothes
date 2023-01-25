import {Route, Routes} from "react-router-dom";
import Authentication from "./routing/authentication/authentication.component";
import Home from "./routing/home/home.component";
import Navigation from "./routing/navigation";
import Shop from "./routing/shop";
import Checkout from "./routing/checkout";

const App = () => {
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
