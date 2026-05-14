package com.prueba_tecnica.sistema_inventario_api.services;

import com.prueba_tecnica.sistema_inventario_api.entities.Movimiento;
import com.prueba_tecnica.sistema_inventario_api.entities.Producto;
import com.prueba_tecnica.sistema_inventario_api.repositories.MovimientoRepository;
import com.prueba_tecnica.sistema_inventario_api.repositories.ProductoRepository;
import com.prueba_tecnica.sistema_inventario_api.utilities.MySqlState;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class MovimientoServiceImpl implements MovimientoService {

    private final MovimientoRepository movimientoRepository;
    private final ProductoRepository productoRepository;

     Movimiento movimientoDefault;


    public MovimientoServiceImpl(MovimientoRepository movimientoRepository, ProductoRepository productoRepository) {
        this.movimientoRepository = movimientoRepository;
        this.productoRepository = productoRepository;

        this.movimientoDefault = new Movimiento();
        this.movimientoDefault.setId(-100l);
    }

    @Override
    public List<Movimiento> findAll() {
        return movimientoRepository.findAll().stream().peek(m -> m.setEstado(MySqlState.LOADED)).toList();
    }

    @Override
    public Movimiento findOne(Long id) {
        Optional<Movimiento> movimientoOpt = movimientoRepository.findById(id);
        if(movimientoOpt.isPresent()){
            Movimiento movimiento = movimientoOpt.get();
            movimiento.setEstado(MySqlState.LOADED);
            return movimiento;
        }


        movimientoDefault.setEstado(MySqlState.NOEXIST);

        return movimientoDefault;

    }

    @Override
    @Transactional
    public Movimiento create(Movimiento movimiento) {
        Producto producto = productoRepository.findBySku(movimiento.getProducto().getSku()).get();

        int newStock;
        if (movimiento.getTipo().equalsIgnoreCase("Entrada")) {
            newStock = producto.getStockActual() + movimiento.getCantidad();
        } else {
            newStock = producto.getStockActual() - movimiento.getCantidad();
        }

        producto.setStockActual(newStock);

        Producto productoReturned =  productoRepository.save(producto);
        productoReturned.setEstado(MySqlState.UPDATED);


        movimiento.setId(null);
        movimiento.setFecha(LocalDate.now());
        movimiento.setStockResultante(newStock);
        movimiento.setProducto(productoReturned);

        Movimiento movimientoReturned = movimientoRepository.save(movimiento);

        movimientoReturned.setEstado(MySqlState.CREATED);

        return movimientoReturned;
    }

    @Override
    @Transactional
    public Movimiento update(Movimiento movimiento) {
        Movimiento movimientoOpt = movimientoRepository.save(movimiento);
        movimientoOpt.setEstado(MySqlState.UPDATED);
        return movimientoOpt;
    }

    @Override
    @Transactional
    public Movimiento delete(Long id) {
        Optional<Movimiento> movimientoOpt = movimientoRepository.findById(id);

        if(movimientoOpt.isPresent())
        {
            Movimiento movimiento = movimientoRepository.removeById(id);
            movimiento.setEstado(MySqlState.DELETED);
            return movimiento;
        }

        movimientoDefault.setEstado(MySqlState.NOEXIST);

        return movimientoDefault;
    }
}