package type.race;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class RaceController {
    
    @Autowired 
    private RaceService raceService;

    @GetMapping("races")
    public ResponseEntity<Object> getAllUsers(){
        return raceService.getAllUsers();
    }

    @PostMapping("races")
    public ResponseEntity<Object> addUser(@RequestBody Race race){
        return raceService.addRace(race);
    }

    
}
