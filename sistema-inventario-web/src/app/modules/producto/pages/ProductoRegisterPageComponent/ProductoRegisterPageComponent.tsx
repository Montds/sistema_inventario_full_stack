import { useLocation } from 'react-router-dom';
import NavBarComponent from "@src/app/shared/NavBarComponent/NavBarComponent";
import ProductoRegisterFormComponent from "@src/app/modules/producto/components/ProductoRegisterFormComponent/ProductoRegisterFormComponent";

function ProductoRegisterPageComponent() {
    const location = useLocation();

    return (
        <>
            <NavBarComponent />
            <ProductoRegisterFormComponent/>
        </>
    );
}

export default ProductoRegisterPageComponent;