package com.prueba_tecnica.sistema_inventario_api.repositories;

import com.prueba_tecnica.sistema_inventario_api.entities.Movimiento;
import com.prueba_tecnica.sistema_inventario_api.entities.Producto;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface ProductoRepository extends CrudRepository<Producto , String>
{
    @Override
    List<Producto> findAll();

    Optional<Producto> findBySku(String sku);

    @Query("SELECT p FROM Producto p ORDER BY p.sku ASC")
    List<Producto> findAllOrderBySku();

    Producto deleteBySku(String sku);
}