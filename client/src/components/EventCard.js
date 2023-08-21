import styled from "styled-components";

function EventCard({ event }) {
    const { name, time, location, image, description } = event
    return(
        <Container>
            <Img src={image} alt="Event cover"/>
            <Venue>{location}</Venue>
            <Title>{name}</Title>
            <Description>{description}</Description>
            <Date>{time}</Date>
        </Container>
    );
}

// Styles
const Container = styled.div`
    display: grid;
    background-color: #F1EDEE;
    color: #686963;
    grid-template-columns: 200px auto;
    grid-template-rows: 35px 30px 1fr 35px;
    height: 200px;
    // min-width: 550px;
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
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
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
`
const Venue = styled.strong`
    font-size: .8em;
    padding: 5px 15px;
`
const Title = styled.h2`
    color: #3D5467;
    margin: 0 15px;
    line-height: 1;
`
const Description = styled.p`
    padding: 0 15px;
`
const Date = styled.strong`
    padding: 2px 15px;
    font-size: .9em;
    border-top: .5px solid #686963;
    // border-top: 1px solid white;
`
export default EventCard;