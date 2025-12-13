
import ServiceCard from "./ServiceCard";
import DestinationToggleButton from "./DestinationToggleButton";
import { DetailedService } from "@/interfaces/interfaces";
import { getJourneys } from "@/modules/getJourney/getJourneys"
import { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

interface RoutePageProps {
    destination: string;
    origin: string;
    title: string;
}

export default function RoutePage({destination, origin, title}: RoutePageProps) {
    const [route, setRoute] =  useState<[dep: string, arr: string]>([origin, destination]);
    const [journeys, setJourneys] = useState<DetailedService[]>([])
    const [toggleAlignment, setToggleAlignment] = useState(route[0]);
    const [loading, setLoading] = useState(true);

    const getResults = async () => {
        const journeys = await getJourneys(route[0], route[1]);
        setJourneys(journeys);
    }
    useEffect(() => {
        setLoading(true);
        getResults()
        setLoading(false);
    }, [route, toggleAlignment])
    
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
        {loading &&
            <CircularProgress/>
        }
        {journeys ? journeys.map((journey: DetailedService) => {
                return (<div key={journey["serviceUid"]}>
                        <ServiceCard journey={journey} depStation={route[0]} arrStation={route[1]}></ServiceCard>
                        </div>
                )
            }) : <Typography variant="subtitle2">No services found</Typography>
        }
        </Box>)
}