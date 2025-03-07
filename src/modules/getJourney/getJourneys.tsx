export default async function getJourneys(dept: string, dest: string) {
    const urlString = `http://localhost:8080/services/${dept}/to/${dest}`;
    const response = await fetch(urlString)
    const json = await response.json()
    console.log(json)
    return [json["location"], json["services"]];

}