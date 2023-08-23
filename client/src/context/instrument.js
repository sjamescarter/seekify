import { createContext, useState } from "react";

const InstrumentsContext = createContext("");

function InstrumentsProvider({children}){
    const [instruments, setInstruments] = useState();

    return (
        <InstrumentsContext.Provider value={{ instruments, setInstruments }}>
            {children}
        </InstrumentsContext.Provider>
    );
}

export { InstrumentsContext, InstrumentsProvider };