import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue, getFieldDisplayValue } from 'lightning/uiRecordApi';
import DAYJS from '@salesforce/resourceUrl/dayjs';
import DAYJS_UTC from '@salesforce/resourceUrl/dayjsutc';
import { loadScript } from 'lightning/platformResourceLoader';

import END_FIELD from '@salesforce/schema/Project__c.End_Date__c';
import START_FIELD from '@salesforce/schema/Project__c.Start_Date__c';

const fields = [END_FIELD, START_FIELD];

export default class EndDateReminderWithLibrary extends LightningElement {
  dayjsInitialized = false;
  oneDayWarning;
  oneMonthWarning;

  renderedCallback() {
    if (!this.dayjsInitialized) {
      Promise.all([loadScript(this, DAYJS), loadScript(this, DAYJS_UTC)])
        .then(() => {
          this.dayjsInitialized = true;
          window.dayjs.extend(window.dayjs_plugin_utc); // Extend dayjs with the UTC plugin
        })
        .catch((error) => console.log({ error }));
    }
  }

  @api recordId;

  @wire(getRecord, { recordId: '$recordId', fields })
  project;

  get endDateReminderMessage() {
    let reminderMessage;

    if (this.dayjsInitialized && this.project && this.project.data) {
      // Determine whether project had ended using Day.js
      const projEnd = window.dayjs.utc(getFieldValue(this.project.data, END_FIELD));
      const today = window.dayjs().startOf('day');
      const showReminder = today.isBefore(projEnd);

      // If project has not ended, construct the reminder message
      if (showReminder) {
        // Get days until end and whether we are within one month of end using Day.js
        const daysUntilEnd = Math.ceil(projEnd.diff(today, 'day', true));
        const oneMonthFromEnd = projEnd.subtract(1, 'month');
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
