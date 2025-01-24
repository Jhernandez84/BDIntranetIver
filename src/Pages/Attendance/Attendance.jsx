import React, { useState, useEffect } from "react";
import { useContext } from "react";
import ClientContext from "../../Context/Client/ClientContext";
import { db } from "../../Firebase/firebase";
import { AttendanceTableDetail } from "./AttendanceTableDetail";
import {
  AttendanceSummary,
  PaidLunchSummary,
  DeliveredLunchSummary,
} from "./AttendanceSummary";
import { TheBarChart, TheLineChart, ThePieChart } from "../../Charts/Charts";
import AttendanceCashDetail from "./AttendanceCashDetail";

import "./styles.css";
import swal from "sweetalert";
import UserContext from "../../Context/User/UserContext";

export const Attendance = ({ props }) => {
  // const DBOrigin = 'BDGeneralIglesia';
  const { client } = useContext(ClientContext);
  const { user } = useContext(UserContext);

  const [DBEvento, setDBEvento] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);

  const [DBdata, setDBdata] = useState([]); // Variable utilizada para tener todos los regisrtos como base y no consultar constantemente la BD
  const [dataTable, setDataTable] = useState([]); // Variable utilizada para mostrar los registros en la tabla, en vez de renderizar los objetos cada vez que esté buscando un nombre.

  useEffect(() => {
    if (DBEvento) {
      fetchData(); // Call the async function to fetch and update data when DBEvento is not null
      // console.log("FetchData triggered");
      // console.log(dataTable);
    }
  }, [DBEvento]);

  const selectEvento = (e) => {
    setDBEvento(e.target.value);
  };

  const fetchData = async () => {
    try {
      if (DBEvento !== null && DBEvento !== "") {
        const collectionRef = db.collection(`${DBEvento}`);
        const querySnapshot = await collectionRef.get();

        if (!querySnapshot.empty) {
          const records = querySnapshot.docs
            .map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
            .filter((record) => record.EventoEstado !== "eliminado");

          records.sort((a, b) => {
            return a.Rut.localeCompare(b.Rut);
          });
          setDBdata(records); // Los datos en variable local
          console.log("datos guardados localmente", DBdata);
          setDataTable(records); // Los datos en variable local
        } else {
          swal(`Sin registros para el evento: ${DBEvento}`);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearchInput = (e) => {
    // acá estoy pasando los datos a dataTable para poder manipularlos sin problemas. Después los paso a firebase.
    const valueToMatch = e.target.value;
    if (valueToMatch === null || valueToMatch === "") {
      // if (valueToMatch.length < 3 || valueToMatch === null || valueToMatch === '') {
      // If valueToMatch is null or empty, call fetchData()
      console.log("Query Rut, Nombre Apellido Triggered");
      setDataTable(DBdata);
    } else {
      const matchingEntries = DBdata.filter((entry) => {
        const propertiesToSearch = [
          "Rut",
          "Nombres",
          "ApellidoMaterno",
          "ApellidoPaterno",
        ];
        return propertiesToSearch.some((property) => {
          const value = entry[property];
          return (
            typeof value === "string" &&
            value.toLowerCase().includes(valueToMatch.toLowerCase())
          );
        });
      });
      setDataTable(matchingEntries);
      // console.log(matchingEntries);
    }
  };

  const handleShowRecords = (e) => {
    // acá estoy pasando los datos a dataTable para poder manipularlos sin problemas. Después los paso a firebase.
    const valueToMatch = e.target.value;
    console.log(valueToMatch);
    if (valueToMatch === "todos") {
      // If valueToMatch is null or empty, call fetchData()
      setDataTable(DBdata);
    } else {
      const matchingEntries = DBdata.filter((entry) => {
        const propertiesToSearch = ["EventoEstado", "EventoPagado"];
        return propertiesToSearch.some((property) => {
          const value = entry[property];
          return (
            typeof value === "string" &&
            value.toLowerCase().includes(valueToMatch.toLowerCase())
          );
        });
      });
      setDataTable(matchingEntries);
      // console.log(matchingEntries);
    }
  };

  return (
    <main className="container text-center">
      <div className="container text-center vista_header">
        <h4>Vista general del evento</h4>
      </div>
      <section className="attendance_section">
        {/* {DBdata != null ? (
          <>
            <section className="attendance_dashboard">
              <div className="att-box att_present">
                <AttendanceSummary attendanceData={DBdata} />
              </div>
              <div className="att-box att_present">
                <PaidLunchSummary attendanceData={DBdata} />
              </div>
              <div className="att-box att_present">
                <DeliveredLunchSummary attendanceData={DBdata} />
              </div>
              <div className="att-box hidable att_total2">
                <AttendanceCashDetail data={DBdata} />
              </div>
            </section>
          </>
        ) : (
          []
        )} */}
        <section className="attendance_dashboard">
          <div className="attendance-selectors">
            {user ? (
              // <select defaultValue={client.ClientEvent} onChange={selectEvento} className="col form-select" aria-label="Default select example">
              <select
                defaultValue="Seleccione"
                onChange={selectEvento}
                className="col form-select"
                aria-label="Default select example"
              >
                <option disabled>Seleccione</option>
                {/* debería renderizar esta parte del componente */}
                {client.ClientEvent.map((ClientEvent) => {
                  return <option value={ClientEvent}>{ClientEvent}</option>;
                })}
              </select>
            ) : (
              []
            )}
          </div>
          {/* <h5 className='col'>Mostrar: </h5> */}
          <div className="attendance-selectors">
            <select
              defaultValue="Todos"
              onChange={handleShowRecords}
              className="col form-select"
              aria-label="Default select example"
            >
              <option value="todos">
                {" "}
                Mostrando -{">"} Todos los registros
              </option>
              <option value="presente">Mostrando -{">"} Presentes</option>
              <option value="Inscrito">Mostrando -{">"} Pendientes</option>
              {/* <option value="2">Two</option>
            <option value="3">Three</option> */}
            </select>
          </div>
          <div className="attendance-selectors">
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                onChange={handleSearchInput}
                type="search"
                placeholder="Buscar por Rut, Nombres o Apellidos"
                aria-label="Search"
              />
            </form>
          </div>
        </section>
      </section>
      {/* <h4 className="table_header">Tabla general de inscritos</h4> */}
      <section className="table_seccion">
        <table className="table table-striped table-sm">
          <thead className="table_head">
            <tr>
              <th>Rut</th>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th className="hidable">Fecha Nac.</th>
              <th className="hidable">Iglesia</th>
              <th>Staff?</th>
              <th>Presente</th>
              <th>Almuerzo Pagado? </th>
              <th>Almuerzo Entregado? </th>
              {/* <th colSpan={2} className='hidable text-center'>
                Opciones
              </th> */}
            </tr>
          </thead>
          <tbody className="table_body">
            {dataTable.map((item) => (
              <AttendanceTableDetail
                setAttendanceStatus={setDBdata}
                setDataTable={setDataTable}
                DBEvento={DBEvento}
                attendanceData={item}
                key={item.id}
              />
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
};
