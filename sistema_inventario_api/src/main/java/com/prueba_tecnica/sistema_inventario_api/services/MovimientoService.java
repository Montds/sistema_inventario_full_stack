package com.prueba_tecnica.sistema_inventario_api.services;

import com.prueba_tecnica.sistema_inventario_api.entities.Movimiento;
import com.prueba_tecnica.sistema_inventario_api.entities.Producto;

import java.util.List;

public interface MovimientoService {


    List<Movimiento> findAll();

    Movimiento findOne(Long id);

    Movimiento create(Movimiento movimiento);

    Movimiento update(Movimiento movimiento);

    Movimiento delete(Long id );

}
