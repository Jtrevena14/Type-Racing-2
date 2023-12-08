package type.race;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class RaceService {
    @Autowired
    private RaceRepo raceRepo;
    
    public ResponseEntity<Object> getAllUsers() {
        return ResponseEntity.ok(raceRepo.getAllRaces());
    }

    public ResponseEntity<Object> addRace(Race race) {
        raceRepo.save(race);
        return ResponseEntity.ok(race);
    }

}
