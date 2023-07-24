import { useContext } from 'react';
import styled from 'styled-components';
import { UserContext } from "../context/user";

function NavBar({ children }) {
    const { user, setUser } = useContext(UserContext);

    return (
        <Main>
            <NavGrid>
                <h1>seekify.io</h1>
                <input type='text' placeholder='Search Bar' />
                <button>menu</button>
            </NavGrid>
        </Main>
    );
}

const Main = styled.div`
    background-color: #8AA29E;
    color: white;
    position: fixed;
    top: 0;
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