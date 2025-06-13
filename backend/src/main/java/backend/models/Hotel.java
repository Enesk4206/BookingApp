package backend.models;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="hotels")
public class Hotel {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    private String hotelName;
    private String description;
    private String imagePath;
    private double rate;
    private String owner;

    @OneToMany
    private Set<Room> rooms = new HashSet<>();
    @OneToMany
    private Set<Category> categories = new HashSet<>();
}
