import { AccessTimeOutlined, AttachMoneyOutlined, CategoryOutlined, CreditCardOffOutlined, CreditCardOutlined, DashboardOutlined, GroupOutlined, ProductionQuantityLimitsOutlined } from "@mui/icons-material";
import { AdminLayout } from "../../../components/layout";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import { SummaryTile } from "../../../components/admin";
import useSWR from "swr";
import { useEffect, useState } from "react";

const DashboardPage = (props) => {

    const [timer, setTimer] = useState(30);

    const { data, error, isLoading } = useSWR(`/api/admin/dashboard`, {
        refreshInterval: 30 * 1000
    })
    // when the page is loaded, we start a timer that will update the data every second. Once the timer reaches 0, we start again from 30. When the page is unloaded, we clear the timer.
    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(prev => prev > 0 ? prev - 1 : 30)
        }, 1000);

        return () => {
            clearInterval(interval);
        }
    }, [])

    if (isLoading) return <div>Loading...</div>

    if (error) {
        console.log(error)
        return <div>Error...</div>
    }




    const {
        numberOfOrders,
        paidOrders,
        notPaidOrders,
        numberOfClients,
        numberOfProducts,
        numberOfProductsWithNoInventory,
        numberOfProductsWithLowInventory
    } = data;

    return (
        <AdminLayout
            title={'Dashboard'}
            subtitle={'Estadísticas generales'}
            icon={<DashboardOutlined />}
        >

            <Grid container spacing={2}>

                <SummaryTile
                    title={numberOfOrders}
                    subtitle={'Pedidos totales'}
                    icon={<CreditCardOutlined color='secondary' sx={{ fontSize: 40 }} />}
                />
                <SummaryTile
                    title={paidOrders}
                    subtitle={'Pedidos Pagados'}
                    icon={<AttachMoneyOutlined color='success' sx={{ fontSize: 40 }} />}
                />
                <SummaryTile
                    title={notPaidOrders}
                    subtitle={'Pedidos Pendientes'}
                    icon={<CreditCardOffOutlined color='error' sx={{ fontSize: 40 }} />}
                />
                <SummaryTile
                    title={numberOfClients}
                    subtitle={'Clientes'}
                    icon={<GroupOutlined color='success' sx={{ fontSize: 40 }} />}
                />
                <SummaryTile
                    title={numberOfProducts}
                    subtitle={'Productos'}
                    icon={<CategoryOutlined color='warning' sx={{ fontSize: 40 }} />}
                />
                <SummaryTile
                    title={numberOfProductsWithNoInventory}
                    subtitle={'Sin Existencias'}
                    icon={<CategoryOutlined color='error' sx={{ fontSize: 40 }} />}
                />
                <SummaryTile
                    title={53}
                    subtitle={numberOfProductsWithLowInventory}
                    icon={<ProductionQuantityLimitsOutlined color='warning' sx={{ fontSize: 40 }} />}
                />
                <SummaryTile
                    title={timer}
                    subtitle={'Actualización en:'}
                    icon={<AccessTimeOutlined color='secondary' sx={{ fontSize: 40 }} />}
                />


            </Grid>


        </AdminLayout>
    )
};

export default DashboardPage;