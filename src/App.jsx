import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterUser from "./pages/auth/registerUser";
import Login from "./pages/auth/Login";
import VerifyEmail from "./pages/auth/verifyUser";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RegisterUser />} />
          <Route path="verify-email/:userId/:token" element={<VerifyEmail />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
