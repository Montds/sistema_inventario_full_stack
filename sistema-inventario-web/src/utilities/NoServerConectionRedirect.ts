import type {NavigateFunction} from "react-router-dom";
import { ProductService } from "@src/app/modules/producto/services/ProductService";
import { RUTAS } from "@src/utilities/routes";

export async function NoServerConectionRedirect(navigate: NavigateFunction) {
    const products = await ProductService.getAllProducts();

    if (products === null) {
        alert("No hay conexion con el servidor redirigiieendo a pagina principal")
        navigate(RUTAS.PRODUCT);
    }
}