# Student Management System - Admin Panel

This project is based on the layout and coding pattern of the supplied HospitalProject:
- Cambria-style typography, gray navigation, dark blue header
- Shared stylesheet in `Design/Style.css`
- Shared helper and validation functions in `JS/Common.js`
- Separate JavaScript files for each page
- Red validation messages under fields and green success messages

## Five pages
1. `index.html` - Admin Dashboard
2. `Page/AddStudent.html` - Add or update a student
3. `Page/ManageStudent.html` - Search, edit and delete students
4. `Page/Attendance.html` - Mark daily attendance and view summary
5. `Page/Results.html` - Save marks, calculate grades and view/delete results

## Folder structure
```text
Student_Admin_Management_System/
├── index.html
├── Page/
│   ├── AddStudent.html
│   ├── ManageStudent.html
│   ├── Attendance.html
│   └── Results.html
├── Design/
│   └── Style.css
├── JS/
│   ├── Common.js
│   ├── Index.js
│   ├── AddStudent.js
│   ├── ManageStudent.js
│   ├── Attendance.js
│   └── Results.js
├── Images/
│   └── logo.png
└── README.md
```

## How to run in VS Code
1. Extract the ZIP file.
2. Open the extracted `Student_Admin_Management_System` folder in VS Code.
3. Open `index.html`.
4. Right-click and choose **Open with Live Server** (install the Live Server extension if needed).
5. Use the top navigation to visit all five pages.

## How to test
1. Open **Add Student** and enter a sample student:
   - Name: Rifat Rudro
   - Student ID: STU-1001
   - Email: rifat@example.com
   - Phone: 01712345678
   - Choose gender, date of birth, department, semester and admission year.
2. Open **Manage Students** to search, edit or delete that student.
3. Open **Attendance** to mark Present or Absent and save the selected date.
4. Open **Results** to choose the student, enter a course and marks from 0 to 100. Grade is calculated automatically.
5. Return to Dashboard to see updated totals.

## Storage and limitations
This is an HTML/CSS/JavaScript front-end sample. Data is stored in browser LocalStorage. There is no backend, database, or server-side authentication. Data is available only in the same browser and browser profile. Clearing browser site data will remove the records.
