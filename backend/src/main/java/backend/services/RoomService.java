package backend.services;


import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import backend.dtos.RoomRequestResponse;
import backend.models.Hotel;
import backend.models.Rezervation;
import backend.models.Role;
import backend.models.Room;
import backend.models.User;
import backend.repositories.HotelRepository;
import backend.repositories.RoomRepository;
import backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RoomService {
    private final RoomRepository roomRepository;
    private final HotelRepository hotelRepository;
    private final UserRepository userRepository;

    public RoomRequestResponse create(Long actingUserId, RoomRequestResponse request){
      try {
            //find Hotel
            Hotel hotel = hotelRepository.findById(request.getHotelId()).orElseThrow(
                () -> new RuntimeException("Hotel not found! with: "+request.getHotelId())
            );
            
            //find User
            User actingUser = userRepository.findById(actingUserId).orElseThrow(
                () -> new RuntimeException("Hotel not found! with: "+actingUserId)
            );
            
            //Authorization checkpoint
            if(actingUser.getRole() == Role.OWNER){
                if(!hotel.getOwner().getId().equals(actingUserId)){
                    throw new RuntimeException("You can only create room to your own hotel!");
                }
            }else if (actingUser.getRole() != Role.SUPERADMIN) {
                throw new RuntimeException("You don't have permission to add rooms!");
            }

            Room room = new Room();
            room.setRoomNumber(request.getRoomNumber());
            room.setType(request.getType());
            room.setPrice(request.getPrice());
            room.setAvailable(request.isAvailable());
            room.setDiscount(request.getDiscount());
            room.setRezervations(new HashSet<>());
            room.setHotel(hotel);
            
            Room created = roomRepository.save(room);
            return new RoomRequestResponse(
                created.getId(),
                created.getRoomNumber(),
                created.getType(),
                created.getPrice(),
                created.isAvailable(),
                created.getDiscount(),
                created.getHotel().getId(),
                created.getRezervations().stream().map(Rezervation::getId).collect(Collectors.toSet())
            );
        
      } catch (RuntimeException e) {
            throw new RuntimeException("Internal Server Error");
      }
    }

    public List<RoomRequestResponse> listAll(){
        try {
             List<Room> allRooms = roomRepository.findAll();

            return allRooms.stream().map(
                room -> new RoomRequestResponse(
                    room.getId(),
                    room.getRoomNumber(),
                    room.getType(),
                    room.getPrice(),
                    room.isAvailable(),
                    room.getDiscount(),
                    room.getHotel().getId(),
                    room.getRezervations().stream().map(Rezervation::getId).collect(Collectors.toSet())
                    )
            ).collect(Collectors.toList());
        } catch (RuntimeException e) {
            throw new RuntimeException("Internal Server Error");
      }
       
    }

    public RoomRequestResponse update(Long actingUserId, Long id, RoomRequestResponse request){
      try {
            //room
            Room existsRoom = roomRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Room not found! with: "+id)
            );
            //user
            User actingUser = userRepository.findById(actingUserId).orElseThrow(
                () -> new RuntimeException("User not found! with: "+actingUserId)
            );

            //Authentication checkpoint
            if(actingUser.getRole() == Role.OWNER){
                if(!existsRoom.getHotel().getOwner().getId().equals(actingUserId)){
                    throw new RuntimeException("You can only create room to your own hotel!");
                }else if(actingUser.getRole() !=Role.SUPERADMIN){
                    throw new RuntimeException("You don't have permission to update rooms!");

                }
            }


            existsRoom.setRoomNumber(request.getRoomNumber());
            existsRoom.setType(request.getType());
            existsRoom.setPrice(request.getPrice());
            existsRoom.setAvailable(request.isAvailable());
            existsRoom.setDiscount(request.getDiscount());
            existsRoom.setRezervations(new HashSet<>());
            
            if(request.getHotelId() != null && existsRoom.getHotel().getId().equals(request.getHotelId())){
                if(actingUser.getRole() != Role.SUPERADMIN){
                    throw new RuntimeException("Only Superadmin can change the hotel of a room");
                }
            }
            Hotel newHotel = hotelRepository.findById(request.getHotelId()).orElseThrow(
                ()-> new RuntimeException("Hotel not found with id:"+request.getHotelId())
            );
            existsRoom.setHotel(newHotel);

            Room updated = roomRepository.save(existsRoom);
            
            return new RoomRequestResponse(
                updated.getId(),
                updated.getRoomNumber(),
                updated.getType(),
                updated.getPrice(),
                updated.isAvailable(),
                updated.getDiscount(),
                updated.getHotel().getId(),
                updated.getRezervations().stream().map(Rezervation::getId).collect(Collectors.toSet())
            );
            
      } catch (RuntimeException e) {
            throw new RuntimeException("Internal Server Error");
      }
    }

    public void delete(Long id){
        try {
            Room existsRoom = roomRepository.findById(id).orElseThrow(
                () ->  new RuntimeException("Room wasn't found")
            );

            roomRepository.delete(existsRoom);
        }catch (RuntimeException e) {
            throw new RuntimeException("Internal Server Error");
      }
    }

}
