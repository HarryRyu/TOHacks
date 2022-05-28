import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


export default function Screen() {
    return (
        <Card
            sx={{ height: '100%', width: '350px', display: 'flex', flexDirection: 'column' }}
        >
            <CardContent sx={{ padding: 0 }}>
            <Box
                sx={{
                    width: 350,
                    height: 300,
                    margin: 0,
                    backgroundColor: 'black',

                }}
                />
            </CardContent>
            <CardActions>
            <Grid container>
                <Grid xs={6}>
                    <Button size="medium">View</Button>
                </Grid>
                <Grid xs={6}>
                    <Button size="medium">Edit</Button>
                </Grid>
            </Grid>
            </CardActions>
        </Card>
    )
}
