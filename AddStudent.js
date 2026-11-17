// AddStudent.js - validates and saves a new student or updates an existing student
console.log("AddStudent.js Connected");

document.addEventListener("DOMContentLoaded",function(){
    let params=new URLSearchParams(window.location.search);
    let index=params.get("edit");
    if(index!==null){
        let students=getStudents();
        let student=students[Number(index)];
        if(student){
            document.getElementById("EditIndex").value=index;
            document.getElementById("StudentName").value=student.name||"";
            document.getElementById("StudentID").value=student.studentId||"";
            document.getElementById("StudentEmail").value=student.email||"";
            document.getElementById("StudentPhone").value=student.phone||"";
            document.getElementById("DateOfBirth").value=student.dob||"";
            document.getElementById("Address").value=student.address||"";
            document.getElementById("Department").value=student.department||"";
            document.getElementById("Semester").value=student.semester||"";
            document.getElementById("AdmissionYear").value=student.admissionYear||"";
            let radio=document.querySelector('input[name="gender"][value="'+student.gender+'"]');
            if(radio)radio.checked=true;
            document.getElementById("submit").value="Update Student";
            document.querySelector(".header h1").textContent="Update Student Form";
        }
    }
});

function saveStudentForm(){
    let validName=validateName("StudentName","NameError");
    let validID=validatePattern("StudentID","StudentIDError","Student ID",/^STU-[0-9]{4}$/,"STU-1001");
    let validEmail=validateEmail("StudentEmail","EmailError");
    let validPhone=validatePhone("StudentPhone","PhoneError");
    let validGender=validateRadio("gender","GenderError","Gender");
    let dob=document.getElementById("DateOfBirth").value;
    let validDOB=dob!=="" && dob<=new Date().toISOString().slice(0,10);
    showError("DOBError",validDOB?"":"Please enter a valid date of birth (not in the future)");
    let address=document.getElementById("Address").value.trim();
    let validAddress=address.length>=8;
    showError("AddressError",validAddress?"":"Address must be at least 8 characters");
    let validDepartment=validateSelect("Department","DepartmentError","Department");
    let validSemester=validateSelect("Semester","SemesterError","Semester");
    let validYear=validateNumber("AdmissionYear","AdmissionYearError","Admission year",2000,new Date().getFullYear());
    let isValid=validName&&validID&&validEmail&&validPhone&&validGender&&validDOB&&validAddress&&validDepartment&&validSemester&&validYear;

    if(!isValid){showResult(false);return false;}

    let students=getStudents();
    let editValue=document.getElementById("EditIndex").value;
    let editIndex=editValue===""?-1:Number(editValue);
    let studentID=document.getElementById("StudentID").value.trim().toUpperCase();
    let email=document.getElementById("StudentEmail").value.trim().toLowerCase();

    let duplicateID=students.some((s,i)=>i!==editIndex&&String(s.studentId).toUpperCase()===studentID);
    let duplicateEmail=students.some((s,i)=>i!==editIndex&&String(s.email).toLowerCase()===email);
    if(duplicateID){showError("StudentIDError","This Student ID is already registered");showResult(false);return false;}
    if(duplicateEmail){showError("EmailError","This email is already registered");showResult(false);return false;}

    let data={
        name:document.getElementById("StudentName").value.trim(),
        studentId:studentID,email:email,phone:document.getElementById("StudentPhone").value.trim(),
        gender:document.querySelector('input[name="gender"]:checked').value,dob:dob,
        address:address,department:document.getElementById("Department").value,
        semester:document.getElementById("Semester").value,
        admissionYear:Number(document.getElementById("AdmissionYear").value)
    };
    if(editIndex>=0&&students[editIndex]){
        students[editIndex]={...students[editIndex],...data};
        saveStudents(students);
        showResult(true,"Student information updated successfully!");
    }else{
        data.createdAt=new Date().toISOString();
        students.push(data);
        saveStudents(students);
        showResult(true,"Student added successfully!");
    }
    document.getElementById("studentForm").reset();
    document.getElementById("EditIndex").value="";
    document.getElementById("submit").value="Save Student";
    document.querySelector(".header h1").textContent="Add Student Form";
    return false;
}
