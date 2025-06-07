# RemWaste - Skip Selection Application

## 🗑️ Overview
The **Skip Selection Application** allows users to choose waste skips based on their location. It fetches skip data from an external API and provides an intuitive interface for selecting the appropriate skip size.

## 🛠 Technologies Used
- **React** – User interface development
- **Redux Toolkit** – State management
- **TypeScript** – Static type checking
- **Tailwind CSS** – Utility-first CSS framework

## 🎨 Frontend Design Approach
- **`SkipSelection`** – Handles data fetching, sorting, filtering, and rendering skip options.
- **`SkipCard`** – Displays individual skip options as interactive cards.
- **`ProgressStepper`** – Indicates the user’s current position in the skip hire process.
- **`LoadingSpinner`** – Shows a loading animation during data fetches.

## 🚀 Features
- Fetch skip options dynamically based on user location.
- Sort and filter skips by size, cost, or features.
- Display skip details: size, hire duration, cost (with VAT breakdown), and usage rules.
- Show real-time feedback while loading data.

## 📦 State Management with Redux Toolkit
The application uses Redux Toolkit to:
- Centralize skip data
- Avoid prop drilling
- Enable global state sharing between components

## 🧪 Installation & Running the Application

Follow these steps to run the project locally:

### 1. Clone the Repository
```bash
git clone <repository-url>

### 2. Navigate to the Project Directory
cd <project-directory>

### 3. Install Dependencies
npm install

### 4. Start the Development Server
npm start

