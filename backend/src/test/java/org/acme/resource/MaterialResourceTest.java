package org.acme.resource;

import org.acme.entity.Material;
import org.acme.repository.MaterialRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import jakarta.ws.rs.WebApplicationException;
import jakarta.ws.rs.core.Response;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class MaterialResourceTest {

    @InjectMocks
    MaterialResource materialResource;

    @Mock
    MaterialRepository repository;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllMaterials() {
        List<Material> materials = new ArrayList<>();
        Material mat = new Material();
        mat.setId(1L);
        mat.setName("Wood");
        mat.setStock(50);
        materials.add(mat);

        when(repository.listAll()).thenReturn(materials);

        List<Material> result = materialResource.getAll();

        assertEquals(1, result.size());
        assertEquals("Wood", result.get(0).getName());
        verify(repository).listAll();
    }

    @Test
    void testCreateMaterial() {
        MaterialResource.MaterialInput input = new MaterialResource.MaterialInput();
        input.setName("Steel");
        input.setStock(100);

        Material matPersisted = new Material();
        matPersisted.setName(input.getName());
        matPersisted.setStock(input.getStock());

        doAnswer(invocation -> {
            Material m = invocation.getArgument(0);
            m.setId(1L); 
            return null;
        }).when(repository).persist(any(Material.class));

        Material created = materialResource.create(input);

        assertEquals("Steel", created.getName());
        assertEquals(100, created.getStock());
        assertNotNull(created.getId());
        verify(repository).persist(any(Material.class));
    }

    @Test
    void testUpdateMaterialSuccess() {
        Material existing = new Material();
        existing.setId(1L);
        existing.setName("Wood");
        existing.setStock(50);

        when(repository.findById(1L)).thenReturn(existing);

        MaterialResource.MaterialInput input = new MaterialResource.MaterialInput();
        input.setName("Wood Premium");
        input.setStock(70);

        Material updated = materialResource.update(1L, input);

        assertEquals("Wood Premium", updated.getName());
        assertEquals(70, updated.getStock());
    }

    @Test
    void testUpdateMaterialNotFound() {
        when(repository.findById(1L)).thenReturn(null);

        MaterialResource.MaterialInput input = new MaterialResource.MaterialInput();
        input.setName("Wood Premium");
        input.setStock(70);

        WebApplicationException ex = assertThrows(WebApplicationException.class,
                () -> materialResource.update(1L, input));

        assertEquals("Material not found", ex.getMessage());
    }

    @Test
    void testDeleteMaterial() {
        Material mat = new Material();
        mat.setId(1L);
        mat.setName("Wood");
        mat.setStock(50);

        when(repository.findById(1L)).thenReturn(mat);
        when(repository.deleteById(1L)).thenReturn(true);

        Response response = materialResource.delete(1L);

        assertEquals(204, response.getStatus());
        verify(repository).deleteById(1L);
    }

}
