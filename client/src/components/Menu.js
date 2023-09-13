import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../styles';

function Menu({ name, handleMenu, handleLogout }) {

    return (
        <Container>
            <StyledNavLink to="/profile" onClick={handleMenu}>
                <I className="material-symbols-rounded">person</I>
                {name}
            </StyledNavLink>
            <Line />
            <StyledNavLink to="/" onClick={handleMenu}>
                <I className="material-symbols-rounded">dashboard</I>
                Dashboard
            </StyledNavLink>
            <StyledNavLink to="/events/new" onClick={handleMenu}>
                <I className="material-symbols-rounded">calendar_add_on</I>
                Create Event
            </StyledNavLink>
            <StyledNavLink to="/settings" onClick={handleMenu}>
                <I className="material-symbols-rounded">settings</I>
                Settings
            </StyledNavLink>
            <Line />
            <StyledNavLink to="/" onClick={handleLogout}>
                <I className="material-symbols-rounded">logout</I>
                Sign Out
            </StyledNavLink>
        </Container>
    );
}

const Container = styled.div`
    background-color: white;
    box-shadow: 0 5px 16.83px 0.17px rgba(0, 0, 0, 0.25);
    color: ${colors.gray};
    border-radius: 10px;
    display: block;
    position: fixed;
    right: 10px;
    top: 55px;
`
const StyledNavLink = styled(NavLink)`
    border: solid 2px white;
    border-radius: 10px;
    color: ${colors.gray};
    display: flex;
    text-decoration: none;
    padding: 4px 10px;
    margin: 5px 10px;
    &:hover {
        cursor: pointer;
        color: white;
        border: solid 2px ${colors.gray};
        background-color: ${colors.gray};
    }
`
const I = styled.i`
    padding: 0 10px 0 0;
`
const Line = styled.div`
    border: solid .5px ${colors.gray};
    opacity: .5;
    margin: 10px 15px;
`
export default Menu;