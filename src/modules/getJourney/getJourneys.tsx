import { DetailedService, Service } from "@/interfaces/interfaces";
// env
const apiUrl = process.env.NEXT_PUBLIC_TRAINS_API;
const corsProxy = process.env.NEXT_PUBLIC_CORS_PROXY || '';

const headers = new Headers({
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": "Basic " + btoa(`${process.env.NEXT_PUBLIC_USERNAME}:${process.env.NEXT_PUBLIC_PASSWORD}`)
});


const getServicesByJourney = async (dept: string, dest: string) => {
    const urlString = corsProxy + apiUrl +`json/search/${dept}/to/${dest}`;
    try {
        const response = await fetch(urlString, {method: 'GET', headers: headers});
        const json = await response.json()
        return json.services as Service[];
        
    } catch (error) {
        console.log(error)
        return []
    }
}
const getServiceDetail = async (serviceUid: string, date: string) => {
    const urlString = corsProxy + apiUrl +`json/service/${serviceUid}/${date}`;
    try {
        const response = await fetch(urlString, {method: 'GET', headers: headers});
        const json = await response.json()
        return json;
    } catch (error) {
        console.log(error)
        return null
    }
}

export const getJourneys = async (dept: string, dest: string) => {
    try{ 
        const services: Service[] = await getServicesByJourney(dept, dest);
        if (services.length === 0)  return [];

        const detailedServices: DetailedService[] = await Promise.all(services.map( async (service: Service) => {
            const formattedDate = service.runDate.toString().replaceAll("-", "/");
            const detailedService = await getServiceDetail(service.serviceUid, formattedDate)
            return {
                ...service,
                detail: detailedService,
            }
        }));
        return detailedServices.filter(ds => ds.detail !== null);
    } catch(error) {
        console.log(error);
        return [];
    }
}