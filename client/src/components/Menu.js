import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { colors } from '../styles';
import Icon from './Icon';

function Menu({ id, name, handleMenu, handleLogout }) {

    return (
        <Container>
            <StyledLink to={`/people/${id}`} onClick={handleMenu}>
                <I>person</I>
                {name}
            </StyledLink>
            <Line />
            <StyledLink to="/" onClick={handleMenu}>
                <I>dashboard</I>
                Dashboard
            </StyledLink>
            <StyledLink to="/events/new" onClick={handleMenu}>
                <I>calendar_add_on</I>
                Create Event
            </StyledLink>
            <StyledLink to="/settings" onClick={handleMenu}>
                <I>settings</I>
                Settings
            </StyledLink>
            <Line />
            <StyledLink to="/" onClick={handleLogout}>
                <I>logout</I>
                Sign Out
            </StyledLink>
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
const StyledLink = styled(Link)`
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
const I = styled(Icon)`
    padding: 0 10px 0 0;
`
const Line = styled.div`
    border: solid .5px ${colors.gray};
    opacity: .5;
    margin: 10px 15px;
`
export default Menu;