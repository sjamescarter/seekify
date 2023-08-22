import { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { UserContext } from "./context/user";
import styled from "styled-components";
import CreateProfile from "./pages/CreateProfile";
import Landing from "./pages/Landing";
import NavBar from "./components/NavBar";
import Profile from "./pages/Profile";
import CreateEvent from "./pages/CreateEvent";
import Dashboard from "./pages/Dashboard";

function App() {
  const { user, setUser, venues, setVenues, setInstruments } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("/me")
      .then((r) => {
        if(r.ok) {
          r.json().then((user) => setUser(user));
        }
      })
    fetch("/venues")
      .then((r) => r.json())
      .then(venues => setVenues(venues));
    fetch("/instruments")
      .then((r) => r.json())
      .then(instruments => setInstruments(instruments));
  }, []);
  console.log(user)

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