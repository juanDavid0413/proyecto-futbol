import React, { useState, useEffect } from 'react';
import AgregarPartido from './AgregarPartido';
import { v4 as uuid } from 'uuid';
import { useNavigate } from 'react-router-dom';  

const Partidos = ({ onLogout }) => { 
  const [partidos, setPartidos] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [partidoAEditar, setPartidoAEditar] = useState(null);
  const [filtro, setFiltro] = useState('');
  const [modoEdicion, setModoEdicion] = useState(false);
  const navigate = useNavigate();  

  useEffect(() => {
    const partidosLocalStorage = localStorage.getItem('partidos');
    if (partidosLocalStorage) {
      setPartidos(JSON.parse(partidosLocalStorage));
    }
  }, []);

  const agregarPartido = (partido) => {
    const nuevoPartido = { ...partido, id: uuid() };
    const nuevosPartidos = [...partidos, nuevoPartido];
    setPartidos(nuevosPartidos);
    localStorage.setItem('partidos', JSON.stringify(nuevosPartidos));
    setMostrarFormulario(false);
  };

  const eliminarPartido = (index) => {
    const nuevosPartidos = partidos.filter((_, i) => i !== index);
    setPartidos(nuevosPartidos);
    localStorage.setItem('partidos', JSON.stringify(nuevosPartidos));
  };

  const editarPartido = (index) => {
    const partido = partidos[index];
    setPartidoAEditar(partido);
    setMostrarFormulario(true);
    setModoEdicion(true);
  };

  const guardarEdicion = (partidoEditado) => {
    const nuevosPartidos = partidos.map((partido) =>
      partido.id === partidoEditado.id ? partidoEditado : partido
    );
    setPartidos(nuevosPartidos);
    localStorage.setItem('partidos', JSON.stringify(nuevosPartidos));
    setMostrarFormulario(false);
    setModoEdicion(false);
    setPartidoAEditar(null);
  };

  const cancelarEdicion = () => {
    setMostrarFormulario(false);
    setModoEdicion(false);
    setPartidoAEditar(null);
  };

  const partidosFiltrados = partidos.filter((partido) =>
    (partido.equipoLocal || '').toLowerCase().includes(filtro.toLowerCase()) ||
    (partido.equipoVisitante || '').toLowerCase().includes(filtro.toLowerCase()) ||
    (partido.fecha || '').includes(filtro) ||
    (partido.hora || '').includes(filtro)
  );
  

  const ordenarAscendente = () => {
    const partidosOrdenados = [...partidos].sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
    setPartidos(partidosOrdenados);
  };

  const cerrarSesion = () => {
    localStorage.removeItem('usuario'); 
    onLogout(); 
    navigate('/'); 
  };

  return (
    <div>
      <h2 className="mb-3">Lista de Partidos</h2>

      {mostrarFormulario ? (
        <div>
          <AgregarPartido
            onAgregar={modoEdicion ? guardarEdicion : agregarPartido}
            partidoAEditar={partidoAEditar}
          />
          <button className="btn btn-secondary mt-3" onClick={cancelarEdicion}>
            Cancelar
          </button>
        </div>
      ) : (
        <>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Filtrar por equipo, fecha u hora..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />

          <button onClick={ordenarAscendente} className="btn btn-info mb-3">
            Ordenar Ascendente
          </button>

          <button onClick={cerrarSesion} className="btn btn-danger mb-3">
            Cerrar sesión
          </button>

          <button
            onClick={() => setMostrarFormulario(true)}
            className="btn btn-success mb-3"
          >
            Agregar Partido
          </button>

          <ul className="list-group">
            {partidosFiltrados.map((partido, index) => (
              <li className="list-group-item" key={partido.id}>
                <strong>{partido.equipoLocal}</strong> vs <strong>{partido.equipoVisitante}</strong>
                <br />
                <small>Fecha: {partido.fecha} | Hora: {partido.hora}</small>
                <br />
                <small>Estadio: {partido.estadio} | Árbitro: {partido.arbitro}</small>
                <div className="mt-2">
                  <button
                    onClick={() => editarPartido(index)}
                    className="btn btn-warning btn-sm me-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => eliminarPartido(index)}
                    className="btn btn-danger btn-sm"
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Partidos;
