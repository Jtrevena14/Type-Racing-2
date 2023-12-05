package type.race;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "race")
public class Race {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    public UUID id;

    @Column(name = "race_dialog")
    public String race_dialog;

    @Column(name = "wpm")
    public int wpm;

    @Column(name = "time")
    public int time;

    @Column(name = "date")
    public String date;

    @Column(name = "username")
    public String username;
}
