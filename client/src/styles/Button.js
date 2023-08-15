import styled from 'styled-components';

const main = {
    border: "2px solid #8AA29E",
    backgroundColor: "#8AA29E",
    color: "white"
};
const alt = {    
    border: "2px solid #686963",
    backgroundColor: "white",
    color: "#686963"
};
const StyledButton = styled.button`
    border: none;
    border-radius: 12px;
    padding: 5px;
`

function Button({ onClick, children, style }) {
    return <StyledButton style={style ? alt : main} onClick={onClick}>{children}</StyledButton>
}


export default Button;