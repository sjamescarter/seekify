import styled from "styled-components";

function RoleCard({ musician, onClick }) {
    const { id, status, role, user_instrument } = musician;
    const { name } = user_instrument
    const color = status === "pending" ? "#3D5467" : status === "accepted" ? "#8AA29E" : "#DB5461";
    
    return (
        <Grid>
            <Span style={{color: color}}>
                <i className='material-symbols-rounded'>
                    { status === "pending" ? "pending" : status === "accepted" ? "check_circle" : "cancel"}
                </i>
                {status.toUpperCase()}
            </Span>
            <p>{name}</p>
            <p>{role}</p>
            <Delete 
                id={id} 
                className='material-symbols-rounded'  
                onClick={onClick}
            >
                delete
            </Delete>
        </Grid>
    );
}

// Styles
const Grid = styled.div`
    align-items: center;
    border-bottom: .5px solid #686963;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 30px;
    padding: 0 15px;
    // &:hover {
    //     background-color: #E4DDDF;
    // }
`
const Span = styled.span`
    align-items: center;
    display: grid;
    grid-template-columns: 30px auto;
    gap: 5px;
    font-weight: 600;
`
const Delete = styled.i`
    color: #8AA29E;
    &:hover {
        color: #DB5461;
        cursor: pointer;
    }
`
export default RoleCard;