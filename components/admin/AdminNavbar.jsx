import {
    AppBar,
    Box,
    Button,
    Link,
    Toolbar,
    Typography
} from "@mui/material"
import NextLink from "next/link"
import { useContext, useEffect, useRef } from "react"
import { UIContext } from "../../context"






export const AdminNavbar = () => {


    const { toggleSideMenu, isMenuOpen } = useContext(UIContext)

    const inputRef = useRef();

    useEffect(() => {
        if (isMenuOpen) {
            setTimeout(() => {
                if (inputRef.current) {
                    const innerInputElement = inputRef.current.querySelector('input'); // if it has loaded...
                    if (innerInputElement) {
                        innerInputElement.focus(); // ...focus it
                    }
                }
            }, 100); // Adjust the delay as needed
        }
    }, [isMenuOpen]);

    /// ************* SEARCH BAR LOGIC END ************* ///


    return (
        <AppBar>
            <Toolbar>
                <NextLink
                    href="/"
                    passHref
                    style={{ textDecoration: "none" }}
                    className="nav-link"
                >
                    <Link component={"span"} display="flex" alignItems="center">
                        <Typography variant="h6"> Teslo | </Typography>
                        <Typography sx={{ ml: 0.5 }}>Shop </Typography>
                    </Link>
                </NextLink>

                <Box flex={1} /> {/* this is a spacer */}

                <Button onClick={toggleSideMenu}> Menú </Button>
            </Toolbar>
        </AppBar>
    )
}
