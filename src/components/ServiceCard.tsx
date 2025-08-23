import * as React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { Location, LocationElement } from '@/interfaces/interfaces';
import { Accordion, AccordionDetails, AccordionSummary, List, ListItem, ListItemText, Skeleton } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useEffect, useState } from 'react';
import StationStops from './StationStops';


interface Props {
    arrStation: string;
    depStation: string;
    journey: Location;
    loading: boolean;
}

export default function ServiceCard({arrStation, depStation, journey, loading}: Props) {
    const [serviceDetail, setServiceDetail] = useState<LocationElement>();
    const [stationStops, setStationStops] = useState<LocationElement[]>([]);

    const retrieveStops = () => {
        if(journey) {
            const startIndex = journey["locations"].findIndex(location => location["crs"] === depStation);
            const endIndex = journey["locations"].findIndex(location => location["crs"] === arrStation);
            if (startIndex !== -1) {
                setStationStops(journey["locations"].slice(startIndex, endIndex + 1));
            }
        }
    }
    const isServiceDelayed = () => {
        return serviceDetail?.gbttBookedDeparture !== serviceDetail?.realtimeDeparture;
    }
    useEffect(() => {
        retrieveStops();
        setServiceDetail(journey["locations"].find(location => location["crs"] === depStation));
    }, [journey]);
    const arrivalTime = () => {
            return ( 
            <Typography gutterBottom variant="subtitle2" component="div" marginBottom={2} marginLeft={2}>
                {isServiceDelayed() && <s>{serviceDetail?.gbttBookedDeparture}</s>} {serviceDetail?.realtimeDeparture}
            </Typography>)
    }
    return (
        <Card variant="outlined" sx={{ maxWidth: 360 }}>
            {serviceDetail ? (
            <div>
            <Box sx={{ p: 1 }}>
            <Stack
                direction="row"
                sx={{ justifyContent: 'space-between', alignItems: 'center' }}
            >
                <Typography gutterBottom variant="h5" component="div">
                {journey["destination"][0]["description"]}
                </Typography>
                {arrivalTime()}
            </Stack>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Platform: {serviceDetail["platform"]}
            <br></br>
            Arrival at {arrStation}: {serviceDetail["destination"][0]["publicTime"]}
            </Typography>
            </Box>
            <Accordion>
            <AccordionSummary
            aria-controls="panel1-content"
            id="panel1-header"
            expandIcon={<ArrowDropDownIcon />}
            >
            <Typography component="span">Stops {stationStops.length}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <StationStops stops={stationStops}/>
            </AccordionDetails>
        </Accordion>
        </div>) : <Skeleton variant="rectangular" width={360} height={118} />}
        </Card>
    );
}