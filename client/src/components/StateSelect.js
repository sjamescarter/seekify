import { Select } from "../styles";

function StateSelect({ value, onChange }) {
    const states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];

    return (
        <Select 
            name="state" 
            value={value} 
            onChange={onChange} 
            >
            <option>State</option>
            {states.map(state => 
                <option 
                    key={state} 
                    value={state}
                >
                    {state}
                </option>
            )}
        </Select>
    );
}

export default StateSelect;