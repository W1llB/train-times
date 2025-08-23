import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TrainIcon from '@mui/icons-material/Train';
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded';
import { LocationElement } from '@/interfaces/interfaces';

interface StationStopsProps {
    stops: LocationElement[];
}

const StationStops: React.FC<StationStopsProps> = ({ stops }) => (
    <List>
        {stops.map((stop, idx) => (
            <ListItem key={idx}>
                <ListItemIcon>
                    {(idx === 0 || idx === stops.length - 1) ?<TrainIcon/> : <PlaceRoundedIcon/>}
                </ListItemIcon>
                <ListItemText
                    primary={stop.description}
                    secondary={stop.displayAs === "ORIGIN" ? stop.realtimeDeparture: stop.realtimeArrival}
                />
            </ListItem>
        ))}
    </List>
);

export default StationStops;