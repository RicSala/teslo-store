import { SideMenu } from "../ui"
import { AdminNavbar } from "../admin"
import { Box, Typography } from "@mui/material"

export const AdminLayout = ({
    title,
    subtitle,
    icon,
    children
}) => {
    return (
        <>
            <nav>
                <AdminNavbar />
            </nav>

            <SideMenu />

            <main
                style={{
                    margin: "80px",
                    maxWidth: "1440px",
                    padding: "0 30px"
                }}
            >

                <Box display={'flex'} flexDirection={'column'}>
                    <Typography variant={'h1'} component={'h1'}>
                        {icon}
                        {title}
                    </Typography>

                    <Typography variant={'h2'} component={'h2'} sx={{ mb: 1 }}>
                        {subtitle}
                    </Typography>
                </Box>

                <Box className='fadeIn'>
                    {children}

                </Box>
            </main>
        </>
    )
}