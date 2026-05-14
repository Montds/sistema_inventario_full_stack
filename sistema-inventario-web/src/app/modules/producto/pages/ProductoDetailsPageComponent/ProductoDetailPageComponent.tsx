import { useLocation } from 'react-router-dom';
import NavBarComponent from "@src/app/shared/NavBarComponent/NavBarComponent";
import ProductoDetailFormComponent
    from "@src/app/modules/producto/components/ProductoDetailFormComponent/ProductoDetailFormComponent";

function ProductoDetailPageComponent() {
    const location = useLocation();

    return (
        <>
            <NavBarComponent />
            <ProductoDetailFormComponent />
        </>
    );
}

export default ProductoDetailPageComponent;