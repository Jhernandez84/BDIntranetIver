import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { auth, db, provider } from "../../Firebase/firebase";
import firebase from "firebase/compat/app";
import "./styles.css";
import { Home } from "../Home/Home";
import { Help } from "../Help/Help";

export const FormEntrega2 = () => {
  const DBOrigin = "BDGeneralIglesia";
  const DBEvento = "Escuela Infantil";
  const DBGrupo = "";
  const DBLema = "Instruye al niño en su camino";

  const camposContacto = {
    Rut: "",
    Nombres: "",
    ApellidoPaterno: "",
    ApellidoMaterno: "",
    FechaNacimiento: "",
    RutApoderado:"",
    NumeroContacto: "",
    Accepted: false,
    DV: "",
    email: "",
    Direccion: "",
    EventoEstado: "Inscrito",
    esStaff: "No",
    staff: "Participante",
    iglesiaVisita: "IverChile",
    encabezado: DBEvento,
    lema: DBLema,
    invitacion: "Por favor reserva tu lugar ingresando tus datos aquí",
  };
  const [contacto, setContacto] = useState(camposContacto);

  useEffect(() => {
    setContacto(camposContacto);
  }, []);

  // console.log(contacto)
  const [data, setData] = useState([]);
  const [userExist, SetUserExist] = useState(false);
  const [showForm, SetShowForm] = useState(false);
  // 1) Tiene que buscar si el número de rut ya está en la base de datos general.
  // 2) Si encuentra el rut, tiene que traer la información de vuelta y cargar el formulario
  // 3) Si los datos son correctos, tiene que traspasar la información al formulario de inscripción de eventos.
  // 4) Es necesario crear un mantenedor por los eventos.
  // 5) Es necesario crear una página para controlar las asistencias.
  const getDataByRut = () => {
    const collectionRef2 = db.collection(`${DBEvento}`);
    collectionRef2
      .where("Rut", "==", `${contacto.Rut}`)
      .limit(1)
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          // If there's at least one matching record, retrieve it
          swal(
            "Ya está Inscrito",
            "Puede estar tranquil@, ya está inscrit@ para este evento",
            "success"
          );
          setData([]);
          setContacto(camposContacto);
        } else {
          SetShowForm(true);
          const collectionRef = db.collection(`${DBOrigin}`);
          collectionRef
            .where("Rut", "==", `${contacto.Rut}`)
            .limit(1)
            .get()
            .then((querySnapshot) => {
              if (!querySnapshot.empty) {
                // If there's at least one matching record, retrieve it
                SetUserExist(true);
                const recordData = querySnapshot.docs[0].data();
                const {
                  Nombres,
                  ApellidoPaterno,
                  ApellidoMaterno,
                  Rut,
                  FechaNacimiento,
                  NumeroContacto,
                  RutApoderado,
                } = recordData;
                setContacto({
                  Nombres,
                  ApellidoPaterno,
                  ApellidoMaterno,
                  Rut,
                  FechaNacimiento,
                  NumeroContacto,
                  RutApoderado,
                  Asistencia: [],
                });
              } else {
                SetUserExist(false);
              }
            });
        }
      });
  };

  useEffect(() => {
    contacto.Rut.length === 8 ||
    (contacto.Rut.length === 7) & (parseInt(contacto.Rut.charAt(0)) > 4)
      ? // setContacto(camposContacto),
        getDataByRut()
      : // console.log(contacto)
        (setData([]), SetShowForm(false));
    // setContacto(camposContacto)
  }, [contacto.Rut]);

  const SendData = async (e) => {
    e.preventDefault();
    userExist === true
      ? await db.collection(`${DBEvento}`).add(contacto)
      : (await db.collection(`${DBOrigin}`).add(contacto),
        await db.collection(`${DBEvento}`).add(contacto));
    setData([]), SetShowForm(false), setContacto(camposContacto);
    swal(
      `Inscripción exitosa`,
      `${contacto.Nombres} estaremos esperándote `,
      "success"
    );
    setContacto(camposContacto);
  };
  // Acá estoy enviando la información de reserva a la base de datos firestore.
  const getFormValues = ({ target }) => {
    const { name, value, type, checked } = target;
    setContacto((prevContacto) => ({
      ...prevContacto,
      [name]: type === "checkbox" ? checked : value, // Handle checkbox value
      EventoEstado: "Inscrito",
      timestamp: firebase.firestore.FieldValue.serverTimestamp(), // Add timestamp field
    }));
    console.log(contacto);
  };

  return (
    <>
      {/* <Help/> */}
      <section className="container-fluid d-flex flex-column text-center">
        <div className="container">
          <img src="/IverKidsLogo.jpg" alt="Imagen-Contacto" />
        </div>

        <div className="container-fluid">
          <form>
            <div className="mb-4 text-center">
              <h4 className="form-header">{camposContacto.encabezado}</h4>
              <h3 className="form-idea">{camposContacto.lema}</h3>
              <p className="form-invite">{camposContacto.invitacion}</p>
              <div className="form-input">
                <label htmlFor="Rut" className="form-label">
                  Rut
                </label>
                <input
                  name="Rut"
                  maxLength={"8"}
                  onChange={getFormValues}
                  value={contacto.Rut}
                  type="text"
                  className="form-control"
                  id="inputContactName"
                  aria-describedby="inputName"
                  required
                ></input>
                <p>
                  <i>antes del dígito verificador: 12345678</i>
                </p>
              </div>
              {showForm === true ? (
                <>
                  <div className="form-input">
                    <label htmlFor="Nombres" className="form-label">
                      Nombre Completo
                    </label>
                    <input
                      name="Nombres"
                      onChange={getFormValues}
                      value={contacto.Nombres}
                      type="text"
                      className="form-control"
                      id="inputContactName"
                      aria-describedby="inputName"
                      required
                    ></input>
                  </div>
                  <div className="form-input">
                    <label htmlFor="ApellidoPaterno" className="form-label">
                      Apellidos
                    </label>
                    <input
                      name="ApellidoPaterno"
                      onChange={getFormValues}
                      value={contacto.ApellidoPaterno}
                      type="text"
                      className="form-control"
                      id="inputContactName"
                      aria-describedby="inputName"
                      required
                    ></input>
                  </div>
                  <div className="form-input">
                    <label htmlFor="FechaNacimiento" className="form-label">
                      Fecha de nacimiento
                    </label>
                    <input
                      name="FechaNacimiento"
                      onChange={getFormValues}
                      value={contacto.FechaNacimiento}
                      type="date"
                      className="form-control"
                      id="inputContactMail"
                      aria-describedby="inputMail"
                    ></input>
                  </div>
                  <div className="form-input">
                    <label htmlFor="RutApoderado" className="form-label">
                      Rut Apoderado
                    </label>
                    <input
                      name="RutApoderado"
                      maxLength={"8"}
                      onChange={getFormValues}
                      value={contacto.RutApoderado}
                      type="text"
                      className="form-control"
                      id="inputContactName"
                      aria-describedby="inputName"
                      required
                    ></input>
                    <p>
                      <i>antes del dígito verificador: 12345678</i>
                    </p>
                  </div>

                  <div className="form-input">
                    <label htmlFor="NumeroContacto" className="form-label">
                      Teléfono de contacto
                    </label>
                    <input
                      name="NumeroContacto"
                      onChange={getFormValues}
                      value={contacto.NumeroContacto}
                      type="phone"
                      className="form-control"
                      id="inputContactPhone"
                      aria-describedby="inputPhone"
                    ></input>
                  </div>
                  <div className="d-grid gap-2 col-6 mx-auto">
                    {contacto.Rut &&
                    contacto.FechaNacimiento &&
                    contacto.Nombres &&
                    contacto.NumeroContacto &&
                    contacto.RutApoderado ? (
                      <>
                        <button
                          type="submit"
                          onClick={SendData}
                          className="btn btn-success btn-registrarme"
                        >
                          Enviar
                        </button>
                      </>
                    ) : (
                      []
                    )}
                  </div>
                </>
              ) : (
                []
              )}
            </div>
          </form>
        </div>
      </section>
    </>
  );
};
