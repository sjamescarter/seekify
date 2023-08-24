import { createContext, useState } from "react";

const VenuesContext = createContext("");

function VenuesProvider({children}){
    const [venues, setVenues] = useState();

    return (
        <VenuesContext.Provider value={{ venues, setVenues }}>
            {children}
        </VenuesContext.Provider>
    );
}

export { VenuesContext, VenuesProvider };