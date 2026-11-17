// Attendance.js - marks and summarizes attendance by date
console.log("Attendance.js Connected");

document.addEventListener("DOMContentLoaded",function(){
    let dateInput=document.getElementById("AttendanceDate");
    dateInput.value=new Date().toISOString().slice(0,10);
    dateInput.addEventListener("change",renderAttendance);
    document.getElementById("saveAttendance").addEventListener("click",saveDailyAttendance);
    renderAttendance();
    renderAttendanceSummary();
});

function renderAttendance(){
    let students=getStudents();
    let date=document.getElementById("AttendanceDate").value;
    let saved=getAttendance().filter(r=>r.date===date);
    let body=document.getElementById("attendanceTableBody");
    if(students.length===0){
        body.innerHTML='<tr><td colspan="4" class="empty-cell">No students found. Add students first.</td></tr>';
        return;
    }
    body.innerHTML=students.map(s=>{
        let existing=saved.find(r=>r.studentId===s.studentId);
        let status=existing?existing.status:"Present";
        return '<tr><td>'+safeText(s.name)+'</td><td>'+safeText(s.studentId)+'</td><td>'+safeText(s.department)+'</td><td><select class="status-select" data-student="'+safeText(s.studentId)+'"><option value="Present" '+(status==="Present"?"selected":"")+'>Present</option><option value="Absent" '+(status==="Absent"?"selected":"")+'>Absent</option></select></td></tr>';
    }).join("");
}
function saveDailyAttendance(){
    let date=document.getElementById("AttendanceDate").value;
    if(!date){showError("DateError","Please select an attendance date");return;}
    clearError("DateError");
    let students=getStudents();
    if(students.length===0){document.getElementById("AttendanceResult").textContent="Add students before marking attendance.";return;}
    let records=getAttendance().filter(r=>r.date!==date);
    document.querySelectorAll("#attendanceTableBody select[data-student]").forEach(select=>{
        records.push({date:date,studentId:select.dataset.student,status:select.value});
    });
    saveAttendance(records);
    document.getElementById("AttendanceResult").className="result-text success";
    document.getElementById("AttendanceResult").textContent="Attendance saved successfully for "+date+".";
    renderAttendanceSummary();
}
function renderAttendanceSummary(){
    let all=getAttendance();
    let dates=[...new Set(all.map(r=>r.date))].sort().reverse();
    let body=document.getElementById("attendanceSummary");
    if(dates.length===0){body.innerHTML='<tr><td colspan="4" class="empty-cell">No attendance records yet.</td></tr>';return;}
    body.innerHTML=dates.map(date=>{
        let list=all.filter(r=>r.date===date);
        let present=list.filter(r=>r.status==="Present").length;
        return '<tr><td>'+safeText(date)+'</td><td>'+list.length+'</td><td>'+present+'</td><td>'+(list.length-present)+'</td></tr>';
    }).join("");
}
