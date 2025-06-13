package backend.models;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="users")
public class User {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY) 
    private Long id;
    @Column(nullable=false, unique=true)
    private String username;   
    @Column(nullable=false)
    private String password;   
    @Column(nullable=false)
    private String email;
    private Date createdDateTime;
    @Enumerated(EnumType.STRING)
    private Role role;
    
    private void onCreate(){
        createdDateTime = new Date();
    } 
}
