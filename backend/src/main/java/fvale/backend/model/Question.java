package fvale.backend.model;

import fvale.backend.converter.LevelConverter;
import fvale.backend.enums.Answer;
import fvale.backend.enums.Level;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;

@Entity(name = "question")
@Data
@RequiredArgsConstructor
public class Question {

    @Id
    @Column(name = "id")
    @GeneratedValue(generator = "question_id_seq")
    @SequenceGenerator(name = "question_id_seq", sequenceName = "question_id_seq", allocationSize = 1)
    private Long id;

    @Column(name = "level")
    @Convert(converter = LevelConverter.class)
    private Level level;

    @Column(name = "text")
    private String text;

    @Column(name = "option_A")
    private String optionA;

    @Column(name = "option_B")
    private String optionB;

    @Column(name = "option_C")
    private String optionC;

    @Column(name = "option_D")
    private String optionD;

    @Column(name = "answer")
    @Enumerated(EnumType.STRING)
    private Answer answer;

}
