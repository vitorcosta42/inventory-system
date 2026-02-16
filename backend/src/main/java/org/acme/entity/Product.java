package org.acme.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.CascadeType;
import java.math.BigDecimal;
import java.util.List;
import java.util.ArrayList;

@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private BigDecimal price; // renomeado de 'value' para 'price'

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductMaterial> materials = new ArrayList<>();

    // ===== Getters e Setters =====
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public List<ProductMaterial> getMaterials() {
        return materials;
    }

    public void setMaterials(List<ProductMaterial> materials) {
        this.materials = materials;
        // atualiza a referência de cada ProductMaterial para este produto
        if (materials != null) {
            materials.forEach(m -> m.setProduct(this));
        }
    }

    // opcional: adicionar métodos auxiliares
    public void addMaterial(ProductMaterial material) {
        materials.add(material);
        material.setProduct(this);
    }

    public void removeMaterial(ProductMaterial material) {
        materials.remove(material);
        material.setProduct(null);
    }
}
