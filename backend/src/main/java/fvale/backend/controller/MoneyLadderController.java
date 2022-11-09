package fvale.backend.controller;

import fvale.backend.model.MoneyLadder;
import fvale.backend.service.impl.MoneyLadderServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/money-ladder")
@RequiredArgsConstructor
public class MoneyLadderController {

    private final MoneyLadderServiceImpl moneyLadder;

    @GetMapping
    public ResponseEntity<List<MoneyLadder>> getMoneyLadder() {
        return ResponseEntity.ok().body(moneyLadder.getMoneyLadder());
    }

}
