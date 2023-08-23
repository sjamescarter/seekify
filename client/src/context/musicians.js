import { createContext, useState } from "react";

const MusiciansContext = createContext("");

function MusiciansProvider({children}){
    const [musicians, setMusicians] = useState();

    return (
        <MusiciansContext.Provider value={{ musicians, setMusicians }}>
            {children}
        </MusiciansContext.Provider>
    );
}

export { MusiciansContext, MusiciansProvider };