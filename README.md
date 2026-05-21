# SBA-308

JavaScript Basics

This project is about Learner Grading Sytem.,grading the individual learners based on the submission date,calculating penalties,calculating weighted Average.

This program's  goal is to analyze and transform this data such that the output of your program is an array of objects, each containing the following information in the following format:

const result = [
    {
      id: 125,
      avg: 0.985, // (47 + 150) / (50 + 150)
      1: 0.94, // 47 / 50
      2: 1.0 // 150 / 150
    },
    {
      id: 132,
      avg: 0.82, // (39 + 125) / (50 + 150)
      1: 0.78, // 39 / 50
      2: 0.833 // late: (140 - 15) / 150
    }
  ];



If an AssignmentGroup does not belong to its course (mismatching course_id), 
your program should throw an error, letting the user know that the input was invalid. 
 
#  courseid_validate(CourseInfo,AssignmentGroup);
Helper function to validate course id.Checks whether course Id  matches the Assignment Group Course Id or not;

#  points_validate(AssignmentGroup);
Program accounts for potential errors in the data that your program receives.
check whether Possible points are zero or not  and check for validity of points_possible
Copies assignments and add all assignment points together

#  submission_Datecheck();
Checks whether the assignment submission date is before the due date or after the due date.If it is late submission 10% penalty is applied to the total score.

#  calculate_WeightedAverage(subProcessed);
Loops through each learner submission and calculates the total marks and Percent which is later used in the main function while calculating average..

Main Function

#  getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
This function displays the result into an array of objects.


# Print the result Array