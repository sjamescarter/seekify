import { useContext } from "react";
import { MusiciansContext } from "../context/musicians";
import Profile from "./Profile";

function People() {
    const { musicians } = useContext(MusiciansContext);

    if(!musicians) return <h1>Loading...</h1>

    return (
        <>
            {musicians.map(person => person.profile 
                ? <Profile key={person.id} person={person} /> 
                : null
            )}
        </>
    );
}

export default People;