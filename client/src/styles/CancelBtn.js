import styled from "styled-components";
import { colors } from "./colors";
import Button from "./Button";

const CancelBtn = styled(Button)`
    color: ${colors.gray};
    background-color: white;
    padding: 1em 2em;
    width: auto;
    margin: auto;
    &:hover {
        background-color: ${colors.nuetral};
    }
`
export default CancelBtn;