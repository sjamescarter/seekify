import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext } from "../context/user";

function NavBar() {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    function handleLogout() {
        fetch('/logout', {
            method: "DELETE"
        }).then(r => {
            if (r.ok) {
                navigate('/');
                setUser(null);
            }
        });
    }

    return (
        <Main>
            <NavGrid>
                <h1>seekify.io</h1>
                <input type='text' placeholder='Search Bar' />
                <button onClick={handleLogout}>{user.name}</button>
            </NavGrid>
        </Main>
    );
}

const Main = styled.div`
    background-color: #8AA29E;
    color: white;
    // position: fixed;
    // top: 0;
    width: 100%;
`

const NavGrid = styled.div`
    align-items: center;
    display: grid;
    grid-template-columns: 3fr 2fr 1fr;
    padding: 10px;
    max-width: 800px;
    margin: auto;
`

export default NavBar;