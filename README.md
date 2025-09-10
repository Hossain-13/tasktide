# 📚 TaskTide

TaskTide is a cross-platform academic productivity app designed to help students manage assignments, track progress, and stay focused using Pomodoro-style timers. Built with a clean MVC architecture, TaskTide is modular, scalable, and easy to contribute to.

---

## 🚀 Features

- ✅ Assignment creation, filtering, sorting, and completion tracking  
- 📊 Progress overview with streaks, completion rates, and overdue tasks  
- ⏱️ Pomodoro timer with session switching and pause/resume controls  
- 📅 Calendar integration and quick analytics access  
- 🔍 FilterPanel with status, priority, and search options  
- 🧠 Clean separation of concerns using MVC principles  

---

## 🧱 Tech Stack

### Frontend (`client/`)
- React + Redux Toolkit  
- React Router  
- SCSS Modules  
- Component-based architecture  

### Backend (`server/`)
- Node.js + Express  
- MongoDB (via Mongoose)  
- RESTful API design  
- Modular controllers and models  

---

## 🗂 Project Structure

```
tasktide/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page-level views
│   │   ├── store/          # Redux slices
│   │   ├── utils/          # Helpers and constants
│   │   └── App.jsx         # Main app entry
│   └── public/
├── server/                 # Express backend
│   ├── controllers/        # Route logic
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API endpoints
│   └── app.js              # Server entry
├── tasktide.postman_collection.json  # API testing
└── README.md
```

---

## 🛠 Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/Hossain-13/tasktide.git
cd tasktide
```

### 2. Install dependencies

```bash
# Frontend
cd client
npm install

# Backend
cd ../server
npm install
```

### 3. Configure environment

Create a `.env` file in `server/` with:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

### 4. Run the app

```bash
# Backend
cd server
npm run dev

# Frontend (in a new terminal)
cd client
npm start
```

---

## 🧪 API Testing

Use the included `tasktide.postman_collection.json` to test endpoints like:

- `GET /api/assignments`  
- `POST /api/assignments`  
- `PUT /api/assignments/:id`  
- `DELETE /api/assignments/:id`  

---

## 👥 Contributing

We welcome contributors! Here's how to get started:

1. Fork the repo  
2. Clone your fork  
3. Create a new branch (`git checkout -b feature-name`)  
4. Make your changes  
5. Submit a pull request  

Please follow the MVC structure and keep components modular. Annotate new files and update documentation where needed.

---

## 📌 Roadmap

- [x] Assignment CRUD  
- [x] Pomodoro timer  
- [x] Filter and sort panel  
- [ ] Calendar sync  
- [ ] User authentication  
- [ ] Mobile optimization  

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙌 Acknowledgments

Built by [Mohammad Hossain](https://github.com/Hossain-13) with a focus on clarity, maintainability, and student-centered design.
