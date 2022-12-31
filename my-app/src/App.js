import { Route, Routes } from "react-router-dom";
import Home from "./routing/home/home.component";
import Navigation from "./routing/navigation/navigation.component.jsx";
import SignIn from "./routing/sign-in/sign-in.component.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Route>
    </Routes>
  );
};

export default App;
