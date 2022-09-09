import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue, getFieldDisplayValue } from 'lightning/uiRecordApi';

import END_FIELD from '@salesforce/schema/Project__c.End_Date__c';
import START_FIELD from '@salesforce/schema/Project__c.Start_Date__c';

const fields = [END_FIELD, START_FIELD];

// Constants for date math
const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
const ONE_MONTH_IN_MS = 30 * ONE_DAY_IN_MS;

export default class EndDateReminder extends LightningElement {
  oneDayWarning;
  oneMonthWarning;

  @api recordId;

  @wire(getRecord, { recordId: '$recordId', fields })
  project;

  get endDateReminderMessage() {
    let reminderMessage;

    if (this.project && this.project.data) {
      // Determine whether project had ended using JS Date Object
      const projEnd = new Date(getFieldValue(this.project.data, END_FIELD)).getTime();
      const todayDate = new Date();
      todayDate.setHours(0, 0, 0, 0);
      const today = todayDate.getTime();
      const showReminder = today < projEnd;

      // If project has not ended, construct the reminder message
      if (showReminder) {
        // Get days until end and whether we are within one month of end using JS Date Object
        const difference = projEnd - today;
        const daysUntilEnd = Math.ceil(difference / ONE_DAY_IN_MS);
        const oneMonthFromEnd = projEnd - ONE_MONTH_IN_MS;
        const projEndDisplay = getFieldDisplayValue(this.project.data, END_FIELD);

        reminderMessage = `Your project is ending on ${projEndDisplay}. That's in ${daysUntilEnd} ${
          daysUntilEnd === 1 ? 'day' : 'days'
        }!`;

        // Set warning messages if project is within one day or one month of ending
        if (daysUntilEnd === 1) {
          this.oneDayWarning = `Your project is ending in 1 day. Please follow the project close-out instructions.`;
        }

        if (today > oneMonthFromEnd) {
          this.oneMonthWarning = `Your project is ending in 1 month. Please follow the project close-out instructions.`;
        }
      } else {
        reminderMessage = 'Your project has ended.';
      }
    }
    return reminderMessage;
  }

  get warningMessage() {
    let message = '';
    if (this.oneMonthWarning) message = this.oneMonthWarning;
    if (this.oneDayWarning) message = this.oneDayWarning;
    return message;
  }
}
