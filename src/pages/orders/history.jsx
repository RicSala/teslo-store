import { Chip, Grid, Link, Typography } from "@mui/material";
import { ShopLayout } from "../../../components/layout";
import { DataGrid } from '@mui/x-data-grid';
import NextLink from "next/link";

const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'fullName', headerName: 'Nombre completo', width: 150 },
    {
        field: 'paid', headerName: 'Pagada', description: 'Muestra si la orden está pagada o no', width: 150,

        renderCell: (params) => {
            return (
                params.row.paid ?
                    <Chip color="success" label="Pagada" variant="outlined" /> :
                    <Chip color="error" label="No pagada" variant="outlined" />
            )
        }

    },
    {
        field: 'link', headerName: 'Ver', width: 150, sortable: false,
        renderCell: (params) => {
            return (

                <NextLink href={`/orders/${params.row.id}`} passHref>
                    <Link component={'span'} underline="always">Ver</Link>
                </NextLink>
            )
        }
    },
];

const rows = [
    { id: 1, paid: true, fullName: 'Juan Perez' },
    { id: 2, paid: true, fullName: 'Maria Lopez' },
    { id: 3, paid: false, fullName: 'Pedro Gomez' },
    { id: 4, paid: true, fullName: 'Jose Rodriguez' },
    { id: 5, paid: false, fullName: 'Ana Martinez' },
]



const HistoryPage = (props) => {
    return (
        <ShopLayout title={'Historial de pedidos'} pageDescription={'Historial de pedidos del cliente'}>
            <Typography variant="h1" component={'h1'}>Historial de pedidos</Typography>
            <Grid container>
                <Grid item xs={12} sx={{ height: 550, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                    />
                </Grid>
            </Grid>
        </ShopLayout>
    )
};

export default HistoryPage;