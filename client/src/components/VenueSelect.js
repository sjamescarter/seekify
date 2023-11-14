import { useContext } from "react";
import { VenuesContext } from "../context/venues";
import { Select } from "../styles";
import { abc } from "./utilities";
import FormItem from "./FormItem";

function VenueSelect({ onChange, value }) {
    const { venues } = useContext(VenuesContext);

    if(!venues) return <h1>Loading...</h1>;

    return(
        <FormItem icon='church'>
            <Select  
                name="venueId"
                value={value} 
                onChange={onChange} 
            >
                <option>Select Church</option>
                <option value="new" >Add Church</option>
                {abc(venues).map(venue => 
                    <option 
                        key={venue.id} 
                        value={parseInt(venue.id, 10)}
                    >
                        {venue.name} :: {venue.city}, {venue.state}
                    </option>
                )}
            </Select>
        </FormItem>
    );
}

export default VenueSelect;