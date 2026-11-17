// ManageStudent.js - displays, searches, edits and deletes student records
console.log("ManageStudent.js Connected");

document.addEventListener("DOMContentLoaded",function(){
    document.getElementById("studentSearch").addEventListener("input",renderStudents);
    document.getElementById("departmentFilter").addEventListener("change",renderStudents);
    renderStudents();
});

function renderStudents(){
    let students=getStudents();
    let select=document.getElementById("departmentFilter");
    let current=select.value;
    let departments=[...new Set(students.map(s=>s.department).filter(Boolean))].sort();
    select.innerHTML='<option value="">All Departments</option>'+departments.map(d=>'<option value="'+safeText(d)+'">'+safeText(d)+'</option>').join("");
    if(departments.includes(current))select.value=current;

    let query=document.getElementById("studentSearch").value.trim().toLowerCase();
    let department=select.value;
    let matches=students.map((student,index)=>({student,index})).filter(item=>{
        let s=item.student;
        let text=[s.name,s.studentId,s.email,s.department,s.semester,s.phone].join(" ").toLowerCase();
        return text.includes(query)&&(!department||s.department===department);
    });
    document.getElementById("studentCount").textContent=matches.length+" student(s) found";
    let body=document.getElementById("studentTableBody");
    if(matches.length===0){
        body.innerHTML='<tr><td colspan="6" class="empty-cell">No matching student records found.</td></tr>';
        return;
    }
    body.innerHTML=matches.map(item=>{
        let s=item.student;
        return '<tr><td>'+safeText(s.name)+'</td><td>'+safeText(s.studentId)+'</td><td>'+safeText(s.department)+'</td><td>'+safeText(s.semester)+'</td><td>'+safeText(s.phone)+'</td><td><button class="edit-btn" onclick="editStudent('+item.index+')">Edit</button><button class="delete-btn" onclick="deleteStudent('+item.index+')">Delete</button></td></tr>';
    }).join("");
}
function clearStudentSearch(){
    document.getElementById("studentSearch").value="";
    document.getElementById("departmentFilter").value="";
    renderStudents();
}
function editStudent(index){window.location.href="AddStudent.html?edit="+index;}
function deleteStudent(index){
    let students=getStudents();
    if(!students[index])return;
    if(!confirm("Are you sure you want to delete "+students[index].name+"?"))return;
    let id=students[index].studentId;
    students.splice(index,1);
    saveStudents(students);
    saveAttendance(getAttendance().filter(record=>record.studentId!==id));
    saveResults(getResults().filter(record=>record.studentId!==id));
    renderStudents();
}
