import SignUp from "./Components/SignUp.tsx";
import SignIn from "./Components/SignIn.tsx";
import MainPage from "./Components/MainPage.tsx";
import ProductScreen from "./Components/ProductScreen.tsx";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NameProvider } from "./Context/loginContext.tsx";
function App() {
  return (
    <>
      <NameProvider>
        <Router>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="SignIn" element={<SignIn />} />
            <Route path="productScreen" element={<ProductScreen />} />
          </Routes>
        </Router>
      </NameProvider>
    </>
  );
}
export default App;
