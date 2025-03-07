
import ServiceCard from "@/components/ServiceCard/ServiceCard";
import { Service, Location } from "@/interfaces/interfaces";
import getJourneys from "@/modules/getJourney/getJourneys"
import { useEffect, useState } from "react";

export default function Will() {
    const [journeys, setJourneys] = useState<Service[]>([])
    const [station, setStation] = useState<Location>()
    useEffect(() => {
        const getResults = async () => {
            const [location, services] = await getJourneys("MAN", "MAC");
            setStation(location);
            setJourneys(services);
        }
        getResults()
    }, [])
    const listServices = journeys.slice(0,4).map((journey: Service) => {
        return (<div key={journey["serviceUid"]}>
                <ServiceCard journey={journey}></ServiceCard>
                </div>
        )
        })
    return (<div>
        <h1>Will</h1>
        {station &&
            <h2>{station["name"]}</h2>
        }
        
        {listServices}
        </div>)
}