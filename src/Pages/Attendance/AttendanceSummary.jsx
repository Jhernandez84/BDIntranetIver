import React from 'react'
import './styles.css'

export const AttendanceSummary = ({ attendanceData }) => {
  const countPresent = attendanceData.reduce((accumulator, currentElement) => {
    if (currentElement.EventoEstado === "presente") {
      return accumulator + 1;
    }
    return accumulator;
  }, 0);

  const countDeleted = attendanceData.reduce((accumulator, currentElement) => {
    if (currentElement.EventoEstado === "eliminado") {
      return accumulator + 1;
    }
    return accumulator;
  }, 0);
  // console.log(`Number of elements with EventoEstado = 'presente' in the array: ${count}`);
  return (
    <div className='detail-container'>
      <p className='detail-title'>Inscripciones</p>
      <p className='detail-detail'>Total Inscritos: {attendanceData.length}</p>
      <p className='detail-detail'>Presentes: {countPresent}</p>
      <p className='detail-detail'>Pendientes: {attendanceData.length - countPresent - countDeleted} </p>
      {/* <p className='detail-detail'>Eliminados: {countDeleted} </p> */}
    </div>
  )
}

export const PaidLunchSummary = ({ attendanceData }) => {
  const countAlmuerzos = attendanceData.reduce((accumulator, currentElement) => {
    if (currentElement.Almuerzo === "Si") {
      return accumulator + 1;
    }
    return accumulator;
  }, 0);

  const countPagados = attendanceData.reduce((accumulator, currentElement) => {
    if (currentElement.EventoPagado === "Si") {
      return accumulator + 1;
    }
    return accumulator;
  }, 0);

  const countDeleted = attendanceData.reduce((accumulator, currentElement) => {
    if (currentElement.EventoEstado === "eliminado") {
      return accumulator + 1;
    }
    return accumulator;
  }, 0);
  // console.log(`Number of elements with EventoEstado = 'presente' in the array: ${count}`);
  return (
    <div className='detail-container'>
      <p className='detail-title'>Almuerzos</p>
      <p className='detail-detail'>Total: {countAlmuerzos}</p>
      <p className='detail-detail'>Pagados: {countPagados}</p>
      <p className='detail-detail'>Pendientes: {countAlmuerzos - countPagados} </p>
      {/* <p className='detail-detail'>Eliminados: {countDeleted} </p> */}
    </div>
  )
}

export const DeliveredLunchSummary = ({ attendanceData }) => {
  const countTotalPagados = attendanceData.reduce((accumulator, currentElement) => {
    if (currentElement.EventoPagado === "Si") {
      return accumulator + 1;
    }
    return accumulator;
  }, 0);

  const countEntregados = attendanceData.reduce((accumulator, currentElement) => {
    if (currentElement.EventoColacionEntregada === "Si") {
      return accumulator + 1;
    }
    return accumulator;
  }, 0);

  const countDeleted = attendanceData.reduce((accumulator, currentElement) => {
    if (currentElement.EventoEstado === "eliminado") {
      return accumulator + 1;
    }
    return accumulator;
  }, 0);

  // console.log(`Number of elements with EventoEstado = 'presente' in the array: ${count}`);

  return (
    <div className='detail-container'>
      <p className='detail-title'>Almuerzos</p>
      <p className='detail-detail'>Total pagados: {countTotalPagados}</p>
      <p className='detail-detail'>Entregados: {countEntregados}</p>
      <p className='detail-detail'>Pendientes: {countTotalPagados - countEntregados} </p>
      {/* <p className='detail-detail'>Eliminados: {countDeleted} </p> */}
    </div>
  )
}