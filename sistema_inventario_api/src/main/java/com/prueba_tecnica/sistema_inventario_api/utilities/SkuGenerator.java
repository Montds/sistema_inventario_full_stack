package com.prueba_tecnica.sistema_inventario_api.utilities;

import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.generator.BeforeExecutionGenerator;
import org.hibernate.generator.EventType;
import org.hibernate.generator.EventTypeSets;

import java.time.LocalDate;
import java.util.EnumSet;

public class SkuGenerator implements BeforeExecutionGenerator {

    @Override
    public Object generate(SharedSessionContractImplementor session, Object owner, Object currentValue, EventType eventType) {
        int year = LocalDate.now().getYear();
        String prefix = "PROD-" + year + "-";

        String hql = "SELECT MAX(p.sku) FROM Producto p WHERE p.sku LIKE :prefix";
        String maxId = session.createSelectionQuery(hql, String.class)
                .setParameter("prefix", prefix + "%")
                .uniqueResult();

        long nextValue = 1;

        if (maxId != null) {
            String sequencePart = maxId.substring(prefix.length());
            nextValue = Long.parseLong(sequencePart) + 1;
        }

        return String.format("%s%07d", prefix, nextValue);
    }

    @Override
    public EnumSet<EventType> getEventTypes() {
        return EventTypeSets.INSERT_ONLY;
    }
}