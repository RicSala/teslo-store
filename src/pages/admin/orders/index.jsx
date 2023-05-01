import { ConfirmationNumberOutlined } from "@mui/icons-material";
import { AdminLayout } from "../../../../components/layout";
import { Chip, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import useSWR from "swr";


const columns = [
    { field: 'id', headerName: 'Order ID', width: 250 },
    { field: 'email', headerName: 'Correo', width: 200 },
    { field: 'name', headerName: 'Nombre Completo', width: 200 },
    { field: 'total', headerName: 'Total', width: 100 },
    {
        field: 'isPaid', headerName: 'Pagada', width: 100,
        renderCell: (params) => {
            return params.row.isPaid ?
                <Chip label="Pagada" color="success" /> :
                <Chip label="Pendiente" color="warning" />
        }
    },
    { field: 'numberOfItems', headerName: '# Productos', align: 'center', width: 80 },
    {
        field: 'createdAt', headerName: 'Fecha', width: 120,
        // show only the date
        valueFormatter: (params) => {
            return new Date(params.value).toLocaleDateString()
        }

    },
    {
        field: 'check', headerName: 'Ver Orden', width: 80,
        renderCell: (params) => {
            return <a href={`/admin/orders/${params.row.id}`} target="_blank" >Ver</a>
        }
    },
    ,]



const OrdersPage = (props) => {

    const { data, error, isLoading } = useSWR('/api/admin/orders')

    if (isLoading) return <p>Cargando...</p>

    if (error) return <p>Hubo un error</p>

    const rows = data.map(order => {
        return {
            id: order._id,
            email: order.user.email,
            name: order.user.name,
            total: order.total,
            isPaid: order.isPaid,
            numberOfItems: order.numberOfItems,
            createdAt: order.createdAt
        }
    })


    return (
        <AdminLayout title={'Pedidos'} subtitle={'Mantenimiento de pedidos'} icon={<ConfirmationNumberOutlined />}>

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

        </AdminLayout>
    )
};


export default OrdersPage;