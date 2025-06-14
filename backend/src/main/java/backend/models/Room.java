package backend.models;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="rooms")
public class Room{
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    private int roomNumber;
    private String type;
    private double price;
    private boolean isAvailable;
    private double discount;

    @ManyToOne
    @JoinColumn(name="hotel_id")
    private Hotel hotel;
    @OneToMany(mappedBy="room",cascade=CascadeType.ALL, orphanRemoval=true)
    private Set<Rezervation> rezervations = new HashSet<>();
}
