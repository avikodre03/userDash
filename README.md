# ⚡ Next.js Full-Stack - UserDash

> A complete full-stack application featuring User Management, CRUD operations, and an integrated AI Chatbot powered by the Groq SDK.

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-Blue)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC)
![Zod](https://img.shields.io/badge/Zod-Validation-3068b7)

## 🌟 Features

* **🔐 Secure Authentication:** Login and Registration flow.
* **🛡️ Data Validation:** End-to-end type safety and schema validation using **Zod**.
* **📊 User Dashboard:** Admin panel for managing application data.
* **📝 Full CRUD:** Create, Read, Update, and Delete operations.
* **🤖 AI Chat Assistant:** Ultra-fast AI chat powered by **Groq SDK** (Llama 3 / Mixtral).
* **🎨 Modern UI:** Built with Tailwind CSS and Shadcn/UI components.
* **🚀 Deployment Ready:** Configured for Vercel.(please use incase Incognito)

---

## 🚀 Live Demo

[**🔗 Click Here to View Live Deployment**]([https://your-deployment-link.vercel.app](https://user-dash-qlo5.vercel.app/)

---

## 🛠️ Tech Stack

* **Framework:** Next.js 16 (App Router)
* **Language:** TypeScript
* **Validation:** Zod
* **Database:**  MongoDB
* **AI Provider:** Groq Cloud
* **Styling:** Tailwind CSS

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory and add the following keys:

```env
# Database Connection
MONGODB_URI==""

# NextAuth Configuration
JWT_SECRET="your_generated_secret_here"

# Groq AI API Key
GROQ_API_KEY=""

git clone [https://github.com/avikodre03/userDash.git](https://github.com/avikodre03/userDash.git)

cd userDash

npm install
# or
yarn install

npm run dev

Role,Email,Password
Admin,avi@03.com,avi123


