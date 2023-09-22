import { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { MusiciansContext } from "./context/musicians";
import { InstrumentsContext } from "./context/instruments";
import { UserContext } from "./context/user";
import { VenuesContext } from "./context/venues";
import styled from "styled-components";
import { get } from "./components/fetch";
import CreateEvent from "./pages/CreateEvent";
import CreateProfile from "./pages/CreateProfile";
import Dashboard from "./pages/Dashboard";
import Events from "./pages/Events";
import Landing from "./pages/Landing";
import NavBar from "./components/NavBar";
import People from "./pages/People";

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
          <Route path="/events" element={<Events />} />
          <Route path="/events/new" element={<CreateEvent />} />
          <Route path="/people" element={<People />}>
            <Route path=":id" element={<People />} />
          </Route>
          <Route path="/settings" element={<h1>Edit Profile</h1>} />
        </Routes>
      </Container>
    </div>
  );
}

const Container = styled.div`
  margin-top: 100px;
`
export default App;