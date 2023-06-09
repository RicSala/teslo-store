import { Box, Card, CardActionArea, CardMedia, Chip, Grid, Link, Typography } from "@mui/material";
import NextLink from "next/link";
import { useMemo, useState } from "react";

export const ProductCard = ({ product }) => {

  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);


  const productImage = useMemo(() => {
    if (isHovered) {
      return product.images[1];
    }
    return product.images[0];
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
        <NextLink href={`/product/${product.slug}`} passHref prefetch={false}>
          <Link component={"div"} >
            <CardActionArea>

              {
                product.inStock === 0 ?
                  <Chip
                    color="primary"
                    label={"Agotado"}
                    sx={{
                      position: "absolute",
                      zIndex: 1,
                      top: 10,
                      right: 10,
                    }}

                  /> :
                  <></>
              }

              <CardMedia
                component="img"
                image={productImage}
                alt={product.title}
                className="fadeIn"
                onLoad={() => setIsImageLoaded(true)}
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
            </CardActionArea>
          </Link>
        </NextLink>
      </Card>
      <Box
        sx={{ mt: 1, display: isImageLoaded ? 'block' : 'none' }} className='fadeIn' >
        <Typography fontWeight={700} >{product.title}</Typography>
        <Typography fontWeight={500}>${product.price}</Typography>

      </Box>
    </Grid>
  )
};