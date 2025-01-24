import React from "react";
import { useState } from "react";
import "./styles.css";
import firebase from "firebase/compat/app";
import { updateDoc } from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";
import format from "date-fns/format";
import swal from "sweetalert";

export const AttendanceTableDetail = ({
  attendanceData,
  DBEvento,
  setAttendanceStatus,
  setDataTable,
}) => {
  const UpdateAttendanceData = (attendanceData, eventoEstado, estadoValor) => {
    console.log(attendanceData, eventoEstado, estadoValor);
    const db = firebase.firestore();
    const docRef = db.collection(`${DBEvento}`).doc(`${attendanceData.id}`);
    const newData = {
      [eventoEstado]: estadoValor, // Usando la notación de corchetes para usar la variable como nombre de la clave
    };

    const valorAnterior = attendanceData[eventoEstado];

    docRef
      .update(newData)
      .then(() => {
        // Actualiza el estado local (dataTable)
        setDataTable((prevDataTable) => {
          return prevDataTable.map((item) => {
            if (item.id === attendanceData.id) {
              // Modifica el estado del item que se actualizó
              const newItem = {
                ...item,
                [eventoEstado]: estadoValor,
              };
              // Muestra el valor previo y el nuevo
              // console.log(`Valor previo de BDdata ${eventoEstado}: ${valorAnterior}`);
              // console.log(`Nuevo valor de BDdata ${eventoEstado}: ${estadoValor}`);
              return newItem;
            }
            return item;
          });
        });

        setAttendanceStatus((prevDataTable) => {
          return prevDataTable.map((item) => {
            if (item.id === attendanceData.id) {
              // Modifica el estado del item que se actualizó
              const newItem = {
                ...item,
                [eventoEstado]: estadoValor,
              };
              // Muestra el valor previo y el nuevo
              // console.log(`Valor previo de AttendanceStatus ${eventoEstado}: ${valorAnterior}`);
              // console.log(`Nuevo valor de AttendanceStatus ${eventoEstado}: ${estadoValor}`);
              return newItem;
            }
            return item;
          });
        });
      })

      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  };

  const [rut, setRut] = useState({ rut: "" });

  const getFormValues = ({ target }) => {
    setRut({
      ...rut,
      [target.name]: target.value,
    });
    console.log(rut);
  };

  return (
    <>
      {attendanceData.EventoEstado != "eliminado" ? ( //Excluye los registros eliminados del render
        <>
          <tr key={attendanceData.id}>
            <td>
              <input
                className="input-rut"
                type="number"
                name="rut"
                placeholder={parseFloat(attendanceData.Rut).toLocaleString(
                  "es-CL",
                  {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }
                )}
                id="input-rut"
                onChange={getFormValues}
                onBlur={() =>
                  UpdateAttendanceData(attendanceData, "Rut", rut.rut)
                }
              />
            </td>

            <td className="text-left">
              {attendanceData.Nombres}
              {/* <input type="number" placeholder={attendanceData.Nombres} /> */}
            </td>
            <td className="text-left">
              {attendanceData.ApellidoPaterno} {attendanceData.ApellidoMaterno}
            </td>
            <td className="hidable lunch-paid-column">
              {attendanceData.FechaNacimiento &&
                new Date(attendanceData.FechaNacimiento).toLocaleDateString(
                  "es-CL",
                  {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  }
                )}{" "}
            </td>
            {/* <td>{format(attendanceData.FechaNacimiento,'dd-MM-yyyy')}</td> */}
            <td className="hidable">{attendanceData.IglesiaVisita}</td>
            <td>
              {attendanceData.esStaff === "Si" ? (
                <>{attendanceData.staff}</>
              ) : (
                "No"
              )}
            </td>
            <td>
              <input
                className="form-check-input"
                onChange={() =>
                  UpdateAttendanceData(
                    attendanceData,
                    "EventoEstado",
                    attendanceData.EventoEstado === "presente"
                      ? "Inscrito"
                      : "presente"
                  )
                }
                type="checkbox"
                id="flexCheckEventoEstado"
                checked={attendanceData.EventoEstado === "presente"}
              />
            </td>
            <td className="lunch-paid-column">
              <div className="form-check">
                <input
                  className="form-check-input"
                  onChange={() =>
                    UpdateAttendanceData(
                      attendanceData,
                      "EventoPagado",
                      attendanceData.EventoPagado === "Si" ? "No" : "Si"
                    )
                  }
                  type="checkbox"
                  id="flexCheckEventoPagado"
                  checked={attendanceData.EventoPagado === "Si"}
                />
                {attendanceData.EventoPagado &&
                attendanceData.EventoPagado === "Si" ? (
                  <button
                    className="btn btn-primary btn-sm"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={
                      "#" +
                      (isNaN(attendanceData.id[0]) ? "" : "a") +
                      attendanceData.id
                    }
                    aria-expanded="false"
                    aria-controls="multiCollapseExample2"
                  >
                    Detalle
                  </button>
                ) : (
                  []
                )}
              </div>
              <div>
                {attendanceData.EventoPagado &&
                attendanceData.EventoPagado === "Si" ? (
                  <>
                    <div className="col">
                      <div
                        className="collapse multi-collapse"
                        id={
                          (isNaN(attendanceData.id[0]) ? "" : "a") +
                          attendanceData.id
                        }
                      >
                        <div className="card card-body">
                          <p>Detalle del pago</p>
                          <select
                            value={attendanceData.EventoMedioPago}
                            onChange={(event) =>
                              UpdateAttendanceData(
                                attendanceData,
                                "EventoMedioPago",
                                event.target.value
                              )
                            } // Call the function when the select value changes
                            className="col form-select"
                            aria-label="Default select example"
                          >
                            <option selected>Seleccione</option>
                            <option value="Efectivo">Efectivo</option>
                            <option value="Transferencia">Transferencia</option>
                          </select>
                          <br />
                          <div>
                            <select
                              value={attendanceData.EventoRecibePago}
                              onChange={(event) =>
                                UpdateAttendanceData(
                                  attendanceData,
                                  "EventoRecibePago",
                                  event.target.value
                                )
                              }
                              className="col form-select"
                              aria-label="Default select example"
                            >
                              <option selected>Seleccione</option>
                              <option value="Carolina">Carolina Rivera</option>
                              <option value="Debora">Cata Nuñez</option>
                              <option value="Danae">Claudita</option>
                              <option value="Elsa">P. Dani</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  []
                )}
              </div>
            </td>
            <td>
              <div className="form-check">
                {attendanceData.EventoPagado &&
                attendanceData.EventoPagado === "Si" ? (
                  <>
                    <input
                      className="form-check-input"
                      onChange={() =>
                        UpdateAttendanceData(
                          attendanceData,
                          "EventoColacionEntregada",
                          attendanceData.EventoColacionEntregada === "Si"
                            ? "No"
                            : "Si"
                        )
                      }
                      type="checkbox"
                      id="flexCheckEventoColacionEntregada"
                      checked={attendanceData.EventoColacionEntregada === "Si"}
                    />
                  </>
                ) : (
                  []
                )}
              </div>
            </td>
            {/* <td>
                    <button
                    onClick={() => OnEdit(attendanceData.id)}
                    className='btn-warning btn btn-sm'
                    >
                    Editar
                    </button>
                </td> */}
            {/* <td>
              <button
                onClick={() => DeleteFirebaseDocument(attendanceData)}
                className="hidable btn-danger btn btn-sm"
              >
                {" "}
                Eliminar{" "}
              </button>
            </td> */}
          </tr>
        </>
      ) : (
        []
      )}
    </>
  );
};
