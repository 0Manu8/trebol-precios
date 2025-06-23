import React, { useState } from 'react';
import Navbar from './Navbar';
import ListaProductos from './ListaProductos';
import AgregarProducto from './AgregarProducto';
import EditarProducto from './EditarProducto';
import { Producto } from './types';

const App: React.FC = () => {
  const [paginaActual, setPaginaActual] = useState('inicio');
  const [filtro, setFiltro] = useState('');
  const [likedProducts, setLikedProducts] = useState<Producto[]>([]);
  const [carrito, setCarrito] = useState<Producto[]>([]);
  const [mostrarAgregar, setMostrarAgregar] = useState(false);
  const [productoEditando, setProductoEditando] = useState<Producto | null>(null);
  const [recargarLista, setRecargarLista] = useState(false);

  const likeProduct = (producto: Producto) => {
    setLikedProducts((prev) =>
      prev.some((p) => p.id === producto.id)
        ? prev.filter((p) => p.id !== producto.id)
        : [...prev, producto]
    );
  };

  const agregarAlCarrito = (producto: Producto) => {
    setCarrito((prev) => [...prev, producto]);
  };

  const onProductoGuardado = () => {
    setMostrarAgregar(false);
    setProductoEditando(null);
    setRecargarLista(true);
    setTimeout(() => setRecargarLista(false), 100); // para recargar lista
  };

  const editarProducto = (producto: Producto) => {
    setProductoEditando(producto);
  };

  return (
    <div className="pt-20 relative">
      <Navbar
        cambiarPagina={setPaginaActual}
        paginaActual={paginaActual}
        onBuscar={setFiltro}
      />

      <div className="flex justify-center my-4">
        <button
          onClick={() => setMostrarAgregar(true)}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Agregar Producto
        </button>
      </div>

      {paginaActual === 'inicio' && (
        <ListaProductos
          agregarAlCarrito={agregarAlCarrito}
          likeProduct={likeProduct}
          likedProducts={likedProducts}
          filtro={filtro}
          onEditarProducto={editarProducto}
          key={recargarLista ? 'recarga' : 'lista'} // fuerza recarga cuando se agregue o edite
        />
      )}

      {mostrarAgregar && (
        <AgregarProducto
          onCancelar={() => setMostrarAgregar(false)}
          onExito={onProductoGuardado}
        />
      )}

      {productoEditando && (
        <EditarProducto
          producto={productoEditando}
          onCancelar={() => setProductoEditando(null)}
          onGuardar={onProductoGuardado}
        />
      )}
    </div>
  );
};

export default App;
