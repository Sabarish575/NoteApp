# 📝 NoteApp - A Full-Stack Notes Application (Next.js + Vanilla Node.js)

A responsive, full-stack Notes App built with **Next.js** for the frontend and **Vanilla Node.js** for the backend. Users can create, edit, and delete notes, with dynamic UI updates and simple JSON-based API handling on the server.

---

## 🚀 Features

- ➕ Add notes with a heading and description
- ✏️ Edit and update notes in-place
- ❌ Delete notes instantly
- ⚛️ Built with React Hooks: `useState`, `useEffect`, `useRef`
- 📡 Backend powered by Vanilla Node.js using HTTP module
- 💡 Clean UI with TailwindCSS

---

## 🧰 Tech Stack

| Frontend   | Backend        | Styling     |
|------------|----------------|-------------|
| Next.js    | Vanilla Node.js (HTTP module) | TailwindCSS |
| React      |                | PostCSS      |

---

## 📁 Project Structure

noteapp/
├── backend/
│ └── server.mjs # Node.js server with routing (no Express)
├── Components/
│ ├── NoteApp.jsx # Main note-taking logic
│ └── NoteCard.jsx # Note rendering and edit/delete UI
├── public/ # Static files
├── src/ # Optional if used
├── .next/ # Next.js build output
├── .gitignore
├── next.config.js
├── postcss.config.mjs
├── package.json
└── README.md


---

## ⚙️ Getting Started

### 1. Clone the Repository

git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>

### 2. Install Dependencies
Copy
Edit
npm install

### 3. Start the Frontend (Next.js)
Copy
Edit
npm run dev

### 4. Start the Backend (Vanilla Node.js)
Open a second terminal and run:

node backend/server.mjs
Make sure the backend runs on http://localhost:5000 as expected in the frontend fetch calls.

| Method | Endpoint      | Description            |
| ------ | ------------- | ---------------------- |
| GET    | `/VIEW`       | Fetch all notes        |
| POST   | `/ADD`        | Add a new note         |
| PUT    | `/UPDATE/:id` | Update a specific note |
| DELETE | `/DELETE/:id` | Delete a specific note |


### 📝 Note Format
Each note contains:

{
  "id": "uuid-or-number",
  "data": {
    "ans1": "Heading",
    "ans2": "Note description"
  }
}
