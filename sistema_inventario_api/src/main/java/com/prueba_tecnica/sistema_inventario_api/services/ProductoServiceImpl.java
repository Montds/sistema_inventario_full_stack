package com.prueba_tecnica.sistema_inventario_api.services;

import com.prueba_tecnica.sistema_inventario_api.entities.Producto;
import com.prueba_tecnica.sistema_inventario_api.repositories.MovimientoRepository;
import com.prueba_tecnica.sistema_inventario_api.repositories.ProductoRepository;
import com.prueba_tecnica.sistema_inventario_api.utilities.MySqlState;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ProductoServiceImpl implements ProductoService {

    ProductoRepository productoRepository;
    private final MovimientoRepository movimientoRepository;
    Producto productoDefault;;


    public ProductoServiceImpl(ProductoRepository productoRepository, MovimientoRepository movimientoRepository )
    {
        this.productoRepository = productoRepository;
        this.movimientoRepository = movimientoRepository;
        this.productoDefault = new Producto();

    }

    @Override
    public List<Producto> findAll() {
        return productoRepository.findAllOrderBySku().stream().peek(
                p->{p.setEstado(MySqlState.LOADED);
                            p.setTotalMovimientos(-1);
                }).toList();
    }

    @Override
    public Producto findOne(String sku) {
        Optional<Producto> productoOpt = productoRepository.findBySku(sku);
        if(productoOpt.isPresent()){
            Producto producto = productoOpt.get();
            producto.setEstado(MySqlState.LOADED);

            long count = movimientoRepository.countByProductoSku(sku);
            producto.setTotalMovimientos((int) count);

            return producto;
        }
        productoDefault.setEstado(MySqlState.NOEXIST);
        return productoDefault;
    }

    @Override
    @Transactional
    public Producto create(Producto producto) {
        producto.setSku(null);

        Producto productoOpt = productoRepository.save(producto);
        productoOpt.setEstado(MySqlState.CREATED);

        return productoOpt;
    }

    @Override
    @Transactional
    public Producto update(Producto producto) {
        Producto productoOpt = productoRepository.save(producto);
        productoOpt.setEstado(MySqlState.UPDATED);
        return productoOpt;

    }


    @Override
    @Transactional
    public Producto delete(String sku) {
        Optional<Producto> productoOpt = productoRepository.findBySku(sku);

        if(productoOpt.isPresent())
        {
            Producto productoReturned = productoRepository.deleteBySku(sku);
            productoReturned.setEstado(MySqlState.DELETED);
            return productoReturned;
        }

        productoDefault.setEstado(MySqlState.NOEXIST);
        return  productoDefault;
    }
}
