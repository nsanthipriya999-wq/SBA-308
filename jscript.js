// Course Information CourseInfo.id and CourseInfo.name;
let totalScore;
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript"
};

// The provided assignment group.AssignmentGroup.id, AssignmentGroup.name, AssignmentGroup.course_id
//AssignmentGroup.group_weight,AssignmentGroup.assignments
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,                                                      //Assignment 1
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50
    },
    {                                                             //Assignment 2
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150
    },
    {                                                            //Assignment 3
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500
    }
  ]
};

// The provided learner submission data.LearnerSubmissions.learner_id,LearnerSubmissions.assignment_id
// LearnerSubmissions.submission
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47
    }
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150
    }
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400
    }
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39
    }
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140
    }
  }
];

let points_possible;
let finalMarks;

/*   If an AssignmentGroup does not 
   belong to its course (mismatching course_id), 
   your program should throw an error, letting the user know that the input was invalid. 
   Similar data validation should occur elsewhere within the program.*/
//1.Helper Function 1

function courseid_validate()
  {
  try {
    if (AssignmentGroup.course_id != CourseInfo.id) {
      //console.log("Input Invalid- Course Id doesn't match the Assignment Group Course Id");
      throw new Error("Input Invalid- Course Id doesn't match the Assignment Group Course Id");
    }
    else {
      console.log("Assignment Group id is : " + AssignmentGroup.course_id + " and Course Id is: " + CourseInfo.id);
    }

  } catch (error) {
    console.error("Error: ", error.message);
  }
}

//Program should also account for potential errors in the data that your program receives. What if points_possible is 0?
  //You cannot divide by zero. What if a value that you are expecting to be a number is instead a string? 
  //function points_validate()

  //1.copies assignments  2.check for validity of points_possible 3.add all assignment points ogether
// Function 2

function points_validate()
{
    let totalScore =0;
  const Assignments_copy = [...AssignmentGroup.assignments]    //copy of the assignments array
  console.log(Assignments_copy);
 
  try {
    for (let p of Assignments_copy) {                         //loops through assignments

      if ((Number.isInteger(p.points_possible))&&(p.points_possible>0)) {            //check for number and bigger than 0
        totalScore+=  p.points_possible;                                 //add points
        console.log("Points possible" + p.points_possible);
        console.log("Totalscore" + totalScore); 

      }
      else {
        throw new Error("Possible points should be greater than zero");
      }

    }
    return totalScore;
  } catch (error) {
    console.error("Error: ", error.message);
  }
}


///If an assignment is not yet due, do not include it in the results or the average. 
  // Additionally, if the learner’s submission is late (submitted_at is past due_at), 
  //deduct 10 percent of the total points possible from their score for that assignment.

//Function 3

function submission_Datecheck()
{
    
    
   // let submissions=[];                               //retrieve the record with matching assignment id and do date check
    let submissions=LearnerSubmissions.map(sub =>
       {const assignment=AssignmentGroup.assignments.find(a => a.id === sub.assignment_id);
      
      
      if(!assignment)
      {
        return null;
      }
       

       
       let finalMarks=sub.submission.score;
        
        const submitted_date=new Date(sub.submission.submitted_at);
        const due_Date=new Date(assignment.due_at);

        const today=new Date;                           //skipping future date assignments
        if (due_Date>today)return null;

        let late =false;

        if(submitted_date>due_Date)
        {
          late=true; 
          
        }
        switch(late)
        {
          case true:finalMarks=finalMarks*0.9;              //10% deduction for late submitted assignments.
                    break;
          case false: finalMarks=finalMarks;                
                      break;
            
        }
        console.log("FinalMarks: " + finalMarks)
        let percent=finalMarks/assignment.points_possible;


       return{
        learner_id: sub.learner_id,
        assignment_id:sub.assignment_id,
        score:finalMarks,
        points_possible:assignment.points_possible,
        percent: Number(percent.toFixed(3)),
        finalMarks:Number(finalMarks.toFixed(2))
       };
    
  });
  return submissions.filter(item=>item!==null);          //filter out future due date items and null record items
}

//Helper Function 4 
// Loops through each learner submission and calculates the total marks and weighted average.

function calculate_WeightedAverage(submissions)
{
  
  
  
  let totalMarks=0;
  let zero=0;
  let  totalPossible=0;
  if (!(submissions || submissions.length===zero))               // in case of no submissions
  {
    return 0; 
  }
  for(let sub of submissions)                                      //loop through each learner submissions
  {
    totalMarks+=sub.finalMarks
    totalPossible+=sub.points_possible;

  }
   if(totalPossible===zero)                                       //to prevent Divide by Zero 
   {
     return 0;
   }
  
  return Number(((totalMarks/totalPossible)*100).toFixed(2));  // weightedAverage= totalScore/points_possible*100;

}

//  -----------------------Main Function ---------------------------------------------------------
  


  function getLearnerData(CourseInfo,AssignmentGroup,submissions)
{

  const results={};
  
  courseid_validate(CourseInfo,AssignmentGroup);
  points_validate(AssignmentGroup);
  let subProcessed=submission_Datecheck();
  let weightedAverage=calculate_WeightedAverage(subProcessed);



  
  for(let sp of subProcessed)
  {
    const id=sp.learner_id;
    if(!results[id])
        {                                                  
            results[id]={
              
              id:id,
              totalScore:0,
              totalPoints:0


            };
        }
     results[id][sp.assignment_id]=Number(sp.percent.toFixed(3));

     results[id].totalScore+=sp.score;
     results[id].totalPoints+=sp.points_possible
  } 
  
     for (const id in results)
     {
       results[id].avg=Number((results[id].totalScore/results[id].totalPoints).toFixed(3));
     
     delete results[id].totalScore;
     delete results[id].totalPoints;
    }
    return Object.values(results);                          //conversion to array of objects
  }

const result=getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log(result);











    



























/*
//--------------------------OUTPUT--------------------
/*
Assignment Group id is : 451 and Course Id is: 451
[
  {
    id: 1,
    name: 'Declare a Variable',
    due_at: '2023-01-25',
    points_possible: 50
  },
  {
    id: 2,
    name: 'Write a Function',
    due_at: '2023-02-27',
    points_possible: 150
  },
  {
    id: 3,
    name: 'Code the World',
    due_at: '3156-11-15',
    points_possible: 500
  }
]
Points possible50
Totalscore50
Points possible150
Totalscore200
Points possible500
Totalscore700
[
  {
    learner_id: 125,
    assignment_id: 1,
    submission: { submitted_at: '2023-01-25', score: 47 }
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: { submitted_at: '2023-02-12', score: 150 }
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: { submitted_at: '2023-01-25', score: 400 }
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: { submitted_at: '2023-01-24', score: 39 }
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: { submitted_at: '2023-03-07', score: 140 }
  }
]
undefined
TotalScore in LearnerAverage is700

[
  { '1': 0.94, '2': 1, id: 125, avg: 0.985 },
  { '1': 0.78, '2': 0.84, id: 132, avg: 0.825 }
]

*/