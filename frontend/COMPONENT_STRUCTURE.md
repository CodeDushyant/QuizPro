# Frontend Component Structure

This document outlines the new component-based architecture for the LiveQuiz frontend, organized to match the backend module structure.

## Directory Structure

```
frontend/src/
├── components/
│   ├── Auth/
│   │   ├── Login.jsx & Login.css
│   │   ├── Register.jsx & Register.css
│   │
│   ├── Exam/
│   │   ├── ExamList.jsx & ExamList.css
│   │   ├── CreateExam.jsx & CreateExam.css
│   │
│   ├── Question/
│   │   ├── QuestionList.jsx & QuestionList.css
│   │   ├── CreateQuestion.jsx & CreateQuestion.css
│   │
│   ├── Student/
│   │   ├── StudentList.jsx & StudentList.css
│   │
│   ├── Submission/
│   │   ├── SubmissionList.jsx & SubmissionList.css
│   │
│   ├── Analytics/
│   │   ├── AnalyticsDashboard.jsx & AnalyticsDashboard.css
│   │
│   ├── Common/
│   │   ├── Navbar.jsx & Navbar.css
│   │   ├── Footer.jsx & Footer.css
│
├── App.jsx (Main application component)
├── App.css (App-level styles and utilities)
├── index.css (Global styles and variables)
├── main.jsx (Entry point)
```

## Component Overview

### Authentication Module (`Auth/`)

- **Login.jsx** - User login form with email and password
- **Register.jsx** - User registration form with role selection

### Exam Management Module (`Exam/`)

- **ExamList.jsx** - Display all exams in a grid layout
- **CreateExam.jsx** - Form to create new exams with duration and passing score settings

### Question Management Module (`Question/`)

- **QuestionList.jsx** - List all questions with numbering
- **CreateQuestion.jsx** - Form to create questions with multiple choice options

### Student Management Module (`Student/`)

- **StudentList.jsx** - Table view of all registered students with status

### Submission Tracking Module (`Submission/`)

- **SubmissionList.jsx** - Table view of student exam submissions with scores and pass/fail status

### Analytics Module (`Analytics/`)

- **AnalyticsDashboard.jsx** - Dashboard with key metrics and charts

### Common Components (`Common/`)

- **Navbar.jsx** - Navigation bar with links to all main sections and logout button
- **Footer.jsx** - Footer with quick links and social media

## CSS Organization

Each component has its own dedicated CSS file with:

- Component-specific styling
- Responsive design for mobile (max-width: 768px)
- CSS variables for consistent theming
- Utility classes for common patterns

### Global CSS Variables

Located in `index.css`, these variables are used throughout all components:

```css
--accent: #007bff /* Primary action color */ --text-primary: #333333
  /* Main text color */ --text-secondary: #666666 /* Secondary text color */
  --page-bg: #f9f9f9 /* Page background */ --success-bg: #d4edda
  /* Success state background */ --danger-bg: #f8d7da
  /* Danger state background */ --warning-bg: #fff3cd
  /* Warning state background */ --info-bg: #e7f3ff /* Info state background */;
```

## Styling Patterns

### Button Styles

- `.btn-primary` - Main action buttons (blue)
- `.btn-secondary` - Secondary actions (gray)
- `.btn-danger` - Destructive actions (red)

### Status Badges

- `.status.passed` - Green badge for passed submissions
- `.status.failed` - Red badge for failed submissions
- `.status.active` - Green badge for active students

### Forms

- Consistent form-group styling across all forms
- Responsive grid layouts (1 column on mobile, multiple on desktop)
- Focus states with blue outline and shadow

## Integration with Backend API

Each component is prepared to integrate with the corresponding backend routes:

- **Auth** → `/api/auth` (login, register)
- **Exam** → `/api/exam` (create, read, update, delete)
- **Question** → `/api/question` (manage questions)
- **Student** → `/api/student` (manage students)
- **Submission** → `/api/submission` (track submissions)
- **Analytics** → `/api/analytics` (get metrics)

## Next Steps

1. **Connect to Backend API** - Replace fetch calls in each component
2. **Add Routing** - Implement React Router for navigation between components
3. **State Management** - Consider adding Context API or Redux for shared state
4. **Authentication Flow** - Implement login/register with token management
5. **Form Validation** - Add client-side validation for all forms
6. **Error Handling** - Add try-catch and error messages
7. **Loading States** - Implement loading spinners and skeletons
8. **Data Tables** - Add pagination, sorting, and filtering to tables

## Responsive Design

All components are mobile-responsive with breakpoints at:

- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px

Components adapt their layout automatically:

- Grids become single-column on mobile
- Navigation becomes vertical on mobile
- Forms stack vertically on mobile
- Table becomes card view on mobile (planned enhancement)
