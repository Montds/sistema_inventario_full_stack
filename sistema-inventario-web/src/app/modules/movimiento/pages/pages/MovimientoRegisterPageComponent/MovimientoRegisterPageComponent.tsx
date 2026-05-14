
import { useLocation } from 'react-router-dom';
import NavBarComponent from "@src/app/shared/NavBarComponent/NavBarComponent.tsx";
import MovimientoRegisterFormComponent from "@src/app/modules/movimiento/components/MovimientoRegisterFormComponent/MovimientoRegisterFormComponent";


function MovimientoRegisterPageComponent() {
    const location = useLocation();
    return (
        <>
            <NavBarComponent />
            <MovimientoRegisterFormComponent tipoRecibido={location.state?.tipo} />
        </>
    );
}

export default MovimientoRegisterPageComponent;