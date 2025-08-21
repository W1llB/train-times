
import ServiceCard from "@/components/ServiceCard/ServiceCard";
import DestinationToggleButton from "@/components/DestinationToggleButton/DestinationToggleButton";
import { Location } from "@/interfaces/interfaces";
import getJourneys from "@/modules/getJourney/getJourneys"
import { useEffect, useState } from "react";

export default function Will() {
    const home = "MAC";
    const dest = "MAN";
    const [route, setRoute] =  useState<[dep: string, arr: string]>([home, dest]);
    const [journeys, setJourneys] = useState<Location[]>([])
    const [toggleAlignment, setToggleAlignment] = useState(route[0]);


    useEffect(() => {
        const getResults = async () => {
            const services = await getJourneys(route[0], route[1]);
            setJourneys(services);
        }
        getResults()
    }, [route])

    const handleToggleChange = (
        event: React.MouseEvent<HTMLElement>,
        newToggleAlignment: string,
    ) => {
        setToggleAlignment(newToggleAlignment);
        setRoute([route[1], route[0]] = [route[1], route[0] ]);
    };

    return (<div>
        <h1>Will</h1>
        <DestinationToggleButton toggleAlignment={toggleAlignment} handleToggleChange={handleToggleChange} route={[home, dest]}/>
        {true &&
            <h2>{route[0]} &rarr; {route[1]}</h2>
        }
        {journeys.length > 0 &&
        journeys.map((journey: Location) => {
            return (<div key={journey["serviceUid"]}>
                    <ServiceCard journey={journey} depStation={route[0]}></ServiceCard>
                    </div>
            )
            })
    }
        </div>)
}