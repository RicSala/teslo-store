import { Box, Button, FormControl, Grid, InputLabel, Select, TextField, Typography } from "@mui/material";
import { ShopLayout } from "../../../components/layout";

const AddressPage = (props) => {
  return (
    <ShopLayout title={"Checkout"} pageDescription={"Confirma dirección de destino"}>

        <Typography variant="h1" component={"h1"}>Dirección</Typography>
            <Grid container spacing={2} mt={2}>
                <Grid item xs={12} sm={6}>
                    <TextField label="Nombre" variant="filled" fullWidth/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="Apellido" variant="filled" fullWidth/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="Dirección" variant="filled" fullWidth/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="Dirección 2 (Opcional)" variant="filled" fullWidth/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="Código Postal" variant="filled" fullWidth/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="Ciudad" variant="filled" fullWidth/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                    <Select
                        variant="filled"
                        label="País"
                        value={1}
                    >
                        <option value={1}>Argentina</option>
                        <option value={2}>Brasil</option>
                        <option value={3}>Chile</option>
                        <option value={4}>Colombia</option>

                    </Select>

                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="Teléfono" variant="filled" fullWidth/>
                </Grid>
            </Grid>

            <Box mt={5} display={'flex'} flexDirection={'row'} justifyContent={'center'}>
                <Button color="secondary" className="circular-btn" size="large" fullWidth>
                    Revisar Pedido
                </Button>
            </Box>
      
    </ShopLayout>
  )};

export default AddressPage;