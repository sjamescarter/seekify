import { useContext, useState } from 'react';
import { UserContext } from "../context/user";
import styled from 'styled-components';
import Menu from './Menu';
import { NavLink } from 'react-router-dom';

function NavBar({ handleLogout }) {
    // Context
    const { user } = useContext(UserContext);

    // State
    const [search, setSearch] = useState(0);
    const [showMenu, setShowMenu] = useState(0);

    // Handlers
    const handleMenu = () => setShowMenu(!showMenu);

    return (
        <Main>
            <NavGrid>
                <Logo>Seekify.io</Logo>
                <NavLink to="/events">Events</NavLink>
                <NavLink to="/people">People</NavLink>
                {search ? <SearchBar type='text' placeholder='Search Bar' /> : <div></div>}
                <Search className="material-symbols-rounded" onClick={() => setSearch(!search)}>search</Search>
                <Avatar 
                    className={showMenu ? "active" : null}
                    src={user.profile.avatar 
                        ? user.profile.avatar 
                        : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.L-PLw9YL0s6ErCIcuprlKgAAAA%26pid%3DApi&f=1&ipt=98bca178f7faad18a400337a2735e92959f258e43128e375907f1e6d80f5b423&ipo=images" 
                    } 
                    alt="Avatar" 
                    loading="lazy" 
                    onClick={handleMenu} 
                />
            {showMenu ? <Menu name={user.name} handleMenu={handleMenu} handleLogout={handleLogout}/> : null}
            </NavGrid>
        </Main>
    );
}

// Styles
const Main = styled.div`
    background-color: #8AA29E;
    color: white;
    position: fixed;
    top: 0;
    width: 100%;
    height: 75px;
`
const NavGrid = styled.div`
    align-items: center;
    display: grid;
    grid-template-columns: 160px 60px 60px 2fr 30px 50px;
    grid-template-rows: 50px;
    padding: 10px;
    // max-width: 800px;
    // min-width: 550px;
    margin: auto;
`
const Logo = styled.h1`
    // background-color: #3D5467;
`
const Search = styled.i`
    padding: 3px;
    border-radius: 1em;
    &.active {
        background-color: #686963;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;        
        cursor: pointer;
    }
    &:hover {
        background-color: #686963;
        cursor: pointer;
    }
`
const SearchBar = styled.input`
    border: 2px solid #686963;
    border-radius: 1em;
    padding: 5px 8px;
`
const Avatar = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    object-fit: cover;
    object-position: 50%;
    margin: auto;
    &.active {
        border: 3px solid #686963;
    }
    &:hover {
        border: 3px solid #686963;
    }
`
export default NavBar;