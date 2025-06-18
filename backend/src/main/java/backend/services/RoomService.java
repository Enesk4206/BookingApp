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
            Hotel hotel = hotelRepository.findById(request.getHotelId())
                    .orElseThrow(() -> new RuntimeException("Hotel not found! with: "+request.getHotelId()));

            User actingUser = userRepository.findById(actingUserId)
                    .orElseThrow(() -> new RuntimeException("User not found! with: "+actingUserId));

            if (actingUser.getRole() == Role.OWNER) {
                if (!hotel.getOwner().getId().equals(actingUserId)) {
                    throw new RuntimeException("You can only create rooms in your own hotel!");
                }
            } else if (actingUser.getRole() != Role.SUPERADMIN) {
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

            return convertToDto(created);
        } catch (RuntimeException e) {
            throw new RuntimeException("Internal Server Error");
        }
    }

    public List<RoomRequestResponse> listAll(){
        try {
            List<Room> allRooms = roomRepository.findAll();
            return allRooms.stream().map(this::convertToDto).collect(Collectors.toList());
        } catch (RuntimeException e) {
            throw new RuntimeException("Internal Server Error");
        }
    }

    public RoomRequestResponse update(Long actingUserId, Long id, RoomRequestResponse request){
        try {
            Room existsRoom = roomRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Room not found! with: " + id));

            User actingUser = userRepository.findById(actingUserId)
                    .orElseThrow(() -> new RuntimeException("User not found! with: " + actingUserId));

            if (actingUser.getRole() == Role.OWNER) {
                if (!existsRoom.getHotel().getOwner().getId().equals(actingUserId)) {
                    throw new RuntimeException("You can only update rooms in your own hotel!");
                }
            } else if (actingUser.getRole() != Role.SUPERADMIN) {
                throw new RuntimeException("You don't have permission to update rooms!");
            }

            existsRoom.setRoomNumber(request.getRoomNumber());
            existsRoom.setType(request.getType());
            existsRoom.setPrice(request.getPrice());
            existsRoom.setAvailable(request.isAvailable());
            existsRoom.setDiscount(request.getDiscount());
            existsRoom.setRezervations(new HashSet<>());

            // Otel değişimi sadece SUPERADMIN'e açık
            if (request.getHotelId() != null && !existsRoom.getHotel().getId().equals(request.getHotelId())) {
                if (actingUser.getRole() != Role.SUPERADMIN) {
                    throw new RuntimeException("Only SUPERADMIN can change the hotel of a room.");
                }
                Hotel newHotel = hotelRepository.findById(request.getHotelId())
                        .orElseThrow(() -> new RuntimeException("Hotel not found with id: " + request.getHotelId()));
                existsRoom.setHotel(newHotel);
            }

            Room updated = roomRepository.save(existsRoom);
            return convertToDto(updated);
        } catch (RuntimeException e) {
            throw new RuntimeException("Internal Server Error");
        }
    }

    public void delete(Long actingUserId, Long roomId) {
        try {
            Room room = roomRepository.findById(roomId)
                    .orElseThrow(() -> new RuntimeException("Room wasn't found"));

            User actingUser = userRepository.findById(actingUserId)
                    .orElseThrow(() -> new RuntimeException("User not found!"));

            if (actingUser.getRole() == Role.OWNER) {
                if (!room.getHotel().getOwner().getId().equals(actingUserId)) {
                    throw new RuntimeException("You can only delete rooms in your own hotel!");
                }
            } else if (actingUser.getRole() != Role.SUPERADMIN) {
                throw new RuntimeException("You don't have permission to delete this room!");
            }

            roomRepository.delete(room);
        } catch (RuntimeException e) {
            throw new RuntimeException("Internal Server Error");
        }
    }

    private RoomRequestResponse convertToDto(Room room) {
        return new RoomRequestResponse(
                room.getId(),
                room.getRoomNumber(),
                room.getType(),
                room.getPrice(),
                room.isAvailable(),
                room.getDiscount(),
                room.getHotel().getId(),
                room.getRezervations().stream().map(Rezervation::getId).collect(Collectors.toSet())
        );
    }
}
