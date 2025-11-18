import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/home/Home";
import { Header } from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { Admin } from "./pages/admin/Admin";
import { LoginManager } from "./components/loginManager/LoginManager";

function App() {
  return (
    <LoginManager>
      <div className="app-container">
        <BrowserRouter>
          <Header />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </div>
    </LoginManager>
  );
}

export default App;
