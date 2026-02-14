package org.acme.resource;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import java.util.List;

import org.acme.entity.Product;
import org.acme.entity.ProductMaterial;
import org.acme.entity.Material;
import org.acme.repository.ProductRepository;
import org.acme.repository.MaterialRepository;
@Path("/api/products")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProductResource {

    @Inject
    ProductRepository productRepo;

    @Inject
    MaterialRepository materialRepo;

    @GET
    public List<Product> getAll() {
        return productRepo.listAll();
    }

    // =========================
    // CREATE
    // =========================
    @POST
    @Transactional
    public Product create(Product product) {

        if (product.getMaterials() != null) {
            for (ProductMaterial pm : product.getMaterials()) {

                Material material = materialRepo.findById(
                        pm.getMaterial().getId()
                );

                if (material == null) {
                    throw new WebApplicationException("Material não encontrado", 404);
                }

                if (material.getStock() < pm.getQuantity()) {
                    throw new WebApplicationException(
                            "Estoque insuficiente para o material: " + material.getName(),
                            400
                    );
                }

                // 🔥 BAIXA ESTOQUE
                material.setStock(material.getStock() - pm.getQuantity());

                pm.setMaterial(material);
                pm.setProduct(product);
            }
        }

        productRepo.persist(product);
        return product;
    }

    // =========================
    // UPDATE
    // =========================
    @PUT
    @Path("{id}")
    @Transactional
    public Product update(@PathParam("id") Long id, Product updated) {

        Product product = productRepo.findById(id);
        if (product == null) {
            throw new WebApplicationException("Produto não encontrado", 404);
        }

        // 🔁 1️⃣ DEVOLVE estoque antigo
        for (ProductMaterial oldPm : product.getMaterials()) {
            Material material = oldPm.getMaterial();
            material.setStock(material.getStock() + oldPm.getQuantity());
        }

        product.setName(updated.getName());
        product.setPrice(updated.getPrice());

        product.getMaterials().clear();

        // 🔁 2️⃣ APLICA novos materiais e baixa estoque novamente
        if (updated.getMaterials() != null) {
            for (ProductMaterial pm : updated.getMaterials()) {

                Material material = materialRepo.findById(
                        pm.getMaterial().getId()
                );

                if (material == null) {
                    throw new WebApplicationException("Material não encontrado", 404);
                }

                if (material.getStock() < pm.getQuantity()) {
                    throw new WebApplicationException(
                            "Estoque insuficiente para o material: " + material.getName(),
                            400
                    );
                }

                // 🔥 BAIXA ESTOQUE NOVAMENTE
                material.setStock(material.getStock() - pm.getQuantity());

                ProductMaterial newPm = new ProductMaterial();
                newPm.setMaterial(material);
                newPm.setQuantity(pm.getQuantity());
                newPm.setProduct(product);

                product.getMaterials().add(newPm);
            }
        }

        return product;
    }

    // =========================
    // DELETE
    // =========================
    @DELETE
    @Path("{id}")
    @Transactional
    public void delete(@PathParam("id") Long id) {

        Product product = productRepo.findById(id);
        if (product == null)
            throw new WebApplicationException("Produto não encontrado", 404);

        // 🔁 DEVOLVE estoque antes de deletar
        for (ProductMaterial pm : product.getMaterials()) {
            Material material = pm.getMaterial();
            material.setStock(material.getStock() + pm.getQuantity());
        }

        productRepo.delete(product);
    }
}
