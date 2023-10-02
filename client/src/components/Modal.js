import { styled } from "styled-components";

function Modal({ id, children }) {
    return (
        <Dialog id={id}>
            {children}
        </Dialog>
    );
}

const Dialog = styled.dialog`
    border: none;
    background: rgba(0, 0, 0, 0);
    &::backdrop {
        backdrop-filter: blur(4px);
        background: rgba(0, 0, 0, 0.25);
    }
`
export default Modal;