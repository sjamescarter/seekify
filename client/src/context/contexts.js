import { createContext } from "react";
import { UserProvider } from "./user";
import { MusiciansProvider } from "./musicians";
import { InstrumentsProvider } from "./instruments";
import { VenuesProvider } from "./venues";

const Contexts = createContext("");

function ContextsProvider({children}){
    return (
        <Contexts.Provider value='meta-context'>
            <UserProvider>
                <MusiciansProvider>
                    <InstrumentsProvider>
                        <VenuesProvider>
                            {children}
                        </VenuesProvider>
                    </InstrumentsProvider>
                </MusiciansProvider>
            </UserProvider>
        </Contexts.Provider>
    );
}

export { Contexts, ContextsProvider };