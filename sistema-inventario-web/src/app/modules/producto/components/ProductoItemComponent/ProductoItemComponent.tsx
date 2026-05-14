import { useNavigate } from 'react-router-dom';
import './ProductoItemComponent.css';
import type { IProducto } from "@src/app/core/models/producto.model.ts";
import {RUTAS} from "@src/utilities/routes.ts";

interface Props {
    producto: IProducto;
}

const ProductoItemComponent = ({ producto }: Props) => {
    const navigate = useNavigate();

    const handleRedirect = () => {
        const newurl = RUTAS.PRODUCT_DATA_SKU.replace(':sku', producto.sku);
        navigate(newurl);
    };

    return (
        <div className="product-card" title="Ir a detalles" onClick={handleRedirect}>
            <span className="product-title">{producto.nombre}</span>
            <span className="product-sku-text">{producto.sku}</span>
        </div>
    );
}

export default ProductoItemComponent;