
document.getElementById("attendanceForm").addEventListener("submit", function(event) {

    event.preventDefault();

    let empId = document.getElementById("empId").value;
    let date = document.getElementById("date").value;
    let checkIn = document.getElementById("checkIn").value;
    let checkOut = document.getElementById("checkOut").value;

    if (empId.trim() === "" || date === "" ||
        checkIn === "" || checkOut === "") {

        alert("Please fill in all fields.");
        return;
    }

    if (checkOut <= checkIn) {
        alert("Check-out time must be after check-in time.");
        return;
    }

    let attendance = JSON.parse(localStorage.getItem("attendance")) || [];

    let record = {
        empId: empId,
        date: date,
        checkIn: checkIn,
        checkOut: checkOut
    };

    attendance.push(record);

    localStorage.setItem("attendance", JSON.stringify(attendance));

    alert("Attendance submitted successfully!");

    document.getElementById("attendanceForm").reset();

    showAttendance();

});


function showAttendance() {

    let attendance = JSON.parse(localStorage.getItem("attendance")) || [];

    let list = document.getElementById("attendanceList");

    list.innerHTML = "";

    attendance.forEach(function(item) {

        list.innerHTML += `
            <tr>
                <td>${item.empId}</td>
                <td>${item.date}</td>
                <td>${item.checkIn}</td>
                <td>${item.checkOut}</td>
            </tr>
        `;

    });

}

showAttendance();
