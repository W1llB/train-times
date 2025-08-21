import * as React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { Location, LocationElement } from '@/interfaces/interfaces';
import { Accordion, AccordionDetails, AccordionSummary, List, ListItem, ListItemText } from '@mui/material';
import { useEffect, useState } from 'react';


interface Props {
    journey: Location;
    depStation: string;
}

export default function ServiceCard({journey, depStation}: Props) {
    const [serviceDetail, setServiceDetail] = useState<LocationElement>();
    const [remainingStationStops, setRemainingStationStops] = useState<LocationElement[]>([]);
    useEffect(() => {
        console.log("journey", journey);
        journey["locations"].forEach((location, index) => {
            if (location["crs"] === depStation) {
                setServiceDetail(location);
                setRemainingStationStops(journey["locations"].slice(index, -1));
                console.log(remainingStationStops);
                return;                
            }
        })
    }, [journey]);
    return (
        <Card variant="outlined" sx={{ maxWidth: 360 }}>
            {serviceDetail && <div>
            <Box sx={{ p: 2 }}>
            <Stack
                direction="row"
                sx={{ justifyContent: 'space-between', alignItems: 'center' }}
            >
                <Typography gutterBottom variant="h5" component="div">
                {journey["destination"][0]["description"]}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                {serviceDetail["realtimeDeparture"]}
                </Typography>
            </Stack>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Expected Platform: {serviceDetail["platform"]}
            <br></br>
            Expected arrival: {serviceDetail["destination"][0]["publicTime"]}
            </Typography>
            </Box>
            <Divider />
            <Accordion>
            <AccordionSummary
            aria-controls="panel1-content"
            id="panel1-header"
            >
            <Typography component="span">Stops {remainingStationStops.length}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <List>
                <ListItem disablePadding>
                <ListItemText primary="Inbox" />
                </ListItem>
                <ListItem disablePadding>
                <ListItemText primary="Drafts" />
                </ListItem>
            </List>
            </AccordionDetails>
        </Accordion>
        </div>}
        </Card>
    );
}