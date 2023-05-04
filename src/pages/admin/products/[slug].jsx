// This page is used to edit a product information. It shows a form controlled with the library react-hook-form, using the same name of the fields as the database...
// so it is easy to update the product information. It also validates the data and once the form is submitted, it updates the product in the database using the api route /api/admin/products/[slug]
// and the axios library.

//TODO: "client.js:1 MUI: Too many re-renders. The layout is unstable.TextareaAutosize limits the number of renders to prevent an infinite loop.""

import { AdminLayout } from '../../../../components/layout';
import { DriveFileRenameOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { Box, Button, capitalize, Card, CardActions, CardMedia, Checkbox, Chip, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, ListItem, Paper, Radio, RadioGroup, TextField } from '@mui/material';
import { dbProducts } from '../../../../database';
import { useForm } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import { tesloApi } from '../../../../api';
import { Product } from '../../../../models';
import { useRouter } from 'next/router';


const validTypes = ['shirts', 'pants', 'hoodies', 'hats']
const validGender = ['men', 'women', 'kid', 'unisex']
const validSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']


const ProductAdminPage = ({ product }) => {

    const fileInputRef = useRef(null)

    const router = useRouter()


    const [tagInput, setTagInput] = useState('');
    // create a state to control if the form is being submitted
    const [isSubmitting, setIsSubmitting] = useState(false)

    const { register, handleSubmit, formState: { errors }, setValue, getValues, watch } = useForm({
        defaultValues: {
            title: product.title,
            description: product.description,
            price: product.price,
            inStock: product.inStock,
            slug: product.slug,
            type: product.type,
            gender: product.gender,
            sizes: product.sizes,
            tags: product.tags,
            images: product.images,
            _id: product._id

        }
    })

    const onChangeFile = async (event) => {

        // if there are no files or files does not exist, return
        if (!event.target.files || !event.target.files.length) return

        // // create an array with the property name of each file
        // const files = Array.from(event.target.files).map((file) => file.name)
        // setValue('images', [...getValues('images'), ...files], { shouldValidate: true })
        // Instead of doing it like above, we are going to use formData to upload the images

        try {

            // for every file on the list, create a new formData and console.log the file. Do not transform the list to an array

            // console.log(file)
            for (const file of event.target.files) {
                const formData = new FormData()
                formData.append('image', file)
                const { data } = await tesloApi({
                    method: 'POST',
                    url: '/admin/upload',
                    data: formData
                })

                // if data is undefined or data.message is not url format, return
                if (!data) return

                // otherwise setValue of images to add the image whose url is in the data.message
                setValue('images', [...getValues('images'), data.message], { shouldValidate: true })


            }
        } catch (error) {
            console.log(error)
        }

    }
    const onSubmitForm = async (formData) => {


        // if there are less that two iamges in the form, return
        if (formData.images.length < 2) return alert('You need to upload at least two images')
        setIsSubmitting(true)

        try {

            const { data } = await tesloApi({
                method: formData._id ? 'PUT' : 'POST',
                url: `/admin/products`,
                data: formData
            })


            if (!formData._id) {
                router.replace(`/admin/products/${data.slug}`) //we use replace instead of push so the user can't go back to the form
                // the router replace is not updating the state of the form so we need to update the state of the form manually
                setValue('_id', data._id)
            } else {
                setIsSubmitting(false)
            }

        } catch (error) {
            console.log(error)
            setIsSubmitting(false)
        }

    }

    const onChangeSize = (setValue, getValues, size) => {
        return (e) => {
            if (e.target.checked) {
                setValue('sizes', [...getValues('sizes'), size], { shouldValidate: true });
            } else {
                setValue('sizes', getValues('sizes').filter(s => s !== size), { shouldValidate: true });
            }
        };
    }

    const onDeleteTag = (tag) => {
        // first let's check that this function is being called
        // console.log('delete tag') // perfect, it is working

        // now let's update the value of tags to filter out the tag that we want to delete
        setValue('tags', getValues('tags').filter(t => t !== tag), { shouldValidate: true })


    }

    const onChangeTagValue = (e) => {
        // if the last letter is different than a space, then we are going to update the value of the tagInput
        if (e.target.value.slice(-1) !== ' ') { return setTagInput(e.target.value) }

        if (tagInput === '') return

        if (getValues('tags').includes(tagInput)) return

        setValue('tags', [...getValues('tags'), tagInput.trim().toLowerCase()], { shouldValidate: true })
        setTagInput('')
    }

    // REVIEW: "Observables" and "watch" in react-hook-form
    // this is another way of setting the value of the slug based on the value of the title. Useffect + watch
    // here we are using watch that returns a subscription object that we can use to unsubscribe from the watch
    // the form is not an observable, so we need to use the watch function to watch for changes in the form
    // useEffect(() => {

    //     const suscription =
    //         watch((value, { name, type }) => {
    //             console.log({ value, name, type })
    //         }
    //         )

    //     return () => {
    //         suscription.unsubscribe()
    //     }
    // }, [watch])


    return (
        <AdminLayout
            title={'Producto'}
            subTitle={`Editando: ${product.title}`}
            icon={<DriveFileRenameOutline />}
        >
            <form
                onSubmit={handleSubmit(onSubmitForm)}
            >
                <Box display='flex' justifyContent='end' sx={{ mb: 1 }}>
                    <Button
                        color="secondary"
                        startIcon={<SaveOutlined />}
                        sx={{ width: '150px' }}
                        type="submit"
                    >
                        Guardar
                    </Button>
                </Box>


                <Grid container spacing={2}>
                    {/* Data */}
                    <Grid item xs={12} sm={6}>

                        <TextField
                            multiline={false}

                            label="Título"
                            variant="filled"
                            fullWidth
                            sx={{ mb: 1 }}
                            {...register('title', {
                                required: 'Este campo es requerido',
                                minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                            })}
                            error={!!errors.title}
                            helperText={errors.title?.message}
                            // when this value changes, it will update the value of the the slug field
                            onChange={(e) => setValue('slug', e.target.value.toLowerCase().replace(/ /g, '_'))}
                        />

                        <TextField
                            label="Descripción"
                            variant="filled"
                            fullWidth
                            multiline
                            rows={4}
                            sx={{ mb: 1 }}
                            {...register('description', {
                                required: 'Este campo es requerido',
                                minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                            })}
                            error={!!errors.description}
                            helperText={errors.description?.message}

                        />

                        <TextField
                            multiline={false}

                            label="Inventario"
                            type='number'
                            variant="filled"
                            fullWidth
                            sx={{ mb: 1 }}
                            {...register('inStock', {
                                required: 'Este campo es requerido',
                                min: { value: 0, message: 'Mínimo 0' }
                            })}
                            error={!!errors.inStock}
                            helperText={errors.inStock?.message}

                        />

                        <TextField
                            multiline={false}

                            label="Precio"
                            type='number'
                            variant="filled"
                            fullWidth
                            sx={{ mb: 1 }}
                            {...register('price', {
                                required: 'Este campo es requerido',
                                min: { value: 0, message: 'Mínimo 0' }
                            })}
                            error={!!errors.price}
                            helperText={errors.price?.message}

                        />

                        <Divider sx={{ my: 1 }} />

                        <FormControl sx={{ mb: 1 }}>
                            <FormLabel>Tipo</FormLabel>
                            <RadioGroup
                                row
                                value={getValues('type')}
                                // onChange={(e) => setValue('type', e.target.value)} // this won't work because it doesnt visually update the radio buttons instead we should do the following
                                onChange={(e) => setValue('type', e.target.value, { shouldValidate: true })} // this will update the radio buttons

                            >
                                {
                                    validTypes.map(option => (
                                        <FormControlLabel
                                            key={option}
                                            value={option}
                                            control={<Radio color='secondary' />}
                                            label={capitalize(option)}

                                        />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>

                        <FormControl sx={{ mb: 1 }}>
                            <FormLabel>Género</FormLabel>
                            <RadioGroup
                                row
                                // get the value of the radio buttons
                                value={getValues('gender')}
                                // set the value of the radio buttons when it changes
                                onChange={(e) => setValue('gender', e.target.value, { shouldValidate: true })} // this will update the radio buttons
                            >
                                {
                                    validGender.map(option => (
                                        <FormControlLabel
                                            key={option}
                                            value={option}
                                            control={<Radio color='secondary' />}
                                            label={capitalize(option)}
                                        />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>


                        <FormGroup>
                            <FormLabel>Tallas</FormLabel>
                            {
                                validSizes.map(size => (
                                    <FormControlLabel key={size} control={<Checkbox
                                        checked={getValues('sizes')?.includes(size)}
                                        onChange={onChangeSize(setValue, getValues, size)}
                                    />} label={size} />
                                ))
                            }
                        </FormGroup>


                    </Grid>

                    {/* Tags e imagenes */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            multiline={false}

                            label="Slug - URL"
                            variant="filled"
                            fullWidth
                            sx={{ mb: 1 }}
                            {...register('slug', {
                                required: 'Este campo es requerido',
                                // thie input can only contain letters, numbers, dashes and underscores
                                pattern: { value: /^[a-z0-9_-]+$/, message: 'Solo letras, números, guiones y guiones bajos' },
                                minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                            })}
                            error={!!errors.slug}
                            helperText={errors.slug?.message}
                        />

                        <TextField
                            multiline={false}

                            label="Etiquetas"
                            variant="filled"
                            fullWidth
                            sx={{ mb: 1 }}
                            helperText="Presiona [spacebar] para agregar"
                            // convert this element into a controlled component using state
                            value={tagInput}
                            onChange={onChangeTagValue}
                        />

                        <Box sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            listStyle: 'none',
                            p: 0,
                            m: 0,
                        }}
                            component="ul">
                            {
                                getValues('tags').map((tag) => {

                                    return (
                                        <Chip
                                            key={tag}
                                            label={tag}
                                            onDelete={() => onDeleteTag(tag)}
                                            color="primary"
                                            size='small'
                                            sx={{ ml: 1, mt: 1 }}
                                        />
                                    );
                                })}
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        <Box display='flex' flexDirection="column">
                            <FormLabel sx={{ mb: 1 }}>Imágenes</FormLabel>
                            <Button
                                color="secondary"
                                fullWidth
                                startIcon={<UploadOutlined />}
                                sx={{ mb: 3 }}
                                // this button should open the file input
                                onClick={() => fileInputRef.current?.click()}
                            >
                                Cargar imagen

                                <input // we need this input but we dont want to show it. We will use the button to open it
                                    ref={fileInputRef}
                                    type="file"
                                    multiple
                                    accept="image/png, image/jpeg, image/gif"
                                    hidden
                                    onChange={onChangeFile}
                                />
                            </Button>

                            {
                                // if there are less than 2 images then we will show the chip, otherwise nothing
                                getValues('images').length < 2 &&
                                <Chip
                                    label="Es necesario al 2 imagenes"
                                    color='error'
                                    variant='outlined'
                                />
                            }


                            <Grid container spacing={2}>
                                {
                                    getValues('images').map(img => (
                                        <Grid item xs={4} sm={3} key={img}>
                                            <Card>
                                                <CardMedia
                                                    component='img'
                                                    className='fadeIn'
                                                    image={img}
                                                    alt={img}
                                                />
                                                <CardActions>
                                                    <Button fullWidth color="error"
                                                        // onClick to delete the image from the images array
                                                        // we need to use the setValue function to update the images array
                                                        onClick={() => {
                                                            setValue('images', getValues('images').filter(image => image !== img), { shouldValidate: true })
                                                        }
                                                        }
                                                    >
                                                        Borrar
                                                    </Button>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    ))
                                }
                            </Grid>

                        </Box>

                    </Grid>

                </Grid>
            </form>
        </AdminLayout >
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps = async ({ query }) => {

    const { slug = '' } = query;

    let product

    // if slug is "new-product" then we are creating a new product, so we don't need to fetch data and we can just return an empty product
    if (slug === 'new-product') {
        product = new Product();
        // sanitize the product
        product = JSON.parse(JSON.stringify(product));
        // delete the product Id
        delete product._id;
        //set the images to dummy images while creating a new product
        product.images = ['dummy1.jpg', 'dummy2.jpg'];
        console.log(slug)


    } else {
        product = await dbProducts.getProductBySlug(slug.toString());
    }

    if (!product) {
        return {
            redirect: {
                destination: '/admin/products',
                permanent: false,
            }
        }
    }


    return {
        props: {
            product
        }
    }

}


export default ProductAdminPage


