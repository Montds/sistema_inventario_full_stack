import type {IProducto} from "./producto.model.ts"; // Asegúrate de importar tu interfaz anterior


    export interface IMovimiento {
        id: number;
        fecha: string | Date;
        tipo: string;
        cantidad: number;
        stockResultante: number;
        producto: IProducto;
        estado?: string;

    }