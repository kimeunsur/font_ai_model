package com.example.npds.dto;

import java.util.List;

public class GptResponse {
    private List<GptChoice> choices;

    public List<GptChoice> getChoices() {
        return choices;
    }

    public void setChoices(List<GptChoice> choices) {
        this.choices = choices;
    }
}
