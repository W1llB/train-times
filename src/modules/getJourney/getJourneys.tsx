
export default async function getJourneys(dept: string, dest: string) {
    // env
    const apiUrl = process.env.NEXT_PUBLIC_TRAINS_API;
    const corsProxy = process.env.NEXT_PUBLIC_CORS_PROXY || '';
    console.log(process.env.NEXT_PUBLIC_USERNAME)
    const urlString = corsProxy + apiUrl +`json/search/${dept}/to/${dest}`;

    console.log("apiurl", apiUrl)
    console.log("urlString", urlString)
    const headers = new Headers({
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Basic " + btoa(`${process.env.NEXT_PUBLIC_USERNAME}:${process.env.NEXT_PUBLIC_PASSWORD}`)
    });

    try {
        const response = await fetch(urlString, {method: 'GET', headers: headers});
        const json = await response.json()
        console.log("journeys json", json)
        return json;

    } catch (error) {
        console.log(error)
        return undefined
    }

}
