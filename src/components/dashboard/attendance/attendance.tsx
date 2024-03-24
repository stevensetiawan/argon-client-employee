import * as React from 'react';
import { Button, CardContent, FormControl, InputLabel } from '@mui/material';
import Card from '@mui/material/Card';
import OutlinedInput from '@mui/material/OutlinedInput';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

export function Attendance(): React.JSX.Element {
  return (
    <Card>
      <CardContent>
        <Grid md={3} container spacing={3}>
          <Grid md={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel>Time In</InputLabel>
              <OutlinedInput readOnly defaultValue="-" label="Time In" name="time_in" />
            </FormControl>
          </Grid>
          <Grid md={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel>Time Out</InputLabel>
              <OutlinedInput readOnly defaultValue="-" label="Time Out" name="time_out" />
            </FormControl>
          </Grid>
          <Grid md={6} xs={12}>
            <Button variant="contained">Absent</Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
