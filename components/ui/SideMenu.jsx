import { AccountCircleOutlined, AdminPanelSettings, CategoryOutlined, ConfirmationNumberOutlined, DashboardOutlined, EscalatorWarningOutlined, FemaleOutlined, LoginOutlined, MaleOutlined, SearchOutlined, VpnKeyOutlined } from "@mui/icons-material";
import { Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext, UIContext } from "../../context";
import { useRouter } from "next/router";

export const SideMenu = () => {




  const router = useRouter();
  const { isMenuOpen, toggleSideMenu } = useContext(UIContext);
  const { isLoggedIn, logoutUser, user } = useContext(AuthContext);

  const [searchTerm, setSearchTerm] = useState('');

  const navigateTo = (path) => {
    router.push(path)
    toggleSideMenu()
  }

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;
    navigateTo(`/search/${searchTerm}`)
  }

  const inputRef = useRef(); // we use it to focus the input element when the menu opens (autoFocus doesn't work)

  useEffect(() => {
    if (isMenuOpen) {
      setTimeout(() => {
        if (inputRef.current) {
          const innerInputElement = inputRef.current.querySelector('input');
          if (innerInputElement) {
            innerInputElement.focus();
          }
        }
      }, 100); // Adjust the delay as needed
    }
  }, [isMenuOpen]);




  return (
    <Drawer
      open={isMenuOpen}
      onClose={toggleSideMenu}
      anchor="right"
    // ModalProps= {{ BackdropProps:  {backdropFilter: "blur(4px)", transition:"all 1s ease-out"} }}
    >
      <Box sx={{ width: 250, paddingTop: 5 }}>
        <List>
          <ListItem>
            <Input
              autoFocus
              type="text"
              placeholder="Buscar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              ref={inputRef}

              // for some reason, on keydown generates several events, so we use onKeyUp
              onKeyUp={(e) => { if (e.key === 'Enter') onSearchTerm() }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={onSearchTerm}
                  >
                    <SearchOutlined />
                  </IconButton>
                </InputAdornment>
              }

            />
          </ListItem>

          {
            isLoggedIn &&
            <>
              <ListItem button >
                <ListItemIcon>
                  <AccountCircleOutlined />
                </ListItemIcon>
                <ListItemText primary={'Perfil'} />
              </ListItem>

              <ListItem button onClick={() => navigateTo('/orders/history')}>
                <ListItemIcon>
                  <ConfirmationNumberOutlined />
                </ListItemIcon>
                <ListItemText primary={'Mis Ordenes'} />
              </ListItem>
            </>
          }

          <ListItem button sx={{ display: { xs: '', sm: 'none' } }}
            onClick={() => navigateTo('/category/men')}
          >
            <ListItemIcon>
              <MaleOutlined />
            </ListItemIcon>
            <ListItemText primary={'Hombres'} />
          </ListItem>

          <ListItem button sx={{ display: { xs: '', sm: 'none' } }}
            onClick={() => navigateTo('/category/women')}
          >
            <ListItemIcon>
              <FemaleOutlined />
            </ListItemIcon>
            <ListItemText primary={'Mujeres'} />
          </ListItem>

          <ListItem button sx={{ display: { xs: '', sm: 'none' } }}
            onClick={() => navigateTo('/category/kid')}
          >
            <ListItemIcon>
              <EscalatorWarningOutlined />
            </ListItemIcon>
            <ListItemText primary={'Niños'} />
          </ListItem>

          {
            isLoggedIn ?
              <ListItem button
                sx={{ display: isLoggedIn ? 'flex' : 'none' }}
                onClick={logoutUser}
              >
                <ListItemIcon>
                  <LoginOutlined />
                </ListItemIcon>
                <ListItemText primary={'Salir'} />
              </ListItem>
              :

              <ListItem button sx={{ display: isLoggedIn ? 'none' : 'flex' }}
                onClick={() => navigateTo(`/auth/login?p=${router.asPath}`)}
              >
                <ListItemIcon>
                  <VpnKeyOutlined />
                </ListItemIcon>
                <ListItemText primary={'Ingresar'} />
              </ListItem>

          }

          {/* Admin */}
          {
            isLoggedIn && user?.role === 'admin' && (

              <>
                <Divider />

                <ListSubheader>Admin Panel</ListSubheader>

                <ListItem button
                  onClick={() => navigateTo('/admin')}>
                  <ListItemIcon>
                    <DashboardOutlined />
                  </ListItemIcon>
                  <ListItemText primary={'Dashboard'} />
                </ListItem>

                <ListItem button >
                  <ListItemIcon>
                    <CategoryOutlined />
                  </ListItemIcon>
                  <ListItemText primary={'Productos'} />
                </ListItem>

                <ListItem button
                  onClick={() => navigateTo('/admin/orders')}>
                  <ListItemIcon>
                    <ConfirmationNumberOutlined />
                  </ListItemIcon>
                  <ListItemText primary={'Ordenes'} />
                </ListItem>

                <ListItem button
                  onClick={() => navigateTo('/admin/users')}>
                  <ListItemIcon>
                    <AdminPanelSettings />
                  </ListItemIcon>
                  <ListItemText primary={'Usuarios'} />
                </ListItem>
              </>
            )
          }




        </List>
      </Box>



    </Drawer>
  )
};