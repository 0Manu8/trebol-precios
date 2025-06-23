export interface Producto {
  id: string | number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  fechaCreacion?: string;
  categoria?: string;
  codigo_barras: string;
  imagen?: string;
  calificacion?: number;
}
