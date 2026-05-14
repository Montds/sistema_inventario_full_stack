import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductService } from '@src/app/modules/producto/services/ProductService.ts';
import type { IProducto } from "@src/app/core/models/producto.model.ts";
import './ReporteTableComponent.css';
import {RUTAS} from "@src/utilities/routes.ts";

interface Props {
    productos: IProducto[];
}

function ReporteTableComponent({ productos }: Props) {
    const navigate = useNavigate();

    const handleRowClick = (sku: string) => {
        const url = RUTAS.PRODUCT_DATA_SKU.replace(':sku', sku);
        navigate(url);
    };

    return (
        <div className="reporte-container">
            <div className="table-wrapper">
                <table className="reporte-table">
                    <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Stock</th>
                        <th>Precio</th>
                        <th>Valor del Inventario</th>
                        <th style={{ width: '50px' }}></th>
                    </tr>
                    </thead>
                    <tbody>
                    {productos.map((producto) => {
                        const isLowStock = producto.stockActual < producto.stockMinimo;
                        const totalValue = producto.stockActual * producto.precio;

                        return (
                            <tr
                                key={producto.sku}
                                onClick={() => handleRowClick(producto.sku)}
                                className={isLowStock ? 'row-warning' : ''}
                            >
                                <td>{producto.nombre}</td>
                                <td>{producto.stockActual}</td>
                                <td>${producto.precio.toFixed(2)}</td>
                                <td>${totalValue.toFixed(2)}</td>
                                <td className="icon-cell" onClick={(e) => e.stopPropagation()}>
                                    {isLowStock && (
                                        <div title="stock debajo del minimo requerido">
                                            <svg className="warning-svg" viewBox="0 0 24 24">
                                                <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
                                            </svg>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ReporteTableComponent;