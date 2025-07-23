package com.example.distributednewsbackend.model;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

/**
 * BasicNews model class.
 * This class can be extended to include more fields as needed.
 */
@AllArgsConstructor
@Getter
@Setter
public class BasicNews {

    private String title;
    private Object content; // Use Object to allow for different content types
    private String author;
    private String lead;
    private Date publishedDate;
    
}
