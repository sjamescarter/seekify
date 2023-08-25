import { useContext, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { MusiciansContext } from "./context/musicians";
import { InstrumentsContext } from "./context/instruments";
import { UserContext } from "./context/user";
import { VenuesContext } from "./context/venues";
import styled from "styled-components";
import CreateProfile from "./pages/CreateProfile";
import Landing from "./pages/Landing";
import NavBar from "./components/NavBar";
import Profile from "./pages/Profile";
import CreateEvent from "./pages/CreateEvent";
import Dashboard from "./pages/Dashboard";
import { get } from "./components/fetch";
import AddInstrument from "./components/AddInstrument";

function App() {
  // Context
  const { user, setUser} = useContext(UserContext);
  const { setInstruments } = useContext(InstrumentsContext);
  const { musicians, setMusicians } = useContext(MusiciansContext);
  const { venues, setVenues } = useContext(VenuesContext);

  const navigate = useNavigate();

  useEffect(() => {
    get("/me", setUser);
    get("/venues", setVenues);
    get("/instruments", setInstruments);
    get("/users", setMusicians);
  }, []);
  console.log(user)
  console.log(musicians)
  function handleLogout() {
    fetch('/logout', {
        method: "DELETE"
    })
      .then(r => {
        if (r.ok) {
            navigate('/');
            setUser(null);
        }
      });
}

  if (!user) return <Landing />;
  if (!venues) return <h1>Loading...</h1>
  if (!user.profile) return <CreateProfile handleLogout={handleLogout} />;

  return (
    <div>
      <NavBar handleLogout={handleLogout} />
      <Container>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="/events/new" element={<CreateEvent />} />
          <Route path="/instruments/new" element={<AddInstrument />} />
          <Route path="/testing" element={<h1>Test Route</h1>} />
        </Routes>
      </Container>
    </div>
  );
}

const Container = styled.div`
  margin-top: 100px;
`
export default App;