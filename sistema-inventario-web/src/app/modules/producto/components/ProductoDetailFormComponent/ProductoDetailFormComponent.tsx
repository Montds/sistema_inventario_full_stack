
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductService } from '@src/app/modules/producto/services/ProductService';
import type {IProducto} from '@src/app/core/models/producto.model';
import ConfirmationBoxComponent from '@src/app/shared/ConfirmationBoxComponent/ConfirmationBoxComponent';
import './ProductoDetailFormComponent.css';
import {RUTAS} from "@src/utilities/routes.ts";
function ProductoDetailFormComponent() {
    const { sku } = useParams<{ sku: string }>();
    const navigate = useNavigate();

    const [producto, setProducto] = useState<IProducto | null>(null);
    const [formData, setFormData] = useState({
        nombre: '',
        precio: '',
        stockMinimo: '',
        stockActual: 0
    });

    const [errors, setErrors] = useState({
        nombre: '',
        precio: '',
        stockMinimo: ''
    });

    const [warnings, setWarnings] = useState({
        stockMinimo: ''
    });

    const [isConfirmUpdateOpen, setIsConfirmUpdateOpen] = useState(false);
    const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const fetchProducto = async () => {
            if (sku) {
                const data = await ProductService.getProductBySku(sku);
                if (!data || data.estado === 'NOEXIST') {
                    alert("El producto no existe en la base de datos.");
                    navigate('/productos');
                    return;
                }
                setProducto(data);
                setFormData({
                    nombre: data.nombre,
                    precio: data.precio.toString(),
                    stockMinimo: data.stockMinimo.toString(),
                    stockActual: data.stockActual
                });
            }
        };
        fetchProducto();
    }, [sku, navigate]);

    useEffect(() => {
        const newErrors = { nombre: '', precio: '', stockMinimo: '' };
        const newWarnings = { stockMinimo: '' };

        if (!formData.nombre.trim()) {
            newErrors.nombre = formData.nombre.length > 0
                ? 'No puede contener solo espacios en blanco.'
                : 'El nombre no puede estar vacío.';
        }

        const p = parseFloat(formData.precio);
        if (formData.precio === '') {
            newErrors.precio = 'El precio no puede estar vacío.';
        } else if (isNaN(p) || p <= 0) {
            newErrors.precio = 'El precio debe ser un número positivo mayor a 0.';
        }

        const sMin = parseInt(formData.stockMinimo);
        if (formData.stockMinimo === '') {
            newErrors.stockMinimo = 'El stock mínimo no puede quedar vacío.';
        } else if (isNaN(sMin) || sMin < 1) {
            newErrors.stockMinimo = 'El stock mínimo debe ser al menos 1.';
        } else if (sMin > formData.stockActual) {
            newWarnings.stockMinimo = 'El stock mínimo es mayor al stock actual.';
        }

        setErrors(newErrors);
        setWarnings(newWarnings);
        setIsFormValid(!newErrors.nombre && !newErrors.precio && !newErrors.stockMinimo);
    }, [formData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'precio') {
            if (value !== '' && !/^\d*\.?\d{0,2}$/.test(value)) return;
        }
        if (name === 'stockMinimo') {
            if (value !== '' && !/^\d*$/.test(value)) return;
        }
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async () => {
        if (!sku || !producto) return;
        const updatedProd: IProducto = {
            ...producto,
            nombre: formData.nombre.trim(),
            precio: parseFloat(formData.precio),
            stockMinimo: parseInt(formData.stockMinimo)
        };
        const res = await ProductService.updateProduct(sku, updatedProd);
        if (res && res.estado === 'UPDATED') {
            alert("El producto se actualizó correctamente.");
        } else {
            alert("El producto no se actualizó.");
        }
        setIsConfirmUpdateOpen(false);
    };

    const handleDelete = async () => {
        if (!sku || !producto) return;

        if (producto.totalMovimientos && producto.totalMovimientos > 0) {
            alert(`No se puede eliminar el producto porque tiene ${producto.totalMovimientos} movimientos registrados.`);
            setIsConfirmDeleteOpen(false);
            return;
        }

        const res = await ProductService.deleteProduct(sku);

        if(res===null)
        {
            alert("Error de conexión con el servidor.");
        }
        else if (res && res.estado === 'DELETED') {
            alert("El producto fue eliminado con éxito.");
            navigate(RUTAS.PRODUCT);
        } else if (res.estado === 'NOEXIST') {
            alert("El producto no se pudo eliminar (Estado: " + res.estado + ")");
        }
        setIsConfirmDeleteOpen(false);
    };

    return (
        <div className="producto-page-container">
            <div className="producto-form-card">
                <div className="producto-header">
                    <h1 className="producto-title">PRODUCTO</h1>
                </div>

                <div className="producto-grid">
                    <div className="form-item">
                        <label>sku</label>
                        <input type="text" className="form-control readonly-field" value={sku || ''} readOnly />
                    </div>

                    <div className="form-item">
                        <label>nombre</label>
                        <div className="input-container">
                            <input
                                type="text"
                                name="nombre"
                                className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                                value={formData.nombre}
                                onChange={handleChange}
                            />
                            {errors.nombre && <span className="error-text">{errors.nombre}</span>}
                        </div>
                    </div>

                    <div className="form-item">
                        <label>precio</label>
                        <div className="input-container">
                            <input
                                type="text"
                                name="precio"
                                className={`form-control ${errors.precio ? 'is-invalid' : ''}`}
                                value={formData.precio}
                                onChange={handleChange}
                            />
                            {errors.precio && <span className="error-text">{errors.precio}</span>}
                        </div>
                    </div>

                    <div className="form-item">
                        <label>stock actual</label>
                        <input type="text" className="form-control readonly-field" value={formData.stockActual} readOnly />
                    </div>

                    <div className="form-item">
                        <label>stock mínimo</label>
                        <div className="input-container">
                            <input
                                type="text"
                                name="stockMinimo"
                                className={`form-control ${errors.stockMinimo ? 'is-invalid' : ''}`}
                                value={formData.stockMinimo}
                                onChange={handleChange}
                            />
                            {errors.stockMinimo ? (
                                <span className="error-text">{errors.stockMinimo}</span>
                            ) : warnings.stockMinimo ? (
                                <span className="warning-text" style={{ color: '#ffc107', fontSize: '12px', marginTop: '4px', display: 'block', textAlign: 'left' }}>
                                    {warnings.stockMinimo}
                                </span>
                            ) : null}
                        </div>
                    </div>
                </div>

                <div className="producto-actions">
                    <button className="btn-update" disabled={!isFormValid} onClick={() => setIsConfirmUpdateOpen(true)}>
                        Actualizar
                    </button>
                    <button className="btn-delete" onClick={() => setIsConfirmDeleteOpen(true)}>
                        Eliminar
                    </button>
                </div>
            </div>

            <ConfirmationBoxComponent
                isOpen={isConfirmUpdateOpen}
                message="¿Desea actualizar los datos del producto?"
                onConfirm={handleUpdate}
                onCancel={() => setIsConfirmUpdateOpen(false)}
            />

            <ConfirmationBoxComponent
                isOpen={isConfirmDeleteOpen}
                title="Eliminar Producto"
                message="¿Está seguro de que desea eliminar este producto? Esta acción no se puede deshacer."
                onConfirm={handleDelete}
                onCancel={() => setIsConfirmDeleteOpen(false)}
            />
        </div>
    );
}

export default ProductoDetailFormComponent;