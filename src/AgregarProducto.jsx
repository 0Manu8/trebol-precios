import React, { useState } from 'react';

const AgregarProducto = ({ onCancelar, onExito }) => {
  const [formData, setFormData] = useState({
    Nombre: '',
    Descripcion: '',
    Precio: '',
    Stock: '',
    categoria: '',
    codigo_barras: '',
    imagen: '',
    calificacion: 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://100.119.237.80/api/productos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      alert('Producto agregado exitosamente');
      onExito();
    } catch (error) {
      console.error('Error al agregar producto:', error);
      alert('Ocurrió un error al agregar el producto.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg w-full max-w-lg shadow-lg"
      >
        <h2 className="text-xl font-bold mb-4">Agregar Producto</h2>
        {Object.keys(formData).map((key) => (
          <div className="mb-2" key={key}>
            <label className="block font-semibold mb-1 capitalize">{key.replace('_', ' ')}</label>
            <input
              type={
                key === 'Precio' || key === 'Stock' || key === 'calificacion'
                  ? 'number'
                  : 'text'
              }
              name={key}
              value={formData[key]}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          </div>
        ))}
        <div className="flex justify-end gap-4 mt-4">
          <button
            type="button"
            onClick={onCancelar}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AgregarProducto;
