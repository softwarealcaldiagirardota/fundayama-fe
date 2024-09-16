import { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Grid,
  Typography,
  MenuItem,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  useMediaQuery,
  FormControlLabel,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Tooltip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom"; // Para el manejo de navegación
import { StyledContainerActions } from "./styles";
import Actions from "../../components/Actions";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Link as LinkPolitic } from "@mui/material";

const STEPS = {
  options: "OPTIONS",
  information: "INFORMATION",
  image: "IMAGE",
  how: "HOW",
  saved: "SAVED",
};
const countryCodes = [
  "+1",
  "+7",
  "+20",
  "+27",
  "+30",
  "+31",
  "+32",
  "+33",
  "+34",
  "+36",
  "+39",
  "+40",
  "+41",
  "+43",
  "+44",
  "+45",
  "+46",
  "+47",
  "+48",
  "+49",
  "+51",
  "+52",
  "+53",
  "+54",
  "+55",
  "+56",
  "+57",
  "+58",
  "+60",
  "+61",
  "+62",
  "+63",
  "+64",
  "+65",
  "+66",
  "+81",
  "+82",
  "+84",
  "+86",
  "+90",
  "+91",
  "+92",
  "+93",
  "+94",
  "+95",
  "+98",
  "+211",
  "+212",
  "+213",
  "+216",
  "+218",
  "+220",
  "+221",
  "+222",
  "+223",
  "+224",
  "+225",
  "+226",
  "+227",
  "+228",
  "+229",
  "+230",
  "+231",
  "+232",
  "+233",
  "+234",
  "+235",
  "+236",
  "+237",
  "+238",
  "+239",
  "+240",
  "+241",
  "+242",
  "+243",
  "+244",
  "+245",
  "+246",
  "+248",
  "+249",
  "+250",
  "+251",
  "+252",
  "+253",
  "+254",
  "+255",
  "+256",
  "+257",
  "+258",
  "+260",
  "+261",
  "+262",
  "+263",
  "+264",
  "+265",
  "+266",
  "+267",
  "+268",
  "+269",
  "+290",
  "+291",
  "+297",
  "+298",
  "+299",
  "+350",
  "+351",
  "+352",
  "+353",
  "+354",
  "+355",
  "+356",
  "+357",
  "+358",
  "+359",
  "+370",
  "+371",
  "+372",
  "+373",
  "+374",
  "+375",
  "+376",
  "+377",
  "+378",
  "+379",
  "+380",
  "+381",
  "+382",
  "+383",
  "+385",
  "+386",
  "+387",
  "+389",
  "+420",
  "+421",
  "+423",
  "+500",
  "+501",
  "+502",
  "+503",
  "+504",
  "+505",
  "+506",
  "+507",
  "+508",
  "+509",
  "+590",
  "+591",
  "+592",
  "+593",
  "+594",
  "+595",
  "+596",
  "+597",
  "+598",
  "+599",
  "+670",
  "+672",
  "+673",
  "+674",
  "+675",
  "+676",
  "+677",
  "+678",
  "+679",
  "+680",
  "+681",
  "+682",
  "+683",
  "+685",
  "+686",
  "+687",
  "+688",
  "+689",
  "+690",
  "+691",
  "+692",
  "+850",
  "+852",
  "+853",
  "+855",
  "+856",
  "+880",
  "+886",
  "+960",
  "+961",
  "+962",
  "+963",
  "+964",
  "+965",
  "+966",
  "+967",
  "+968",
  "+970",
  "+971",
  "+972",
  "+973",
  "+974",
  "+975",
  "+976",
  "+977",
  "+992",
  "+993",
  "+994",
  "+995",
  "+996",
  "+998",
];
const tipoDocumentoOptions = [
  "Cédula ciudadanía",
  "Cédula de extranjería",
  "Tarjeta de identidad",
  "Registro civil",
  "Pasaporte",
];

const generoOptions = ["Masculino", "Femenino", "Otro"];

const tallaCamisetaOptions = ["XS", "S", "M", "L", "XL", "XXL"];

const grupoSanguineoOptions = [
  "O+",
  "O-",
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
];

