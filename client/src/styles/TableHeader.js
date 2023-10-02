import { styled } from "styled-components";
import { colors } from "./colors";

const TableHeader = styled.div`
    align-items: center;
    background-color: white;
    color: black;
    border-bottom: 1px solid ${colors.gray};
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 30px;
    padding: 0 15px;    
`

export default TableHeader;