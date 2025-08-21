export default async function getJourneys(dept: string, dest: string) {
    const urlString = `http://localhost:8080/services/${dept}/to/${dest}`;

    try {
        const response = await fetch(urlString)
        const json = await response.json()
        return json;

    } catch (error) {
        console.log(error)
        return [{"name": "error fetching"}, []]
    }

}