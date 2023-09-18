import { useContext } from "react";
import { MusiciansContext } from "../context/musicians";
import Profile from "./Profile";
import { useParams } from "react-router-dom";

function People() {
    const { musicians } = useContext(MusiciansContext);
    const { id } = useParams();
    
    if(!musicians) return <h1>Loading...</h1>;

    const musician = musicians.find((person) => person.id === parseInt(id));

    return (
        <>
            { musician
                ? <Profile person={musician} />
                : musicians.map(person => person.profile 
                    ? <Profile key={person.id} person={person} /> 
                    : null
            )}
        </>
    );
}

export default People;