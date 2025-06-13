package backend.services;


import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import backend.dtos.CategoryRequestResponse;
import backend.models.Category;
import backend.repositories.CategoryRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public CategoryRequestResponse create(CategoryRequestResponse request){
        
      try {
            if(categoryRepository.existsByName(request.getName())){
            throw new RuntimeException("Category name already exists");
            }
            Category category = new Category();
            category.setName(request.getName());
            Category saved = categoryRepository.save(category);

            return new CategoryRequestResponse(
                saved.getId(),
                saved.getName()
            );
      } catch (RuntimeException e) {
            throw new RuntimeException("Internal Server Error");
      }
    }

    public List<CategoryRequestResponse> listAll(){
        try {
             List<Category> allCategories = categoryRepository.findAll();

            return allCategories.stream().map(
                category -> new CategoryRequestResponse(
                    category.getId(),
                    category.getName()
                )
            ).collect(Collectors.toList());
        } catch (RuntimeException e) {
            throw new RuntimeException("Internal Server Error");
      }
       
    }

    public CategoryRequestResponse update(Long id, CategoryRequestResponse request){
      try {
            Category existsCategory = categoryRepository.findById(id).orElseThrow(
            () ->  new RuntimeException("Category wasn't found")
            );

            existsCategory.setName(request.getName());
            
            Category updated = categoryRepository.save(existsCategory);
            return new CategoryRequestResponse(
                updated.getId(),
                updated.getName()
            );

      } catch (RuntimeException e) {
            throw new RuntimeException("Internal Server Error");
      }
    }

    public void delete(Long id){
        try {
            Category existsCategory = categoryRepository.findById(id).orElseThrow(
                () ->  new RuntimeException("Category wasn't found")
            );

            categoryRepository.delete(existsCategory);
        }catch (RuntimeException e) {
            throw new RuntimeException("Internal Server Error");
      }
    }

}
