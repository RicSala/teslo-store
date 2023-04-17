import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography } from "@mui/material";
import { ShopLayout } from "../../../components/layout";
import { CartList, OrderSummary } from "../../../components/cart";
import NextLink from "next/link";

const SummaryPage = () => {
  return (
        <ShopLayout title='Resumen del pedido' pageDescription='Resumen de tu pedido'>
        <Typography variant="h1" component="h1">Resumen del pedido</Typography>
        <Grid container>
            <Grid item xs={12} sm={7}>
                <CartList/>
            </Grid>
            <Grid item xs={12} sm={5}>
                <Card className="summary-card">
                    <CardContent>
                        <Typography variant="h2" component="h2">Resumen (3 productos)</Typography>
                        <Divider sx={{my:1}}/>

                        <Box display={'flex'} justifyContent={'end'}>
                            <NextLink href='/checkout/address' passHref>
                                <Link component={'span'}>Editar</Link>
                            </NextLink>
                        </Box>

                        <Typography variant='subtitle1'>Dirección de entrega</Typography>
                        <Typography variant='body1'>Ricardo Sala</Typography>
                        <Typography variant='body1'>Algún lugar</Typography>
                        <Typography variant='body1'>50012 Zaragoza</Typography>
                        <Typography variant='body1'>España</Typography>
                        <Typography variant='body1'>+24600243843</Typography>

                        <Divider sx={{my:1}}/>

                        <Box display={'flex'} justifyContent={'end'}>
                            <NextLink href='/cart' passHref>
                                <Link component={'span'}>Editar</Link>
                            </NextLink>

                        </Box>
                            <OrderSummary />
                            <Box sx={{mt:3}}>
                                <Button color="secondary" className="circular-btn">
                                    Confirmar Pedido
                                </Button>
        
                            </Box>
                    </CardContent>
    
                </Card>
            </Grid>
        </Grid>
          
        </ShopLayout>
  )};

export default SummaryPage;