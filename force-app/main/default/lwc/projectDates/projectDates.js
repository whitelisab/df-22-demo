import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue, getFieldDisplayValue } from 'lightning/uiRecordApi';
import TIMEZONE from '@salesforce/i18n/timeZone';

import START_FIELD from '@salesforce/schema/Project__c.Start_Date__c';
import CREATED_FIELD from '@salesforce/schema/Project__c.CreatedDate';

const fields = [START_FIELD, CREATED_FIELD];

export default class ProjectDates extends LightningElement {
  @api recordId;

  @wire(getRecord, { recordId: '$recordId', fields })
  project;

  get startDate() {
    return getFieldValue(this.project.data, START_FIELD);
  }

  get displayStartDate() {
    return getFieldDisplayValue(this.project.data, START_FIELD);
  }

  get createdDate() {
    return getFieldValue(this.project.data, CREATED_FIELD);
  }

  get displayCreatedDate() {
    return getFieldDisplayValue(this.project.data, CREATED_FIELD);
  }

  get userDeviceTimezone() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  get salesforceUserTimezone() {
    return TIMEZONE;
  }
}
