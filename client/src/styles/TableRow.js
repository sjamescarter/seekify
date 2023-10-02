import { styled } from "styled-components";
import { colors } from "./colors";

const TableRow = styled.div`
    align-items: center;
    background-color: white;
    color: black;
    border-bottom: .5px solid ${colors.gray};
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 30px;
    gap: 10px;
    padding: 0 15px;    
    // &:hover {
    //     background-color: ${colors.nuetral};
    //     cursor: pointer;
    // }
`

export default TableRow;