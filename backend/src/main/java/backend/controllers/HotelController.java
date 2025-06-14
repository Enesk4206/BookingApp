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

import backend.dtos.HotelRequestResponse;
import backend.services.HotelService;
import lombok.RequiredArgsConstructor;

@CrossOrigin(origins="http://localhost:5173")
@RestController
@RequestMapping("/api/hotel")
@RequiredArgsConstructor
public class HotelController {
    private final HotelService hotelService;

    @PostMapping(value="/create")
    public ResponseEntity<HotelRequestResponse> createAPI(@RequestBody HotelRequestResponse request){
        return ResponseEntity.status(HttpStatus.CREATED).body(hotelService.create(request));
    }
    @GetMapping(value="/all-hotels")
    public ResponseEntity<List<HotelRequestResponse>> getAllAPI(){
        return ResponseEntity.status(HttpStatus.OK).body(hotelService.listAll());
    }
    @PutMapping(value="/update/{id}")
    public ResponseEntity<HotelRequestResponse> updateAPI(@PathVariable Long id, @RequestBody HotelRequestResponse request){
        return ResponseEntity.status(HttpStatus.OK).body(hotelService.update(id,request));
    }
    @DeleteMapping(value="/delete/{id}")
    public ResponseEntity<HotelRequestResponse> deleteAPI(@PathVariable Long id){
        hotelService.delete(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
