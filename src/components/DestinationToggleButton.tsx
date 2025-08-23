import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';


interface Props {
  handleToggleChange: (event: React.MouseEvent<HTMLElement>, newToggleAlignment: string) => void,
  toggleAlignment: string,
  route: string[]
}

export default function DestinationToggleButton({handleToggleChange, toggleAlignment, route}: Props) {

  return (
    <ToggleButtonGroup
      color="primary"
      value={toggleAlignment}
      exclusive
      onChange={handleToggleChange}
      aria-label="Platform"
    >
      <ToggleButton value={route[0]}>{route[0]}</ToggleButton>
      <ToggleButton value={route[1]}>{route[1]}</ToggleButton>
    </ToggleButtonGroup>
  );
}