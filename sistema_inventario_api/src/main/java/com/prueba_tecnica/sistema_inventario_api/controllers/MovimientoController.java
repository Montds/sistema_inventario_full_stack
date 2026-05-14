package com.prueba_tecnica.sistema_inventario_api.controllers;

import com.prueba_tecnica.sistema_inventario_api.entities.Movimiento;
import com.prueba_tecnica.sistema_inventario_api.services.MovimientoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/movimientos")
public class MovimientoController {

    MovimientoService service;

    public MovimientoController(MovimientoService movimientoService )
    {
        this.service = movimientoService;
    }

    @GetMapping()
    public List<Movimiento> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public Movimiento findByOne(@PathVariable Long id) {
        return service.findOne(id);
    }

    @PostMapping
    public Movimiento create(@RequestBody  Movimiento movimiento) {
        return service.create(movimiento);
    }

    @PutMapping("/{id}")
    public Movimiento update(@PathVariable Long id ,  @RequestBody  Movimiento movimiento) {
        return service.update(movimiento);
    }

    @DeleteMapping("/{id}")
    public Movimiento delete(@PathVariable Long id) {
        return service.delete(id);
    }
}
