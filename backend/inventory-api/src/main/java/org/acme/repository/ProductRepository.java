package org.acme.repository;  // deve bater com a pasta

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import org.acme.entity.Product;

@ApplicationScoped
public class ProductRepository implements PanacheRepository<Product> {
    // aqui você pode adicionar métodos personalizados
}
