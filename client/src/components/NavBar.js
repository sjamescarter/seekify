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
                {/* <input type='text' placeholder='Search Bar' /> */}
                <Search className="material-symbols-outlined">search</Search>
                <Avatar 
                    src={user.profile.avatar 
                        ? user.profile.avatar 
                        : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.L-PLw9YL0s6ErCIcuprlKgAAAA%26pid%3DApi&f=1&ipt=98bca178f7faad18a400337a2735e92959f258e43128e375907f1e6d80f5b423&ipo=images" 
                    } 
                    alt="Avatar" 
                    loading="lazy" 
                    onClick={handleLogout} 
                />
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
    height: 75px;
`

const NavGrid = styled.div`
    align-items: center;
    display: grid;
    grid-template-columns: auto 30px 50px;
    grid-template-rows: 50px;
    padding: 10px;
    max-width: 800px;
    min-width: 550px;
    margin: auto;
`
const Search = styled.i`
    padding: 3px;
    border-radius: 1em;
    &:hover {
        background-color: #3D5467;
        cursor: pointer;
    }
`
const Avatar = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    object-fit: cover;
    object-position: 50%;
    margin: auto;
    &:hover {
        border: 3px solid #3D5467;
    }
`
export default NavBar;