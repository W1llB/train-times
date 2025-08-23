import * as React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { Location, LocationElement } from '@/interfaces/interfaces';
import { Accordion, AccordionDetails, AccordionSummary, List, ListItem, ListItemText } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useEffect, useState } from 'react';
import StationStops from './StationStops';


interface Props {
    journey: Location;
    depStation: string;
    arrStation: string;
}

export default function ServiceCard({journey, depStation, arrStation}: Props) {
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
    useEffect(() => {
        retrieveStops();
        console.log("journey", journey);
        setServiceDetail(journey["locations"].find(location => location["crs"] === depStation));
    }, [journey]);

    return (
        <Card variant="outlined" sx={{ maxWidth: 360 }}>
            {serviceDetail &&
            <div>
            <Box sx={{ p: 1 }}>
            <Stack
                direction="row"
                sx={{ justifyContent: 'space-between', alignItems: 'center' }}
            >
                <Typography gutterBottom variant="h5" component="div">
                {journey["destination"][0]["description"]}
                </Typography>
                <Typography gutterBottom variant="subtitle2" component="div" marginBottom={2} marginLeft={2}>
                {serviceDetail["realtimeDeparture"]}
                </Typography>
            </Stack>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Platform: {serviceDetail["platform"]}
            <br></br>
            Arrival at {arrStation}: {serviceDetail["destination"][0]["publicTime"]}
            </Typography>
            </Box>
            <Divider />
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
        </div>}
        </Card>
    );
}