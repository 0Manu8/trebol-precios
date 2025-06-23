import React, { useState, useEffect } from 'react';
import { Heart, Star, Pencil } from 'lucide-react';
import { Producto } from './types';

interface Props {
  agregarAlCarrito: (producto: Producto) => void;
  likeProduct: (producto: Producto) => void;
  likedProducts: Producto[];
  filtro: string;
  onEditarProducto: (producto: Producto) => void;
}

const ListaProductos: React.FC<Props> = ({
  agregarAlCarrito,
  likeProduct,
  likedProducts,
  filtro,
  onEditarProducto,
}) => {
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch('https://100.119.237.80/api/productos');
        const data = await response.json();

        if (Array.isArray(data)) {
          const productosConvertidos = data.map((producto: any, index: number) => ({
            id: producto.ProductoID ?? `temp-${index}`,
            nombre: producto.Nombre,
            descripcion: producto.Descripcion,
            precio: Number(producto.Precio),
            stock: producto.Stock,
            fechaCreacion: producto.FechaCreacion,
            categoria: producto.categoria,
            imagen: producto.imagen || 'https://placehold.co/600x400',
            calificacion: producto.calificacion || 0,
            codigo_barras: String(producto.codigo_barras || ''),
          }));
          setProductos(productosConvertidos);
        }
      } catch (error) {
        console.error('Error al cargar los productos:', error);
      }
    };

    fetchProductos();
  }, []);

  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
    producto.codigo_barras.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold mb-8 text-center">Nuestros Productos</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {productosFiltrados.map((producto) => (
          <div
            key={producto.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow relative"
          >
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-1">{producto.nombre}</h3>
              <p className="text-sm text-gray-500 mb-1">
                <strong>Código:</strong> {producto.codigo_barras}
              </p>
              <div className="flex justify-between items-center mb-2">
                <span className="text-2xl font-bold text-blue-600">
                  ${Number(producto.precio).toFixed(2)}
                </span>
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      fill={i < producto.calificacion ? 'currentColor' : 'none'}
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4">{producto.descripcion}</p>
              <div className="flex justify-between items-center">
                <button
                  onClick={() => likeProduct(producto)}
                  className="text-red-500 hover:text-red-700 bg-black px-2 py-1 rounded"
                >
                  {likedProducts.some((p) => p.id === producto.id) ? (
                    <Heart fill="currentColor" />
                  ) : (
                    <Heart />
                  )}
                </button>

                <button
                  onClick={() => onEditarProducto(producto)}
                  className="text-gray-600 hover:text-black bg-yellow-300 px-2 py-1 rounded flex items-center"
                >
                  <Pencil className="w-4 h-4 mr-1" /> Editar
                </button>

                <button
                  onClick={() => agregarAlCarrito(producto)}
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Añadir al Carrito
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaProductos;
