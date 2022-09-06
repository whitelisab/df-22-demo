# Resources for Working with Dates in Salesforce and JavaScript

This is a curated list of resources designed to help you become a more confident developer when working with dates. This resource list was compiled for my theater session at Dreamforce 2022.

> **It's a Date(time): A Courtship with JavaScript & Salesforce**<br>
> Working with Dates and Datetimes in Salesforce and JavaScript can get complicated. Learn the edge cases involved in working on the Salesforce Platform in a date- and time-driven global application.

## Table of contents

- [JavaScript Date Resources](#javascript-date-resources)

  - [Guides and Documentation](#guides-and-documentation)

  - [Date Libraries](#date-libraries)

  - [Additional JavaScript Resources](#additional--javascript-resources)

- [Salesforce Date Resources](#salesforce-date-resources)

  - [Declarative Features](#declarative-features)

  - [Apex, SOQL, and APIs](#apex-soql-and-apis)

  - [User Interface](#user-interface)

  - [Additional Salesforce Resources](#additional-salesforce-resources)

- [Date and Time Standards](#date-and-time-standards)

## JavaScript Date Resources

### Guides and Documentation

- [MDN - JavaScript Guide - Date Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_dates#date_object)

- [MDN - JavaScript Built-in Objects - Date Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)

- [ECMAScript Language Specification - Date Object](https://tc39.es/ecma262/multipage/numbers-and-dates.html#sec-date-objects)

- [MDN - JavaScript Built-in Objects - Intl Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)

- [ECMAScript Language Specification - Intl Object](https://tc39.es/ecma402/#intl-object)

- [ECMA TC39 Temporal Proposal](https://tc39.es/proposal-temporal/docs/index.html): A proposal for a new Date/Time API for JavaScript

### Date Libraries

Below are some popular JavaScript date libraries (not an exhaustive list).

- [Day.js](https://day.js.org/)

- [date-fns](https://date-fns.org/)

- [Luxon](https://moment.github.io/luxon/#/)

- [Moment.js](https://momentjs.com/): Note: Moment.js is now in maintenance mode, however, many legacy projects use this library

### Additional JavaScript Resources

- [JavaScript for impatient programmers: Date Chapter](https://exploringjs.com/impatient-js/ch_dates.html)

- [UTC is enough for everyone ... right? - Zach Holman](https://zachholman.com/talk/utc-is-enough-for-everyone-right)

- [Everything You Need to Know about Date in JavaScript - CSS Tricks](https://css-tricks.com/everything-you-need-to-know-about-date-in-javascript/)

- [The Definitive Guide to DateTime Manipulation - Toptal](https://www.toptal.com/software/definitive-guide-to-datetime-manipulation)

- [Date and time - javascript.info](https://javascript.info/date)

## Salesforce Date Resources

### Declarative Features

#### Setting Up Your Org

- [Select Your Language, Locale, and Currency](https://help.salesforce.com/s/articleView?id=sf.admin_language_locale_currency.htm&type=5)

- [Supported Time Zones](https://help.salesforce.com/s/articleView?id=sf.admin_supported_timezone.htm&type=5)

- [Supported Date and Time Formats (ICU)](https://help.salesforce.com/s/articleView?id=sf.admin_supported_date_time_format.htm&type=5)

- [Custom Code and Locale Format Changes](https://help.salesforce.com/s/articleView?id=sf.admin_locales_code.htm&type=5)

#### Forumla Fields

- [Using Date, Date/Time, and Time Values in Formulas](https://developer.salesforce.com/docs/atlas.en-us.usefulFormulaFields.meta/usefulFormulaFields/formula_using_date_datetime.htm)

- [Sample Date Formulas](https://developer.salesforce.com/docs/atlas.en-us.usefulFormulaFields.meta/usefulFormulaFields/formula_examples_dates.htm)

- [Use Date, Date/Time, and Time Formulas Trailhead](https://trailhead.salesforce.com/content/learn/modules/advanced_formulas/date_formulas)

#### Validation Rules

- [Sample Date Validation Rules](https://developer.salesforce.com/docs/atlas.en-us.usefulValidationRules.meta/usefulValidationRules/fields_useful_validation_formulas_date.htm)

### Apex, SOQL, and APIs

#### Apex Reference Guide

- [Primitive Data Types](https://developer.salesforce.com/docs/atlas.en-us.238.0.apexcode.meta/apexcode/langCon_apex_primitives.htm)

- [Date Class](https://developer.salesforce.com/docs/atlas.en-us.238.0.apexref.meta/apexref/apex_methods_system_date.htm)

- [Datetime Class](https://developer.salesforce.com/docs/atlas.en-us.238.0.apexref.meta/apexref/apex_methods_system_datetime.htm)

- [TimeZone Class](https://developer.salesforce.com/docs/atlas.en-us.apexref.meta/apexref/apex_methods_system_timezone.htm)

#### SOQL and SOSL Reference

- [Date Functions](https://developer.salesforce.com/docs/atlas.en-us.soql_sosl.meta/soql_sosl/sforce_api_calls_soql_select_date_functions.htm)

- [Converting Time Zones in Date Functions](https://developer.salesforce.com/docs/atlas.en-us.soql_sosl.meta/soql_sosl/sforce_api_calls_soql_select_convert_time_zone.htm)

- [Date Formats and Date Literals in WHERE Clauses](https://developer.salesforce.com/docs/atlas.en-us.soql_sosl.meta/soql_sosl/sforce_api_calls_soql_select_dateformats.htm)

#### REST API Developer Guide

- [Valid Date and DateTime Formats](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/intro_valid_date_formats.htm)

### User Interface

#### Lightning Web Components Developer Guide

- [Formatted Date Time Base Component](https://developer.salesforce.com/docs/component-library/bundle/lightning-formatted-date-time/example)

- [Relative Date Time Base Component](https://developer.salesforce.com/docs/component-library/bundle/lightning-relative-date-time/example)

- [Access Internationalization Properties](https://developer.salesforce.com/docs/component-library/documentation/en/lwc/create_i18n)

- [Use Third-Party JavaScript Libraries](https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.js_third_party_library): Follow this guide if you want to use a date library with your LWC

#### Lightning Aura Components Developer Guide

- [Localization](https://developer.salesforce.com/docs/atlas.en-us.lightning.meta/lightning/components_l10n.htm)

- [Formatting Dates in JavaScript](https://developer.salesforce.com/docs/atlas.en-us.lightning.meta/lightning/js_cb_format_dates.htm)

#### Visualforce Developer Guide

- [Understanding Date and Time Serialization](https://developer.salesforce.com/docs/atlas.en-us.pages.meta/pages/pages_js_remoting_datetime_serialize.htm)

### Additional Salesforce Resources

- [What every Salesforce developer should know about Dates and Times in Apex - Medium post](https://medium.com/salesforce-zolo/what-every-salesforce-developer-should-know-about-dates-and-times-in-apex-d49bc0a116d4)

- [All about Date and Time in Salesforce - SFDC Notes blog post](https://www.sfdcnotes.com/2020/07/24/all-about-date-and-time-in-salesforce/)

## Date and Time Standards

- [ISO 8601 - Wikipedia](https://en.wikipedia.org/wiki/ISO_8601)

- [ISO 8601 - iso.org](https://www.iso.org/iso-8601-date-and-time-format.html)

- [tz database](https://www.iana.org/time-zones): Also known as the IANA timezone database or Olson database
