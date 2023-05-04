import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { ShopLayout } from "../../../components/layout";
import { countries } from "../../../utils";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { CartContext } from "../../../context";
import { useContext, useEffect } from "react";
import { getSession } from "next-auth/react";

// type formData = {
//     firstname: string,
//     lastname: string,
//     address: string,
//     address2: string,
//     zip: string,
//     city: string,
//     country: string,
//     phone: string
// }

// The problem with this is that i will execute on the server side and not on the client side to as the component is rendered on the client side
// const address = Cookies.get('address') ? JSON.parse(Cookies.get('address')) : null
// so we need a function instead, so it can be executed on the client side

const getAddress = () => {

    const { firstname, lastname, address, address2, zip, city, country, phone } = Cookies.get('address') ? JSON.parse(Cookies.get('address')) : {}
    return {
        firstname: firstname || '',
        lastname: lastname || '',
        address: address || '',
        address2: address2 || '',
        zip: zip || '',
        city: city || '',
        country: country || countries[0].code,
        phone: phone || '',
    };
};



const AddressPage = (props) => {

    const { updateAddress } = useContext(CartContext)

    const router = useRouter()


    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({
        defaultValues: {
            ...getAddress()
        }
    });

    const onSubmitAddress = async (data) => {
        const session = await getSession({ req: props.req })
        updateAddress(data)
        router.push('/checkout/summary')
    }

    useEffect(() => {
        reset(getAddress())
    }, [reset])




    return (
        <ShopLayout title={"Checkout"} pageDescription={"Confirma dirección de destino"}>
            <form onSubmit={handleSubmit(onSubmitAddress)}>

                <Typography variant="h1" component={"h1"}>Dirección</Typography>
                <Grid container spacing={2} mt={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Nombre" variant="filled" fullWidth
                            {...register('firstname', { required: 'Este campo es requerido' })}
                            error={!!errors.firstname}
                            helperText={errors.firstname?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Apellido" variant="filled" fullWidth
                            {...register('lastname', { required: 'Este campo es requerido' })}
                            error={!!errors.lastname}
                            helperText={errors.lastname?.message} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Dirección" variant="filled" fullWidth
                            {...register('address', { required: 'Este campo es requerido' })}
                            error={!!errors.address}
                            helperText={errors.address?.message} />

                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Dirección 2 (Opcional)" variant="filled" fullWidth
                            {...register('address2')}
                        />

                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Código Postal" variant="filled" fullWidth
                            {...register('zip', { required: 'Este campo es requerido' })}
                            error={!!errors.zip}
                            helperText={errors.zip?.message} />

                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Ciudad" variant="filled" fullWidth
                            {...register('city', { required: 'Este campo es requerido' })}
                            error={!!errors.city}
                            helperText={errors.city?.message} />

                    </Grid>
                    {/* TODO: Question asked on devtalles. Waiting for response: https://cursos.devtalles.com/courses/take/next/lessons/35656744-mostrar-la-direccion-en-pantalla*/}
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <TextField
                                select
                                variant="filled"
                                label="País"
                                defaultValue={
                                    // getAddress() ?
                                    //     getAddress().country
                                    //     :
                                    countries[0].code
                                }
                                {...register('country', { required: 'Este campo es requerido' })}
                                error={!!errors.country}
                                helperText={errors.country?.message}
                            >
                                {
                                    countries.map((country) => {
                                        return (
                                            <MenuItem key={country.code} value={country.code}>{country.name}</MenuItem>
                                        )
                                    })
                                }

                            </TextField>

                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Teléfono" variant="filled" fullWidth
                            {...register('phone', { required: 'Este campo es requerido' })}
                            error={!!errors.phone}
                            helperText={errors.phone?.message} />
                    </Grid>
                </Grid>

                <Box mt={5} display={'flex'} flexDirection={'row'} justifyContent={'center'}>
                    <Button type="submit" color="secondary" className="circular-btn" size="large" fullWidth>
                        Revisar Pedido
                    </Button>
                </Box>

            </form>


        </ShopLayout >
    )
};


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
//         isValid = false;
//     }

//     if(!isValid) { // if it's not valid, redirect to login page
//         return {
//             redirect: {
//                 destination: '/auth/login?p=checkout/address',
//                 permanent: false,
//             }
//         }
//     }

//     return { // otherwise, let them stay in the page
//     REVIEW: is the page pre loaded before getting server side props?
//         props: {}
//     }
//   }

export default AddressPage;

