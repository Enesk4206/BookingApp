package backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import backend.models.Rezervation;

public interface RezervationRepository extends JpaRepository<Rezervation, Long> {
    
}
