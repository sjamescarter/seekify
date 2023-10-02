import { useContext } from "react";
import { UserContext } from "../context/user";
import { Button, Container, PageTitle } from "../styles";
import { handleModal } from "../components/utilities";
import Icon from "../components/Icon";
import InstrumentsTable from "../components/InstrumentsTable";
import Modal from "../components/Modal";
import UpdateProfile from "../components/UpdateProfile";

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