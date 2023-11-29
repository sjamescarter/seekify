import { useRef } from "react";
import { styled } from "styled-components";
import { colors } from "../styles";
import { destroy } from "./fetch";
import Modal from "./Modal";
import Warning from "./Warning";

function Delete({ endpoint, callback }) {
    const warningModal = useRef(null);

    // Handlers
    const openModal = () => {
        warningModal.current.showModal();
    }
    const closeModal = () => {
        warningModal.current.close();
    }

    function handleDelete(e) {
        e.preventDefault();
        closeModal();
        destroy(endpoint, callback);
    }

    return (
        <>
            <I 
                title='Delete'
                className='material-symbols-rounded'  
                onClick={openModal}
            >
                delete
            </I>
            <Modal ref={warningModal}>
                <Warning 
                    onSubmit={handleDelete} 
                    handleCancel={closeModal}
                />
            </Modal>
        </>
    );
}

// Styles
const I = styled.i`
    color: ${colors.gray};
    &:hover {
        color: ${colors.red};
        cursor: pointer;
    }
`
export default Delete;