
import ServiceCard from "./ServiceCard";
import DestinationToggleButton from "./DestinationToggleButton";
import { Location } from "@/interfaces/interfaces";
import getJourneys from "@/modules/getJourney/getJourneys"
import { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";

interface RoutePageProps {
    destination: string;
    origin: string;
    title: string;
}

export default function RoutePage({destination, origin, title}: RoutePageProps) {
    const [route, setRoute] =  useState<[dep: string, arr: string]>([origin, destination]);
    const [journeys, setJourneys] = useState<Location[]>([])
    const [toggleAlignment, setToggleAlignment] = useState(route[0]);
    const [loading, setLoading] = useState(true);

    const getResults = async () => {
        const services = await getJourneys(route[0], route[1]);
        setJourneys(services);
    }
    useEffect(() => {
        setLoading(true);

        getResults()
        setLoading(false);
    }, [route])

    const handleToggleChange = (
        event: React.MouseEvent<HTMLElement>,
        newToggleAlignment: string,
    ) => {
        setToggleAlignment(newToggleAlignment);
        setRoute([route[1], route[0]] = [route[1], route[0] ]);
        
    };

    return (<Box display="flex" flexDirection="column" alignItems="center">
        <h1>{title}</h1>
        <DestinationToggleButton toggleAlignment={toggleAlignment} handleToggleChange={handleToggleChange} route={[origin, destination]}/>
        <h2>{route[0]} &rarr; {route[1]}</h2>
        {(loading ?
            <CircularProgress/>
            : journeys.map((journey: Location) => {
                return (<div key={journey["serviceUid"]}>
                        <ServiceCard journey={journey} depStation={route[0]} arrStation={route[1]}></ServiceCard>
                        </div>
                )
            })
        )
        }
        </Box>)
}