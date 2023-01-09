import {Route, Routes} from "react-router-dom";
import Authentication from "./routing/authentication/authentication.component";
import Home from "./routing/home/home.component";
import Navigation from "./routing/navigation";
import Shop from "./routing/shop";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigation/>}>
                <Route index element={<Home/>}/>
                <Route path="/shop" element={<Shop/>}/>
                <Route path="/auth" element={<Authentication/>}/>
            </Route>
        </Routes>
    );
};

export default App;
