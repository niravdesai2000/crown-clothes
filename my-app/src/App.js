import { Route, Routes } from "react-router-dom";
import Authentication from "./routing/authentication/authentication.component";
import Home from "./routing/home/home.component";
import Navigation from "./routing/navigation/navigation.component.jsx";

 const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="/auth" element={<Authentication />} />
      </Route>
    </Routes>
  );
};

export default App;
