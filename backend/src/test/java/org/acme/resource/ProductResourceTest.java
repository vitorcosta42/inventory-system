package org.acme.resource;

import org.acme.entity.Material;
import org.acme.entity.Product;
import org.acme.entity.ProductMaterial;
import org.acme.repository.MaterialRepository;
import org.acme.repository.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import jakarta.ws.rs.WebApplicationException;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

class ProductResourceTest {

    @InjectMocks
    ProductResource productResource;

    @Mock
    ProductRepository productRepo;

    @Mock
    MaterialRepository materialRepo;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllProducts() {
        List<Product> products = new ArrayList<>();
        products.add(new Product());
        when(productRepo.listAll()).thenReturn(products);

        List<Product> result = productResource.getAll();

        assertEquals(1, result.size());
        verify(productRepo).listAll();
    }

    @Test
    void testCreateProductSuccess() {
        Material mat = new Material();
        mat.setId(1L);          // se existir setter
        mat.setName("Wood");
        mat.setStock(50);

        ProductMaterial pm = new ProductMaterial();
        pm.setMaterial(mat);
        pm.setQuantity(10);

        Product product = new Product();
        product.setName("Table");
        product.setPrice(BigDecimal.valueOf(100));
        product.setMaterials(List.of(pm));

        when(materialRepo.findById(1L)).thenReturn(mat);

        Product created = productResource.create(product);

        assertEquals("Table", created.getName());
        assertEquals(40, mat.getStock()); // 50 - 10
        verify(productRepo).persist(product);
    }


    @Test
    void testCreateProductNoMaterials() {
        Product product = new Product();
        product.setName("Chair");

        WebApplicationException ex = assertThrows(WebApplicationException.class,
                () -> productResource.create(product));
        assertEquals("O produto deve possuir pelo menos uma matéria-prima", ex.getMessage());
    }

    @Test
    void testUpdateProductSuccess() {
        Material mat = new Material();
        mat.setId(1L);
        mat.setName("Wood");
        mat.setStock(50);

        ProductMaterial oldPm = new ProductMaterial();
        oldPm.setMaterial(mat);
        oldPm.setQuantity(5);

        Product existing = new Product();
        existing.setId(1L);
        existing.setName("Old Table");
        existing.setPrice(BigDecimal.valueOf(100));
        existing.setMaterials(new ArrayList<>(List.of(oldPm)));

        ProductMaterial newPm = new ProductMaterial();
        newPm.setMaterial(mat);
        newPm.setQuantity(10);

        Product updated = new Product();
        updated.setName("New Table");
        updated.setPrice(BigDecimal.valueOf(120));
        updated.setMaterials(List.of(newPm));

        when(productRepo.findById(1L)).thenReturn(existing);
        when(materialRepo.findById(1L)).thenReturn(mat);

        Product result = productResource.update(1L, updated);

        assertEquals("New Table", result.getName());
        assertEquals(45, mat.getStock()); // 50 + 5 - 10
    }

    @Test
    void testDeleteProductSuccess() {
        Material mat = mock(Material.class);
        when(mat.getId()).thenReturn(1L);
        when(mat.getStock()).thenReturn(40);

        ProductMaterial pm = new ProductMaterial();
        pm.setMaterial(mat);
        pm.setQuantity(10);

        Product product = new Product();
        product.setId(1L);
        product.setMaterials(List.of(pm));

        when(productRepo.findById(1L)).thenReturn(product);

        productResource.delete(1L);

        // Verifica se o estoque foi restaurado
        verify(mat).setStock(50); // 40 + 10
        verify(productRepo).delete(product);
    }

    @Test
    void testDeleteProductNotFound() {
        when(productRepo.findById(1L)).thenReturn(null);

        WebApplicationException ex = assertThrows(WebApplicationException.class,
                () -> productResource.delete(1L));
        assertEquals("Produto não encontrado", ex.getMessage());
    }
}