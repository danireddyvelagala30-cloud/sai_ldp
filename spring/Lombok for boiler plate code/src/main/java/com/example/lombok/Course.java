package com.example.lombok;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class Course {
    String code;
    String title;
    int durationInHours;
}
