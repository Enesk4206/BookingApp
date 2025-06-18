package backend.dtos;

import backend.models.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OwnerRegisterResponse {
    private Long id;
    private String username;
    private String password;
    private String email;
    private Role role;
    private Long hotelId;
}
