package org.acme.repository;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import org.acme.entity.ProductMaterial;

@ApplicationScoped
public class ProductMaterialRepository implements PanacheRepository<ProductMaterial> {
    // Se precisar de métodos adicionais, coloque-os aqui DENTRO da classe
}
