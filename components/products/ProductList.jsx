import { Card, CardActionArea, CardMedia, Grid } from "@mui/material";
import { ProductCard } from ".";

export const ProductList = ({products}) => {
  return (

    <Grid container spacing={4}>
    {
        products.map((product) => (
            <ProductCard product={product} key={product.slug}/>
        ))
    }
</Grid>
      
    
  )};