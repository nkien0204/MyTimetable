# 📅 MyTimetable - Timetable Management for Primary Students

MyTimetable is a mobile application designed to help primary school students (ages 6-11) manage their daily study schedules, record homework notes, and receive smart reminders. The application focuses on a vivid, child-friendly user experience that reduces reliance on text and emphasizes visual cues.

## 🌟 Project Overview

- **Target Audience:** Primary school students and their parents.
- **Core Goal:** Empower children to manage their own time through a "Digital Playground" interface.
- **Platforms:** iOS & Android (React Native).

---

## 🚀 Current Progress

We have established the project foundation and implemented the first phase of the application:

### 🏗️ Infrastructure

- **Professional Folder Structure:** Organized codebase using a `src/` directory (Atomic Design for components, feature-based screens).
- **Design System:** A complete theme implementation including a "Candy Palette" for colors, standard spacing, and child-friendly typography.
- **Multi-language Support (i18n):** Full support for **Vietnamese (Main)** and **English (Secondary)** using `i18next`.

### 📱 Implemented Features

- **Login Screen:**
  - Child-centric UI with bubbly elements and emojis.
  - Input validation for email and passwords.
  - General technical error handling (network/database simulations).
  - Integrated **Language Switcher** dropdown in the top-right corner for instant language toggling.

---

## 🛠️ Tech Stack

- **Framework:** React Native (TypeScript)
- **Internationalization:** `i18next` & `react-i18next`
- **Styling:** Standard `StyleSheet` with a centralized Theme system.
- **Safe Area Management:** `react-native-safe-area-context`.

---

## 📖 Documentation

For a deeper dive into the project, please refer to the following documents:

- [**Requirements Specification**](requirements.md) - Detailed functional and non-functional requirements.
- [**Technical Architecture**](ARCHITECTURE.md) - Technical design, folder structure, and implementation roadmap.

---

## 🏃 Getting Started

### 1. Install Dependencies

```sh
npm install
```

### 2. Start Metro Bundler

```sh
npm start
```

### 3. Run on Device/Emulator

```sh
# For Android
npm run android

# For iOS
npm run ios
```

---

## 🤝 Contributing

This project is in its early stages. Please refer to `ARCHITECTURE.md` before adding new features to ensure consistency with the design system and folder structure.
