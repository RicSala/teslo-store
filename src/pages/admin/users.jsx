import { PeopleOutline } from "@mui/icons-material";
import { AdminLayout } from "../../../components/layout";
import { DataGrid } from '@mui/x-data-grid';
import { Grid, MenuItem, Select } from "@mui/material";
import useSWR, { mutate } from "swr";
import { tesloApi } from "../../../api";
import { useEffect, useState } from "react";




const UsersPage = (props) => {

    const [users, setUsers] = useState([]);
    const { data, error, isLoading } = useSWR('/api/admin/users');

    useEffect(() => {
        if (data) setUsers(data)
    }, [data])


    const onRoleChange = async (newRole, id) => {

        // update the role in the state ## This is an alternative to method to using mutate (which is slower)
        const previousUsers = [...users]
        const newUsers = users.map(user => {
            if (user._id === id) {
                return {
                    ...user,
                    role: newRole
                }
            }
            return user
        })

        setUsers(newUsers)

        try {
            await tesloApi.put(`/admin/users/`, { userId: id, role: newRole })

        } catch (error) {
            // if there is an error, revert the state
            setUsers(previousUsers)
            console.log('error changing role', error)
        }


        // update the data from the useSWR hook
        // mutate('/api/admin/users') // we can do it this way or using useState above
    }


    if (isLoading) return <p>Cargando...</p>

    if (error) return <p>Hubo un error</p>

    const columns = [
        { field: 'email', headerName: 'Correo', width: 250 },
        { field: 'name', headerName: 'Nombre', width: 300 },
        {
            field: 'role',
            headerName: 'Rol',
            width: 300,
            renderCell: (params) => {
                return (
                    <Select value={params.row.role}
                        label="Rol"
                        onChange={async (e) => { onRoleChange(e.target.value, params.row.id) }}
                        sx={{ width: 300 }}
                    >
                        <MenuItem value={'user'}>User</MenuItem>
                        <MenuItem value={'admin'}>Admin</MenuItem>

                    </Select>
                )
            }
        },
    ];

    const rows = users.map(user => {
        return {
            id: user._id,
            email: user.email,
            name: user.name,
            role: user.role
        }
    })


    return (
        <AdminLayout title={'Usuarios'} subtitle={'Mantenimiento de usuarios'} icon={<PeopleOutline />}>

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

export default UsersPage;