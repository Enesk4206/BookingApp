package backend.dtos;

import java.time.LocalDate;

import backend.models.RezervationStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RezervationRequestResponse {
    private Long id;
    private LocalDate startDate;
    private LocalDate endDate;
    private RezervationStatus status;
    private Long roomId;
    private Long customerId;
}
