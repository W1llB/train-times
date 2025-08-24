export default async function getJourneys(dept: string, dest: string) {
    // env
    const apiUrl = process.env.NEXT_PUBLIC_API_ENDPOINT || "";
    const urlString = ( apiUrl ?? "http://localhost:8080") +`/services/${dept}/to/${dest}`;

    console.log("apiurl", apiUrl)

    try {
        const response = await fetch(urlString)
        const json = await response.json()
        return json;

    } catch (error) {
        console.log(error)
        return undefined
    }

}
