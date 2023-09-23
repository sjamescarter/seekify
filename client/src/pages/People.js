import { useContext } from "react";
import { useParams } from "react-router-dom";
import { MusiciansContext } from "../context/musicians";
import { UserContext } from "../context/user";
import Profile from "../components/Profile";
import { abc } from "../components/utilities";

function People() {
    // Context
    const { musicians } = useContext(MusiciansContext);
    const { user } = useContext(UserContext);
    const { id } = useParams();
    
    if(!musicians) return <h1>Loading...</h1>;

    // Constants
    const musician = musicians.find((person) => person.id === parseInt(id));
    const filtered = [...musicians].filter(m => m.id !== user.id); // Remove current user
    const people = abc([...filtered]);

    return (
        <>
            { musician
                ? <Profile person={musician} />
                : people.map(person => <Profile key={person.id} person={person} /> 
                )
            }
        </>
    );
}

export default People;