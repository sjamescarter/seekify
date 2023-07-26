function handleChange(e, form, setForm) {
    setForm({
        ...form,
        [e.target.name]: e.target.value
    })
}

export { handleChange };