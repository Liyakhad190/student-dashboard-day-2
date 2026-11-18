# Student Card Management System – UI/UX Design Document

## 1. Design Overview

Create a modern, clean and professional Student Card Management Dashboard using a minimalist Soft Green theme.

The application should provide an organized interface for administrators to view, search, filter and manage student information.

The design must prioritize:
- Simplicity
- Consistency
- Reusability
- Accessibility
- Responsive layouts
- Easy navigation
- Professional appearance

## 2. Design Philosophy

**Design Style:** Minimalist Modern Dashboard

**Theme:** Soft Green

**Design Approach:**
- Clean and spacious layouts.
- Plain solid colours only.
- No gradients.
- Consistent typography.
- Rounded corners.
- Subtle shadows.
- Clear visual hierarchy.
- Consistent spacing.
- Minimal unnecessary decorations.

Avoid overcrowded layouts and excessive animations.

## 3. Colour Palette – Soft Green

The entire application must follow this colour palette.

| Element | Colour | HEX Code |
|---|---|---|
| Primary | Soft Green | #15803D |
| Secondary | Light Green | #4ADE80 |
| Background | Very Light Green | #F0FDF4 |
| Card Background | White | #FFFFFF |
| Main Text | Dark Green | #14532D |
| Secondary Text | Slate Grey | #64748B |
| Border | Light Green | #BBF7D0 |

### Colour Usage Guidelines

- Primary: Main buttons, active navigation, important actions.
- Secondary: Icons, highlights and secondary UI elements.
- Background: Main application background.
- Card Background: Student cards, dashboard cards and containers.
- Main Text: Headings and important information.
- Secondary Text: Labels, descriptions and supporting information.
- Border: Input fields, card outlines and dividers.

### Colour Rules

- Use only the specified HEX colours as the core palette.
- Do not use gradients.
- Avoid random colours.
- Maintain consistent colour usage across all pages.
- Use sufficient contrast between text and backgrounds.
- Use white cards against the light green background.

## 4. Typography

Use a clean and readable font.

**Preferred Font:** Inter

Typography guidelines:

- Page headings: 24–30px, bold.
- Section headings: 18–22px, semibold.
- Student names: 16–18px, semibold.
- Body text: 14–16px, regular.
- Labels: 12–14px, medium.
- Buttons: 14–16px, semibold.

Maintain consistent font sizes throughout the application.

## 5. Application Layout

The application should use a standard dashboard layout.

The layout consists of:

1. Top Navbar
2. Left Sidebar
3. Main Content Area
4. Student Information Cards

### General Layout

- Navbar fixed at the top.
- Sidebar positioned on the left.
- Main content displayed on the right.
- Consistent padding and spacing.
- Responsive layout for different screen sizes.

## 6. Navbar Design

The navbar should appear at the top of every main application page.

### Elements

- College Logo
- Application Name: Student Management
- Notification Icon
- Administrator Profile Picture
- Administrator Name
- Profile Dropdown

### Design Guidelines

- White background.
- Light green bottom border.
- Proper horizontal alignment.
- Consistent spacing.
- Minimal design.
- Responsive navigation.

## 7. Sidebar Design

The sidebar should provide navigation between application sections.

### Navigation Items

1. Dashboard
2. All Students
3. Departments
4. Academic Years
5. Settings

### Design Guidelines

- White background.
- Soft green active menu background.
- Primary green icons.
- Dark text for inactive items.
- Rounded active navigation item.
- Smooth hover effect.
- Consistent icon alignment.

The sidebar should collapse on smaller screens.

## 8. Dashboard Page

The dashboard is the main landing page.

### A. Welcome Section

Display:

- Welcome message.
- Short dashboard description.
- Add Student button.

Example:

"Welcome Back, Admin!"

"Manage and organize your student information from one place."

### B. Statistics Section

Display four summary cards.

**Card 1: Total Students**
- Total student count.
- Student icon.

**Card 2: Active Students**
- Number of active students.
- Green status indicator.

**Card 3: Inactive Students**
- Number of inactive students.
- Status indicator.

**Card 4: Departments**
- Total number of departments.
- Department icon.

### Statistics Card Design

- White background.
- Rounded corners.
- Light green border.
- Large numerical value.
- Small descriptive label.
- Minimal icons.
- Consistent dimensions.

## 9. Student Management Section

This section displays all registered students.

### Header

Display:
- All Students heading.
- Total student count.
- Add Student button.

### Search and Filter Section

Include:

**Search Bar**
- Search by student name.
- Search by register number.
- Search by email address.

**Department Filter**
- CSE
- AIML
- ECE
- EEE
- Mechanical
- Civil

**Academic Year Filter**
- 1st Year
- 2nd Year
- 3rd Year
- 4th Year

**Status Filter**
- Active
- Inactive

### Filter Behaviour

- Search should update results dynamically.
- Multiple filters should work together.
- Provide a clear filters option.
- Display an appropriate empty state when no results are found.

## 10. Student Card Design

Student cards are the primary UI component of the application.

Each student should have an individual card.

### Student Card Information

1. Student Profile Picture.
2. Student Full Name.
3. Register Number.
4. Department.
5. Academic Year.
6. Email Address.
7. Student Status.
8. View Profile Button.
9. Edit Action.
10. Delete Action.

### Card Layout

- Profile picture displayed at the top.
- Student name below the picture.
- Register number displayed clearly.
- Department and year displayed as information labels.
- Email address displayed below student details.
- Status badge displayed prominently.
- Action buttons placed at the bottom.

