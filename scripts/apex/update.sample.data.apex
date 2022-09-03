// Updates the sample Project data dates to see the various states of the endDateReminder LWC
// This can be run after initial sample data has been created so you don't need to manually adjust dates

List<Project__c> sampleProjects = [
  SELECT Name, Start_Date__c, End_Date__c
  FROM Project__c
  WHERE Name LIKE 'Project%'
];
List<String> validProjectNames = new List<String>{
  'Project Past End Date',
  'Project Ends Tomorrow',
  'Project Ends Within Month',
  'Project Future End Date'
};
List<Project__c> projectsToUpdate = new List<Project__c>();

Date today = Date.today();
Date endDatePassed = today.addDays(-10);
Date endDateTomorrow = today.addDays(1);
Date endDateInMonth = today.addDays(15);
Date endDateFuture = today.addMonths(2);

for (Project__c proj : sampleProjects) {
  if (validProjectNames.contains(proj.Name)) {
    switch on proj.Name {
      when 'Project Past End' {
        proj.End_Date__c = endDatePassed;
        projectsToUpdate.add(proj);
      }
      when 'Project Ends Tomorrow' {
        proj.End_Date__c = endDateTomorrow;
        projectsToUpdate.add(proj);
      }
      when 'Project Ends Within Month' {
        proj.End_Date__c = endDateInMonth;
        projectsToUpdate.add(proj);
      }
      when 'Project Future End Date' {
        proj.End_Date__c = endDateFuture;
        projectsToUpdate.add(proj);
      }
    }
  }
}

update projectsToUpdate;
