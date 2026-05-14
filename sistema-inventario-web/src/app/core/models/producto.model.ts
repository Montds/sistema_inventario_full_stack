export interface IProducto {

    sku: string;
    nombre: string;
    precio: number;
    stockActual: number;
    stockMinimo: number;
    estado?: string;
    totalMovimientos?: number;
}