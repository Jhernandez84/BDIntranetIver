import React from "react";
import { NavLink } from "react-router-dom";
import "./styles.css";
import { CargaData } from "../../ImportExport/ImportExports";
import { auth, db, provider } from "../../Firebase/firebase";
import firebase from "firebase/compat/app";
import { useState } from "react";
import { useEffect } from "react";

export const Home = () => {
  const [lrCount, setLrCount] = useState(0);
  const [entrega2Count, setEntrega2Count] = useState(0);

  // useEffect(() => {
  //   const collectionRef2 = db.collection("Act");
  //   collectionRef2
  //     .get()
  //     .then((querySnapshot) => {
  //       // Apply the filter to exclude records with EventoEstado "eliminado"
  //       const filteredRecords = querySnapshot.docs.filter(
  //         (record) => record.data().EventoEstado !== "eliminado"
  //       );
  //       const recordCount = filteredRecords.length;
  //       setEntrega2Count(recordCount);
  //       // console.log(`Number of records: ${recordCount}`);
  //     })
  //     .catch((error) => {
  //       console.error("Error getting documents: ", error);
  //     });
  // }, []);

  useEffect(() => {
    const collectionRef2 = db.collection("Escuela de Entrenamiento");
    collectionRef2
      .get()
      .then((querySnapshot) => {
        // Apply the filter to exclude records with EventoEstado "eliminado"
        const filteredRecords = querySnapshot.docs.filter(
          (record) => record.data().EventoEstado !== "eliminado"
        );
        const recordCount = filteredRecords.length;
        setLrCount(recordCount);
        // console.log(`Number of records: ${recordCount}`);
      })
      .catch((error) => {
        console.error("Error getting documents: ", error);
      });
  }, []);

  return (
    <div className="container">
      <section>
        <h5 className="text-center">Eventos Disponibles</h5>
      </section>
      <section className="container text-center">
        <div className="card" style={{ width: "18rem" }}>
          <NavLink to="/Forms">
            <img
              src="/img-lyr-sinlimites.jpeg"
              className="card-img-top"
              alt="Escuela de Entrenamiento"
            />
          </NavLink>
          <div className="card-body">
            <h5 className="card-title">Escuela de Entrenamiento</h5>
            <p className="card-text">Ya somos {lrCount} inscritos</p>
          </div>
        </div>
        {/* <div class="card" style={{ width: "18rem" }}>
          <NavLink to="/CampamentoJuvenil">
            <img
              src="/CampamentoJuvenil.jpeg"
              class="card-img-top"
              alt="Imagen-Contacto"
            />
          </NavLink>
          <div class="card-body">
            <h5 class="card-title">Campamento Juvenil</h5>
            <p class="card-text">Ya somos {entrega2Count} inscritos</p>
          </div>
        </div> */}
      </section>
    </div>
  );
};
