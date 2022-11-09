package fvale.backend.model;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity(name = "money_ladder")
@Data
@RequiredArgsConstructor
public class MoneyLadder {

    @Id
    @Column(name = "id")
    private Long id;

    @Column(name = "value")
    private String value;

}
