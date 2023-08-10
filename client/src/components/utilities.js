// Constants
const skillLevels = ["beginner", "intermediate", "advanced", "professional"]
const states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY']

export { skillLevels, states };

// Functions
function abc(array) {
    return [...array].sort((a, b) => {
        const nameA = a.name
        const nameB = b.name
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
    });
}

function handleChange(e, form, setForm) {
    setForm({
        ...form,
        [e.target.name]: e.target.value
    })
}

export { abc, handleChange };