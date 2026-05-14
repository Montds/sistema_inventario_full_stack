import axios from "axios";
import type { IProducto } from "@src/app/core/models/producto.model.ts";
import API_CONFIG from "@src/enviroments/enviroment.development.ts";

const URL = `${API_CONFIG.BASE_URL}/productos`;

export class ProductService {

    static async getAllProducts(): Promise<IProducto[] | null> {
        try {
            const response = await axios.get(URL);
            return response.data;
        } catch (error) {
            console.error('Error obteniendo productos', error);
            return null;
        }
    }
    static async getProductBySku(sku: string): Promise<IProducto | null> {
        try {
            const response = await axios.get(`${URL}/${sku}`);
            return response.data;
        } catch (error) {
            console.error('Error obteniendo producto', error);
            return null;
        }
    }

    static async createProduct(producto: IProducto): Promise<IProducto | null> {
        try {
            const response = await axios.post(URL, producto);
            return response.data;
        } catch (error) {
            console.error('Error creando producto', error);
            return null;
        }
    }

    static async updateProduct(sku: string, producto: IProducto): Promise<IProducto | null> {
        try {
            const response = await axios.put(`${URL}/${sku}`, producto);
            return response.data;
        } catch (error) {
            console.error('Error actualizando producto', error);
            return null;
        }
    }

    static async deleteProduct(sku: string): Promise<IProducto|null>{
        try {
            const response = await axios.delete(`${URL}/${sku}`);
            return response.data;
        } catch {
            return null;
        }
    }
}