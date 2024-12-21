import React, { useState } from 'react';
import Partidos from './Partidos';
import InicioSesion from './InicioSesion';
import Registro from './Registro';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

const App = () => {
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(false);
  const [formularioActivo, setFormularioActivo] = useState(null);

  const manejarAutenticacion = () => {
    setUsuarioAutenticado(true);
  };

  const manejarRegistro = () => {
    setFormularioActivo('registro');
  };

  const manejarInicioSesion = () => {
    setFormularioActivo('inicioSesion');
  };

  const cerrarSesion = () => {
    setUsuarioAutenticado(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={usuarioAutenticado ? <Navigate to="/partidos" /> : (
          <div className="home-container">
            {formularioActivo === null ? (
              <div className="home-content">
                <h1 className="title">Bienvenido a la App de Fútbol</h1>
                <button onClick={manejarInicioSesion} className="btn btn-primary">Iniciar sesión</button>
                <button onClick={manejarRegistro} className="btn btn-secondary">Registrarse</button>
              </div>
            ) : formularioActivo === 'inicioSesion' ? (
              <InicioSesion onLogin={manejarAutenticacion} />
            ) : (
              <Registro onRegister={manejarAutenticacion} />
            )}
          </div>
        )} />

        <Route path="/partidos" element={usuarioAutenticado ? <Partidos onLogout={cerrarSesion} /> : <Navigate to="/" />} />
        <Route path="/registro" element={usuarioAutenticado ? <Navigate to="/partidos" /> : <Registro onRegister={manejarAutenticacion} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
