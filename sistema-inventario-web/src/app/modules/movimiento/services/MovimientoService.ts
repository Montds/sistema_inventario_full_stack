import axios from "axios";
import type { IMovimiento } from "@src/app/core/models/movimiento.model.ts"; // Asegúrate de que la ruta sea correcta
import API_CONFIG from "@src/enviroments/enviroment.development";

const URL = `${API_CONFIG.BASE_URL}/movimientos`;

export class MovimientoService {

    static async getAllMovimientos(): Promise<IMovimiento[]|null> {
        try {
            const response = await axios.get(URL);
            return response.data;
        } catch (error) {
            console.error('Error obteniendo movimientos', error);
            return null;
        }
    }

    static async getMovimientoById(id: number): Promise<IMovimiento | null> {
        try {
            const response = await axios.get(`${URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error obteniendo movimiento con ID: ${id}`, error);
            return null;
        }
    }

    static async createMovimiento(movimiento: IMovimiento): Promise<IMovimiento | null> {
        try {
            const response = await axios.post(URL, movimiento);
            return response.data;
        } catch (error) {
            console.error('Error creando movimiento', error);
            return null;
        }
    }

    static async updateMovimiento(id: number, movimiento: IMovimiento): Promise<IMovimiento | null> {
        try {
            const response = await axios.put(`${URL}/${id}`, movimiento);
            return response.data;
        } catch (error) {
            console.error(`Error actualizando movimiento con ID: ${id}`, error);
            return null;
        }
    }

    static async deleteMovimiento(id: number): Promise<IMovimiento | null> {
        try {
            const response = await axios.delete(`${URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error eliminando movimiento con ID: ${id}`, error);
            return null;
        }
    }
}