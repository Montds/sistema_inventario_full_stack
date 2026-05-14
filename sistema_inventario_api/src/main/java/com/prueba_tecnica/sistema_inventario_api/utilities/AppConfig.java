package com.prueba_tecnica.sistema_inventario_api.utilities;

import com.prueba_tecnica.sistema_inventario_api.entities.Movimiento;
import com.prueba_tecnica.sistema_inventario_api.entities.Producto;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {

    @Bean(name = "productoNotFound")
    public Producto productoNoRegistrado() {
        Producto producto = new Producto();
        producto.setSku("No registrado");
        producto.setEstado(MySqlState.ERROR);
        return producto;
    }

    @Bean(name = "movimientoDefault")
    public Movimiento movimientoNoRegistrado() {
        Movimiento movimiento = new Movimiento();
        movimiento.setId(-100L);
        movimiento.setEstado(MySqlState.ERROR);
        return movimiento;
    }
}