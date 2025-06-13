package backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RoomRequestResponse {

    private Long id;
    private String roomNumber;
    private String adult;
    private String kid;
    private Long hotelId;
    private double price;
    private double discount;
}
