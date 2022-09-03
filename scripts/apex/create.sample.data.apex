// Creates sample Project data to see the various states of the endDateReminder LWC

List<Project__c> projectsToInsert = new List<Project__c>();
Date today = Date.today();
Date startDate = today.addMonths(-6);
Date endDatePassed = today.addDays(-10);
Date endDateTomorrow = today.addDays(1);
Date endDateInMonth = today.addDays(15);
Date endDateFuture = today.addMonths(2);

projectsToInsert.add(
  new Project__c(
    Name = 'Project Past End Date',
    Start_Date__c = startDate,
    End_Date__c = endDatePassed
  )
);
projectsToInsert.add(
  new Project__c(
    Name = 'Project Ends Tomorrow',
    Start_Date__c = startDate,
    End_Date__c = endDateTomorrow
  )
);
projectsToInsert.add(
  new Project__c(
    Name = 'Project Ends Within Month',
    Start_Date__c = startDate,
    End_Date__c = endDateInMonth
  )
);
projectsToInsert.add(
  new Project__c(
    Name = 'Project Future End Date',
    Start_Date__c = startDate,
    End_Date__c = endDateFuture
  )
);

insert projectsToInsert;
