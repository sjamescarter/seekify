import { useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContext } from "./context/user";
import Landing from "./pages/Landing"
import NavBar from "./components/NavBar";
import DropZone from "./components/DropZone";
import VenueForm from "./components/VenueForm";

function App() {
  const { user, setUser } = useContext(UserContext);
  const [form, setForm] = useState({});

  useEffect(() => {
    fetch("/me")
      .then((r) => {
        if(r.ok) {
          r.json().then((user) => setUser(user));
        }})
  }, []);

  if (!user) return <Landing />;

  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<VenueForm />} />
          <Route path="/testing" element={<h1>Test Route</h1>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;