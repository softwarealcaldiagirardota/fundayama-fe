/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Button,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  CircularProgress,
  FormControlLabel,
  TablePagination,
  Tooltip,
  RadioGroup,
  Radio,
  FormControl,
  FormLabel,
  AppBar,
  Toolbar,
} from "@mui/material";
import { Visibility, Save, Clear } from "@mui/icons-material";
import { useAuth0 } from "@auth0/auth0-react";

const InscriptionTable = () => {
  const [data, setData] = useState([]); // Datos mostrados en la tabla
  const [originalData, setOriginalData] = useState([]); // Datos originales para restablecer filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("");
  const [receiptFilter, setReceiptFilter] = useState("");
  const [kitFilter, setKitFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editedRows, setEditedRows] = useState<any>({});
  const { logout } = useAuth0();
  const { getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState<string | null>(null);

  const getToken = async () => {
    try {
      let token = await getAccessTokenSilently();
      if (!token) {
        token = localStorage.getItem("token") || "";
      }
      const newToken = `Bearer ${token}`;

      setToken(newToken);
      if (newToken) fetchData(newToken);
    } catch (error) {
      console.log("***error", error);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  // Función para obtener los datos iniciales
  const fetchData = async (newToken: string) => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://formsdev-80c60f7ad205.herokuapp.com/api/internal/inscription?limit=2000&offset=0",
        {
          headers: {
            Authorization: newToken,
          },
        }
      );
      setData(response.data);
      setOriginalData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
      setLoading(false);
    }
  };

  const exportToExcel = () => {
    const worksheet = utils.json_to_sheet(data); // Convierte los datos en una hoja de cálculo
    const workbook = utils.book_new(); // Crea un nuevo libro de trabajo
    utils.book_append_sheet(workbook, worksheet, "Inscripciones"); // Agrega la hoja
    writeFile(workbook, "inscripciones.xlsx"); // Guarda el archivo
  };

  // Función para obtener los datos filtrados
  const getFilteredData = () => {
    let filteredData =
      Object.keys(editedRows).length > 0 ? [...data] : [...originalData];

    if (paymentFilter !== "") {
      const paymentValue = paymentFilter === "true";
      filteredData = filteredData.filter(
        (item: any) => item.payment_confirmation === paymentValue
      );
    }

    if (receiptFilter !== "") {
      if (receiptFilter === "initial") {
        filteredData = filteredData.filter(
          (item: any) => item.object_receipt === "initial"
        );
      } else {
        filteredData = filteredData.filter(
          (item: any) => item.object_receipt !== "initial"
        );
      }
    }

    if (kitFilter !== "") {
      const kitValue = kitFilter === "true";
      filteredData = filteredData.filter(
        (item: any) =>
          item.kit_delivered === kitValue ||
          item.special_invitation === kitValue
      );
    }

    if (searchTerm) {
      filteredData = filteredData.filter(
        (item: any) =>
          (item.names &&
            item.names.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.last_name &&
            item.last_name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    return filteredData;
  };

  // Función para restablecer los filtros
  const resetFilters = () => {
    setPaymentFilter("");
    setReceiptFilter("");
    setKitFilter("");
    setSearchTerm("");
  };

  // Función para manejar la edición de campos
  const handleEdit = (id: any, field: any, value: any) => {
    setData((prevData: any) =>
      prevData.map((item: any) => {
        if (item.id === id) {
          return { ...item, [field]: value };
        }
        return item;
      })
    );
    setEditedRows((prev: any) => ({
      ...prev,
      [id]: true,
    }));
  };

  // Función para guardar los cambios
  const handleSave = async (row: any) => {
    const updatedRow = {
      country_prefix: row.country_prefix,
      cell_phone: row.cell_phone,
      eps: row.eps,
      blood_group_and_rh: row.blood_group_and_rh,
      full_address: row.full_address,
      emergency_contact_name: row.emergency_contact_name,
      emergency_contact_phone: row.emergency_contact_phone,
      age: row.age,
      special_invitation: row.special_invitation,
      kit_send: row.kit_send,
      kit_transfer: row.kit_transfer,
      kit_delivered: row.kit_delivered,
      observations: row.observations,
      payment_confirmation: row.payment_confirmation,
      object_receipt: row.object_receipt,
    };

    try {
      const response = await axios.put(
        `https://formsdev-80c60f7ad205.herokuapp.com/api/internal/inscription/${row.document}`,
        updatedRow,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      if (response.status === 200) {
        setDialogMessage("Datos actualizados correctamente.");
        setDialogOpen(true);
        setEditedRows((prev: any) => {
          const newEditedRows = { ...prev };
          delete newEditedRows[row.id];
          return newEditedRows;
        });
      } else {
        setDialogMessage(
          "Hubo un error al actualizar. Por favor, contacte con soporte."
        );
        setDialogOpen(true);
      }
    } catch (error) {
      console.error("Error al actualizar los datos:", error);
      setDialogMessage(
        "Hubo un error al actualizar. Por favor, contacte con soporte."
      );
      setDialogOpen(true);
    }
  };

  // Función para descargar el comprobante
  const handleDownloadReceipt = async (objectReceiptId: any) => {
    try {
      const response = await axios.get(
        `https://formsdev-80c60f7ad205.herokuapp.com/api/media/${objectReceiptId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.status === 200) {
        const { presigned_url } = response.data;
        const link = document.createElement("a");
        link.href = presigned_url;
        link.download = `comprobante_${objectReceiptId}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        alert("No fue posible encontrar un comprobante.");
      }
    } catch (error) {
      console.error("Error al descargar el comprobante:", error);
      alert("No fue posible encontrar un comprobante.");
    }
  };

  // Funciones para la paginación
  const handleChangePage = (_event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Renderización del componente
  return (
    <div style={{ padding: "20px", marginTop: "70px" }}>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <>
          <AppBar position="absolute">
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="go back"
              ></IconButton>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, textAlign: "center" }}
              >
                Camina, Corre & Tócate
              </Typography>
              <Button color="inherit" onClick={() => logout()}>
                Cerrar Sesión
              </Button>
            </Toolbar>
          </AppBar>
          <Button
            variant="contained"
            onClick={exportToExcel}
            color="inherit"
            style={{
              marginBottom: "20px",
              marginRight: "20px",
              position: "absolute",
              top: "100px",
              right: "50px",
            }}
          >
            Exportar a Excel
          </Button>
          <Typography variant="h6" gutterBottom>
            Gestionar inscripciones
          </Typography>
          <Typography
            mt={4}
            sx={{
              color: "black",
              fontSize: "18px",
              textAlign: "left",
            }}
          >
            Filtros
          </Typography>
          <div
            style={{
              marginBottom: "20px",
            }}
          >
            {/* Filtros */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                marginTop: "20px",
                border: "1px solid grey",
                padding: "20px",
                justifyContent: "space-between",
                alignItems: "center",
                borderRadius: "8px",
              }}
            >
              {/* Filtro por confirmación de pago */}
              <FormControl component="fieldset">
                <FormLabel component="legend">Confirmación de Pago</FormLabel>
                <RadioGroup
                  row
                  value={paymentFilter}
                  onChange={(e) => setPaymentFilter(e.target.value)}
                >
                  <FormControlLabel
                    value="true"
                    control={<Radio />}
                    label="Sólo confirmados"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label="Sólo no confirmados"
                  />
                  <FormControlLabel
                    value=""
                    control={<Radio />}
                    label="Todos"
                  />
                </RadioGroup>
              </FormControl>

              {/* Filtro por comprobante */}
              <FormControl component="fieldset" style={{ marginRight: "20px" }}>
                <FormLabel component="legend">Comprobante</FormLabel>
                <RadioGroup
                  row
                  value={receiptFilter}
                  onChange={(e) => setReceiptFilter(e.target.value)}
                >
                  <FormControlLabel
                    value="initial"
                    control={<Radio />}
                    label="Sin comprobante"
                  />
                  <FormControlLabel
                    value="filled"
                    control={<Radio />}
                    label="Con comprobante"
                  />
                  <FormControlLabel
                    value=""
                    control={<Radio />}
                    label="Todos"
                  />
                </RadioGroup>
              </FormControl>

              {/* Filtro por kit entregado o invitación especial */}
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  Kit o Invitación Especial
                </FormLabel>
                <RadioGroup
                  row
                  value={kitFilter}
                  onChange={(e) => setKitFilter(e.target.value)}
                >
                  <FormControlLabel
                    value="true"
                    control={<Radio />}
                    label="Sí"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label="No"
                  />
                  <FormControlLabel
                    value=""
                    control={<Radio />}
                    label="Todos"
                  />
                </RadioGroup>
              </FormControl>
              <Button
                variant="contained"
                color="secondary"
                onClick={resetFilters}
                startIcon={<Clear />}
                style={{ marginTop: "20px" }}
              >
                Limpiar Filtros
              </Button>
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                marginTop: "20px",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  color: "black",
                  fontSize: "18px",
                  textAlign: "left",
                }}
              >
                Buscar por nombre o apellido:
              </Typography>
              {/* Input de búsqueda */}
              <TextField
                label="Buscar..."
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginLeft: "20px", width: "300px" }}
              />
            </div>
          </div>

          {/* Tabla con los datos */}
          <TableContainer
            component={Paper}
            sx={{ maxHeight: 600, overflowX: "auto" }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Documento</TableCell>
                  <TableCell>Tipo Documento</TableCell>
                  <TableCell>Nombres</TableCell>
                  <TableCell>Apellidos</TableCell>
                  <TableCell>Género</TableCell>
                  <TableCell>Talla Camiseta</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Prefijo País</TableCell>
                  <TableCell>Celular</TableCell>
                  <TableCell>EPS</TableCell>
                  <TableCell>Grupo Sanguíneo</TableCell>
                  <TableCell>Dirección</TableCell>
                  <TableCell>Contacto Emergencia</TableCell>
                  <TableCell>Teléfono Emergencia</TableCell>
                  <TableCell>Edad</TableCell>
                  <TableCell>Invitación Especial</TableCell>
                  <TableCell>Kit Enviado</TableCell>
                  <TableCell>Kit Transferido</TableCell>
                  <TableCell>Kit Entregado</TableCell>
                  <TableCell>Observaciones</TableCell>
                  <TableCell>Confirmación Pago</TableCell>
                  <TableCell>Comprobante</TableCell>
                  <TableCell>Número Dorsal</TableCell>
                  <TableCell>Categoría</TableCell>
                  <TableCell>Guardar</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {getFilteredData()
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: any) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.document}</TableCell>
                      <TableCell>{row.document_type}</TableCell>
                      <TableCell>{row.names}</TableCell>
                      <TableCell>{row.last_name}</TableCell>
                      <TableCell>{row.gender}</TableCell>
                      <TableCell>{row.shirt_size}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{row.country_prefix}</TableCell>
                      <TableCell>{row.cell_phone}</TableCell>
                      <TableCell>{row.eps}</TableCell>
                      <TableCell>{row.blood_group_and_rh}</TableCell>
                      <TableCell>{row.full_address}</TableCell>
                      <TableCell>{row.emergency_contact_name}</TableCell>
                      <TableCell>{row.emergency_contact_phone}</TableCell>
                      <TableCell>{row.age}</TableCell>
                      <TableCell>
                        <Checkbox
                          checked={row.special_invitation}
                          onChange={(e) =>
                            handleEdit(
                              row.id,
                              "special_invitation",
                              e.target.checked
                            )
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Checkbox
                          checked={row.kit_send}
                          onChange={(e) =>
                            handleEdit(row.id, "kit_send", e.target.checked)
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Checkbox
                          checked={row.kit_transfer}
                          onChange={(e) =>
                            handleEdit(row.id, "kit_transfer", e.target.checked)
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Checkbox
                          checked={row.kit_delivered}
                          onChange={(e) =>
                            handleEdit(
                              row.id,
                              "kit_delivered",
                              e.target.checked
                            )
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          value={row.observations || ""}
                          onChange={(e) =>
                            handleEdit(row.id, "observations", e.target.value)
                          }
                          multiline
                          rows={2}
                          sx={{ width: 200 }}
                        />
                      </TableCell>
                      <TableCell>
                        <Checkbox
                          checked={row.payment_confirmation}
                          onChange={(e) =>
                            handleEdit(
                              row.id,
                              "payment_confirmation",
                              e.target.checked
                            )
                          }
                        />
                      </TableCell>
                      <TableCell>
                        {row.object_receipt !== "initial" ? (
                          <Tooltip title="Ver comprobante">
                            <IconButton
                              onClick={() =>
                                handleDownloadReceipt(row.object_receipt)
                              }
                            >
                              <Visibility />
                            </IconButton>
                          </Tooltip>
                        ) : (
                          "Sin comprobante"
                        )}
                      </TableCell>
                      <TableCell>{row.dorsal_number}</TableCell>
                      <TableCell>{row.category}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<Save />}
                          onClick={() => handleSave(row)}
                          disabled={!editedRows[row.id]}
                        >
                          Guardar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Paginación */}
          <TablePagination
            component="div"
            count={getFilteredData().length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />

          {/* Diálogo de confirmación */}
          <Dialog
            open={dialogOpen}
            onClose={() => {
              resetFilters();
              getToken();
              setDialogOpen(false);
            }}
          >
            <DialogTitle>Actualización</DialogTitle>
            <DialogContent>
              <Typography>{dialogMessage}</Typography>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  resetFilters();
                  getToken();
                  setDialogOpen(false);
                }}
                color="primary"
              >
                Cerrar
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default InscriptionTable;
