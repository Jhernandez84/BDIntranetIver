import React from "react";
import { auth, db, provider } from "../Firebase/firebase";

export const CargaData = () => {
  const data = [];

  const SendData = async (e) => {
    const DBOrigin = "L&R Libres en Espiritu";

    const dataImport = data;

    console.log(dataImport.length);
    e.preventDefault();

    try {
      await Promise.all(
        dataImport.map(async (record) => {
          await db.collection(`${DBOrigin}`).add(record);
        })
      );
      console.log("Data imported successfully");
    } catch (error) {
      console.error("Error importing data:", error);
    }
  };

  return <button onClick={SendData}> Run de Carga </button>;
};
