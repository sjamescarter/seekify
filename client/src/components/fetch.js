function get(endpoint, setState) {
    fetch(endpoint)
        .then(r => {
            if(r.ok) {
                r.json().then(data => setState(data))
            }
        });
} 

export { get };