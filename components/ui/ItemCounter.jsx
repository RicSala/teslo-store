import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";

export const ItemCounter = ({count, updateQuantity, maxValue}) => {



  const checkLimitsAndUpdate = (quantity) => {

    if (quantity > maxValue) {
      return; }
  
    if (quantity < 1) {
      return; }

    updateQuantity(quantity)

  }


  return (
    <Box
    display={"flex"}
    alignItems={"center"}

    >
    <IconButton
    onClick={() => 
    {console.log("count", count)
    checkLimitsAndUpdate(count - 1)}}
    >
        <RemoveCircleOutline/>
    </IconButton>
        <Typography sx={{ width:40, textAlign:'center'}}> {count} </Typography>
    <IconButton
    onClick={() => checkLimitsAndUpdate(count + 1)}
    >
        <AddCircleOutline/>
    </IconButton>
    </Box>
  )};