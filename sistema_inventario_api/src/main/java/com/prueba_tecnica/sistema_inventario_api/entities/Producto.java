package com.prueba_tecnica.sistema_inventario_api.entities;

import com.prueba_tecnica.sistema_inventario_api.utilities.MySqlState;
import com.prueba_tecnica.sistema_inventario_api.utilities.SkuId;
import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "productos")
public class Producto {

    @Id
    @SkuId
    @Column(name = "sku", length = 25)
    private String sku;

    @Column(name = "nombre", nullable = false, length = 100)
    private String nombre;

    @Column(name = "precio", nullable = false, precision = 10, scale = 2)
    private BigDecimal precio;

    @Column(name = "stock_actual", nullable = false)
    private Integer stockActual;

    @Column(name = "stock_minimo", nullable = false)
    private Integer stockMinimo;

    @Transient
    private String  estado;

    @Transient
    private Integer totalMovimientos; // O un boolean si prefieres 'hasMovimientos'

    public Producto(){
        this.estado= String.valueOf(MySqlState.LOADED);
    }

    public Producto(String sku, String nombre, BigDecimal precio, Integer stockActual, Integer stockMinimo) {
        this();
        this.sku = sku;
        this.nombre = nombre;
        this.precio = precio;
        this.stockActual = stockActual;
        this.stockMinimo = stockMinimo;
    }

    public String getSku() {
        return sku;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public BigDecimal getPrecio() {
        return precio;
    }

    public void setPrecio(BigDecimal precio) {
        this.precio = precio;
    }

    public Integer getStockActual() {
        return stockActual;
    }

    public void setStockActual(Integer stockActual) {
        this.stockActual = stockActual;
    }

    public Integer getStockMinimo() {
        return stockMinimo;
    }

    public void setStockMinimo(Integer stockMinimo) {
        this.stockMinimo = stockMinimo;
    }


    public String getEstado() {
        return estado;
    }

    public void setEstado(MySqlState mySqlState) {
        this.estado = String.valueOf( mySqlState);
    }

    public Integer getTotalMovimientos() {
        return totalMovimientos;
    }

    public void setTotalMovimientos(Integer totalMovimientos) {
        this.totalMovimientos = totalMovimientos;
    }
}