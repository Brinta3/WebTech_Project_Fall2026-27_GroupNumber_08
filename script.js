function ValidateForm(event) {

    event.preventDefault();

    // Login Validation

   if (event.target.id == "loginForm") {

    let id = document.getElementById("studentId").value;
    let password = document.getElementById("password").value;

    if (id == "" || password == "") {
        alert("Please fill all fields!");
        return;
    }

    if (id == "123" && password == "student123") {
        alert("Login Successful!");
        window.location.href = "dashboard.html";
    }
    else {
        alert("Invalid Student ID or Password!");
    }
}


    // Drop Application Validation

    if (event.target.id == "dropForm") {

        let id = document.getElementById("dropId").value;
        let course = document.querySelector('input[name="course"]:checked');
        let reason = document.getElementById("reason").value;

        let dropReason = document.getElementById("dropReason").value;

        if (dropReason == "") {
           alert("Please select a reason!");
           return;
}

        if (id == "" || reason == "") {
            alert("Please fill all fields!");
            return;
        }

        if (!course) {
            alert("Please select a course!");
            return;
        }

        alert("Drop Application Submitted Successfully!");
    }

}

document.getElementById("loginForm")?.addEventListener("submit", ValidateForm);

document.getElementById("dropForm")?.addEventListener("submit", ValidateForm);
