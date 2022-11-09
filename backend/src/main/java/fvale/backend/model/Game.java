package fvale.backend.model;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.Type;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity(name = "game")
@Data
@RequiredArgsConstructor
public class Game {

    public Game(String id) {
        this.id = id;
    }

    @Id
    @Column(name = "id")
    private String id;

    @Column(name = "questions", columnDefinition = "bigint[]")
    @Type(type = "fvale.backend.model.mapping.GenericArrayUserType")
    private Long[] questions;

    @Column(name = "answered")
    private int answered;

    @Column(name = "finished")
    private boolean isFinished;

}
