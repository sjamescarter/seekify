function get(endpoint, setState) {
    fetch(endpoint)
    .then(r => {
        if(r.ok) {
            r.json().then(data => setState(data))
        }
    });
} 

function destroy(endpoint, callBack) {
    fetch(endpoint, {
        method: "DELETE"
    })
    .then(r => {
        if(r.ok) {
            callBack();
        }
    })
}

export { get, destroy };