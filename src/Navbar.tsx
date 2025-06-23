import React, { useState } from 'react';

const Navbar: React.FC<{
  cambiarPagina: (pagina: string) => void;
  paginaActual: string;
  onBuscar: (texto: string) => void;
}> = ({ cambiarPagina, paginaActual, onBuscar }) => {
  const [busqueda, setBusqueda] = useState('');

  const manejarCambioBusqueda = (e: React.ChangeEvent<HTMLInputElement>) => {
    const texto = e.target.value;
    setBusqueda(texto);
    onBuscar(texto);
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <button
            onClick={() => cambiarPagina('inicio')}
            className="text-2xl font-bold text-blue-600"
          >
            Trebol
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={busqueda}
            onChange={manejarCambioBusqueda}
            className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={() => cambiarPagina('inicio')}
            className={`hover:text-blue-600 ${
              paginaActual === 'inicio' ? 'text-blue-600 font-bold' : ''
            }`}
          >
            Inicio
          </button>
          <button
            onClick={() => cambiarPagina('favoritos')}
            className={`hover:text-red-500 ${
              paginaActual === 'favoritos' ? 'text-red-500 font-bold' : ''
            }`}
          >
            Favoritos
          </button>
          <button
            onClick={() => cambiarPagina('carrito')}
            className={`hover:text-blue-600 ${
              paginaActual === 'carrito' ? 'text-blue-600 font-bold' : ''
            }`}
          >
            Carrito
          </button>
          <button
            onClick={() => cambiarPagina('usuario')}
            className={`hover:text-blue-600 ${
              paginaActual === 'usuario' ? 'text-blue-600 font-bold' : ''
            }`}
          >
            Usuario
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
