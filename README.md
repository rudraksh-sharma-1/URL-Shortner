# 🔗 URL Shortener - MERN Stack Project

A full-stack URL shortener application built using the **MERN stack (MongoDB, Express.js, React, Node.js)** with authentication, stats tracking, and a responsive UI.

> 🚀 Deployed Frontend: [https://rudraksh-url-shortner.vercel.app](https://rudraksh-url-shortner.vercel.app)  
> 🛠️ Deployed Backend: [https://url-shortner-xclh.onrender.com](https://url-shortner-xclh.onrender.com)

---

## 📌 Overview

This is a full-featured URL shortening application where users can:
- Shorten long URLs into compact ones
- View analytics such as number of clicks and creation date
- Register and log in securely
- See their own history of shortened URLs
- Access public stats for any short URL code

---

## ✨ Key Functionalities

### 🔐 Authentication
- User registration and login
- JWT-based protected routes
- Auth context for frontend auth flow

### 🔗 URL Shortening
- Authenticated users can generate short links
- Automatically generates a unique short code
- Links are saved with user reference and analytics

### 📈 Stats Viewer
- Check original URL, click count, and creation date using the short code

### 🕓 URL History
- Paginated history of URLs shortened by the logged-in user
- Includes click count, original & short URLs, and timestamps

### 🎨 Responsive UI
- Built with **Tailwind CSS** and **React**
- Mobile-first, clean design with proper word-breaking for long URLs

---

## 🛠 Tech Stack

| Layer         | Tech                     |
|---------------|--------------------------|
| Frontend      | React, Vite, Tailwind CSS |
| Backend       | Node.js, Express.js      |
| Database      | MongoDB Atlas            |
| Auth          | JWT + bcryptjs           |
| Deployment    | Vercel (Frontend), Render (Backend)

---

## ⚙️ Project Setup Guide

### 🧩 Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Vercel + Render accounts (for deployment)

---

### 📁 Backend Setup

1. Clone the repo:
```bash
git clone https://github.com/your-username/url-shortener.git
cd url-shortener/server
