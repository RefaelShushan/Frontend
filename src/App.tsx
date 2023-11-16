import SignUp from "./Components/SignUp.tsx";
import SignIn from "./Components/SignIn.tsx";
import MainPage from "./Components/MainPage.tsx";
import ProductScreen from "./Components/ProductScreen.tsx";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NameProvider } from "./Context/nameContext.tsx";
import Category from "./Components/Category.tsx";
import {EmailProvider} from "./Context/emailContext.tsx";
import Cart from "./Components/Cart.tsx";


function App() {
  return (
    <>
      <NameProvider>
        <EmailProvider>
        <Router>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/category/:category" element={<Category />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/product/:paramsProduct" element={<ProductScreen />} />
            <Route path="/cart" element={<Cart/>}/>
          </Routes>
        </Router>
        </EmailProvider>
      </NameProvider>
    </>
  );
}
export default App;
