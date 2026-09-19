# REQUIREMENTS SPECIFICATION DOCUMENT FOR PRIMARY SCHOOL STUDENT TIMETABLE MANAGEMENT APPLICATION

## 1. Project Overview

- **Objective:** Build an application to help primary school students manage their own timetables, record homework notes, and receive study reminders.
- **Target Audience:** Primary school students (6-11 years old) and Parents.
- **Platform:** Mobile Application (Smartphone, Tablet) - iOS & Android.

---

## 2. Functional Requirements (FR)

### 2.1. Account Management

- **Registration:** Create a new account (Full name, Email/Phone number, Password). Support registration via a parent's account.
- **Login:** Log into the system, including a forgot password function.
- **Personal Profile:** Change name and profile picture (Avatar) to personalize the application.
- **Logout:** Exit the current session.

### 2.2. Subject Category Management

- **Create Subject:**
  - Enter subject name (e.g., Math, Vietnamese).
  - Choose a representative color for the subject for easy distinction on the calendar.
  - Additional information: Teacher's name, classroom (optional).
- **Edit:** Change the name or color of a subject.
- **Delete:** Remove a subject from the category (with a warning if the subject is already in the timetable).

### 2.3. Timetable Management

- **View Calendar:**
  - Day View: Details of each class period during the day.
  - Week View: Overview of the study schedule from Monday to Sunday.
- **Calendar Operations:**
  - **Add Class:** Select date $\rightarrow$ Select period/time $\rightarrow$ Select subject from the category.
  - **Edit:** Change the subject or time of a created class period.
  - **Delete:** Remove a class period from the timetable.

### 2.4. Notes & Reminders (Advanced Features)

- **Class Notes:**
  - Allow adding notes to specific class sessions (e.g., "Bring a compass", "Submit essay").
  - Support quick View/Edit/Delete of notes directly from the timetable screen.
- **Smart Reminder System:**
  - **Tomorrow's Reminder:** Automatically send a summary notification of the next day's schedule and notes at a set time (e.g., 20:00 daily).
  - **Next Week's Reminder:** On the weekend, send a summary notification of the schedule for the entire following week.
  - **Notification Content:** Display Subject Name + attached Notes.
  - **Settings:** Allow customizing the notification time or toggling notifications on/off.

---

## 3. Non-Functional Requirements (NFR)

### 3.1. UI/UX (Interface & Experience)

- **Style:** Bright, vivid, using many icons and illustrations, minimizing heavy text.
- **Interactions:** Simple (Click, Drag-and-drop), flat menu, avoiding deep hierarchies.
- **Feedback:** Fun visual/sound effects upon successful operations.
- **Compatibility:** Optimized display for both portrait (Phone) and landscape (Tablet) screens.

### 3.2. Technical & Performance

- **Speed:** Screen transition response time < 2 seconds.
- **Offline:** Support viewing the calendar and notes without internet access (Local Cache).
- **Synchronization:** Automatically sync data to the Cloud when an internet connection is available.
- **Notifications:** Function accurately via Background Tasks (Scheduled Notifications) even when the app is closed.
- **Battery:** Optimize background calendar scanning tasks to prevent battery drain.

### 3.3. Security

- **Data:** Encrypt account information and passwords.
- **Privacy:** Ensure independence between different user accounts.

---

## 4. Functional Summary Matrix

| Functional Group  | Key Features                              | Objective                              |
| :---------------- | :---------------------------------------- | :------------------------------------- |
| **Account**       | Registration, Login, Profile              | Manage personal identity               |
| **Subject**       | Add, Edit, Delete, Color Selection        | Build subject database                 |
| **Timetable**     | Day/Week View, Add, Edit, Delete          | Organize study schedule scientifically |
| **Notes**         | Add notes to each class period            | Reminder for specific tools/homework   |
| **Notifications** | Tomorrow's Reminder, Next Week's Reminder | Proactive preparation for lessons      |
| **System**        | Child-friendly UI/UX, Offline, Sync       | Smooth and safe experience             |
