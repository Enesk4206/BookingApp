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

import backend.dtos.RoomRequestResponse;
import backend.services.RoomService;
import lombok.RequiredArgsConstructor;

@CrossOrigin(origins="http://localhost:5173")
@RestController
@RequestMapping("/api/room")
@RequiredArgsConstructor
public class RoomController {
    private final RoomService roomService;

    @PostMapping(value="/create")
    public ResponseEntity<RoomRequestResponse> createAPI(@RequestHeader("X-User-Id") Long actingUserId, @RequestBody RoomRequestResponse request){
        return ResponseEntity.status(HttpStatus.CREATED).body(roomService.create(actingUserId,request));
    }
    @GetMapping(value="/all-rooms")
    public ResponseEntity<List<RoomRequestResponse>> getAllAPI(){
        return ResponseEntity.status(HttpStatus.OK).body(roomService.listAll());
    }
    @PutMapping(value="/update/{id}")
    public ResponseEntity<RoomRequestResponse> updateAPI(@RequestHeader("X-User-Id") Long actingUserId,@PathVariable Long id, @RequestBody RoomRequestResponse request){
        return ResponseEntity.status(HttpStatus.OK).body(roomService.update(actingUserId,id,request));
    }
    @DeleteMapping(value="/delete/{id}")
    public ResponseEntity<RoomRequestResponse> deleteAPI(@PathVariable Long id){
        roomService.delete(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
