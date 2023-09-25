import { useContext } from "react";
import InstrumentsTable from "../components/InstrumentsTable";
import UpdateProfile from "../components/UpdateProfile";
import { Button, Container, PageTitle } from "../styles";
import { UserContext } from "../context/user";
import Icon from "../components/Icon";
import Modal from "../components/Modal";
import { handleModal } from "../components/utilities";

function Settings() {
    const { user } = useContext(UserContext);
    const { user_instruments } = user;
    const modalId = `updateProfile`;
    
    return (
        <div>
            <Container>
                <PageTitle>
                    <h1>Settings</h1>
                    <Button onClick={() => handleModal(modalId, true)}>
                        <Icon>edit</Icon>
                        Edit Profile
                    </Button>
                </PageTitle>
                <div style={{padding: "20px"}}>
                    <InstrumentsTable userInstruments={user_instruments} loggedIn={true}/>
                </div>
            </Container>
            <Modal id={modalId}>
                <UpdateProfile />
            </Modal>
        </div>
    );
}

export default Settings;