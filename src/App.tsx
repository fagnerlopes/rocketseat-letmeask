import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { AuthContextProvider } from "./contexts/AuthContext";
import { Room } from "./pages/Room";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { AdminRoom } from "./pages/AdminRoom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthContextProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rooms/new" element={<NewRoom />} />
            <Route path="/rooms/:id" element={<Room />} />
            <Route path="/admin/rooms/:id" element={<AdminRoom />} />
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
