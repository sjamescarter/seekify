import { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContext } from "./context/user";
import Landing from "./pages/Landing"

function App() {
  const { user, setUser } = useContext(UserContext);

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
        <Routes>
          <Route path="/" element={<h1>{user.email}</h1>} />
          <Route path="/testing" element={<h1>Test Route</h1>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;