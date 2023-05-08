import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import LoginForm from "./components/LoginForm";
import HistoryList from "./components/History";
import Signup from "./components/Signup";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import "./App.css";
import Nav from "./components/Nav";
import ForgotPassword from "./components/ForgotPassword";
import PasswordReset from "./components/PasswordReset";

function App() {
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, '');
  return (
    <BrowserRouter basename={basename}>
      <AuthProvider>
        <Nav />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route exact path="/login" element={<LoginForm />}></Route>
          <Route exact path="/history" element={<HistoryList />}></Route>
          <Route exact path="/signup" element={<Signup />}></Route>
          <Route
            exact
            path="/forgot_password"
            element={<ForgotPassword />}
          ></Route>
          <Route
            exact
            path="/password_reset"
            element={<PasswordReset />}
          ></Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
