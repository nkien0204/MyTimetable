# PROJECT ARCHITECTURE & DEVELOPMENT GUIDE: MyTimetable

This document provides a high-level overview and technical architecture for the MyTimetable application. It is designed to guide AI agents and developers in implementing the project consistently and efficiently.

## 1. Project Overview

MyTimetable is a React Native application designed for primary school students (6-11 years old) to manage their study schedules, record homework notes, and receive smart reminders. The focus is on a vivid, child-friendly UI and reliable offline functionality.

### Core Goals

- **Empowerment:** Help children manage their own time.
- **Simplicity:** Intuitive UI with minimal text and high visual feedback.
- **Reliability:** Full offline access with seamless cloud synchronization.

---

## 2. Technical Stack

- **Frontend Framework:** React Native (TypeScript)
- **Internationalization:** `i18next` for multi-language support (English, Vietnamese)
- **Backend Framework:** Node.js + Express (TypeScript)
- **Database:** SQLite (File-based for simplicity and local development)
- **Authentication:** JWT (JSON Web Tokens) & bcryptjs for password hashing
- **Navigation:** React Navigation (Stack & Tab Navigators)
- **State Management:**
  - React Context API (for Global State: Auth, User Preferences)
  - Local Component State (for View-specific logic)
- **Data Persistence:**
  - Local: `AsyncStorage` or `react-native-sqlite-storage` (for offline-first experience)
  - Remote: Custom REST API (Backend service)
- **Notifications:** `react-native-push-notification` or `expo-notifications` (for scheduled reminders)
- **Styling:** `StyleSheet` (Standard RN) or `Styled-components` for theme consistency.

---

## 3. Proposed Folder Structure

### Frontend (Mobile App)

To ensure scalability and maintainability, the project will follow a professional modular structure inside a `src/` directory:

```text
src/
├── api/                # API clients, endpoint definitions, and Cloud Sync logic
├── assets/             # Static files: Images, Icons, Sound effects, Fonts
├── components/         # Reusable UI components (Atomic Design approach)
│   ├── atoms/          # Smallest units: Buttons, Inputs, Text, Spinners
│   ├── molecules/      # Combinations of atoms: FormField, SearchBar, ListItem
│   └── organisms/      # Complex components: TimetableCard, Header, SubjectPicker
├── constants/          # App-wide constants, configuration, and i18n strings
├── context/            # Global state providers (AuthContext, UserPreferencesContext)
├── hooks/              # Custom reusable React hooks (e.g., useAuth, useNotifications)
├── navigation/          # Navigation config: Stacks, Tabs, and Route Type definitions
├── screens/            # Main views organized by feature
│   ├── auth/           # Login, Registration, Forgot Password
│   ├── timetable/      # Day View, Week View, Timetable Editor
│   ├── subjects/       # Subject List, Subject Creation/Editing
│   └── profile/        # Profile Settings, Account Management
├── services/           # Business logic & External Integrations (StorageService, NotificationService)
├── theme/              # Design System: colors.ts, spacing.ts, typography.ts
├── types/              # TypeScript interfaces and global type definitions
└── utils/              # Pure helper functions (Date formatting, Validation)
```

### Backend (Server)

The backend is a separate Node.js service located in the `backend/` directory:

```text
backend/
├── src/
│   ├── config/         # Database connection & environment variables
│   ├── controllers/    # Business logic (API request handlers)
│   ├── middleware/      # Security & validation middleware
│   ├── models/          # Database schemas and SQLite table definitions
│   ├── routes/          # API endpoint routing
│   └── index.ts         # Server entry point
├── .env                # Environment secrets (GIT IGNORED)
├── .env.sample         # Template for environment variables
└── package.json         # Backend dependencies and scripts
```

---

## 4. Architecture Design

### 4.1. Data Flow

- **Offline-First:** All read/write operations first target the Local Storage. A background service synchronizes local changes with the Cloud when internet is available.
- **Unidirectional Data Flow:** Components $\rightarrow$ Hooks $\rightarrow$ Context/Services $\rightarrow$ Local Storage $\rightarrow$ UI Update.

### 4.2. Navigation Strategy

- **Root Stack:** Handles the transition between `AuthStack` and `AppStack`.
- **AppStack:** Contains a `BottomTabNavigator` for main sections:
  - `TimetableTab` $\rightarrow$ Sub-stack for Day/Week views and Edit forms.
  - `SubjectsTab` $\rightarrow$ Sub-stack for Subject management.
  - `ProfileTab` $\rightarrow$ User settings and account info.

### 4.3. Notification Logic

- **Scheduled Notifications:** Use background tasks to schedule "Tomorrow's Reminder" and "Next Week's Reminder" based on the timetable data stored locally.

### 4.4. Logging & Monitoring

- **Request Logging:** A custom middleware in the backend logs every incoming request (method, URL, status, response time, and IP) to provide visibility into server traffic.
- **Business Event Logging:** Detailed logs are implemented in controllers (e.g., AuthController) to track critical events such as successful logins, failed registration attempts, and token revocations.

---

## 5. Implementation Roadmap

### Phase 1: Foundation (The "Skeleton")

- [ ] Setup `src/` folder structure.
- [ ] Implement basic Navigation (Auth $\rightarrow$ App).
- [ ] Define Global Theme (Colors, Typography for children).
- [ ] Setup Basic Types and Local Storage service.

### Phase 2: Account & Subject Management

- [x] Implement Auth Screens (UI + Backend Integration + i18n).
- [ ] Implement Subject Management (CRUD operations).
- [ ] Integration with Local Storage.

### Phase 3: Timetable Core

- [ ] Develop Day View and Week View.
- [ ] Implement "Add/Edit/Delete Class" functionality.
- [ ] Implement Class Notes feature.

### Phase 4: Smart Reminders & Polish

- [ ] Integrate Local Notifications.
- [ ] Implement Notification Scheduling logic.
- [ ] Add visual/sound feedback for interactions.
- [ ] Optimize UI for Tablet/Phone.

### Phase 5: Cloud Sync & Security

- [ ] Integrate Backend API/Firebase.
- [ ] Implement Sync Logic (Local $\leftrightarrow$ Remote).
- [ ] Secure account data (Encryption).

---

## 6. AI Agent Guidelines

When working on this project, the AI agent should:

1. **Refer to `requirements.md`** for functional constraints.
2. **Follow the `src/` structure** strictly; do not place logic in the root directory.
3. **Prioritize TypeScript** for all new files to ensure type safety.
4. **Ensure Accessibility:** Since the target is children, use large touch targets and visual cues.
5. **Validate Offline:** Always consider how a feature behaves without an internet connection.
