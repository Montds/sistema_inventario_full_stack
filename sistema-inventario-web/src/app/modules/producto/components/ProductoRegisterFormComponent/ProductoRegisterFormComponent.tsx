import React, { useState, useEffect } from 'react';
import { ProductService } from '@src/app/modules/producto/services/ProductService';
import type {IProducto} from '@src/app/core/models/producto.model';
import ConfirmationBoxComponent from '@src/app/shared/ConfirmationBoxComponent/ConfirmationBoxComponent';
import './ProductoRegisterFormComponent.css';
import {RUTAS} from "@src/utilities/routes.ts";
import {useNavigate} from "react-router-dom";
import {NoServerConectionRedirect} from "@src/utilities/NoServerConectionRedirect.ts";

function ProductoRegisterFormComponent() {
    const [formData, setFormData] = useState({
        nombre: '',
        precio: '',
        stockMinimo: ''
    });

    const [errors, setErrors] = useState({
        nombre: '',
        precio: '',
        stockMinimo: ''
    });

    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);


 //es mi solucion rapido por si no me puedo conectar al servidor aunque no es optima
    const navigate = useNavigate();

    useEffect(() => {
        NoServerConectionRedirect(navigate);
    }, []);

    // ---------------------------------------





    useEffect(() => {
        const newErrors = { nombre: '', precio: '', stockMinimo: '' };

        if (formData.nombre.length > 0 && !formData.nombre.trim()) {
            newErrors.nombre = 'El nombre no puede contener solo espacios.';
        } else if (formData.nombre.trim() === '') {
            newErrors.nombre = 'El nombre es obligatorio.';
        }

        const priceVal = parseFloat(formData.precio);
        if (formData.precio === '') {
            newErrors.precio = 'El precio es obligatorio.';
        } else if (isNaN(priceVal) || priceVal <= 0) {
            newErrors.precio = 'El precio debe ser un número mayor a 0.';
        }

        const stockVal = parseInt(formData.stockMinimo);
        if (formData.stockMinimo === '') {
            newErrors.stockMinimo = 'El stock mínimo es obligatorio.';
        } else if (isNaN(stockVal) || stockVal <= 0) {
            newErrors.stockMinimo = 'Debe ser un número mayor a 0.';
        }

        setErrors(newErrors);

        const valid = !newErrors.nombre && !newErrors.precio && !newErrors.stockMinimo &&
            formData.nombre.trim() !== '' && formData.precio !== '' && formData.stockMinimo !== '';
        setIsFormValid(valid);

    }, [formData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === 'precio' || name === 'stockMinimo') {
            if (value !== '' && !/^\d*\.?\d*$/.test(value)) return;
        }

        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePreSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isFormValid) setIsConfirmOpen(true);
    };

    const handleConfirm = async () => {
        const nuevoProducto: IProducto = {
            sku: '',
            nombre: formData.nombre.trim(),
            precio: parseFloat(formData.precio),
            stockMinimo: parseInt(formData.stockMinimo),
            stockActual: 0
        };

        const result = await ProductService.createProduct(nuevoProducto);
        if (result) {
            alert("Producto registrado con éxito");
            setFormData({ nombre: '', precio: '', stockMinimo: '' });
        }
        setIsConfirmOpen(false);
    };

    return (
        <div className="movimiento-page-container">
            <div className="movimiento-form-card">
                <div className="movimiento-header">
                    <h2 className="movimiento-title">PRODUCTO</h2>
                    <span className="movimiento-subtitle">Registro de nuevo artículo</span>
                </div>

                <form onSubmit={handlePreSubmit} className="movimiento-grid">
                    <div className="form-item">
                        <label>Nombre</label>
                        <input
                            type="text"
                            name="nombre"
                            className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                            value={formData.nombre}
                            onChange={handleChange}
                            placeholder=""
                            autoComplete="off"
                        />
                        {errors.nombre && <span className="error-text">{errors.nombre}</span>}
                    </div>

                    <div className="form-item">
                        <label>Precio</label>
                        <input
                            type="text"
                            name="precio"
                            className={`form-control ${errors.precio ? 'is-invalid' : ''}`}
                            value={formData.precio}
                            onChange={handleChange}
                            placeholder="0.00"
                        />
                        {errors.precio && <span className="error-text">{errors.precio}</span>}
                    </div>

                    <div className="form-item">
                        <label>Stock Mínimo</label>
                        <input
                            type="text"
                            name="stockMinimo"
                            className={`form-control ${errors.stockMinimo ? 'is-invalid' : ''}`}
                            value={formData.stockMinimo}
                            onChange={handleChange}
                            placeholder="1"
                        />
                        {errors.stockMinimo && <span className="error-text">{errors.stockMinimo}</span>}
                    </div>

                    <button
                        type="submit"
                        className="btn-registrar-mov"
                        disabled={!isFormValid}
                    >
                        Registrar Producto
                    </button>
                </form>
            </div>

            <ConfirmationBoxComponent
                isOpen={isConfirmOpen}
                title="Confirmar Registro"
                message={`¿Estás seguro de que deseas registrar el producto "${formData.nombre}"?`}
                onConfirm={handleConfirm}
                onCancel={() => setIsConfirmOpen(false)}
            />
        </div>
    );
}

export  default ProductoRegisterFormComponent