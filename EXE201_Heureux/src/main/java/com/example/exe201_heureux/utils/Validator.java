package com.example.exe201_heureux.utils;

import com.example.exe201_heureux.exceptions.InvalidateException;
import com.example.exe201_heureux.model.DTO.message.ValidateMessage;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.safety.Cleaner;
import org.jsoup.safety.Whitelist;

import java.time.LocalDate;
import java.util.regex.Pattern;

public class Validator {

    private static final String DATE_FORMAT_REGEX = "^(19|20)\\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$";
    private static final String SCRIPT_TAG = "script";
    private static final String A_ATTRIBUTE = "a";
    private static final String HREF_ATTRIBUTE = "href";
    private static final String PHP_PREFIX = "<?php";
    private static final String PHP_SUFFIX = "?>";

    public static void isNullDate(String dateStr) throws InvalidateException {
        if (dateStr == null) {
            throw new InvalidateException(ValidateMessage.DATE_NULL);
        }
    }

    public static void isValidDate(String dateStr) throws InvalidateException {
        if (!Pattern.matches(DATE_FORMAT_REGEX, dateStr)) {
            throw new InvalidateException(ValidateMessage.INVALID_DATE_FORMAT);
        }
        try {
            LocalDate.parse(dateStr);
        } catch (Exception e) {
            throw new InvalidateException(ValidateMessage.INVALID_DATE_VALUE);
        }
    }

    public static void isValidInput(String input) {
        if (input == null) return;

        Whitelist whitelist = Whitelist.basicWithImages();

        whitelist.removeTags(SCRIPT_TAG);
        whitelist.removeAttributes(A_ATTRIBUTE, HREF_ATTRIBUTE);

        Document document = Jsoup.parse(input);

        Cleaner cleaner = new Cleaner(whitelist);
        Document cleanedDocument = cleaner.clean(document);

        if (cleanedDocument.body().hasText()) {
            System.out.println(ValidateMessage.INVALID_STRING);
        }

        if (input.contains(PHP_PREFIX) || input.contains(PHP_SUFFIX)) {
            System.out.println(ValidateMessage.INVALID_STRING);
        }
    }


}
