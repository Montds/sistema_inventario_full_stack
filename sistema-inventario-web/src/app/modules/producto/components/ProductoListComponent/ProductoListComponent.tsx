import { useEffect, useState } from 'react';

import './ProductoListComponent.css';

import ProductoItemComponent from '@src/app/modules/producto/components/ProductoItemComponent/ProductoItemComponent.tsx';

import type { IProducto } from "@src/app/core/models/producto.model.ts";

import { ProductService } from "@src/app/modules/producto/services/ProductService";

function ListProductComponent() {
    const [productos, setProductos] = useState<IProducto[]>([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadProducts = async () => {
            const data = await ProductService.getAllProducts();

            if (data === null) {
                setIsError(true);
            } else {
                setProductos(data);
                setIsError(false);
            }
            setIsLoading(false);
        };
        loadProducts();
    }, []);

    return (
        <div className="list-container">
            <h2 className="title-section">Productos</h2>

            {isLoading ? (
                <p className="loading-message">Cargando productos...</p>
            ) : isError ? (
                <p className="error-message">Error en el servidor</p>
            ) : productos.length === 0 ? (
                <p className="empty-message">No hay productos registrados</p>
            ) : (
                productos.map((producto) => (
                    <ProductoItemComponent
                        key={producto.sku}
                        producto={producto}
                    />
                ))
            )}
        </div>
    );
}

export default ListProductComponent;