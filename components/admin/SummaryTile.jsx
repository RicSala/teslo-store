import { CreditCardOffOutlined } from "@mui/icons-material";
import { Card, CardContent, Grid, Typography } from "@mui/material";

export const SummaryTile = ({ title, subtitle, icon }) => {
    return (
        <Grid item xs={12} md={4} lg={3}>
            <Card sx={{ display: 'flex', justifyContent: 'center' }}>
                <CardContent sx={{ width: 50, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {icon}
                </CardContent>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography variant={'h3'}>{title}</Typography>
                    <Typography variant={'caption'}>{subtitle}</Typography>
                </CardContent>
            </Card>
        </Grid>
    )
};