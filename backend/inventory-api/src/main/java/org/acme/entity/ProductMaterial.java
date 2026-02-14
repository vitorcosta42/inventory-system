package org.acme.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
public class ProductMaterial {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int quantity;

    @ManyToOne
    @JoinColumn(name = "product_id")
    @JsonIgnore // evita loop infinito
    private Product product;

    @ManyToOne
    @JoinColumn(name = "material_id")
    private Material material;

    // getters e setters

    public Long getId() { return id; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    public Product getProduct() { return product; }
    public void setProduct(Product product) { this.product = product; }

    public Material getMaterial() { return material; }
    public void setMaterial(Material material) { this.material = material; }
}
