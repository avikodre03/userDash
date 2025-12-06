# ⚡ Next.js Full-Stack AI Dashboard

> A complete full-stack application featuring User Management, CRUD operations, and an integrated AI Chatbot powered by the Groq SDK.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-Blue)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748)

## 🌟 Features

* **🔐 Secure Authentication:** Login and Registration flow (NextAuth / Auth.js).
* **📊 User Dashboard:** Admin panel for managing application data.
* **📝 Full CRUD:** Create, Read, Update, and Delete operations.
* **🤖 AI Chat Assistant:** Ultra-fast AI chat powered by **Groq SDK** (Llama 3 / Mixtral).
* **🎨 Modern UI:** Built with Tailwind CSS and Shadcn/UI components.
* **🚀 Deployment Ready:** Configured for Vercel.

---

## 🚀 Live Demo

[**🔗 Click Here to View Live Deployment**](https://your-deployment-link.vercel.app)

---

## 🛠️ Tech Stack

* **Framework:** Next.js 14 (App Router)
* **Language:** TypeScript
* **Database:** PostgreSQL / MongoDB (via Prisma ORM)
* **Auth:** NextAuth v5
* **AI Provider:** Groq Cloud
* **Styling:** Tailwind CSS

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory and add the following keys:

```env
# Database Connection
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"

# NextAuth Configuration
AUTH_SECRET="your_generated_secret_here" # run `openssl rand -base64 32`
NEXTAUTH_URL="http://localhost:3000"

# Groq AI API Key
GROQ_API_KEY="gsk_your_groq_api_key_here"
