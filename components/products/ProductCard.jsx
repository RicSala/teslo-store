import { Box, Card, CardActionArea, CardMedia, Grid, Link, Typography } from "@mui/material";
import NextLink from "next/link";
import { useMemo, useState } from "react";

export const ProductCard = ({product}) => {

const [isHovered, setIsHovered] = useState(false);


const productImage = useMemo(() => {
    if (isHovered) {
      return `products/${product.images[1]}`;
    }
    return `products/${product.images[0]}`;
}, [product.images, isHovered]);
// useMemo is a hook that returns a value that is memoized


  return (
  
  
  <Grid item 
    xs={12} 
    sm={6} 
    md={4} 
    lg={3}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    >
    <Card>
        <CardActionArea>
          <NextLink href="product/slug" passHref prefetch={false}>
            <Link component={"div"} >

              <CardMedia
                  component="img"
                  image={productImage}
                  alt={product.title}
                  className="fadeIn"
                  // onLoad={() => setIsHovered(false)} // so we can add a loading spinner
              >
              {/* another way to do it would be... */}
              {/* <CardMedia
                  component="img"
                  image={ isHovered ? `products/${product.images[1]}` : `products/${product.images[0]}`}
                  alt={product.title}
                  className="fadeIn"
                  // onLoad={() => setIsHovered(false)} // so we can add a loading spinner
              > */}
                  
              </CardMedia>
            </Link>
          </NextLink>
        </CardActionArea>
    </Card>
    <Box
    sx={{ mt: 1}} className='fadeIn'>
    <Typography fontWeight={700} >{product.title}</Typography>
    <Typography fontWeight={500}>${product.price}</Typography>

    </Box>
</Grid>
  )};