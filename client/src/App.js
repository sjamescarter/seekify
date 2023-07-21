import { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContext } from "./context/user";

function App() {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    fetch("/me")
      .then((r) => {
        if(r.ok) {
          r.json().then((user) => setUser(user));
        }})
  }, []);

  if (!user) return <h1>You must sign in!</h1>;

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