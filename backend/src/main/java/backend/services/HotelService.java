package backend.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import backend.dtos.HotelRequestResponse;
import backend.models.Category;
import backend.models.Hotel;
import backend.models.User;
import backend.repositories.CategoryRepository;
import backend.repositories.HotelRepository;
import backend.repositories.RoomRepository;
import backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class HotelService {
    private final HotelRepository hotelRepository;
    private final CategoryRepository categoryRepository;
    private final RoomRepository roomRepository;
    private final UserRepository userRepository;

    public HotelRequestResponse create(HotelRequestResponse request){
        try {
            if(hotelRepository.existsByName(request.getName())){
                throw new RuntimeException("Hotel name already exists!");
            }
            User owner = userRepository.findById(request.getOwnerId()).orElseThrow(
                ()-> new RuntimeException("Hotel owner not found!")
            );

            Category category = categoryRepository.findById(request.getCategoryId()).orElseThrow(
                () -> new RuntimeException("Category not found!")
            );

            Hotel hotel = new Hotel();
            hotel.setName(request.getName());
            hotel.setDescription(request.getDescription());
            hotel.setImagePath(request.getImagePath());
            hotel.setOwner(owner);
            hotel.setCategory(category);

            Hotel created = hotelRepository.save(hotel);

            return new HotelRequestResponse(
                created.getId(),
                created.getName(),
                created.getDescription(),
                created.getImagePath(),
                created.getOwner().getId(),
                created.getCategory().getId()
            );

        } catch (RuntimeException e) {
            throw new RuntimeException("Internal Server Error"+e.getMessage(),e);
        }
    }

    public List<HotelRequestResponse> listAll(){
        try {
             List<Hotel> allHotels = hotelRepository.findAll();

            return allHotels.stream().map(
                hotel -> new HotelRequestResponse(
                    hotel.getId(),
                    hotel.getName(),
                    hotel.getDescription(),
                    hotel.getImagePath(),
                    hotel.getOwner().getId(),
                    hotel.getCategory().getId()
                )
            ).collect(Collectors.toList());
        } catch (RuntimeException e) {
            throw new RuntimeException("Internal Server Error");
      }
       
    }

    public HotelRequestResponse update(Long id, HotelRequestResponse request){
        try {
            Hotel existsHotel = hotelRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Hotel not found! with id: "+id)
            );
            
            if(request.getOwnerId() != null){
                Category category = categoryRepository.findById(request.getCategoryId()).orElseThrow(
                () -> new RuntimeException("Category not found!"));
                existsHotel.setCategory(category);
            }
            existsHotel.setName(request.getName());
            existsHotel.setDescription(request.getDescription());
            existsHotel.setImagePath(request.getImagePath());

            Hotel updated = hotelRepository.save(existsHotel);

            return new HotelRequestResponse(
                updated.getId(),
                updated.getName(),
                updated.getDescription(),
                updated.getImagePath(),
                updated.getOwner().getId(),
                updated.getCategory().getId()
            );
        } catch (RuntimeException e) {
                throw new RuntimeException("Internal Server Error"+ e.getMessage(),e);
        }
    }

    public void delete(Long id){
        try {
            Hotel existsHotel = hotelRepository.findById(id).orElseThrow(
                () ->  new RuntimeException("Hotel not found with id: "+id)
            );

            hotelRepository.delete(existsHotel);
        }catch (RuntimeException e) {
            throw new RuntimeException("Internal Server Error"+ e.getMessage(), e);
      }
    }
}
