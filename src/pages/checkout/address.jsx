import { Box, Button, FormControl, Grid, InputLabel, Select, TextField, Typography } from "@mui/material";
import { ShopLayout } from "../../../components/layout";
import { isValidToken } from "../../../utils/jwt";

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


//   // This was the way it was done before NextJS 12, now we can use middleware
//   // the advantages of using middleware are: 
//   // 1. We can reuse the same code in other pages
//   // 2. The page can be rendered statically, but get confirmation from the server that the user is logged in (this is not possible with getserversideprops  )
//   // when we use serversideprops, the page is rendered upon each request, so we can't use the static optimization
//   export const getServerSideProps = async (context) => {

//       const { token = '' } = context.req.cookies;
//       let isValid = false;

//     try {
//         await isValidToken(token)
//         isValid = true;
//     } catch (error) {
//         console.log("error", error);
//         isValid = false;
//     }

//     if(!isValid) {
//         return {
//             redirect: {
//                 destination: '/auth/login?p=checkout/address',
//                 permanent: false,
//             }
//         }
//     }

//     return {
//         props: {}
//     }
//   }

export default AddressPage;

