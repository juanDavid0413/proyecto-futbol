import React, { useState, useEffect } from 'react';

const AgregarPartido = ({ onAgregar, partidoAEditar }) => {
  const [partido, setPartido] = useState({
    equipoLocal: '',
    equipoVisitante: '',
    estadio: '',
    fecha: '',
    hora: '',
    arbitro: '',
  });

  useEffect(() => {
    if (partidoAEditar) {
      setPartido(partidoAEditar);
    }
  }, [partidoAEditar]);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setPartido({
      ...partido,
      [name]: value,
    });
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    onAgregar(partido);
  };

  return (
    <div className="container">
      <h2>{partidoAEditar ? 'Editar Partido' : 'Agregar Partido'}</h2>
      <form onSubmit={manejarEnvio}>
        <div className="mb-3">
          <label htmlFor="equipoLocal" className="form-label">Equipo Local</label>
          <input
            type="text"
            className="form-control"
            id="equipoLocal"
            name="equipoLocal"
            value={partido.equipoLocal}
            onChange={manejarCambio}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="equipoVisitante" className="form-label">Equipo Visitante</label>
          <input
            type="text"
            className="form-control"
            id="equipoVisitante"
            name="equipoVisitante"
            value={partido.equipoVisitante}
            onChange={manejarCambio}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="estadio" className="form-label">Estadio</label>
          <input
            type="text"
            className="form-control"
            id="estadio"
            name="estadio"
            value={partido.estadio}
            onChange={manejarCambio}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="fecha" className="form-label">Fecha</label>
          <input
            type="date"
            className="form-control"
            id="fecha"
            name="fecha"
            value={partido.fecha}
            onChange={manejarCambio}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="hora" className="form-label">Hora</label>
          <input
            type="time"
            className="form-control"
            id="hora"
            name="hora"
            value={partido.hora}
            onChange={manejarCambio}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="arbitro" className="form-label">Árbitro</label>
          <input
            type="text"
            className="form-control"
            id="arbitro"
            name="arbitro"
            value={partido.arbitro}
            onChange={manejarCambio}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">{partidoAEditar ? 'Guardar Cambios' : 'Agregar Partido'}</button>
      </form>
    </div>
  );
};

export default AgregarPartido;
