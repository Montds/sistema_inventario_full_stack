import { useEffect, useState } from 'react';
import { MovimientoService } from "@src/app/modules/movimiento/services/MovimientoService";
import MovimientoItemComponent from "@src/app/modules/movimiento/components/MovimientoItemComponent/MovimientoItemComponent.tsx";
import type { IMovimiento } from "@src/app/core/models/movimiento.model.ts";
import './MovimientoListComponent.css';

function MovimientoListComponent() {
    const [movimientos, setMovimientos] = useState<IMovimiento[]>([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadMovimientos = async () => {
            const data = await MovimientoService.getAllMovimientos();

            if (data === null) {
                setIsError(true);
            } else {
                setMovimientos(data);
                setIsError(false);
            }
            setIsLoading(false);
        };

        loadMovimientos();
    }, []);

    return (
        <div className="list-container">
            <h2 className="title-section">Movimientos</h2>

            {isLoading ? (
                <p className="loading-message">Cargando movimientos...</p>
            ) : isError ? (
                <p className="error-message">Error en el servidor</p>
            ) : movimientos.length === 0 ? (
                <p className="empty-message">No hay movimientos registrados</p>
            ) : (
                movimientos.map((movimiento) => (
                    <MovimientoItemComponent
                        key={movimiento.id}
                        movimiento={movimiento}
                    />
                ))
            )}
        </div>
    );
}

export default MovimientoListComponent;