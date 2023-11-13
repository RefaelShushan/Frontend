import SignUp from "./Components/SignUp.tsx";
import SignIn from "./Components/SignIn.tsx";
import MainPage from "./Components/MainPage.tsx";
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {NameProvider} from "./Context/loginContext.tsx";
function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <NameProvider>
                        <Route path="/signUp" element={<SignUp />} />
                        <Route path="SignIn" element={<SignIn/>}/>
                    </NameProvider>
                </Routes>
            </Router>
        </>
    )
}
export default App
