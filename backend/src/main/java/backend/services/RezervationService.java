package backend.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import backend.dtos.RezervationRequestResponse;
import backend.models.Rezervation;
import backend.models.RezervationStatus;
import backend.models.Role;
import backend.models.Room;
import backend.models.User;
import backend.repositories.RezervationRepository;
import backend.repositories.RoomRepository;
import backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RezervationService {
    private final RezervationRepository rezervationRepository;
    private final UserRepository userRepository;
    private final RoomRepository roomRepository;

    public RezervationRequestResponse create(Long actingUserId, RezervationRequestResponse request){
        try {
            //Current user
            User actingUser = userRepository.findById(actingUserId).orElseThrow(
                ()-> new RuntimeException("User not found with id: "+actingUserId)
            );
            //Room
            Room room = roomRepository.findById(request.getRoomId()).orElseThrow(
                () -> new RuntimeException("Room not found with id: "+request.getRoomId())
            );

            //Authorization checkpoint
            if(actingUser.getRole() == Role.CUSTOMER){
                if(request.getCustomerId() != null && !request.getCustomerId().equals(actingUser.getId())){
                    throw new RuntimeException("You can only rezervation for yourself!!");
                }
            }else if(actingUser.getRole() != Role.SUPERADMIN){
                throw new RuntimeException("You don't have any permission to create rezervation");
            }

            Rezervation rezervation = new Rezervation();
            rezervation.setStartDate(request.getStartDate());
            rezervation.setEndDate(request.getEndDate());
            rezervation.setStatus(request.getStatus() != null ? request.getStatus() : RezervationStatus.PENDING);
            rezervation.setRoom(room);
            
            //Superadmin add any customerId rezervation
            if(actingUser.getRole() == Role.SUPERADMIN && request.getCustomerId() != null){
                User customer = userRepository.findById(request.getCustomerId()).orElseThrow(
                    () -> new RuntimeException("Customer not found with: id"+request.getCustomerId())
                );
                rezervation.setCustomer(customer);
            }else {
                //customer added with byself add
                rezervation.setCustomer(actingUser);
            }

            Rezervation created = rezervationRepository.save(rezervation);
            return new RezervationRequestResponse(
                created.getId(),
                created.getStartDate(),
                created.getEndDate(),
                created.getStatus(),
                created.getRoom().getId(),
                created.getCustomer().getId()
            );

        } catch (RuntimeException e) {
            throw new RuntimeException("Internal Server Error"+ e.getMessage(),e);
        }
    }

    public List<RezervationRequestResponse> listAll(){
        try {
            List<Rezervation> rezervations = rezervationRepository.findAll();
            
            return rezervations.stream().map(
                rezervation -> new RezervationRequestResponse(
                    rezervation.getId(),
                    rezervation.getStartDate(),
                    rezervation.getEndDate(),
                    rezervation.getStatus(),
                    rezervation.getRoom().getId(),
                    rezervation.getCustomer().getId()
                )
            ).collect(Collectors.toList());
            
        } catch (RuntimeException e) {
            throw new RuntimeException("Internal Server Error"+ e.getMessage(),e);

        }
    }

    public RezervationRequestResponse update(Long actingUserId, Long id, RezervationRequestResponse request){
        try {
            //Current user
            User actingUser = userRepository.findById(actingUserId).orElseThrow(
                ()-> new RuntimeException("User not found with id: "+actingUserId)
            );

            Rezervation existsRezervation = rezervationRepository.findById(id).orElseThrow(
                ()-> new RuntimeException("Rezervation not found with id: "+id)
            );

             //Authorization checkpoint
            if(actingUser.getRole() == Role.CUSTOMER){
                if(request.getCustomerId() != null && !request.getCustomerId().equals(actingUser.getId())){
                    throw new RuntimeException("You can only rezervation for yourself!!");
                }
            }else if(actingUser.getRole() != Role.SUPERADMIN){
                throw new RuntimeException("You don't have any permission to update rezervation");
            }

            existsRezervation.setStartDate(request.getStartDate());
            existsRezervation.setEndDate(request.getEndDate());
        
            //updaet status
            if(request.getStatus() !=null){
                existsRezervation.setStatus(request.getStatus());
            }
            if(request.getRoomId() !=null){
                Room room = roomRepository.findById(request.getRoomId()).orElseThrow(
                () -> new RuntimeException("Room not found with id: "+request.getRoomId())
                );
                existsRezervation.setRoom(room);
            }

            Rezervation updated = rezervationRepository.save(existsRezervation);
             return new RezervationRequestResponse(
                updated.getId(),
                updated.getStartDate(),
                updated.getEndDate(),
                updated.getStatus(),
                updated.getRoom().getId(),
                updated.getCustomer().getId()
            );

        } catch (RuntimeException e) {
            throw new RuntimeException("Internal Server Error"+ e.getMessage(),e);
        }
    }

    public void delete(Long actingUserId, Long id){
        //Current user
        User actingUser = userRepository.findById(actingUserId).orElseThrow(
                ()-> new RuntimeException("User not found with id: "+actingUserId)
            );

        Rezervation existsRezervation = rezervationRepository.findById(id).orElseThrow(
                ()-> new RuntimeException("Rezervation not found with id: "+id)
            );

     if(actingUser.getRole() == Role.CUSTOMER){
            if(existsRezervation.getCustomer().getId() != null){
                    throw new RuntimeException("You can only rezervation delete for yourself!!");
                }
            }else if(actingUser.getRole() != Role.SUPERADMIN){
                throw new RuntimeException("You don't have any permission to delete rezervation");
            }
            
    }
}
