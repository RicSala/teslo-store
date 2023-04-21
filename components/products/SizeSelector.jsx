import { Box, Button } from "@mui/material";

export const SizeSelector = ({selectedSize, sizes, onSelectSize}) => {


  return (
    <Box>
        {
            sizes.map((size) => {
                return (
                <Button
                key={size}
                // change the size of the button if is selected
                size="small"
                variant="contained"

            color={selectedSize === size ? "primary" : "info"} // TODO: THIS IS NOT WORKING
            onClick={() => onSelectSize(size)}
                > {size}
                </Button>

                )
            })
        }
    </Box>
  )};