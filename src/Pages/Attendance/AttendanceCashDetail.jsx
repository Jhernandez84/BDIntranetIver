import "./styles.css";

const AttendanceCashDetail = ({ data }) => {
  // Summary object
  const summary = {};
//   console.log(data);
  // Iterate through the data array
  data.forEach((item) => {
    // Check if EventoPagado is true and EventoMedioPago and EventoRecibePago are not null or undefined
    if (
      item.EventoPagado === "Si" &&
      item.hasOwnProperty("EventoMedioPago") &&
      item.hasOwnProperty("EventoRecibePago") &&
      item.EventoMedioPago &&
      item.EventoRecibePago &&
      item.EventoMedioPago !== "Undefined" &&
      item.EventoRecibePago !== "Seleccione" &&
      item.EventoMedioPago !== "Undefined" &&
      item.EventoRecibePago !== "Seleccione" &&
      item.EventoMedioPago !== null &&
      item.EventoRecibePago !== null
    ) {
      const eventoRecibePago = item.EventoRecibePago;
      const eventoMedioPago = item.EventoMedioPago;

      // Initialize the count if not present
      summary[eventoRecibePago] = summary[eventoRecibePago] || {};

      // Increment the count for the specific EventoMedioPago
      summary[eventoRecibePago][eventoMedioPago] =
        (summary[eventoRecibePago][eventoMedioPago] || 0) + 5000;
    }
  });

  // Extract unique EventoMedioPago values
  const uniqueEventosMedioPago = Array.from(
    new Set(data.map((item) => item.EventoMedioPago))
  ).filter(
    (value) => value !== "Undefined" && value !== "" && value !== "undefined" && value !== "Seleccione" && value !== null
  );

  // Render the summary table
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Recibe</th>
            {uniqueEventosMedioPago.map((eventoMedioPago) => (
              <th key={eventoMedioPago}>{eventoMedioPago}</th>
            ))}
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(summary).map(
            ([eventoRecibePago, eventoMedioPagos]) => (
              <tr className="detail-detail" key={eventoRecibePago}>
                <td>{eventoRecibePago}</td>
                {uniqueEventosMedioPago.map((eventoMedioPago) => (
                  <td key={eventoMedioPago}>
                    {eventoMedioPagos[eventoMedioPago] || 0}
                  </td>
                ))}
                <td>
                  {Object.values(eventoMedioPagos).reduce(
                    (acc, val) => acc + val,
                    0
                  ) || 0}
                </td>
              </tr>
            )
          )}
          <tr>
            <td><strong>Total</strong></td>
            {uniqueEventosMedioPago.map((eventoMedioPago) => (
              <td className="detail-detail" key={eventoMedioPago}><strong>
                {Object.values(summary).reduce(
                  (acc, event) => acc + (event[eventoMedioPago] || 0),
                  0
                ) || 0}
              </strong></td>
            ))}
            <td><strong>
              {Object.values(summary).reduce(
                (acc, event) =>
                  acc + Object.values(event).reduce((a, v) => a + v, 0),
                0
              ) || 0}
            </strong></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceCashDetail;
