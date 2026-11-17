// Common.js - shared helper and validation functions for all project pages
console.log("Common.js Connected");

const STUDENT_KEY = "sms_admin_students";
const ATTENDANCE_KEY = "sms_admin_attendance";
const RESULT_KEY = "sms_admin_results";

function getStudents(){
    try{
        let data = JSON.parse(localStorage.getItem(STUDENT_KEY));
        return Array.isArray(data) ? data : [];
    }catch(error){ return []; }
}
function saveStudents(students){ localStorage.setItem(STUDENT_KEY, JSON.stringify(students)); }
function getAttendance(){
    try{ let data=JSON.parse(localStorage.getItem(ATTENDANCE_KEY)); return Array.isArray(data)?data:[]; }
    catch(error){ return []; }
}
function saveAttendance(records){ localStorage.setItem(ATTENDANCE_KEY, JSON.stringify(records)); }
function getResults(){
    try{ let data=JSON.parse(localStorage.getItem(RESULT_KEY)); return Array.isArray(data)?data:[]; }
    catch(error){ return []; }
}
function saveResults(records){ localStorage.setItem(RESULT_KEY, JSON.stringify(records)); }

function showError(errorId,message){ let el=document.getElementById(errorId); if(el) el.textContent=message; }
function clearError(errorId){ let el=document.getElementById(errorId); if(el) el.textContent=""; }
function safeText(text){
    return String(text ?? "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");
}
function showResult(isValid,successMessage){
    let result=document.getElementById("ResultText");
    if(!result) return;
    result.className=isValid?"success":"failed";
    result.textContent=isValid?successMessage:"Please fix the errors marked in red.";
}
function clearAllErrors(){
    document.querySelectorAll(".error").forEach(item=>item.textContent="");
    let result=document.getElementById("ResultText");
    if(result){result.className="";result.textContent="";}
}
function validateName(inputId,errorId){
    let value=document.getElementById(inputId).value.trim();
    if(value===""){showError(errorId,"Please enter the name");return false;}
    if(value.length<3){showError(errorId,"Name must be at least 3 characters");return false;}
    if(!/^[A-Za-z. ]+$/.test(value)){showError(errorId,"Use letters, spaces and dots only");return false;}
    clearError(errorId);return true;
}
function validateEmail(inputId,errorId){
    let value=document.getElementById(inputId).value.trim();
    if(value===""){showError(errorId,"Please enter the email");return false;}
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)){showError(errorId,"Enter a valid email address");return false;}
    clearError(errorId);return true;
}
function validatePhone(inputId,errorId){
    let value=document.getElementById(inputId).value.trim();
    if(value===""){showError(errorId,"Please enter the phone number");return false;}
    if(!/^01[3-9][0-9]{8}$/.test(value)){showError(errorId,"Phone must be 11 digits and start with 013 - 019");return false;}
    clearError(errorId);return true;
}
function validatePattern(inputId,errorId,label,expression,example){
    let value=document.getElementById(inputId).value.trim().toUpperCase();
    if(value===""){showError(errorId,"Please enter the "+label);return false;}
    if(!expression.test(value)){showError(errorId,label+" must look like "+example);return false;}
    clearError(errorId);return true;
}
function validateSelect(inputId,errorId,label){
    let value=document.getElementById(inputId).value;
    if(value===""){showError(errorId,"Please select the "+label.toLowerCase());return false;}
    clearError(errorId);return true;
}
function validateRadio(groupName,errorId,label){
    let selected=document.querySelector('input[name="'+groupName+'"]:checked');
    if(!selected){showError(errorId,"Please select "+label.toLowerCase());return false;}
    clearError(errorId);return true;
}
function validateNumber(inputId,errorId,label,min,max){
    let raw=document.getElementById(inputId).value.trim();
    if(raw===""){showError(errorId,"Please enter the "+label.toLowerCase());return false;}
    let value=Number(raw);
    if(!Number.isInteger(value)||value<min||value>max){showError(errorId,label+" must be between "+min+" and "+max);return false;}
    clearError(errorId);return true;
}
function calculateGrade(marks){
    if(marks>=80)return "A+";
    if(marks>=75)return "A";
    if(marks>=70)return "A-";
    if(marks>=65)return "B+";
    if(marks>=60)return "B";
    if(marks>=55)return "B-";
    if(marks>=50)return "C+";
    if(marks>=45)return "C";
    if(marks>=40)return "D";
    return "F";
}
function getStudentById(studentId){return getStudents().find(s=>s.studentId===studentId);}
