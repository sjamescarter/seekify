import { useContext, useRef } from "react";
import { UserContext } from "../context/user";
import { Button, Container, PageTitle } from "../styles";
import Icon from "../components/Icon";
import InstrumentsTable from "../components/InstrumentsTable";
import Modal from "../components/Modal";
import UpdateProfile from "../components/UpdateProfile";

function Settings() {
    const { user } = useContext(UserContext);
    const { user_instruments } = user;
    
    // Ref
    const updateProfileModal = useRef(null);

    return (
        <div>
            <Container>
                <PageTitle>
                    <h1>Settings</h1>
                    <Button onClick={() => updateProfileModal.current.showModal()}>
                        <Icon>edit</Icon>
                        Edit Profile
                    </Button>
                </PageTitle>
                <div style={{padding: "20px"}}>
                    <InstrumentsTable userInstruments={user_instruments} loggedIn={true}/>
                </div>
            </Container>
            <Modal ref={updateProfileModal}>
                <UpdateProfile updateProfileModal={updateProfileModal} />
            </Modal>
        </div>
    );
}

export default Settings;