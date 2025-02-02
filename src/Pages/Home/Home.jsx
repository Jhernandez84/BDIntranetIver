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

  useEffect(() => {
    const collectionRef2 = db.collection("Escuela Infantil");
    collectionRef2
      .get()
      .then((querySnapshot) => {
        // Apply the filter to exclude records with EventoEstado "eliminado"
        const filteredRecords = querySnapshot.docs.filter(
          (record) => record.data().EventoEstado !== "eliminado"
        );
        const recordCount = filteredRecords.length;
        setEntrega2Count(recordCount);
        // console.log(`Number of records: ${recordCount}`);
      })
      .catch((error) => {
        console.error("Error getting documents: ", error);
      });
  }, []);

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

      <section className="card-container text-center">
        <div className="card" style={{ width: "18rem" }}>
          <NavLink to="/Iver_EscuelaDeEntrenamiento">
            <img
              src="/Iver_esc_entrenamiento.png"
              className="card-img-top"
              alt="Escuela de Entrenamiento"
            />
          </NavLink>
          <div className="card-body">
            <h5 className="card-title">Escuela de Entrenamiento</h5>
            {lrCount > 1 ? (
              <p className="card-text">Ya somos {lrCount} inscritos</p>
            ) : lrCount === 1 ? (
              <p className="card-text">
                Ya hay 1 inscrito, ¿Que estás esperando?
              </p>
            ) : null}
          </div>
        </div>
      </section>
      <section className="card-container text-center">
        <div class="card" style={{ width: "18rem" }}>
          <NavLink to="/IverKids_EscuelaInfantil">
            <img
              src="/IverKidsLogo.jpg"
              class="card-img-top"
              alt="Imagen-Contacto"
            />
          </NavLink>
          <div class="card-body">
            <h5 class="card-title">IverKids - Escuela Infantil</h5>
            {entrega2Count > 1 ? (
              <p className="card-text">Ya somos {entrega2Count} inscritos</p>
            ) : entrega2Count === 1 ? (
              <p className="card-text">
                Ya hay 1 inscrito, ¿Que estás esperando?
              </p>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
};
