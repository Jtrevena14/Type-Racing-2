package type.race;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface RaceRepo extends JpaRepository<Race, UUID> {

    @Query("SELECT u FROM Race u")
    List<Race> getAllRaces(); 

}
