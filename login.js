
document.getElementById("loginForm").addEventListener("submit", function(event) {

    event.preventDefault();

    let employeeId = document.getElementById("employeeId").value;
    let password = document.getElementById("password").value;
    let error = document.getElementById("error");

    if (employeeId === "" || password === "") {
        error.innerHTML = "Please fill in all fields.";
    }
    else if (employeeId === "EMP001" && password === "123456") {

        localStorage.setItem("employeeName", "John Doe");
        localStorage.setItem("employeeId", employeeId);

        window.location.href = "dashboard.html";
    }
    else {
        error.innerHTML = "Invalid Employee ID or Password.";
    }

});
