import { useContext } from "react";
import { MusiciansContext } from "../context/musicians";
import Profile from "./Profile";

function People() {
    const { musicians } = useContext(MusiciansContext);

    if(!musicians) return <h1>Loading...</h1>

    return (
        <div>
            {musicians.map(person => person.profile ? <Profile key={person.id} user={person} /> : null)}
        </div>
    );
}

export default People;