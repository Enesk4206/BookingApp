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
public class RoomRequestResponse {

    private Long id;
    private int roomNumber;
    private String type;
    private double price;
    private boolean isAvailable;
    private double discount;
    private Long hotelId;
    private Set<Long> rezervationIds;
}
