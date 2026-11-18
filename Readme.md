# Student Card Management System

A React-based Student Card Management System that allows administrators to manage, view, search, and organize student information through reusable UI components.

## Project Overview

The Student Card Management System is a web application designed to display student information in an organized card-based layout.

Each student card displays essential information such as:
- Student Profile Picture
- Student Name
- Register Number
- Department
- Academic Year
- Email Address
- Student Status

The application uses reusable React components to maintain consistency and reduce code duplication.

## Tech Stack

- React.js
- JavaScript (JSX)
- CSS3
- Vite
- React Hooks

## Core Features

1. Student Dashboard
2. Student Card Display
3. Search Students
4. Filter by Department
5. Filter by Academic Year
6. View Student Profile
7. Add New Student
8. Edit Student Details
9. Delete Student
10. Active/Inactive Student Status

## Reusable Components

- Navbar
- Sidebar
- StudentCard
- StudentGrid
- SearchBar
- FilterDropdown
- StatusBadge
- Button
- Avatar

## Project Structure

```text
src/
├── components/
├── pages/
├── data/
├── assets/
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

## Installation

```bash
npm install
```

## Run Development Server

```bash
npm run dev
```

## Development Approach

The application follows a component-based architecture.

Student information is maintained separately from UI components. Data is passed through props, and reusable components dynamically render student information.

Initially, the application uses static JavaScript data. Backend integration can be introduced in future development.

## Future Enhancements

- Firebase or MongoDB integration
- Admin authentication
- Student ID card generation
- PDF export
- QR code integration
- Attendance management
- Responsive mobile interface

## Digital Student ID Cards

Student ID cards are available from the student portal and admin Student ID Cards page. Each card displays a QR code that links to `/verify/:studentId`, supports PNG and PDF downloads, print-to-PDF/physical-card printing, and fullscreen preview. Admins can update a student's photograph and card validity and activate or revoke a card.

The current project uses static frontend records and browser-local card activation state. The verification page is a demonstration only; it is not an authoritative or secure identity check. Before production use, connect the verification route and card status to a trusted backend API and enforce authorization there.