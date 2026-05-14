import './ReporteListComponent.css';
import ReporteTableComponent from "@src/app/modules/reporte/components/ReporteTableComponent/ReporteTableComponent.tsx";
import {useEffect, useState} from "react";
import type {IProducto} from "@src/app/core/models/producto.model.ts";
import {ProductService} from "@src/app/modules/producto/services/ProductService.ts";

function ReporteListComponent() {
    const [productos, setProductos] = useState<IProducto[]>([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadReporte = async () => {
            const data = await ProductService.getAllProducts();

            if (data === null) {
                setIsError(true);
            } else {
                setProductos(data);
                setIsError(false);
            }
            setIsLoading(false);
        };
        loadReporte();
    }, []);

    return (
        <div className="list-container">
            <h2 className="title-section">Reporte de Inventario</h2>

            {isLoading ? (
                <p className="loading-message">Cargando reporte de inventario...</p>
            ) : isError ? (
                <p className="error-message">Error en el servidor</p>
            ) : productos.length === 0 ? (
                <p className="empty-message">No hay productos registrados</p>
            ) : (
                <ReporteTableComponent productos={productos} />
            )}
        </div>
    );
}

export default ReporteListComponent;