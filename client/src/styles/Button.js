import { styled } from 'styled-components';
import { colors } from '.';

const Button = styled.button`
    border: none;
    border-radius: 10px;
    color: white;
    background-color: ${colors.main};
    padding: 8px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
        background-color: ${colors.mainHover};
        cursor: pointer;
    }
`
export default Button;