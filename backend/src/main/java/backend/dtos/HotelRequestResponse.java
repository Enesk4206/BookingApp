package backend.dtos;

import java.util.Set;

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
    private String hotelName;
    private String description;
    private String imagePath;
    private double rate;
    private String owner;
    private Set<Long> rooms;
    private Set<Long> categories;
}
