package fvale.backend.enums;

import fvale.backend.exception.QuestionLevelNotFoundException;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.Arrays;
import java.util.Locale;

@Getter
@RequiredArgsConstructor
public enum Level {

    EASY('E', "Easy"),
    MEDIUM('M', "Medium"),
    HARD('H', "Hard");

    private final char code;
    private final String level;

    public static Level getLevelByCode(char c) {
        return Arrays.stream(Level.values())
                .filter(level -> level.getCode() == c)
                .findFirst()
                .orElseThrow(() -> new QuestionLevelNotFoundException("Cannot find question with level marked as " + c + "."));
    }

    public static Level getLevelByString(String lvl) {
        return Arrays.stream(Level.values())
                .filter(level -> level.getLevel().toLowerCase(Locale.ROOT).equals(lvl.toLowerCase(Locale.ROOT)))
                .findFirst()
                .orElseThrow(() -> new QuestionLevelNotFoundException("Cannot find question with level marked as " + lvl + "."));
    }

}
