package fvale.backend.dto;

import fvale.backend.enums.Answer;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FeedbackDto {

    private Long questionId;
    private char givenAnswer;
    private Answer correctAnswer;

}
