import React, { useState } from 'react';

const Registro = ({ onRegister }) => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const guardarUsuario = (nombre, email, password) => {
    const usuario = { nombre, email, password };
    localStorage.setItem('usuario', JSON.stringify(usuario));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    guardarUsuario(nombre, email, password); 
    alert('Usuario registrado con éxito!');
    onRegister(); 
  };

  return (
    <div className="container">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            value={nombre}
            onChange={(event) => setNombre(event.target.value)}
            className="form-control mb-3"
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="form-control mb-3"
            required
          />
        </label>
        <label>
          Contraseña:
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="form-control mb-3"
            required
          />
        </label>
        <button type="submit" className="btn btn-primary">Registrar</button>
      </form>
    </div>
  );
};

export default Registro;
