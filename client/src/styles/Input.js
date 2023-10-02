import { styled } from 'styled-components';
import { colors } from './colors';

const Input = styled.input`
    border: none;
    border-bottom: 1px solid ${colors.gray};
    font: inherit;
    margin: 5px;
    padding: 5px 10px;
    width: 100%;
`

export default Input;