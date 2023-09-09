import styled from "styled-components";
import { destroy } from "./fetch";
import { handleModal } from "./utilities";
import { colors } from "../styles";
import Modal from "./Modal";
import Warning from "./Warning";

function Delete({ id, endpoint, callback }) {
    // Handlers
    const openModal = () => handleModal(id, true);
    const closeModal = () => handleModal(id);

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
            <Modal id={id}>
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
    color: ${colors.main};
    &:hover {
        color: ${colors.red};
        cursor: pointer;
    }
`
export default Delete;