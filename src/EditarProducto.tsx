import React, { useState } from 'react';
import { Producto } from './types';

interface Props {
  producto: Producto;
  onGuardar: (producto: Producto) => void;
  onCancelar: () => void;
}

const EditarProducto: React.FC<Props> = ({ producto, onGuardar, onCancelar }) => {
  const [formData, setFormData] = useState<Producto>({ ...producto });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: ['precio', 'stock', 'calificacion'].includes(name) ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.id || String(formData.id).startsWith('temp')) {
      alert('Este producto no tiene un ID válido para ser editado.');
      return;
    }

    try {
      const response = await fetch(`https://100.119.237.80/api/productos/${formData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Error al actualizar el producto');
      
      onGuardar(formData);
    } catch (error) {
      console.error('Error al guardar cambios:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl">
        <h2 className="text-2xl font-bold mb-4">Editar Producto</h2>

        <label className="block mb-2">Nombre</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          className="w-full border p-2 mb-4 rounded"
        />

        <label className="block mb-2">Descripción</label>
        <textarea
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          className="w-full border p-2 mb-4 rounded"
        />

        <label className="block mb-2">Precio</label>
        <input
          type="number"
          name="precio"
          value={formData.precio}
          onChange={handleChange}
          className="w-full border p-2 mb-4 rounded"
        />

        <label className="block mb-2">Stock</label>
        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          className="w-full border p-2 mb-4 rounded"
        />

        <label className="block mb-2">Calificación</label>
        <input
          type="number"
          name="calificacion"
          value={formData.calificacion}
          onChange={handleChange}
          className="w-full border p-2 mb-4 rounded"
          min={0}
          max={5}
        />

        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={onCancelar}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditarProducto;
