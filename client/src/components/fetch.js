function get(endpoint, setState) {
    fetch(endpoint)
    .then(r => {
        if(r.ok) {
            r.json().then(data => setState(data))
        }
    });
} 

function destroy(endpoint, callback) {
    fetch(endpoint, {
        method: "DELETE"
    })
    .then(r => {
        if(r.ok) {
            callback();
        }
    })
}

function postImg(endpoint, callback, data, setErrors) {
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
export { get, destroy, postImg };