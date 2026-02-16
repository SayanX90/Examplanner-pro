# 🎓 ExamPlanner Pro - Your Smart Study Companion 🚀

ExamPlanner Pro is an intelligent study assistant designed to help students organize their exam preparation efficiently. Whether you have an API key or not, it generates a structured, progressive study roadmap tailored to your exam date.

## ✨ Purpose
To eliminate the stress of "what to study next" by providing a clear, week-by-week plan that covers Foundation, Core Concepts, Practice, and Revision.

## 🚀 Key Features I Added & Created

### 1. **Smart Roadmap Generator** 🗺️
   - **Dual-Mode Engine:** Uses **Gemini AI** for personalized plans if available. If not, it seamlessly falls back to a **Smart Curated Generator** that creates high-quality plans instantly.
   - **Progressive Difficulty:** Automatically structures your learning from **Easy (Foundation)** → **Medium (Core)** → **Hard (Practice)**.
   - **Dynamic Scheduling:** Calculates exactly how many weeks you have until your exam and adjusts the workload accordingly.

### 2. **Intelligent Resource Finder** 🔍
   - **Smart YouTube Search:** Unlike generic tools, this planner searches for *specific topics* (e.g., "React Hooks Tutorial") instead of just the subject name.
   - **Shorts Blocker:** Automatically filters out YouTube Shorts (`-shorts`) to ensure you get high-quality, long-form educational content.
   - **Context-Aware Links:**
     - *Revision Phase:* Searches for "Quick Revision Guides" & "Crash Courses".
     - *Practice Phase:* Searches for "Interview Questions" & "Practice Problems".

### 3. **Interactive Dashboard** 📊
   - **Subject Management:** Add and manage multiple exams/subjects.
   - **Progress Tracking:** Mark weeks as "Done" to visualize your journey.
   - **Confetti Celebration:** Get rewarded with a fun animation when you complete your goals!

## 🛠️ How to Run Being a Super User

1.  **Install Dependencies:**
    ```bash
    npm install
    ```
2.  **Start the Dev Server:**
    ```bash
    npm run dev
    ```
3.  **Open in Browser:**
    Go to [http://localhost:3000](http://localhost:3000)

## 💡 Tech Stack
-   **Framework:** Next.js 14+ (App Router)
-   **Styling:** Tailwind CSS (Modern, Responsive, Dark Mode)
-   **Icons:** Lucide React
-   **Animations:** Framer Motion & Canvas Confetti

---
*Built with ❤️ for smarter learning.*
