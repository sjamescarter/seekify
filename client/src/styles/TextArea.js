import { styled } from 'styled-components';
import { colors } from './colors';

const TextArea = styled.textarea`
    border: none;
    border-bottom: 1px solid ${colors.gray};
    font: inherit;
    padding: 5px 10px;
    margin: 5px;
    width: 100%;
`

export default TextArea;