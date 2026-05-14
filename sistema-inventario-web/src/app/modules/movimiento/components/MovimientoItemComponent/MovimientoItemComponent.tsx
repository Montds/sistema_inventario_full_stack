import { useNavigate } from 'react-router-dom';
import './MovimientoItemComponent.css';
import type { IMovimiento } from "@src/app/core/models/movimiento.model.ts";
import { RUTAS } from "@src/utilities/routes.ts";

interface Props {
    movimiento: IMovimiento;
}

const MovimientoItemComponent = ({ movimiento }: Props) => {
    const navigate = useNavigate();

    const handleRedirect = () => {
        console.log("CLICK MOVIMIENTO");
        console.log(movimiento);

        if (!movimiento.id) {
            console.error("El movimiento no tiene ID");
            return;
        }

        const urlDestino = `/movimiento/data/${movimiento.id}`;

        console.log("Redireccionando a:", urlDestino);

        navigate(urlDestino, {
            state: { movimiento }
        });
    };

    const fechaFormateada =
        movimiento.fecha instanceof Date
            ? movimiento.fecha.toLocaleDateString()
            : movimiento.fecha.toString();

    return (
        <div
            className="movimiento-card"
            title="Ver detalle de movimiento"
            onClick={handleRedirect}
            style={{ cursor: 'pointer' }}
        >
            <span className="movimiento-id">
                #{movimiento.id}
            </span>

            <span className="movimiento-fecha">
                {fechaFormateada}
            </span>

            <span className="movimiento-producto-nombre">
                {movimiento.producto.nombre}
            </span>

            <span className="movimiento-monto">
                {movimiento.cantidad}
            </span>
        </div>
    );
}

export default MovimientoItemComponent;