import { Divider, Grid, Typography } from "@mui/material";
import { CartContext } from "../../context";
import { useContext } from "react";
import { currency } from "../../utils";

export const OrderSummary = ({ summaryItems }) => {

    const cartContext = useContext(CartContext);

    const {
        numberOfItems,
        subtotal,
        tax,
        total,
    } = summaryItems ? summaryItems : cartContext;

    // const {
    //     numberOfItems,
    //     subtotal, 
    //     tax,
    //     total
    // } = useContext(CartContext)

    return (
        <Grid container>
            <Grid item xs={6}>
                <Typography>No. Productos</Typography>
            </Grid>
            <Grid item xs={6} display={'flex'} justifyContent={'end'}>
                <Typography> {numberOfItems} </Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography>Subtotal</Typography>
            </Grid>
            <Grid item xs={6} display={'flex'} justifyContent={'end'}>
                <Typography>{currency.format(subtotal)}</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography>Impuestos ({(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%)</Typography>
            </Grid>
            <Grid item xs={6} display={'flex'} justifyContent={'end'}>
                <Typography>{currency.format(tax)}</Typography>
            </Grid>

            <Grid item xs={6} sx={{ mt: 2 }}>
                <Typography variant="subtitle1">Total</Typography>
            </Grid>
            <Grid item xs={6} display={'flex'} justifyContent={'end'} sx={{ mt: 2 }}>
                <Typography>{currency.format(total)}</Typography>
            </Grid>

        </Grid>
    )
};