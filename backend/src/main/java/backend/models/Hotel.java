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
@Table(name="hotels")
public class Hotel {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private String imagePath;
    
    //otel sahibi
    @ManyToOne
    @JoinColumn(name="owner_id")
    private User owner;

    //Odalar
    @OneToMany(mappedBy="hotel",cascade=CascadeType.ALL ,orphanRemoval=true)
    private Set<Room> rooms = new HashSet<>();
    
    //kategori
    @ManyToOne
    @JoinColumn(name="category_id")
    private Category category;
}
