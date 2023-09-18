import styled from "styled-components";

function Icon({ children, style }) {
    return (
        <I className='material-symbols-rounded' style={style}>{children}</I>
    );
}
const I = styled.i`
    color: inherit;
    margin: 0 6px 0 0;
`
export default Icon;