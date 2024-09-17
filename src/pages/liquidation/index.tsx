import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { url } from '../../utils/utils';
import { jwtDecode } from 'jwt-decode';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  TextField,
  Paper,
  Button,
  CircularProgress,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  TablePagination,
  styled,
  DialogActions,
  DialogTitle,
  DialogContent,
  Dialog,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import SaveIcon from '@mui/icons-material/Save';
import VisibilityIcon from '@mui/icons-material/Visibility';

// Define estilos personalizados
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: '8px',
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  height: '40px',
}));

const Liquidation = () => {
  const { logout, getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [userEmail, setUserEmail] = useState('Usuario');
  const [data, setData] = useState([]);
  const [editableData, setEditableData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openModal, setOpenModal] = useState(false); // Estado para controlar el modal
  const [modalImageUrl, setModalImageUrl] = useState(null); // URL de la imagen para el modal

  useEffect(() => {
    const fetchTokenAndDecode = async () => {
      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently();
          const decodedToken = jwtDecode(token);
          setUserEmail(decodedToken.email || 'Usuario');
          // Fetch data immediately after authentication
          await fetchData(token);
        } catch (err) {
          console.error('Error decodificando el token:', err);
          setUserEmail('Usuario');
        }
      }
    };

    fetchTokenAndDecode();
  }, [isAuthenticated, getAccessTokenSilently]);

  const fetchData = async (token) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${url}/api/internal/inscription?limit=${rowsPerPage}&offset=${page * rowsPerPage}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const result = await response.json();
      console.log('Datos obtenidos:', result);
      setData(result);
      setEditableData(result);
    } catch (error) {
      setError(error?.message || 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (index, field) => {
    const newData = [...editableData];
    const newValue = !newData[index][field];
    newData[index][field] = newValue;
    setEditableData(newData);

    const changeData = {
      rowIndex: index,
      field: field,
      newValue: newValue,
    };
    console.log('Cambio en Checkbox:', JSON.stringify(changeData, null, 2));
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newData = [...editableData];
    newData[index][name] = value;
    setEditableData(newData);

    const changeData = {
      rowIndex: index,
      field: name,
      newValue: value,
    };
    console.log('Cambio en Campo de Entrada:', JSON.stringify(changeData, null, 2));
  };

  const handleSave = () => {
    console.log('Datos guardados:', editableData);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleShowReceipt = (row) => {
    console.log("Mostrando recibo para el ID:", row.id);
  
    // Crear la URL completa para la imagen
    const imageUrl = `${url}/api/media/${row.object_receipt}`;
  
    // Actualizar el estado con la URL de la imagen
    setModalImageUrl(imageUrl);
    console.log(row.object_receipt)
    // Abrir el modal
    setOpenModal(true);
  
    // Imprimir la URL en la consola para verificar
    console.log("URL de la imagen:", imageUrl);
  };
  

  const handleCloseModal = () => {
    setOpenModal(false);
    setModalImageUrl(null);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            ******  
          </Typography>
          <IconButton color="inherit" onClick={() => logout({ returnTo: window.location.origin })}>
            <LogoutIcon />
          </IconButton>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSave}
            startIcon={<SaveIcon />}
            style={{ marginLeft: '16px' }}
          >
            Guardar
          </Button>
        </Toolbar>
      </AppBar>

      <div style={{ padding: '16px' }}>
        {loading && <CircularProgress style={{ marginTop: '16px' }} />}
        {error && <Typography color="error" style={{ marginTop: '16px' }}>Error: {error}</Typography>}
        {data.length > 0 ? (
          <TableContainer component={Paper} style={{ marginTop: '16px' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>ID</StyledTableCell>
                  <StyledTableCell>Tipo Documento</StyledTableCell>
                  <StyledTableCell>Documento</StyledTableCell>
                  <StyledTableCell>Nombres</StyledTableCell>
                  <StyledTableCell>Apellido</StyledTableCell>
                  <StyledTableCell>Fecha Nacimiento</StyledTableCell>
                  <StyledTableCell>Género</StyledTableCell>
                  <StyledTableCell>Tamaño Camisa</StyledTableCell>
                  <StyledTableCell>Email</StyledTableCell>
                  <StyledTableCell>Prefijo País</StyledTableCell>
                  <StyledTableCell>Teléfono</StyledTableCell>
                  <StyledTableCell>EPS</StyledTableCell>
                  <StyledTableCell>Grupo Sanguíneo</StyledTableCell>
                  <StyledTableCell>Dirección</StyledTableCell>
                  <StyledTableCell>Contacto Emergencia</StyledTableCell>
                  <StyledTableCell>Teléfono Emergencia</StyledTableCell>
                  <StyledTableCell>Edad</StyledTableCell>
                  <StyledTableCell>Invitación Especial</StyledTableCell>
                  <StyledTableCell>Kit Enviado</StyledTableCell>
                  <StyledTableCell>Kit Transferido</StyledTableCell>
                  <StyledTableCell>Kit Entregado</StyledTableCell>
                  <StyledTableCell>Observaciones</StyledTableCell>
                  <StyledTableCell>Confirmación de Pago</StyledTableCell>
                  <StyledTableCell>Número Dorsal</StyledTableCell>
                  <StyledTableCell>Comprobante de pago</StyledTableCell>
                  
                </TableRow>
              </TableHead>
              <TableBody>
                {editableData.map((row, index) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell>{row.id}</StyledTableCell>
                    <StyledTableCell>{row.document_type}</StyledTableCell>
                    <StyledTableCell>{row.document}</StyledTableCell>
                    <StyledTableCell>{row.names}</StyledTableCell>
                    <StyledTableCell>{row.last_name}</StyledTableCell>
                    <StyledTableCell>{row.birth_date.split('T')[0]}</StyledTableCell>
                    <StyledTableCell>{row.gender}</StyledTableCell>
                    <StyledTableCell>{row.shirt_size}</StyledTableCell>
                    <StyledTableCell>{row.email}</StyledTableCell>
                    <StyledTableCell>{row.country_prefix}</StyledTableCell>
                    <StyledTableCell>{row.cell_phone}</StyledTableCell>
                    <StyledTableCell>{row.eps}</StyledTableCell>
                    <StyledTableCell>{row.blood_group_and_rh}</StyledTableCell>
                    <StyledTableCell>{row.full_address}</StyledTableCell>
                    <StyledTableCell>{row.emergency_contact_name}</StyledTableCell>
                    <StyledTableCell>{row.emergency_contact_phone}</StyledTableCell>
                    <StyledTableCell>{row.age}</StyledTableCell>
                    <StyledTableCell>
                      <Checkbox
                        checked={row.special_invitation}
                        onChange={() => handleCheckboxChange(index, 'special_invitation')}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <Checkbox
                        checked={row.kit_sent}
                        onChange={() => handleCheckboxChange(index, 'kit_sent')}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <Checkbox
                        checked={row.kit_transferred}
                        onChange={() => handleCheckboxChange(index, 'kit_transferred')}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <Checkbox
                        checked={row.kit_delivered}
                        onChange={() => handleCheckboxChange(index, 'kit_delivered')}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        name="observations"
                        value={row.observations || ''}
                        onChange={(event) => handleInputChange(index, event)}
                        fullWidth
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <Checkbox
                        checked={row.payment_confirmation}
                        onChange={() => handleCheckboxChange(index, 'payment_confirmation')}
                      />
                    </StyledTableCell>
                    <StyledTableCell>{row.dorsal_number}</StyledTableCell>
                    <StyledTableCell>
                      <Button
                        onClick={() => handleShowReceipt(row)}
                        startIcon={<VisibilityIcon />}
                        variant="outlined"
                        color="primary"
                      >
                        Ver Comprobante
                      </Button>
                    </StyledTableCell>


   





                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50]}
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        ) : (
          <Typography>No se encontraron datos.</Typography>
        )}
      </div>

      {/* Modal para mostrar la imagen */}
      <Dialog
  open={openModal}
  onClose={handleCloseModal}
  maxWidth="md"
  fullWidth
>
  <DialogTitle>Comprobante de Pago</DialogTitle>
  <DialogContent>
    {modalImageUrl ? (
      <img src={modalImageUrl} alt="Comprobante de Pago" style={{ width: '100%', height: 'auto' }} />
    ) : (
      <Typography>No se encontró la imagen.</Typography>
    )}
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseModal} color="primary">
      Cerrar
    </Button>
  </DialogActions>
</Dialog>

    </div>
  );
};

export default Liquidation;
