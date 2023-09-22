import styled from "styled-components";
import defaultEventPic from "../images/defaultEventPic.jpeg";
import { colors } from "../styles";

function PublicEventCard({ children, event, onClick }) {
    const { name, time, location, image, description } = event
    
    const eventImage = image ? image : defaultEventPic

    return(
        <Container>
            <Grid onClick={onClick}>
                <Img src={eventImage} alt="Event cover"/>
                <Div>{children ? children[0] : null}</Div>
                <Title>{name}</Title>
                <Strong>{time} | {location}</Strong>
                <Description>{description}</Description>
            </Grid>
            {children ? children.slice(1) : null}
        </Container>
    );
}

// Styles
const Container = styled.div`
    // min-width: 500px;
    min-height: 200px;
    margin: 0 1em 2em;
`
const Grid = styled.div`
    background-color: ${colors.nuetral};
    display: grid;
    color: ${colors.gray};
    grid-template-columns: 200px auto;
    grid-template-rows: 35px .25fr .25fr 1fr;
    min-height: 200px;
    border-top-right-radius: 24px;
    border-bottom-left-radius: 24px;
    &:hover{
        cursor: pointer;
        box-shadow: 0 5px 16.83px 0.17px rgba(0, 0, 0, 0.25);
    }
`
const Img = styled.img`
    background-color: ${colors.secondary};
    width: 200px;
    height: 100%;
    object-fit: cover;
    object-position: 50%;
    grid-row: 1 / span 5;
    border-bottom-left-radius: 24px;
`
const Div = styled.div`
    display: flex;
    justify-content: right;
    padding: 12px;
`
const Title = styled.h2`
    color: ${colors.secondary};
    margin: 0 15px;
    font-size: 1.6em;
    line-height: 1.3;
`
const Description = styled.p`
    font-size: 1.2em;
    padding: 0 15px;
`
const Strong = styled.strong`
    padding: 2px 15px;
    font-size: .9em;
    border-top: .5px solid ${colors.gray};
`
export default PublicEventCard;