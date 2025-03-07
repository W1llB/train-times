import * as React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { Service } from '@/interfaces/interfaces';

interface Props {
    journey: Service
}

export default function ServiceCard({journey}: Props) {

    return (
        <Card variant="outlined" sx={{ maxWidth: 360 }}>
            <Box sx={{ p: 2 }}>
            <Stack
                direction="row"
                sx={{ justifyContent: 'space-between', alignItems: 'center' }}
            >
                <Typography gutterBottom variant="h5" component="div">
                {journey["locationDetail"]["destination"][0]["description"]}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                {journey["locationDetail"]["realtimeDeparture"]}
                </Typography>
            </Stack>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Expected Platform: {journey["locationDetail"]["platform"]}
            <br></br>
            Expected arrival: {journey["locationDetail"]["destination"][0]["publicTime"]}
            </Typography>
            </Box>
            <Divider />
            <Box sx={{ p: 2 }}>
                <Typography gutterBottom variant="body2">
                {journey["atocName"]}
                </Typography>
                <Stack direction="row" spacing={1}>
                <Chip color="primary" label="Soft" size="small" />
                <Chip label="Medium" size="small" />
                <Chip label="Hard" size="small" />
                </Stack>
            </Box>
        </Card>
    );
}