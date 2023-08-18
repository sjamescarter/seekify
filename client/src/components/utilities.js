// Constants
const experienceLevels = ["<1", "1–4", "5–9", "10–20", ">20"];
const skillLevels = ["beginner", "intermediate", "advanced", "professional"];
const states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];

export { experienceLevels, skillLevels, states };

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

function addS(value) {
    return value === "<1" ? null : "s";
}

function handleChange(e, form, setForm) {
    setForm({
        ...form,
        [e.target.name]: e.target.value
    });
}

// Case Conversions
function camelToSnake(str) {
    return str.split(/(?=[A-Z])/).join("_").toLowerCase();
}

function camelToTitle(str) {
    return str.split(/(?=[A-Z])/).join(" ").replace(str[0], (g) => g.slice(0).toUpperCase())
}

function snakeToCamel(str) {
    return str.replace(/[_][a-z]/g, (g) => g.slice(-1).toUpperCase());
}

export { abc, addS, handleChange, camelToSnake, camelToTitle, snakeToCamel };