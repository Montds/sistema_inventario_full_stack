import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MovimientoService} from "@src/app/modules/movimiento/services/MovimientoService.ts";
import type { IMovimiento } from "@src/app/core/models/movimiento.model.ts";
import './MovimientoDetailFormComponent.css';
import {RUTAS} from "@src/utilities/routes.ts";

function MovimientoDetailFormComponent() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [movimiento, setMovimiento] = useState<IMovimiento | null>(null);

    useEffect(() => {
        const fetchMovimiento = async () => {
            if (id) {
                const data = await MovimientoService.getMovimientoById(Number(id));

                if (!data || data.estado === 'NOEXIST') {
                    alert("El movimiento no existe");
                    navigate(RUTAS.MOVEMENT);
                    return;
                }

                setMovimiento(data);
            }
        };

        fetchMovimiento();
    }, [id, navigate]);

    if (!movimiento) return null;

    return (
        <div className="detail-container">
            <form className="movimiento-form">
                <header className="form-header">
                    <h1>Movimiento</h1>
                    <span>detalle</span>
                </header>

                <div className="form-group">
                    <label>id</label>
                    <input
                        type="text"
                        value={movimiento.id}
                        readOnly
                        title="Este campo no es editable"
                    />
                </div>

                <div className="form-group">
                    <label>fecha</label>
                    <input
                        type="text"
                        value={new Date(movimiento.fecha).toLocaleDateString()}
                        readOnly
                        title="Este campo no es editable"
                    />
                </div>

                <div className="form-group">
                    <label>producto</label>
                    <input
                        type="text"
                        value={movimiento.producto?.nombre || ''}
                        readOnly
                        title="Este campo no es editable"
                    />
                </div>

                <div className="form-group">
                    <label>tipo</label>
                    <input
                        type="text"
                        value={movimiento.tipo}
                        readOnly
                        title="Este campo no es editable"
                    />
                </div>

                <div className="form-group">
                    <label>cantidad</label>
                    <input
                        type="text"
                        value={movimiento.cantidad}
                        readOnly
                        title="Este campo no es editable"
                    />
                </div>

                <div className="form-group">
                    <label>stock resultante</label>
                    <input
                        type="text"
                        value={movimiento.stockResultante}
                        readOnly
                        title="Este campo no es editable"
                    />
                </div>
            </form>
        </div>
    );
}

export default MovimientoDetailFormComponent;