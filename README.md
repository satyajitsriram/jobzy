# Jobzy

**Your next offer is just a planned process away.**

📍 [Live Demo → jobzyy.vercel.app](https://jobzyy.vercel.app)

---

## 🔍 Overview

**Jobzy** is a smart and minimal Kanban-style job application tracker inspired by JIRA, Trello, and Asana. Designed to help job seekers stay organized during their search, Jobzy allows you to track every stage of your application pipeline—from listing a job to landing an offer.

---

## 🧩 Key Features

- 🚀 **Drag & Drop** Kanban Board with 7 customizable stages:
  - Job List
  - Waiting for Referral
  - Applied
  - Online Assessment
  - Interview
  - Offer
  - Rejected

- 📝 **Job Card Modal**
  - Add/Edit/Delete jobs
  - Required: Title, Company
  - Optional: Description, Experience, External Link, Tags, and Next Action Date

- 📌 **Smart Tag Filters**  
  - Urgent, Remote, Dream Job, Follow Up, Referred  
  - Toggle filters to view specific jobs

- 🖱️ **Context Menu (Right-Click on Card)**  
  - Edit, Delete, Duplicate any job

- 🧠 **Local Persistence**  
  - All data is saved in browser localStorage—no login required

- 🌓 **Dark/Light Theme + Custom Theme Color Picker**  
  - Set your vibe in Settings

- 📊 **Dashboard View**  
  - Applications, Offers, Rejections, Interviews, Pinned Jobs

- 📁 **Export CSV**  
  - Download your job board data anytime

- 🧭 **Guide Page**  
  - Built-in walkthrough for new users

---

## ⚙️ Tech Stack

- **Frontend:** React + TypeScript + Vite
- **Styling:** Tailwind CSS + ShadCN UI
- **State Management:** Zustand (with localStorage sync)
- **Drag & Drop:** dnd-kit
- **Icons:** Lucide React
- **Hosting:** Vercel

---

## 🧪 Running Locally

```bash
git clone https://github.com/satyajitsriram/jobzy.git
cd jobzy
npm install
npm run dev
