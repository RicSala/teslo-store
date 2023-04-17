import { Box, Button } from "@mui/material";

export const SizeSelector = ({selectedSize, sizes}) => {

    console.log("FROM SELECTRO", sizes)
  return (
    <Box>
        {
            sizes.map((size) => {
                return (
                <Button
                key={size}
                size="small"
                color = {selectedSize === size ? "primary" : "info"}
                > {size}
                </Button>

                )
            })
        }
    </Box>
  )};