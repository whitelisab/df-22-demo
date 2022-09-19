# Dreamforce 2022 Session: It’s a Date(time): A Courtship with JavaScript & Salesforce

This repo contains resources and demo code from my theater session at Dreamforce 2022.

> **It's a Date(time): A Courtship with JavaScript & Salesforce**<br>
> Working with Dates and Datetimes in Salesforce and JavaScript can get complicated. Learn the edge cases involved in working on the Salesforce Platform in a date- and time-driven global application.

## Table of contents

- [Session slide deck](https://drive.google.com/file/d/1G0ZKmFa_a7szI1gcP44qnUG-_EAqUGu6/view?usp=sharing)

- [Date resources](RESOURCES.md): My collection of helpful resources for working with Dates and Datetimes in Salesforce and JavaScript.

- [Demo app](#demo-app)

  - [Installing the app using a Scratch Org](#installing-app-using-a-scratch-org): This is the recommended installation option. Use this option if you are a developer who wants to experience the app and the code. This sample application is designed to run on Salesforce Platform.

  - [Note about sample data](#note-about-sample-data)

  - [Optional installation instructions](#optional-installation-instructions)

## Demo app

This demo app includes some Lightning web components that allow you to experience working with Dates and Datetimes in Salesforce and JavaScript. Below are the key elements:

- A custom object called Project that has two date fields (Start Date and End Date)

- A Lightning web component called projectDates that explores some best practices in working with Dates and Datetimes on the Salesforce Platform:

  - Various [wire adapters](https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.reference_lightning_ui_api_record) give you date or date time information in different formats (e.g. getFieldValue returns an ISO String vs. getFieldDisplayValue gives you the value formatted and localized to the user's setting in Salesforce)

  - When using the [lightning-formatted-date-time base component](https://developer.salesforce.com/docs/component-library/bundle/lightning-formatted-date-time/example), pass in UTC as the time zone for Date fields, and then pass in the user's setting in Salesforce time zone for a Datetime field. If you don't pass in time zone information, it defaults to the user's device time zone

- A Lightning web component called endDateReminder that has two versions:

  - The default version uses some simplistic date math to render a warning message when the project end date is within one month or one day

  - The second version uses [Day.js](https://day.js.org/) to help with the date math; see [instructions here](https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.js_third_party_library) for using a Third-Party JavaScript Library with Lightning web components

### Installing app using a Scratch Org

1. Set up your environment. Follow the steps in the [Quick Start: Lightning Web Components](https://trailhead.salesforce.com/content/learn/projects/quick-start-lightning-web-components/) Trailhead project. The steps include:

   - Enable Dev Hub in your Trailhead Playground
   - Install Salesforce CLI
   - Install Visual Studio Code
   - Install the Visual Studio Code Salesforce extensions, including the Lightning Web Components extension

1. If you haven't already done so, authorize your hub org and provide it with an alias (**myhuborg** in the command below):

   ```
   sfdx auth:web:login -d -a myhuborg
   ```

1. Clone this repository:

   ```
   git clone https://github.com/whitelisab/df-22-demo.git
   cd df-22-demo
   ```

1. Create a scratch org and provide it with an alias (**dfdemo** in the command below):

   ```
   sfdx force:org:create -s -f config/project-scratch-def.json -a dfdemo
   ```

1. Push the app to your scratch org:

   ```
   sfdx force:source:push
   ```

1. Assign the **Project Access** permission set to the default user:

   ```
   sfdx force:user:permset:assign -n Project_Access
   ```

1. Import sample data:

   ```
   sfdx force:apex:execute -f ./scripts/apex/create.sample.data.apex
   ```

1. Open the scratch org:

   ```
   sfdx force:org:open
   ```

1. In App Launcher, select **DF Demo App** from the App Launcher.

### Note about sample data

Use the script noted above to import four sample projects that allow you see the various states of the End Date Reminder LWC. If you want to refresh dates without having to change the end dates manually, run the update script:

```
sfdx force:apex:execute -f ./scripts/apex/update.sample.data.apex
```

### Optional installation instructions

This repository contains several files that are relevant if you want to integrate modern web development tooling to your Salesforce development processes, or to your continuous integration/continuous deployment processes.

#### Code formatting

[Prettier](https://prettier.io 'https://prettier.io/') is a code formatter used to ensure consistent formatting across your code base. To use Prettier with Visual Studio Code, install [this extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) from the Visual Studio Code Marketplace. The [.prettierignore](/.prettierignore) and [.prettierrc](/.prettierrc) files are provided as part of this repository to control the behavior of the Prettier formatter.

#### Code linting

[ESLint](https://eslint.org/) is a popular JavaScript linting tool used to identify stylistic errors and erroneous constructs. To use ESLint with Visual Studio Code, install [this extension](https://marketplace.visualstudio.com/items?itemName=salesforce.salesforcedx-vscode-lwc) from the Visual Studio Code Marketplace. The [.eslintignore](/.eslintignore) file is provided as part of this repository to exclude specific files from the linting process in the context of Lightning Web Components development.

#### Pre-commit hook

This repository also comes with a [package.json](./package.json) file that makes it easy to set up a pre-commit hook that enforces code formatting and linting by running Prettier and ESLint every time you `git commit` changes.

To set up the formatting and linting pre-commit hook:

1. Install [Node.js](https://nodejs.org) if you haven't already done so
1. Run `npm install` in your project's root folder to install the ESLint and Prettier modules (Note: Mac users should verify that Xcode command line tools are installed before running this command.)

Prettier and ESLint will now run automatically every time you commit changes. The commit will fail if linting errors are detected. You can also run the formatting and linting from the command line using the following commands (check out [package.json](./package.json) for the full list):

```
npm run lint
npm run prettier
```

## Credits

Much of the instructions in this README is borrowed from the Trailhead Demo Apps found [here](https://github.com/trailheadapps).
