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
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.dtos.RezervationRequestResponse;
import backend.services.RezervationService;
import lombok.RequiredArgsConstructor;

@CrossOrigin(origins="http://localhost:5173")
@RestController
@RequestMapping("/api/rezervation")
@RequiredArgsConstructor
public class RezervationController {
    private final RezervationService rezervationService;

    @PostMapping("/create")
    public ResponseEntity<RezervationRequestResponse> createAPI(
        @RequestHeader("X-USER-ID") Long actingUserId,
        @RequestBody RezervationRequestResponse request){
            return ResponseEntity.status(HttpStatus.CREATED).body(rezervationService.create(actingUserId, request));
        }
    @GetMapping("/all-rezervations")
    public ResponseEntity<List<RezervationRequestResponse>> getAllAPI(){
        return ResponseEntity.status(HttpStatus.OK).body(rezervationService.listAll());
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<RezervationRequestResponse> updateAPI(
        @RequestHeader("X-USER-ID") Long actingUserId,
        @PathVariable Long id,
        @RequestBody RezervationRequestResponse request
    ){
        return ResponseEntity.status(HttpStatus.OK).body(rezervationService.update(actingUserId, id, request));
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteAPI(@RequestHeader("X-USER-ID") Long actingUserId, @PathVariable Long id){
        rezervationService.delete(actingUserId, id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
