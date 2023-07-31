import { createContext, useState } from "react";

const UserContext = createContext("");

function UserProvider({children}){
    const [user, setUser] = useState();
    const [venues, setVenues] = useState();
    
    return (
        <UserContext.Provider value={{ user, setUser, venues, setVenues }}>
            {children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider };