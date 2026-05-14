import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductService } from '@src/app/modules/producto/services/ProductService';
import { MovimientoService } from "@src/app/modules/movimiento/services/MovimientoService";
import { RUTAS } from '@src/utilities/routes';
import type { IProducto } from '@src/app/core/models/producto.model';
import type { IMovimiento } from '@src/app/core/models/movimiento.model.ts';



import './MovimientoRegisterFormComponent.css';
import {NoServerConectionRedirect} from "@src/utilities/NoServerConectionRedirect.ts";

interface Props {
    tipoRecibido?: 'ENTRADA' | 'SALIDA';
}

function MovimientoRegisterFormComponent({ tipoRecibido }: Props) {
    const navigate = useNavigate();
    const tipoMovimiento = tipoRecibido || 'ENTRADA';

    const [productos, setProductos] = useState<IProducto[]>([]);
    const [productoSeleccionado, setProductoSeleccionado] = useState<IProducto | null>(null);

    const [cantidad, setCantidad] = useState<number | ''>('');
    const [errorMensaje, setErrorMensaje] = useState<string>('');




    useEffect(() => {
        if (!tipoRecibido || (tipoRecibido !== 'ENTRADA' && tipoRecibido !== 'SALIDA')) {
            navigate(RUTAS.MOVEMENT);
            return;
        }

        const cargarProductos = async () => {
            const data = await ProductService.getAllProducts();

            // esto significa que no hay conexion
            if (data === null) {
                alert("no hay conexion con el servidor")
                navigate(RUTAS.MOVEMENT);
                return;
            }

            if (data.length === 0) {
                alert("No hay productos registrados. Redirigiendo...");
                navigate(RUTAS.MOVEMENT);
                return;
            }
            setProductos(data);
        };
        cargarProductos();
    }, [navigate, tipoRecibido]);

    const stockResultante = useMemo(() => {
        if (!productoSeleccionado) return 0;

        const actual = productoSeleccionado.stockActual;
        // Si cantidad es vacío, se usa  0 para el cálculo
        const valorCantidad = cantidad === '' ? 0 : cantidad;
        const res = tipoMovimiento === 'ENTRADA'
            ? actual + valorCantidad
            : actual - valorCantidad;

        return res;
    }, [productoSeleccionado, cantidad, tipoMovimiento]);

    useEffect(() => {
        if (!productoSeleccionado) {
            setErrorMensaje('');
            return;
        }

        if (cantidad !== '' && cantidad < 1) {
            setErrorMensaje('La cantidad debe ser mayor o igual a 1');
        } else if (stockResultante < 0) {
            setErrorMensaje('El stock resultante no puede ser negativo');
        } else {
            setErrorMensaje('');
        }
    }, [cantidad, stockResultante, productoSeleccionado]);

    const handleSelectProducto = (sku: string) => {
        const prod = productos.find(p => p.sku === sku) || null;
        setProductoSeleccionado(prod);
        setCantidad('');

    };

    const handleCantidadChange = (val: string) => {

        const numericValue = val.replace(/[^0-9]/g, '');

        if (numericValue === '') {
            setCantidad('');
            return;
        }

        setCantidad(parseInt(numericValue, 10));
    };

    const handleRegistrar = async () => {
        if (!productoSeleccionado || stockResultante < 0 || cantidad === '' || cantidad < 1) return;

        const nuevoMovimiento: any = {
            fecha: new Date(),
            tipo: tipoMovimiento,
            cantidad: cantidad,
            stockResultante: stockResultante,
            producto: productoSeleccionado
        };

        const response = await MovimientoService.createMovimiento(nuevoMovimiento as IMovimiento);
        if (response) {
            alert('Movimiento registrado correctamente');
            navigate(RUTAS.MOVEMENT);
        }
    };

    return (
        <div className="movimiento-page-container">
            <div className="movimiento-form-card">
                <h1 className="movimiento-title">Movimiento</h1>
                <p className="movimiento-subtitle">{tipoMovimiento}</p>

                <div className="movimiento-grid">
                    <div className="form-item">
                        <label>Producto</label>
                        <select
                            className="form-control"
                            onChange={(e) => handleSelectProducto(e.target.value)}
                            defaultValue=""
                        >
                            <option value="" disabled>Seleccione un producto</option>
                            {productos.map(p => (
                                <option key={p.sku} value={p.sku}>{p.nombre}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-item">
                        <label>Cantidad</label>
                        <input
                            type="number"
                            className="form-control"
                            value={cantidad}
                            onChange={(e) => handleCantidadChange(e.target.value)}
                            onKeyDown={(e) => {
                                // Bloqueo  de la tecla "-" y "e"
                                if (e.key === '-' || e.key === 'e' || e.key === '+') {
                                    e.preventDefault();
                                }
                            }}
                            disabled={!productoSeleccionado}
                            min="1"
                        />
                        {errorMensaje && <span className="error-text">{errorMensaje}</span>}
                    </div>

                    <div className="form-item">
                        <label>Stock Actual</label>
                        <input
                            type="number"
                            className="form-control readonly-field"
                            value={productoSeleccionado?.stockActual || 0}
                            readOnly
                        />
                    </div>

                    <div className="form-item">
                        <label>Stock Resultante</label>
                        <input
                            type="number"
                            className="form-control readonly-field"
                            value={stockResultante}
                            readOnly
                        />
                    </div>
                </div>

                <button
                    className="btn-registrar-mov"
                    onClick={handleRegistrar}
                    disabled={!productoSeleccionado || !!errorMensaje || cantidad === '' || cantidad < 1}
                >
                    Registrar
                </button>
            </div>
        </div>
    );
}

export default MovimientoRegisterFormComponent;