import styled from "styled-components";
import defaultEventPic from "../images/defaultEventPic.jpeg";

function EventCard({ event }) {
    const { name, time, location, image, description } = event
    
    const eventImage = image ? image : defaultEventPic

    return(
        <Container>
            <Img src={eventImage} alt="Event cover"/>
            <div></div>
            <Title>{name}</Title>
            <Strong>{time} | {location}</Strong>
            <Description>{description}</Description>
        </Container>
    );
}

// Styles
const Container = styled.div`
    display: grid;
    background-color: #F1EDEE;
    color: #686963;
    grid-template-columns: 200px auto;
    grid-template-rows: 35px 30px 35px 1fr;
    height: 200px;
    // min-width: 550px;
    border-top-right-radius: 24px;
    border-top-left-radius: 12px;
    border-bottom-left-radius: 24px;
    margin: 2em 0;
    text-align: right;

`
const Img = styled.img`
    background-color: #3D5467;
    width: 200px;
    height: 200px;
    object-fit: cover;
    object-position: 50%;
    grid-row: 1 / span 4;
    // border-top-left-radius: 12px;
    border-bottom-left-radius: 24px;
`
const Title = styled.h2`
    color: #3D5467;
    margin: 0 15px;
    line-height: 1;
`
const Description = styled.p`
    padding: 0 15px;
`
const Strong = styled.strong`
    padding: 2px 15px;
    font-size: .8em;
    border-top: .5px solid #686963;
`
export default EventCard;