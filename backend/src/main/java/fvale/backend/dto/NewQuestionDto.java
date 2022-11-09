package fvale.backend.dto;

import lombok.Data;

@Data
public class NewQuestionDto {

    private String question;
    private String optionA;
    private String optionB;
    private String optionC;
    private String optionD;
    private String correctAnswer;
    private String questionLevel;

}
