package com.prueba_tecnica.sistema_inventario_api.repositories;

import com.prueba_tecnica.sistema_inventario_api.entities.Movimiento;
import com.prueba_tecnica.sistema_inventario_api.entities.Producto;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface MovimientoRepository extends CrudRepository<Movimiento, Long>
{
    @Override
    List<Movimiento> findAll();

    Movimiento removeById(Long id);
    long countByProductoSku(String sku);
}