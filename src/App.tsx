import SignUp from "./Components/SignUp.tsx";
import SignIn from "./Components/SignIn.tsx";
import MainPage from "./Components/MainPage.tsx";
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {NameProvider} from "./Context/loginContext.tsx";
import Category from "./Components/Category.tsx";
function App() {
    return (
        <>
            
        <NameProvider>
           <Router>
               <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/category/:category" element={<Category/>}/>
                    <Route path="/signUp" element={<SignUp/>}/>
                    <Route path="/signIn" element={<SignIn/>}/>
               </Routes>
            </Router>
        </NameProvider>
        </>
    )
}
export default App