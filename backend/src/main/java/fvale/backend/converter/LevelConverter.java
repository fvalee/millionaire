package fvale.backend.converter;

import fvale.backend.enums.Level;
import fvale.backend.exception.QuestionLevelNotFoundException;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class LevelConverter implements AttributeConverter<Level, Character> {

    @Override
    public Character convertToDatabaseColumn(Level level) {
        return switch (level) {
            case EASY -> Level.EASY.getCode();
            case MEDIUM -> Level.MEDIUM.getCode();
            case HARD -> Level.HARD.getCode();
        };
    }

    @Override
    public Level convertToEntityAttribute(Character character) {
        return switch (character) {
            case 'E' -> Level.EASY;
            case 'M' -> Level.MEDIUM;
            case 'H' -> Level.HARD;
            default -> throw new QuestionLevelNotFoundException("Cannot find question with level marked as " + character + ".");
        };
    }

}
