import { forwardRef } from "react";
import { styled } from "styled-components";

const Modal = forwardRef(({ id, children }, ref) => {
    return (
        <Dialog id={id} ref={ref}>
            {children}
        </Dialog>
    );
})

const Dialog = styled.dialog`
    border: none;
    background: rgba(0, 0, 0, 0);
    &::backdrop {
        backdrop-filter: blur(4px);
        background: rgba(0, 0, 0, 0.25);
    }
`
export default Modal;