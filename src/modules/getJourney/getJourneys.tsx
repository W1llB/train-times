export default async function getJourneys(dept: string, dest: string) {
    // env
    const apiUrl = process.env.NEXT_PUBLIC_REALTIME_TRAINS_ENDPOINT || "";
    const username = process.env.NEXT_PUBLIC_USERNAME || "";
    const password = process.env.NEXT_PUBLIC_PASSWORD || "";
    const urlString = ( apiUrl ?? "http://localhost:8080") +`json/services/${dept}/to/${dest}`;
    // const urlString = ( "http://localhost:8080/") +`services/${dept}/to/${dest}`;


    try {
        const response = await fetchWithBasicAuth(urlString, username, password);
        const response2 = await getServicesByRoute(dept, dest);
        console.log("response2", response2);
        const json = await response.json()
        return json;

    } catch (error) {
        console.log(error)
        return [{"name": "error fetching"}, []]
    }

}
const getServicesByRoute = async (dept: string, dest: string) => {
    const apiUrl = process.env.NEXT_PUBLIC_REALTIME_TRAINS_ENDPOINT || "";
    const username = process.env.NEXT_PUBLIC_USERNAME || "";
    const password = process.env.NEXT_PUBLIC_PASSWORD || "";
    const urlString = ( apiUrl ?? "http://localhost:8080") +`services/${dept}/to/${dest}`;
    // const urlString = ( "http://localhost:8080/") +`services/${dept}/to/${dest}`;
    return await fetchWithBasicAuth(urlString, username, password);
}


async function fetchWithBasicAuth(
    url: string,
    username: string,
    password: string
) {
    const credentials = btoa(`${username}:${password}`);
    try {
        const response = await fetch(url, {
            headers: {
                Authorization: `Basic ${credentials}`,
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return { error: "Error fetching with basic auth" };
    }
}