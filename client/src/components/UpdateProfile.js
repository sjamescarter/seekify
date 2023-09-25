import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MusiciansContext } from '../context/musicians';
import { UserContext } from '../context/user';
import { VenuesContext } from '../context/venues';
import { handleModal } from '../components/utilities';
import { handleImgSubmit } from '../components/utilities';
import CreateVenue from '../components/CreateVenue';
import Modal from '../components/Modal';
import ProfileForm from '../components/ProfileForm';

function UpdateProfile() {
    // Context
    const { musicians, setMusicians } = useContext(MusiciansContext);
    const { user, setUser } = useContext(UserContext);
    const { venues } = useContext(VenuesContext);
    const { profile, church, name } = user;
    const { id, phone, city, state, bio, video_url } = profile;

    // State
    const [form, setForm] = useState({
        firstName: name.split(" ")[0], 
        lastName: name.split(" ")[1], 
        phone: phone, 
        city: city, 
        state: state, 
        bio: bio, 
        venueId: church.id, 
        videoUrl: video_url
    });
    const [img, setImg] = useState();
    const [errors, setErrors] = useState();
    
    // Const
    const endpoint = `/profiles/${id}`;
    const method = "PATCH";
    const imgLabel = 'avatar';
    const modalId = `createProfileVenue${id}`;

    const navigate = useNavigate();
    const callback = (data) => {
        setUser({
            ...user,
            name: `${data.first_name} ${data.last_name}`,
            profile: data
        });
        setMusicians([
            ...musicians.map(m => m.id === user.id
                ? {
                    ...m,
                    name: `${data.first_name} ${data.last_name}`,
                    profile: data
                }
                : m
            )
        ]);
        navigate(`/people/${user.id}`);
    };

    // Handlers
    const handleCancel = () => {
        handleModal(modalId);
        setForm({ ...form, venueId: "" });
    }
    const onSubmit = (e) => handleImgSubmit(e, endpoint, method, setErrors, form, imgLabel, img, callback)

    if(form.venueId === "new") { 
        handleModal(modalId, true);
    };

    return (
        <>
            <ProfileForm 
                form={form}
                setForm={setForm}
                title="Edit Profile"
                onSubmit={onSubmit}
                errors={errors}
                venues={venues}
                onCancel={() => navigate(`/people/${user.id}`)}
                imgLabel={imgLabel}
                img={img}
                setImg={setImg}
            />
            <Modal id={modalId}>
                <CreateVenue 
                    state={form} 
                    setState={setForm} 
                    handleCancel={handleCancel} 
                    closeModal={() => handleModal(modalId)}
                />
            </Modal>
        </>
    );
}

export default UpdateProfile;