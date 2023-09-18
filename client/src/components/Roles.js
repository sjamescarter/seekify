import { TableHeader, colors } from "../styles";
import RoleCard from "./RoleCard";

function Roles({ event }) {
    const ordered = event.roles
    console.log(ordered)
    return(
        <div>
            <h2 style={{color: colors.secondary}}>Roles</h2>
            <TableHeader>
                <p><strong>Status</strong></p>
                <p><strong>Musician</strong></p>
                <p><strong>Instrument</strong></p>
            </TableHeader>
            {event.roles.map(musician => 
                <RoleCard 
                key={musician.id} 
                eventId={event.id}
                musician={musician} 
                />
            )}
        </div>
    );
}

export default Roles;