const initialState = {
  document_type: "",
  document: "",
  names: "",
  last_name: "",
  birth_date: "1990-05-12T00:00:00Z",
  gender: "",
  shirt_size: "",
  email: "",
  country_prefix: "+57",
  cell_phone: "",
  eps: "",
  blood_group_and_rh: "",
  full_address: "",
  emergency_contact_name: "",
  emergency_contact_phone: "",
  age: "",
  special_invitation: false,
  kit_send: false,
  kit_transfer: false,
  kit_delivered: false,
  observations: "initial",
  payment_confirmation: false,
  object_receipt: "initial",
};

// const initialState = {
//   id: 3,
//   document_type: "Cédula ciudadanía",
//   document: "10456",
//   names: "Juan",
//   last_name: "Pérez",
//   birth_date: "1990-05-12T00:00:00Z",
//   gender: "Masculino",
//   shirt_size: "M",
//   email: "juan.perez@example.com",
//   country_prefix: "+57",
//   cell_phone: "3001234567",
//   eps: "EPS Salud",
//   blood_group_and_rh: "O+",
//   full_address:
//     "Calle 123 #45-67, Barrio El Poblado, Medellín, Antioquia, Colombia",
//   emergency_contact_name: "María Pérez",
//   emergency_contact_phone: "3009876543",
//   age: "33",
//   special_invitation: true,
//   kit_send: false,
//   kit_transfer: true,
//   kit_delivered: false,
//   observations: "Ninguna",
//   payment_confirmation: true,
//   object_receipt: "1",
//   dorsal_number: 1001,
// };
const Register = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg")); // Detectar si es móvil
  const navigate = useNavigate(); // Para navegación
  const [exist, setExist] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [step, setStep] = useState(STEPS.options);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [mediaUrl, setMediaUrl] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChangePolitic = (event: any) => {
    setIsChecked(event.target.checked);
  };

  const [isFormComplete, setIsFormComplete] = useState(false); // Estado para habilitar/deshabilitar el botón

  const [isUploading, setIsUploading] = useState(false); // Estado de carga de imagen
  const [finished, setFinished] = useState(false); // Estado de finalización de la inscripción
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("61733310501");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Restablecer después de 2 segundos
  };

  useEffect(() => {
    if (step === STEPS.options) {
      setFormData(initialState);
      setExist(false);
      setErrorDialogOpen(false);
      setErrorMessage("");
      setIsFormComplete(false);
      setIsUploading(false);
      setFinished(false);
      setMediaUrl(null);
      setCopied(false);
      setIsChecked(false);
    }
  }, [step]);
  const handleFileUpload = async (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result?.toString().split(",")[1];
        if (base64String) {
          try {
            setIsUploading(true);
            const response = await fetch(
              "https://formsdev-80c60f7ad205.herokuapp.com/api/media",
              {
                method: "POST",
                headers: {
                  "Content-Type": "text/plain",
                },
                body: "data:image/png;base64," + base64String,
              }
            );

            if (response.status === 201) {
              const data = await response.json();
              setIsUploading(false);
              handleSubmitComprobante(data.id_object);
            } else {
              setErrorMessage("Error al subir la imagen.");
              setErrorDialogOpen(true);
              setIsUploading(false);
            }
          } catch (error) {
            setErrorMessage("Error en la subida de la imagen.");
            setErrorDialogOpen(true);
            setIsUploading(false);
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Verificar si todos los campos están llenos
  useEffect(() => {
    const isComplete = Object.values(formData).every(
      (value) => value?.toString()?.trim() !== ""
    );
    setIsFormComplete(isComplete);
  }, [formData]); // Cada vez que formData cambie, verifica si el formulario está completo

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleButtonClick = (name: any, value: any) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    if (exist) {
      setTabIndex(tabIndex + 1);
      return;
    }
    try {
      setIsUploading(true);
      const response = await fetch(
        "https://formsdev-80c60f7ad205.herokuapp.com/api/inscription",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            birth_date: "1990-05-12T00:00:00Z",
          }),
        }
      );

      if (response.status === 201) {
        const data = await response.json();
        if (data.state === "ok") {
          setStep(STEPS.saved);
        }
      } else if (response.status === 500) {
        setErrorMessage(
          "Este documento ya está inscrito en el sistema. Por favor, verifica tu información."
        );
        setErrorDialogOpen(true); // Mostrar el diálogo de error
      } else {
        setErrorMessage(
          "Ocurrió un error al guardar los datos. Intenta nuevamente más tarde."
        );
        setErrorDialogOpen(true); // Mostrar el diálogo de error
      }
    } catch (error) {
      setErrorMessage(
        "Ocurrió un error inesperado al intentar guardar los datos."
      );
      setErrorDialogOpen(true); // Mostrar el diálogo de error
    } finally {
      setIsUploading(false);
    }
  };

  const renderOptionButtons = (options: any, name: any) => {
    return options.map((option: any) => (
      <Button
        key={option}
        onClick={() => handleButtonClick(name, option)}
        //@ts-ignore
        variant={formData[name] === option ? "contained" : "outlined"}
        sx={{
          marginRight: "10px",
          marginBottom: "10px",
        }}
      >
        {option}
      </Button>
    ));
  };

  const renderCountryCodes = () => {
    return countryCodes.map((code) => (
      <MenuItem key={code} value={code}>
        {code}
      </MenuItem>
    ));
  };

  const [tabIndex, setTabIndex] = useState(0); // Controla los tabs

  const handleCheckboxChange = (e: any) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  const handleDialogClose = () => {
    if (finished) {
      setFinished(false);
      setFormData(initialState);
      setStep(STEPS.options);
    }
    setErrorDialogOpen(false);
    setErrorMessage("");
  };

  const handleGoback = () => {
    setFinished(false);
    setFormData(initialState);
    setErrorDialogOpen(false);
    setErrorMessage("");
    setStep(STEPS.options);
  };

  const handleDocumentBlur = async () => {
    const document = formData.document;
    setExist(false);
    if (document) {
      try {
        setIsUploading(true);
        const response = await fetch(
          `https://formsdev-80c60f7ad205.herokuapp.com/api/inscription/${document}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          const data = await response.json();
          setExist(true);
          setFormData({
            ...data,
            observations:
              data?.observations?.length === 0 ? "initial" : data?.observations,
          });

          // Fetch the media object using the presigned_url
          if (data.object_receipt && data.object_receipt !== "initial") {
            const mediaResponse = await fetch(
              `https://formsdev-80c60f7ad205.herokuapp.com/api/media/${data.object_receipt}`
            );
            if (mediaResponse.ok) {
              const mediaData = await mediaResponse.json();
              // Determine if the URL is for an image
              setMediaUrl(mediaData.presigned_url);
            } else {
              setErrorMessage("Error al obtener el comprobante.");
              setErrorDialogOpen(true);
            }
          }

          return;
        } else {
          if (response.status === 404) {
            setExist(false);
            setErrorMessage(
              "El número de documento ingresado no se encuentra registrado. Por favor, verifica tu información o completa el paso 1 ingresando tus datos antes de subir el comprobante de pago."
            );
            setErrorDialogOpen(true);
          }
        }

        // Si no es 200, no hace nada
      } catch (error) {
        setExist(false);
        console.error("Error al obtener la inscripción:", error);
        // No interrumpir el flujo del formulario
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleSubmitComprobante = async (id_object: string) => {
    try {
      setIsUploading(true);
      const response = await fetch(
        `https://formsdev-80c60f7ad205.herokuapp.com/api/inscription/${formData.document}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            object_receipt: id_object,
            country_prefix: formData.country_prefix,
            cell_phone: formData.cell_phone,
            eps: formData.eps,
            blood_group_and_rh: formData.blood_group_and_rh,
            full_address: formData.full_address,
            emergency_contact_name: formData.emergency_contact_name,
            emergency_contact_phone: formData.emergency_contact_phone,
            age: formData.age,
          }),
        }
      );

      if (response.status === 200) {
        setFinished(true);
      } else {
        setErrorMessage("Error al enviar el comprobante.");
        setErrorDialogOpen(true);
      }
    } catch (error) {
      setErrorMessage("Error al enviar el comprobante.");
      setErrorDialogOpen(true);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        marginTop: "70px",
      }}
    >
      <AppBar position="absolute">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="go back"
            onClick={() =>
              step !== STEPS.options ? setStep(STEPS.options) : navigate(-1)
            } // Navegar hacia atrás
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            Camina, Corre & Tócate
          </Typography>
        </Toolbar>
      </AppBar>
      {step === STEPS.options && (
        <>
          <Typography mt={4} variant="h6" gutterBottom>
            Inscripciones
          </Typography>
          <Typography
            mt={2}
            mb={4}
            style={{ fontSize: "16px", color: "grey" }}
            gutterBottom
          >
            Para inscribirte a la carrera, solo debes seguir dos pasos simples:
            primero, ingresa tus datos y luego adjunta el comprobante de pago.
            ¿Qué te gustaría hacer ahora?
          </Typography>
          <StyledContainerActions isMobile={isMobile}>
            <Actions
              onClick={() => setStep(STEPS.information)}
              text="1. Ingresar mis datos"
              logo="https://cdn-icons-png.freepik.com/512/17020/17020597.png"
            />
            <Actions
              onClick={() => setStep(STEPS.image)}
              text="2. Subir comprobante"
              logo="https://static.vecteezy.com/system/resources/previews/011/742/491/non_2x/silhouette-girl-running-female-runner-sublimation-design-silhouette-watercolor-marathon-running-women-digital-downloads-png.png"
            />
            <Actions
              onClick={() => setStep(STEPS.how)}
              text="Formas de pago"
              logo="https://png.pngtree.com/png-clipart/20231220/original/pngtree-dollar-flat-pink-color-rounded-raster-icon-fiat-money-photo-png-image_13892365.png"
            />
          </StyledContainerActions>
          <a
            href="https://wa.me/573128431540?text=Hola, necesito soporte en la inscripción de la carrera."
            target="_blank"
            rel="noopener noreferrer"
            style={{
              position: "fixed",
              bottom: "30px",
              right: "30px",
              backgroundColor: "#25d366",
              color: "white",
              borderRadius: "50%",
              width: "60px",
              height: "60px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
              zIndex: 1000,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="32"
              height="32"
              fill="white"
            >
              <path d="M12 2C6.477 2 2 6.477 2 12c0 1.85.503 3.584 1.447 5.093L2 22l4.944-1.434C8.41 21.497 10.168 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.664 0-3.296-.501-4.667-1.443l-.333-.222L6 19l.667-.333C7.963 18.074 9.881 18 12 18c4.411 0 8-3.589 8-8s-3.589-8-8-8-8 3.589-8 8c0 1.371.354 2.727.989 3.914L4 17l1.944-.56C6.798 17.467 9.352 18 12 18zm2.9-9.4c.2.5.4.8.2 1.2-.4.9-1.1 1.5-1.9 2-.7.5-1.6.8-2.4.6-.4-.1-.7-.3-1.1-.5-.5-.3-.8-.5-1.3-1s-.7-.7-.9-1.1c-.2-.4-.2-.7 0-1s.6-.7.9-1.1c.2-.2.4-.3.7-.5.1 0 .2-.1.3-.1.1 0 .2 0 .2.1.2 0 .2.1.2.2s0 .2-.1.3l-.3.6c-.2.3-.2.6-.1.9.1.3.3.6.5.8l.3.3c.2.1.4.2.7.3s.5 0 .8-.1l.3-.2c.1-.1.3-.2.4-.3.3-.3.5-.5.6-.7.2-.3.2-.5.1-.7s-.3-.3-.4-.4c-.1-.1-.2-.1-.3 0-.1 0-.2.1-.3.2l-.3.2c-.1 0-.2 0-.3 0-.1 0-.2 0-.2-.1-.1-.1-.1-.2-.1-.3 0-.2.1-.3.3-.4l.5-.3c.4-.1.8-.1 1.2 0 .4.1.8.4 1.2.8.1.1.2.2.2.3.2.2.3.4.5.7z" />
            </svg>
          </a>

          {/* AppBar con el título y la flecha para regresar */}
        </>
      )}
      {step === STEPS.information && (
        <>
          <form onSubmit={(e) => e.preventDefault()}>
            <Typography mt={4} mb={4} variant="h6" gutterBottom>
              Complete la siguiente información para continuar
            </Typography>
            <Grid container spacing={2}>
              {/* Tipo Documento */}
              <Grid item xs={12} md={isMobile ? 12 : 3}>
                <TextField
                  label="Tipo Documento"
                  name="document_type"
                  select
                  fullWidth
                  value={formData.document_type}
                  onChange={handleInputChange}
                >
                  {tipoDocumentoOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* Número Documento */}
              <Grid item xs={12} md={isMobile ? 12 : 3}>
                <TextField
                  label="Número Documento"
                  name="document"
                  fullWidth
                  value={formData.document}
                  onChange={handleInputChange}
                />
              </Grid>

              {/* names */}
              <Grid item xs={12} md={isMobile ? 12 : 3}>
                <TextField
                  label="Nombre"
                  name="names"
                  fullWidth
                  value={formData.names}
                  onChange={handleInputChange}
                />
              </Grid>

              {/* last_name */}
              <Grid item xs={12} md={isMobile ? 12 : 3}>
                <TextField
                  label="Apellido"
                  name="last_name"
                  fullWidth
                  value={formData.last_name}
                  onChange={handleInputChange}
                />
              </Grid>

              {/* Fecha de Nacimiento */}
              {/* <Grid item xs={12} md={isMobile ? 12 : 3}>
              <TextField
                label="Fecha de Nacimiento (dd/mm/aaaa)"
                name="birth_date"
                fullWidth
                value={formData.birth_date}
                onChange={handleInputChange}
              />
            </Grid> */}
              <Grid item xs={12} md={isMobile ? 12 : 1.5}>
                <TextField
                  label="Edad"
                  name="age"
                  fullWidth
                  value={formData.age}
                  onChange={handleInputChange}
                />
              </Grid>

              {/* Correo Electrónico */}
              <Grid item xs={12} md={isMobile ? 12 : 3}>
                <TextField
                  label="Correo Electrónico"
                  name="email"
                  fullWidth
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </Grid>

              {/* Prefijo País */}
              <Grid item xs={12} md={isMobile ? 12 : 1.5}>
                <TextField
                  label="Prefijo País"
                  name="country_prefix"
                  select
                  fullWidth
                  value={formData.country_prefix}
                  onChange={handleInputChange}
                >
                  {renderCountryCodes()}
                </TextField>
              </Grid>

              {/* Celular */}
              <Grid item xs={12} md={isMobile ? 12 : 3}>
                <TextField
                  label="Celular"
                  name="cell_phone"
                  fullWidth
                  value={formData.cell_phone}
                  onChange={handleInputChange}
                />
              </Grid>

              {/* EPS */}
              <Grid item xs={12} md={isMobile ? 12 : 3}>
                <TextField
                  label="EPS"
                  name="eps"
                  fullWidth
                  value={formData.eps}
                  onChange={handleInputChange}
                />
              </Grid>
              {/* Dirección Completa */}
              <Grid item xs={12} md={isMobile ? 12 : 3}>
                <TextField
                  label="Dirección Completa"
                  name="full_address"
                  fullWidth
                  value={formData.full_address}
                  onChange={handleInputChange}
                />
              </Grid>
              {/* Persona Contacto Emergencia */}
              <Grid item xs={12} md={isMobile ? 12 : 3}>
                <TextField
                  label="Persona Contacto Emergencia"
                  name="emergency_contact_name"
                  fullWidth
                  value={formData.emergency_contact_name}
                  onChange={handleInputChange}
                />
              </Grid>

              {/* Número Celular Persona Contacto Emergencia */}
              <Grid item xs={12} md={isMobile ? 12 : 3}>
                <TextField
                  label="Número Celular Persona Contacto Emergencia"
                  name="emergency_contact_phone"
                  fullWidth
                  value={formData.emergency_contact_phone}
                  onChange={handleInputChange}
                />
              </Grid>

              {/* Checkbox para special_invitation */}
              <Grid item xs={12} md={isMobile ? 12 : 3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.special_invitation}
                      onChange={handleCheckboxChange}
                      name="special_invitation"
                    />
                  }
                  label="¿Eres paciente oncológico del E.S.E Hospital San Rafael de Girardota?"
                />
              </Grid>

              {/* Género */}
              <Grid item xs={12} md={isMobile ? 12 : 4}>
                <Typography
                  mb={2}
                  variant="subtitle1"
                  sx={{ textAlign: "center" }}
                >
                  Género
                </Typography>
                {renderOptionButtons(generoOptions, "gender")}
              </Grid>

              {/* Talla de Camiseta */}
              <Grid item xs={12} md={isMobile ? 12 : 4}>
                <Typography
                  mb={2}
                  variant="subtitle1"
                  sx={{ textAlign: "center" }}
                >
                  Talla de Camiseta
                </Typography>
                {renderOptionButtons(tallaCamisetaOptions, "shirt_size")}
              </Grid>
              {/* Grupo Sanguíneo y RH */}
              <Grid item xs={12} md={isMobile ? 12 : 4}>
                <Typography
                  mb={2}
                  variant="subtitle1"
                  sx={{ textAlign: "center" }}
                >
                  Grupo Sanguíneo y RH
                </Typography>
                {renderOptionButtons(
                  grupoSanguineoOptions,
                  "blood_group_and_rh"
                )}
              </Grid>
              <Grid item xs={12} md={isMobile ? 12 : 12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isChecked}
                      onChange={handleCheckboxChangePolitic}
                      name="dataPrivacy"
                      color="primary"
                    />
                  }
                  label={
                    <Typography variant="body2">
                      He leído y acepto los{" "}
                      <LinkPolitic
                        href="https://fundayama-fe.s3.amazonaws.com/images/Tratamiento+de+datos+fundayama.pdf"
                        target="_blank"
                      >
                        términos y condiciones
                      </LinkPolitic>{" "}
                      del tratamiento de mis datos personales, de acuerdo con la{" "}
                      <LinkPolitic
                        href="https://fundayama-fe.s3.amazonaws.com/images/Tratamiento+de+datos+fundayama.pdf"
                        target="_blank"
                      >
                        política de privacidad
                      </LinkPolitic>
                      .
                    </Typography>
                  }
                />
              </Grid>

              {/* Botón para cambiar al siguiente tab */}
              <Grid container direction="column">
                <Grid item xs={12} mt={6}>
                  <Button
                    type="button"
                    variant="outlined"
                    color="secondary"
                    onClick={() => setFormData(initialState)}
                  >
                    Limpiar
                  </Button>
                </Grid>
                <Grid item xs={12} mt={6}>
                  <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={!isFormComplete || isUploading || !isChecked} // Deshabilitar si el formulario no está completo
                  >
                    Guardar
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </>
      )}
      {step === STEPS.image && (
        <>
          <Grid container>
            <Grid item xs={12} md={isMobile ? 12 : 12}>
              <Typography
                mb={6}
                variant="h6"
                gutterBottom
                sx={{ color: "grey", fontSize: "16px" }}
              >
                Si ya completaste el paso 1, ingresa tu número de documento para
                subir tu comprobante de pago y finalizar tu inscripción
              </Typography>
              <TextField
                label="Número de documento"
                name="document"
                fullWidth
                value={formData.document}
                onChange={handleInputChange}
                disabled={isUploading || exist}
              />
            </Grid>
            {!exist && (
              <Grid item xs={12} mt={4}>
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleDocumentBlur}
                  disabled={formData?.document.length === 0 || isUploading} // Deshabilitar si el formulario no está completo
                >
                  Consultar mis datos
                </Button>
              </Grid>
            )}
            {formData?.document.length > 0 && exist && (
              <>
                <Grid item xs={12} md={isMobile ? 12 : 12} textAlign="left">
                  <Typography mt={4} variant="h6">
                    {`Hola, ${formData.names}`}
                  </Typography>
                  {formData?.payment_confirmation && (
                    <Typography mt={4} variant="h6">
                      {`La fundación confirmó tu pago. ¡Gracias por tu inscripción!`}
                    </Typography>
                  )}
                </Grid>
                {!formData?.payment_confirmation && (
                  <Grid
                    item
                    mt={2}
                    xs={12}
                    md={isMobile ? 12 : 12}
                    textAlign="left"
                  >
                    <Typography
                      textAlign="left"
                      sx={{ color: "grey", fontSize: "16px" }}
                    >
                      {mediaUrl
                        ? `Ya subiste un comprobante de pago. Si deseas cambiarlo, puedes subir uno nuevo.`
                        : `Sube tu comprobante de pago para completar tu inscripción.`}
                    </Typography>
                  </Grid>
                )}
                {mediaUrl && (
                  <Grid item xs={12} mt={4}>
                    <Button
                      variant="outlined"
                      color="primary"
                      href={mediaUrl}
                      download="comprobante"
                      sx={{ width: "100%" }}
                    >
                      Descargar comprobante de pago
                    </Button>
                  </Grid>
                )}
                {!formData?.payment_confirmation && (
                  <Grid item xs={12} md={isMobile ? 12 : 12} mt={4} mb={0}>
                    {/* Componente subir imagen aqui */}

                    <Button
                      variant="outlined"
                      component="label"
                      disabled={isUploading}
                      sx={{
                        width: "100%",
                        textAlign: "center",
                        padding: "10px",
                        borderColor: "#111",
                        color: "#111",
                        "&:hover": {
                          borderColor: "#111",
                          backgroundColor: "#e3f2fd",
                        },
                      }}
                    >
                      {isUploading
                        ? "Subiendo..."
                        : "Subir comprobante de pago"}
                      <input
                        hidden
                        accept="image/*"
                        type="file"
                        onChange={handleFileUpload}
                      />
                    </Button>
                    {isUploading && (
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{
                          fontStyle: "italic",
                          color: "#111",
                          marginTop: "10px",
                        }}
                      >
                        Subiendo imagen, por favor espera...
                      </Typography>
                    )}

                    {/* <Grid item xs={12} mt={6}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmitComprobante}
                disabled={!idObject || isUploading}
              >
                Enviar Comprobante
              </Button>
            </Grid> */}
                  </Grid>
                )}
              </>
            )}
          </Grid>
        </>
      )}
      {step === STEPS.saved && (
        <>
          <Grid item xs={12} mt={4} mb={6} md={isMobile ? 12 : 12}>
            {/* Mensaje de confirmación en una tarjeta */}
            <Box
              sx={{
                padding: 3,
                borderRadius: 2,
                boxShadow: 3,
                backgroundColor: "#f1f1f1",
                borderLeft: "10px solid green",
                textAlign: "center",
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                ¡Tus datos se han guardado correctamente!
              </Typography>
              <Typography variant="body2" mt={1}>
                Tu inscripción se ha realizado con éxito. Para que sea
                confirmada, es indispensable que la fundación valide el pago con
                el comprobante que adjuntaste. Si aún no lo has subido, puedes
                hacerlo más tarde ingresando nuevamente con tu número de
                documento. Al cerrar este mensaje, podrás completar otra
                inscripción si lo deseas.
              </Typography>
            </Box>
            <Grid item xs={12} mt={4}>
              <Button
                type="button"
                variant="outlined"
                color="secondary"
                fullWidth
                onClick={handleGoback}
              >
                Continuar con la inscripción
              </Button>
            </Grid>
          </Grid>
        </>
      )}
      {step === STEPS.how && (
        <>
          <Typography
            mb={4}
            mt={4}
            variant="h6"
            gutterBottom
            sx={{ color: "grey", fontSize: "16px" }}
          >
            ¿Cómo realizar el pago? A continuación, te ofrecemos nuestro número
            de cuenta y el código QR para que realices tu pago de manera fácil y
            rápida. No olvides subir tu comprobante una vez realizado el pago.
          </Typography>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ marginRight: "8px" }}>61733310501</span>
            <Tooltip title={copied ? "¡Copiado!" : "Copiar"}>
              <IconButton onClick={handleCopy}>
                <ContentCopyIcon />
              </IconButton>
            </Tooltip>
          </div>
          <img
            style={{ width: "100%", height: "500px" }}
            src={
              isMobile
                ? "https://d47djmvgvaczr.cloudfront.net/images/details/payMobile.jpg"
                : "https://d47djmvgvaczr.cloudfront.net/images/details/payDesktop.jpg"
            }
          />
        </>
      )}
      {/* Diálogo de error */}
      <Dialog
        open={errorDialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Fundayama"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {errorMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary" autoFocus>
            Entendido
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={finished}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"¡Inscripción completada! Ten en cuenta lo siguiente:"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Su inscripción se realizó correctamente y quedará confirmada en el
            momento que Fundayama realice la confirmación del pago con el
            comprobante que adjuntó. Al cerrar este mensaje, podrás realizar
            otra inscripción si lo deseas.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary" autoFocus>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Register;
