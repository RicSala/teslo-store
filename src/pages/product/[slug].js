import { Box, Button, Chip, Grid, Typography } from "@mui/material";
import { ShopLayout } from "../../../components/layout";
import { ProductSlideshow, SizeSelector } from "../../../components/products";
import { ItemCounter } from "../../../components/ui";
import { dbProducts } from "../../../database";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { CartContext } from "../../../context";


const ProductPage = ({product}) => {
  
  const router = useRouter();
  // TODO: we don't do these because this would load the data on the client side after first render
  // 
  // const router = useRouter();
  // // get slug from the router
  // const { slug } = router.query;
  // // find the product using the useProducts hook
  // const { products } = useProducts(`/products/${slug}`);

  const { addProductToCart } = useContext(CartContext)

  const [tempCartProduct, setTempCartProduct] = useState({
    id: product._id,
    image: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1
  })

  const onSelectSize = (size) => {
    console.log("size", size)
    setTempCartProduct( currentProduct => ({
      ...currentProduct,
      size
    }))
  }

  const updateQuantity = (quantity) => {

    setTempCartProduct( currentProduct => ({
      ...currentProduct,
      quantity
    }))
  }


  const onAddToCart = () => {
    if (!tempCartProduct.size) {
      return;
    }
    addProductToCart(tempCartProduct)
    updateQuantity(1)
    router.push("/cart")
  }
  

  return (

    <ShopLayout title={product.title} pageDescription={product.description} >

      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
        <ProductSlideshow images={product.images} />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Box
            display={"flex"}
            flexDirection={"column"}

          >
            <Typography variant="h1" component={'h1'}> {product.title} </Typography>
            <Typography variant="h1" component={'h1'}> {product.inStock} </Typography>
            <Typography variant="subtitle1" component={'h2'}> ${product.price} </Typography>

            <Box sx={{ my: 2}}>
              <Typography variant="subtitle2">Cantidad</Typography>

              <ItemCounter count={tempCartProduct.quantity} updateQuantity={updateQuantity} maxValue={product.inStock}/>

              <SizeSelector sizes={product.sizes} selectedSize={tempCartProduct.size} onSelectSize={onSelectSize}/>
            </Box>


            {/* Add to cart */}

            {
              product.inStock > 0 ?
              (
            <Button color="secondary" className="circular-btn"
            onClick={onAddToCart}
            >
                {
                  tempCartProduct.size ?
                  "Agregar al carrito" :
                  "Selecciona un tamaño"
                }
            </Button>
              ) : 
            <Chip label="No hay disponibles" color="error" variant="outlined" />
            }


            {/* Description */}
            <Box sx={{ my: 3}}>
              <Typography variant="subtitle2">Descripción</Typography>
              <Typography variant="body2">{product.description}</Typography>
            </Box>

          </Box>
        </Grid>
      </Grid>

    </ShopLayout>
  )};

export default ProductPage;

// // NOT THIS OPTION HERE! Implementing server side props, each time the user comes here, our server is gonna "work"
// export async function getServerSideProps(context) {

  
//   const { slug } = context.params;
  
//   const product = await dbProducts.getProductBySlug(slug);


//   // how does this work? magic?
//   if (!product) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       }
//     }
//   }

//   return {
//     props: {
//       product
//     },
//   }}



export async function getStaticPaths() {

  const slugs = await dbProducts.getAllProductSlugs()

  const params = slugs.map(e => ({ params: { slug: e.slug } }))

  return {
    paths: params,
    fallback: 'blocking', // can also be true or false
  }
}

// get static props
export const getStaticProps = async (ctx) => {

  const { slug = '' } = ctx.params;

  const product = await dbProducts.getProductBySlug(slug);

  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }



  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24 // 24 hours
  }
}