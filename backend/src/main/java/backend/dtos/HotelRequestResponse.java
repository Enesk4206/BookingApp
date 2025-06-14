package backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class HotelRequestResponse {
    private Long id;
    private String name;
    private String description;
    private String imagePath;
    private Long ownerId;
    private Long categoryId;
}
