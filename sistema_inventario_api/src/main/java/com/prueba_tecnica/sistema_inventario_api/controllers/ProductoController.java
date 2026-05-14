package com.prueba_tecnica.sistema_inventario_api.controllers;

import com.prueba_tecnica.sistema_inventario_api.entities.Producto;

import com.prueba_tecnica.sistema_inventario_api.services.ProductoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/productos")
public class ProductoController {

    ProductoService service;


    public ProductoController(ProductoService productoService )
    {
        this.service = productoService;
    }

    @GetMapping()
    public List<Producto> findAll() {
        return service.findAll();
    }

    @GetMapping("/{sku}")
    public Producto findByOne(@PathVariable String sku) {
        return service.findOne(sku);
    }

    @PostMapping
    public Producto create(@RequestBody  Producto producto) {
        return service.create(producto);
    }

    @PutMapping("/{sku}")
    public Producto update(@PathVariable String sku ,  @RequestBody  Producto producto) {
        return service.update(producto);
    }

    @DeleteMapping("/{sku}")
    public Producto delete(@PathVariable String sku) {
       return service.delete(sku);
    }
}