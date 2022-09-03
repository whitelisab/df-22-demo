import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue, getFieldDisplayValue } from 'lightning/uiRecordApi';

import END_FIELD from '@salesforce/schema/Project__c.End_Date__c';
import START_FIELD from '@salesforce/schema/Project__c.Start_Date__c';

const fields = [END_FIELD, START_FIELD];

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
const ONE_MONTH_IN_MS = 30 * ONE_DAY_IN_MS;

export default class EndDateReminder extends LightningElement {
  @api recordId;

  @wire(getRecord, { recordId: '$recordId', fields })
  project;

  get endDate() {
    return getFieldValue(this.project.data, END_FIELD);
  }

  get displayEndDate() {
    return getFieldDisplayValue(this.project.data, END_FIELD);
  }

  get startDate() {
    return getFieldValue(this.project.data, START_FIELD);
  }

  _getProjEndDateTimestamp() {
    const projectEndDate = new Date(this.endDate);
    return projectEndDate.getTime();
  }

  _getProjStartDateTimestamp() {
    const projectStartDate = new Date(this.startDate);
    return projectStartDate.getTime();
  }

  _getTodayTimestamp() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today.getTime();
  }

  _daysUntilProjectEnd() {
    const projectEndTimestamp = this._getProjEndDateTimestamp();
    const todayTimestamp = this._getTodayTimestamp();
    const difference = projectEndTimestamp - todayTimestamp;

    return Math.ceil(difference / ONE_DAY_IN_MS);
  }

  // If the project end date has not passed, show the reminder
  get showProjectEndDateReminder() {
    const projectEndTimestamp = this._getProjEndDateTimestamp();
    const todayTimestamp = this._getTodayTimestamp();

    return todayTimestamp < projectEndTimestamp;
  }

  // Generate the reminder message
  get reminderMessage() {
    const daysUntilEnd = this._daysUntilProjectEnd();
    const message = `Your project is ending on ${this.displayEndDate}. That's in ${daysUntilEnd} ${
      daysUntilEnd === 1 ? 'day' : 'days'
    }!`;
    return message;
  }

  // If project end day is within one day, show one day warning
  get showOneDayWarning() {
    const projectEndTimestamp = this._getProjEndDateTimestamp();
    const todayTimestamp = this._getTodayTimestamp();
    const oneDayFromEnd = projectEndTimestamp - ONE_DAY_IN_MS;

    return todayTimestamp > oneDayFromEnd;
  }

  // If project end day is within one month, show one month warning
  get showOneMonthWarning() {
    let showWarning = false;
    const projectEndTimestamp = this._getProjEndDateTimestamp();
    const oneMonthFromEnd = projectEndTimestamp - ONE_MONTH_IN_MS;
    const todayTimestamp = this._getTodayTimestamp();
    // if end day is one day, show the one day warning instead of one month warning
    if (todayTimestamp > oneMonthFromEnd && !this.showOneDayWarning) {
      showWarning = true;
    }

    return showWarning;
  }
}
