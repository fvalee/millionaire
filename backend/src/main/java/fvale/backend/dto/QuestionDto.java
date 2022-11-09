package fvale.backend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class QuestionDto {

    private Long questionId;
    private String question;
    private String optionA;
    private String optionB;
    private String optionC;
    private String optionD;
    private Long questionNumber;

}
