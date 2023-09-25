import { useContext, useState } from 'react';
import { MusiciansContext } from '../context/musicians';
import { UserContext } from '../context/user';
import { VenuesContext } from '../context/venues';
import { handleModal } from '../components/utilities';
import { handleImgSubmit } from '../components/utilities';
import CreateVenue from '../components/CreateVenue';
import Modal from '../components/Modal';
import ProfileForm from '../components/ProfileForm';
import { useNavigate } from 'react-router-dom';

const formFields = {
    firstName: "", 
    lastName: "", 
    phone: "", 
    city: "", 
    state: "", 
    bio: "", 
    venueId: "", 
    videoUrl: ""
}

function CreateProfile({ handleLogout }) {
    // Context
    const { musicians, setMusicians } = useContext(MusiciansContext);
    const { setUser } = useContext(UserContext);
    const { venues } = useContext(VenuesContext);

    // State
    const [form, setForm] = useState(formFields);
    const [img, setImg] = useState();
    const [errors, setErrors] = useState();
    
    // Const
    const navigate = useNavigate();
    const callback = (data) => {
        setUser(data);
        setMusicians([...musicians, data]);
        navigate(`/people/${data.id}`)
    };
    const endpoint = '/profiles';
    const method = "POST";
    const imgLabel = 'avatar';

    // Handlers
    const handleCancel = () => {
        handleModal('createProfileVenue');
        setForm({ ...form, venueId: "" });
    }
    const onSubmit = (e) => handleImgSubmit(e, endpoint, method, setErrors, form, imgLabel, img, callback);

    if(form.venueId === "new") { 
        handleModal('createProfileVenue', true);
    };

    return (
        <>
            <ProfileForm 
                form={form}
                setForm={setForm}
                title="Create Profile"
                onSubmit={onSubmit}
                errors={errors}
                venues={venues}
                onCancel={handleLogout}
                imgLabel={imgLabel}
                img={img}
                setImg={setImg}
            />
            <Modal id="createProfileVenue">
                <CreateVenue 
                    state={form} 
                    setState={setForm} 
                    handleCancel={handleCancel} 
                    closeModal={() => handleModal('createProfileVenue')}
                />
            </Modal>
        </>
    );
}

export default CreateProfile;