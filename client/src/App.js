import { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContext } from "./context/user";
import CreateProfile from "./pages/CreateProfile";
import Landing from "./pages/Landing";
import NavBar from "./components/NavBar";
import VenueForm from "./components/VenueForm";

function App() {
  const { user, setUser, setVenues, setInstruments } = useContext(UserContext);

  useEffect(() => {
    fetch("/me")
      .then((r) => {
        if(r.ok) {
          r.json().then((user) => setUser(user));
        }})
    fetch("/venues")
      .then((r) => r.json())
      .then(venues => setVenues(venues));
    fetch("/instruments")
      .then((r) => r.json())
      .then(instruments => setInstruments(instruments));
  }, []);

  if (!user) return <Landing />;
  if (!user.profile) return <CreateProfile />;
console.log(user)
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