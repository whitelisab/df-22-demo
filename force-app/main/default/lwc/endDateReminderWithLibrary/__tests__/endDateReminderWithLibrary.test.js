import { createElement } from 'lwc';
import EndDateReminderWithLibrary from 'c/endDateReminderWithLibrary';
import { getRecord } from 'lightning/uiRecordApi';
import mockGetRecord from './data/getRecord.json';

// Mock Day.js library
jest.mock(
  'lightning/platformResourceLoader',
  () => {
    return {
      loadScript() {
        return new Promise((resolve, reject) => {
          const mockScriptSuccess = true;
          // If the variable is false we're simulating an error when loading the script resource
          if (!mockScriptSuccess) {
            reject('Could not load script');
          } else {
            global.dayjs = require('../../../staticresources/dayjs');
            global.dayjs_plugin_utc = require('../../../staticresources/dayjsutc');
            resolve();
          }
        });
      }
    };
  },
  { virtual: true }
);

describe('c-end-date-reminder-with-library', () => {
  beforeEach(() => {
    // Use fake timers so we can mock a specific moment in time with setSystemTime
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2020-02-29T15:00:00'));
  });

  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
      // Once this test is done, opt out of fake timers
      jest.runOnlyPendingTimers();
      jest.useRealTimers();
    }
  });

  it('should give proper notifications on leap days', async () => {
    // Helper function to wait until the microtask queue is empty. This is needed for promise
    // timing when the platformResourceLoader resolves
    async function flushPromises() {
      //eslint-disable-next-line
      return new Promise((resolve) => setTimeout(resolve, 0));
    }

    // Insert the component
    const element = createElement('c-end-date-reminder-with-library', {
      is: EndDateReminderWithLibrary
    });
    document.body.appendChild(element);

    // Emit the getRecord mocked response data
    getRecord.emit(mockGetRecord);

    // Insert items to the timeout and promise queue so we can advance the fakeTimers
    const domEvaluationPromise = flushPromises().then(() => {
      const reminder = element.shadowRoot.querySelector('.reminder-message-container');
      const warning = element.shadowRoot.querySelector('.warning-message-container');

      // Assert
      expect(reminder.textContent).toBe(`Your project is ending on 3/1/2020. That's in 1 day!`);
      expect(warning.textContent).toBe(
        'Your project is ending in 1 day. Please follow the project close-out instructions.'
      );
    });

    // Manually advance timers to flush the promise queue for static resources and getRecord mocking
    jest.advanceTimersByTime(1);
    return domEvaluationPromise;
  });
});

// Test to check that Jest tests are running in UTC
describe('Timezone Check', () => {
  it('should always be UTC', () => {
    expect(new Date().getTimezoneOffset()).toBe(0);
  });
});
