import React from 'react';
import './ConfirmationBoxComponent.css';

interface ConfirmationBoxProps {
    isOpen: boolean;
    title?: string;
    message: string;
    onConfirm: (value: boolean) => void;
    onCancel: (value: boolean) => void;
}

function ConfirmationBoxComponent({
                                      isOpen,
                                      title = "Confirmación",
                                      message,
                                      onConfirm,
                                      onCancel
                                  }: ConfirmationBoxProps) {

    if (!isOpen) return null;

    return (
        <div className="confirmation-overlay">
            <div className="confirmation-card">
                <h2 className="confirmation-title">{title}</h2>
                <p className="confirmation-text">{message}</p>
                <div className="confirmation-actions">
                    <button
                        className="btn-secondary"
                        type="button"
                        onClick={() => onCancel(false)}
                    >
                        Cancelar
                    </button>
                    <button
                        className="btn-primary"
                        type="button"
                        onClick={() => onConfirm(true)}
                    >
                        Aceptar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmationBoxComponent;