import { useNavigate } from 'react-router-dom';
import './MenuOpcionesComponent.css';
import { RUTAS } from "@src/utilities/routes";

interface Props {
    mostrarRegistrarProducto?: boolean;
    mostrarRegistrarEntrada?: boolean;
    mostrarRegistrarSalida?: boolean;
}

function MenuOpcionesComponent ({
                                   mostrarRegistrarProducto = false,
                                   mostrarRegistrarEntrada = false,
                                   mostrarRegistrarSalida = false
                               }: Props) {

    const navigate = useNavigate();

    const navegarA = (ruta: string, estado: any = null) => {
        navigate(ruta, { state: estado });
    };

    return (
        <div className="menu-opciones-container">
            {mostrarRegistrarProducto && (
                <button
                    className="btn-opcion"
                    onClick={() => navegarA(RUTAS.PRODUCT_DATA_REGISTER)}
                >
                    Registrar Producto
                </button>
            )}

            {mostrarRegistrarEntrada && (
                <button
                    className="btn-opcion"
                    onClick={() => navegarA(RUTAS.MOVEMENT_ENTRY, { tipo: 'ENTRADA' })}
                >
                    Registrar Entrada
                </button>
            )}

            {mostrarRegistrarSalida && (
                <button
                    className="btn-opcion"
                    onClick={() => navegarA(RUTAS.MOVEMENT_EXIT, { tipo: 'SALIDA' })}
                >
                    Registrar Salida
                </button>
            )}
        </div>
    );
};

export default MenuOpcionesComponent;