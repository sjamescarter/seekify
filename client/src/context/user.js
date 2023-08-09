import { createContext, useState } from "react";

const UserContext = createContext("");

function UserProvider({children}){
    const [user, setUser] = useState();
    const [venues, setVenues] = useState();
    const [instruments, setInstruments] = useState();

    return (
        <UserContext.Provider value={{ user, setUser, venues, setVenues, instruments, setInstruments }}>
            {children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider };