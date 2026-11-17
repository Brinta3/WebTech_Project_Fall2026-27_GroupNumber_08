// Results.js - stores student marks and calculates grades
console.log("Results.js Connected");

document.addEventListener("DOMContentLoaded",function(){
    loadResultStudents();
    renderResults();
});

function loadResultStudents(){
    let select=document.getElementById("ResultStudent");
    let students=getStudents();
    select.innerHTML='<option value="">-- Select Student --</option>'+students.map(s=>
        '<option value="'+safeText(s.studentId)+'">'+safeText(s.name)+' ('+safeText(s.studentId)+')</option>'
    ).join("");
}
function saveStudentResult(){
    let validStudent=validateSelect("ResultStudent","StudentError","Student");
    let courseCode=document.getElementById("CourseCode").value.trim();
    let validCode=/^[A-Za-z]{2,4}\s?-?\s?[0-9]{2,4}$/.test(courseCode);
    showError("CourseCodeError",validCode?"":"Enter a valid course code, e.g. CSC 101");
    let courseTitle=document.getElementById("CourseTitle").value.trim();
    let validTitle=courseTitle.length>=3;
    showError("CourseTitleError",validTitle?"":"Course title must be at least 3 characters");
    let validMarks=validateNumber("Marks","MarksError","Marks",0,100);
    let validSemester=validateSelect("ExamSemester","SemesterError","Semester");
    if(!(validStudent&&validCode&&validTitle&&validMarks&&validSemester)){showResult(false);return false;}

    let student=getStudentById(document.getElementById("ResultStudent").value);
    let marks=Number(document.getElementById("Marks").value);
    let results=getResults();
    results.push({
        studentId:student.studentId,studentName:student.name,
        courseCode:courseCode.toUpperCase(),courseTitle:courseTitle,
        marks:marks,grade:calculateGrade(marks),
        semester:document.getElementById("ExamSemester").value,
        createdAt:new Date().toISOString()
    });
    saveResults(results);
    showResult(true,"Result saved successfully! Grade: "+calculateGrade(marks));
    document.getElementById("resultForm").reset();
    loadResultStudents();
    renderResults();
    return false;
}
function renderResults(){
    let results=getResults();
    let body=document.getElementById("resultsTableBody");
    if(results.length===0){body.innerHTML='<tr><td colspan="6" class="empty-cell">No result records yet.</td></tr>';return;}
    body.innerHTML=results.map((r,index)=>
        '<tr><td>'+safeText(r.studentName)+'<br><small>'+safeText(r.studentId)+'</small></td><td>'+safeText(r.courseCode)+' - '+safeText(r.courseTitle)+'</td><td>'+r.marks+'</td><td><strong>'+safeText(r.grade)+'</strong></td><td>'+safeText(r.semester)+'</td><td><button class="delete-btn" onclick="deleteResult('+index+')">Delete</button></td></tr>'
    ).join("");
}
function deleteResult(index){
    let results=getResults();
    if(!results[index])return;
    if(!confirm("Delete this result record?"))return;
    results.splice(index,1);
    saveResults(results);
    renderResults();
}
