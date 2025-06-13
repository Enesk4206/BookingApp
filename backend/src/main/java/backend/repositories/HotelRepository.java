package backend.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import backend.models.Hotel;

public interface HotelRepository extends JpaRepository<Hotel, Long> {
    Optional<Hotel> findByHotelName(String hotelName);
    boolean existsByHotelName(String hotelName);
    
}