import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue, getFieldDisplayValue } from 'lightning/uiRecordApi';
import TIMEZONE from '@salesforce/i18n/timeZone';
import LOCALE from '@salesforce/i18n/locale';

import START_FIELD from '@salesforce/schema/Project__c.Start_Date__c';
import CREATED_FIELD from '@salesforce/schema/Project__c.CreatedDate';

const fields = [START_FIELD, CREATED_FIELD];

export default class ProjectDates extends LightningElement {
  @api recordId;

  @wire(getRecord, { recordId: '$recordId', fields })
  project;

  /*
  Option 1: Use getFieldDisplayValue wire adapter
  This provides a formatted and localized value based on the org's locale settings
  https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.reference_get_field_display_value
  */

  get displayStartDate() {
    return getFieldDisplayValue(this.project.data, START_FIELD);
  }

  get displayCreatedDate() {
    return getFieldDisplayValue(this.project.data, CREATED_FIELD);
  }

  /* 
  Option 2: Use getFieldValue wire adapter
  This provides an ISO string for Date and Datetime fields,
  which can be passed into the Formatted Date Time base component
  https://developer.salesforce.com/docs/component-library/documentation/en/lwc/reference_get_field_value
  https://developer.salesforce.com/docs/component-library/bundle/lightning-formatted-date-time/example
  */
  get startDate() {
    return getFieldValue(this.project.data, START_FIELD);
  }

  get createdDate() {
    return getFieldValue(this.project.data, CREATED_FIELD);
  }

  /* 
  Get the time zone and offset from the user device
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/resolvedOptions
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset
  */

  get deviceTimezone() {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const offset = new Date().getTimezoneOffset() / 60;
    const offsetString = `UTC${offset > 0 ? '-' : '+'}${offset}`;
    return `${tz} ${offsetString}`;
  }

  /*
  Access internalization properties to get the time zone and locale settings from the org and user config
  https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.create_i18n
  */

  get sfTimezone() {
    return TIMEZONE;
  }

  get sfLocale() {
    return LOCALE;
  }
}
