package org.acme.resource;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;
import jakarta.transaction.Transactional;


import org.acme.entity.Material;
import org.acme.repository.MaterialRepository;
 

@Path("/api/materials")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class MaterialResource {

    @Inject
    MaterialRepository repository;


    public static class MaterialInput {
        private String name;
        private int stock;
    public MaterialInput() { 
    }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }

        public int getStock() { return stock; }
        public void setStock(int stock) { this.stock = stock; }
    }

    @GET
    public List<Material> getAll() {
        return repository.listAll();
    }

@POST
@Transactional 
public Material create(MaterialInput input) {
    Material material = new Material();
    material.setName(input.getName());
    material.setStock(input.getStock());
    repository.persist(material);
    return material;
}
    @PUT
    @Path("{id}")
    @Transactional 
    public Material update(@PathParam("id") Long id, MaterialInput input) {
        Material existing = repository.findById(id);
        if (existing == null) {
            throw new WebApplicationException("Material not found", 404);
        }
        existing.setName(input.getName());
        existing.setStock(input.getStock());
        return existing;
    }

    @DELETE
    @Path("{id}")
    @Transactional 
    public Response delete(@PathParam("id") Long id) {
        repository.deleteById(id);
        return Response.noContent().build();
    }
}

