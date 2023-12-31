import { useContext } from "react";
import { useParams } from "react-router-dom";
import { MusiciansContext } from "../context/musicians";
import { UserContext } from "../context/user";
import { abc } from "../components/utilities";
import Profile from "../components/Profile";

function People() {
    // Context
    const { musicians } = useContext(MusiciansContext);
    const { user } = useContext(UserContext);
    const { id } = useParams();
    
    if(!musicians) { return (<h1>Loading...</h1>)}

    // Constants
    const filtered = [...musicians].filter(m => m.id !== user.id); // Filter out current user
    const people = abc([...filtered]);
    
    if(id) {
        const musician = musicians.find((person) => person.id === parseInt(id));
        return (
            <Profile person={musician} />
        )
    }

    return (
        <>
            {people.map(person => <Profile key={person.id} person={person} />)}
        </>
    );
}

export default People;