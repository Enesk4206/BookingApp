package backend.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.dtos.CategoryRequestResponse;
import backend.services.CategoryService;
import lombok.RequiredArgsConstructor;

@CrossOrigin(origins="http://localhost:5173")
@RestController
@RequestMapping("/api/category")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @PostMapping(value="/create")
    public ResponseEntity<CategoryRequestResponse> createAPI(@RequestBody CategoryRequestResponse request){
        return ResponseEntity.status(HttpStatus.CREATED).body(categoryService.create(request));
    }
    @GetMapping(value="/all-categories")
    public ResponseEntity<List<CategoryRequestResponse>> getAllAPI(){
        return ResponseEntity.status(HttpStatus.OK).body(categoryService.listAll());
    }
    @PutMapping(value="/update/{id}")
    public ResponseEntity<CategoryRequestResponse> updateAPI(@PathVariable Long id, @RequestBody CategoryRequestResponse request){
        return ResponseEntity.status(HttpStatus.OK).body(categoryService.update(id,request));
    }
    @DeleteMapping(value="/delete/{id}")
    public ResponseEntity<CategoryRequestResponse> deleteAPI(@PathVariable Long id){
        categoryService.delete(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
