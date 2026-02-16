package org.acme.repository;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import org.acme.entity.Material;
@ApplicationScoped
public class MaterialRepository implements PanacheRepository<Material> {}
