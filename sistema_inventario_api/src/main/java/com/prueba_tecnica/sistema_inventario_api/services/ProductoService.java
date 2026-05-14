package com.prueba_tecnica.sistema_inventario_api.services;

import com.prueba_tecnica.sistema_inventario_api.entities.Producto;

import java.util.List;

public interface ProductoService {

    List<Producto> findAll();

    Producto findOne(String sku);

    Producto create(Producto producto);

    Producto update(Producto producto);

    Producto delete(String sku);

}
