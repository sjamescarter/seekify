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

function chron(array) {
    return [...array].sort((a, b) => {
        const dateA = new Date(a.date)
        const dateB = new Date(b.date)
        return dateA - dateB
    });
}

function currentEvents(array) {
    return [...array].filter(event => {
        const today = Date.now()
        const date = new Date(event.date)
        return date > today
    });
}

function addS(value) {
    return value === "<1" ? null : "s";
}

// Handlers
function handleChange(e, form, setForm) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value
    
    setForm({
        ...form,
        [target.name]: value
    });
}

function handleImgSubmit(e, endpoint, setErrors, form, imgLabel, img, callback) {
    e.preventDefault();
    setErrors();

    const data = new FormData();
    Object.keys(form).map(key => data.append(camelToSnake(key), form[key]))
    if(img) {
        data.append(imgLabel, img);
    }

    fetch(`/${endpoint}`, {
        method: 'POST',
        body: data
    })
    .then(r => {
        if(r.ok) {
            r.json().then(callback);
        } else {
            r.json().then(err => setErrors(err.errors))
        }
    });
}

function handleModal(id, action) {
    const modal = document.getElementById(id);
    action === true ? modal.showModal() : modal.close();
}

// Text Case Convertors
function camelToSnake(str) {
    return str.split(/(?=[A-Z])/).join("_").toLowerCase();
}

function camelToTitle(str) {
    return str.split(/(?=[A-Z])/).join(" ").replace(str[0], (g) => g.slice(0).toUpperCase())
}

function snakeToCamel(str) {
    return str.replace(/[_][a-z]/g, (g) => g.slice(-1).toUpperCase());
}

export { abc, addS, chron, currentEvents, handleChange, handleImgSubmit, handleModal, camelToSnake, camelToTitle, snakeToCamel };