### Card Styling

- White background.
- 12–16px border radius.
- Light green border.
- Subtle shadow.
- Consistent internal padding.
- Equal card heights.
- Smooth hover elevation.
- Proper alignment.

### Card Interaction

- Hovering should slightly elevate the card.
- View Profile should open the student profile.
- Edit should open the edit form.
- Delete should request confirmation.

## 11. Student Profile Page

When an administrator selects View Profile, display the complete student information.

### Information to Display

- Large student profile picture.
- Full name.
- Register number.
- Department.
- Academic year.
- Email address.
- Phone number.
- Date of birth.
- Address.
- Student status.

### Actions

- Edit Student.
- Delete Student.
- Back to Students.

### Design Guidelines

- Clean profile layout.
- Clearly separated information sections.
- White content cards.
- Consistent spacing.
- Responsive design.

## 12. Add Student Form

Provide a form for administrators to register new students.

### Form Fields

- Student Full Name.
- Register Number.
- Department.
- Academic Year.
- Email Address.
- Phone Number.
- Date of Birth.
- Address.
- Profile Picture.
- Student Status.

### Buttons

- Save Student.
- Cancel.

### Validation

- Required fields must not be empty.
- Register number should be unique.
- Email must follow a valid format.
- Phone number should be validated.
- Display clear validation messages.

## 13. Edit Student Form

The edit form should reuse the Add Student form component.

### Requirements

- Load existing student information.
- Allow administrators to update details.
- Preserve unchanged information.
- Validate updated information.
- Display a success message after saving.

## 14. Status Badge Design

Use reusable status badges.

### Status Types

**Active**
- Green background.
- Dark green text.

**Inactive**
- Light grey background.
- Dark grey text.

The StatusBadge component should receive status through props.

## 15. Buttons and Input Fields

### Primary Button

- Primary green background.
- White text.
- Rounded corners.
- Hover state.
- Pointer cursor.

### Secondary Button

- White background.
- Primary green text.
- Green border.

### Danger Button

- Red background.
- White text.
- Used for destructive actions.

### Input Fields

- White background.
- Light green border.
- Rounded corners.
- Clear placeholder text.
- Green focus border.
- Consistent height.

## 16. Empty States and Notifications

### Empty State

When there are no students:

Display:
- Simple illustration or icon.
- "No Students Found" message.
- Add Student button.

### Notifications

Display feedback messages for:

- Student added successfully.
- Student updated successfully.
- Student deleted successfully.
- Search results not found.
- Form validation errors.

Use clear and minimal notification designs.

## 17. Responsive Design

The application must work on desktop, tablet and mobile devices.

### Desktop

- Full sidebar.
- Three-column student card grid.
- Full dashboard layout.
- Complete navbar.

### Tablet

- Collapsible sidebar.
- Two-column student card grid.
- Adjusted spacing.

### Mobile

- Mobile navigation.
- Single-column student cards.
- Full-width search.
- Stacked filter controls.
- Touch-friendly buttons.
- Responsive forms.

## 18. Reusable Component Design

The application must follow React component-based architecture.

### Components

| Component | Responsibility |
|---|---|
| Navbar | Top navigation |
| Sidebar | Dashboard navigation |
| StudentCard | Individual student information |
| StudentGrid | Multiple student cards |
| SearchBar | Search functionality |
| FilterDropdown | Filter functionality |
| StatusBadge | Student status |
| Button | Reusable buttons |
| Avatar | Student profile image |
| StudentForm | Add and edit student details |
| DashboardStats | Dashboard statistics |

### Component Rules

- Each component should have a single responsibility.
- Use props to pass dynamic information.
- Avoid hardcoding student information inside components.
- Reuse existing components.
- Avoid unnecessary code duplication.
- Maintain consistent styling.
- Keep components independent.

## 19. Spacing and Layout Guidelines

Maintain consistent spacing throughout the application.

Recommended values:

- Main content padding: 24px.
- Card padding: 20px.
- Section spacing: 24px.
- Element spacing: 12–16px.
- Card border radius: 12px.
- Input border radius: 8px.
- Button border radius: 8px.

Avoid unnecessary empty spaces and overcrowded sections.

## 20. Animation and Interaction

Use minimal animations.

Allowed:
- Button hover transitions.
- Card hover elevation.
- Sidebar transitions.
- Dropdown opening effects.
- Smooth page transitions.

Avoid:
- Excessive animations.
- Flashing elements.
- Unnecessary moving backgrounds.
- Gradient animations.

## 21. Accessibility

- Use readable font sizes.
- Maintain sufficient colour contrast.
- Provide meaningful image alt text.
- Use proper labels for input fields.
- Support keyboard navigation.
- Provide visible focus indicators.
- Use semantic HTML elements.

## 22. Final Design Requirements

The final application must:

1. Follow the Soft Green colour palette.
2. Use plain solid colours without gradients.
3. Maintain a modern and professional dashboard appearance.
4. Use reusable React components.
5. Maintain consistent spacing and typography.
6. Support desktop, tablet and mobile screens.
7. Provide intuitive navigation.
8. Display student information clearly.
9. Avoid unnecessary visual decorations.
10. Maintain consistent design across all pages.

## 23. Overall Design Goal

The final product should look like a professional college administration dashboard.

The interface should be simple, attractive, consistent and easy to use.

Prioritize functionality, usability, accessibility and component reusability over unnecessary visual effects.