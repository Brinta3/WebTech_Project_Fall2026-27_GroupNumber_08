// Index.js - dashboard summary and page navigation
console.log("Index.js Connected");
function goToPage(page){
    switch(page){
        case "add": window.location.href="Page/AddStudent.html"; break;
        case "manage": window.location.href="Page/ManageStudent.html"; break;
        case "attendance": window.location.href="Page/Attendance.html"; break;
        case "results": window.location.href="Page/Results.html"; break;
        default: alert("Unknown page: "+page);
    }
}
document.addEventListener("DOMContentLoaded",function(){
    let students=getStudents();
    document.getElementById("totalStudents").textContent=students.length;
    document.getElementById("totalDepartments").textContent=new Set(students.map(s=>s.department)).size;
    document.getElementById("totalAttendance").textContent=getAttendance().length;
    document.getElementById("totalResults").textContent=getResults().length;
});
