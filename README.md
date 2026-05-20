# SBA-308



This project is about Learner Grading Sytem .Grading the individual learners based on the submission date,calculating penalties,calculating weighted Average.If an AssignmentGroup does not belong to its course (mismatching course_id), 
your program should throw an error, letting the user know that the input was invalid. 
 
#  courseid_validate(CourseInfo,AssignmentGroup);
Helper function to validate course id

#  points_validate(AssignmentGroup);


#  submission_Datecheck();
Checks whether the assignment submission date is before the due date or after the due date.If it is late submission 10% penalty is applied to the total score.

#  calculate_WeightedAverage(subProcessed);
Loops through each learner submission and calculates the total marks and Percent which is later used in the main function while calculating average..

# Main Function

#  getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
This function displays the result into an arary of objects.
