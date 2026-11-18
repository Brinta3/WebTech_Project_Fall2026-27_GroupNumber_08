
let vacationForm = document.getElementById("vacationForm");

vacationForm.addEventListener("submit", function(event) {

    event.preventDefault();

    let empId = document.getElementById("empId").value;
    let leaveType = document.getElementById("leaveType").value;
    let startDate = document.getElementById("startDate").value;
    let endDate = document.getElementById("endDate").value;
    let reason = document.getElementById("reason").value;

    let error = document.getElementById("error");

    if (empId.trim() === "" || leaveType === "" ||
        startDate === "" || endDate === "" ||
        reason.trim() === "") {

        error.innerHTML = "Please fill in all fields.";
    }

    else if (endDate < startDate) {

        error.innerHTML = "End date cannot be before start date.";

    }

    else {

        let vacation = {
            empId: empId,
            leaveType: leaveType,
            startDate: startDate,
            endDate: endDate,
            reason: reason,
            status: "Pending"
        };

        let vacations = JSON.parse(localStorage.getItem("vacations")) || [];

        vacations.push(vacation);

        localStorage.setItem("vacations", JSON.stringify(vacations));


        error.innerHTML = "Vacation application submitted successfully!";

        vacationForm.reset();

        showVacations();
    }

});


function showVacations() {

    let vacations = JSON.parse(localStorage.getItem("vacations")) || [];

    let list = document.getElementById("vacationList");

    list.innerHTML = "";

    vacations.forEach(function(vacation) {

        list.innerHTML += `
            <tr>
                <td>${vacation.empId}</td>
                <td>${vacation.leaveType}</td>
                <td>${vacation.startDate}</td>
                <td>${vacation.endDate}</td>
                <td>${vacation.reason}</td>
                <td>${vacation.status}</td>
            </tr>
        `;

    });

}

showVacations();
