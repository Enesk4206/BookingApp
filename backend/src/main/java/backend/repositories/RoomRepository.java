package backend.repositories;


import org.springframework.data.jpa.repository.JpaRepository;

import backend.models.Room;

public interface RoomRepository extends JpaRepository<Room, Long> {
}