# 🎧 FaceBeat

FaceBeat is a full-stack mood-based music player that detects facial expressions in real time and plays songs according to the detected emotion.

This project was built as a full-stack practice application using React, Node.js, Express, and MongoDB.

---

## 🚀 Features

- 🎥 Real-time facial expression detection
- 😀 Emotion recognition using face-api models
- 🎵 Play songs based on detected mood
- 📂 Upload and manage songs (Backend API)
- 🌐 Full-stack integration (Frontend + Backend + Database)

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- JavaScript
- CSS
- face-api.js (for emotion detection)

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)

### Storage
- ImageKit (for audio file handling)

---

## 📁 Project Structure

```
FaceBeat/
│
├── Backend/
│   ├── server.js
│   └── src/
│       ├── db/
│       ├── models/
│       ├── routes/
│       └── service/
│
├── Frontend/
│   ├── src/
│   ├── public/models/
│   └── vite.config.js
│
└── .gitignore

## 🧠 How It Works

1. The webcam captures the user's face.
2. face-api.js detects facial expression.
3. The detected emotion is mapped to a mood.
4. Songs matching the mood are fetched from the backend.
5. The selected song appears on the screen.


## 📌 Project Status

This is a practice full-stack project built for learning purposes.



