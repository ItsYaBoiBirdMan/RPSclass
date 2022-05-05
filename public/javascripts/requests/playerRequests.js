
async function requestPlayerInfo(id) {
    try {
        const response = await fetch(`/api/players/${id}`);
        var result = await response.json();
        // We are not checking for errors (considering id exists)
        return result;
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}
