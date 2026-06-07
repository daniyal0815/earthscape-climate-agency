# EarthScape Climate Agency (ECA) - Setup & Run Guide

Aapka project 100% complete ho chuka hai. Naye computer par is project ko run aur deploy karne ki complete information niche di gayi hai.

---

## 1. Yeh kis tarah ka project hai? (Static ya Dynamic?)
Yeh project ek **Dynamic Client-Side Single Page Application (SPA)** hai jise **React 19, TypeScript, aur Vite** ke modern stack par banaya gaya hai.

* **Simulation Engine (No Database Setup Needed)**: Kyunki yeh ek academic presentation project hai, isme humne **Hadoop HDFS core architecture, MongoDB catalog metadata logs, Machine Learning neural training weights, aur IoT stream gates** ko client-side simulations ke zariye build kiya hai.
* **Fayda**: Aapko naye PC par koi heavy databases ya server tools (jaise actual Hadoop distributed nodes ya local MongoDB daemon) install karne ki zaroorat nahi hai. Saare advanced calculations (jaise Pearson correlation coefficient $r$ aur ML epoch loss metrics) directly browser ke JS runtime engine me process hote hain.
* **Build output**: Is project ko build karne par pure optimized static assets (HTML/CSS/JS) generate hote hain jise kisi bhi web-hosting server (Vercel, Netlify, Github Pages, Apache, Docker container) par instant host kiya ja sakta hai.

---

## 2. Is project me kya-kya use hoa hai? (Technology Stack)
* **Framework Core**: React 19 (Component architecture aur visual routing states)
* **Language Core**: TypeScript (Verbatim Module checking aur safe structural data definitions)
* **Build Engine**: Vite (Instant module hot-reloads aur building packaging process)
* **Theme Styling**: Custom Vanilla CSS (Glassmorphism dark cyber theme, customized glowing box shadow layers, dynamic keyframe sliding animations)
* **Visualization Charts**: Recharts (Dynamic responsive scatter lines aur area graphs)
* **Icons Library**: Lucide React (Premium interface glyph symbols)
* **Math Utility**: Pearson Product-Moment Correlation Formula implementation.

---

## 3. Naye computer par run karne ka step-by-step tarika

### **Pre-requisites (System Requirements):**
* Naye PC par **Node.js** install hona chahiye (Version 18+ or 20+ recommend hai). Aap ise official site [nodejs.org](https://nodejs.org/) se download kar ke double-click se install kar sakte hain.

---

### **Setup Instructions:**

#### **Step 1: Project folder download/copy karein**
* `earthscape-climate-agency` folder ko zip se extract karein ya direct naye computer ke kisi directory path me copy-paste kar lein.

#### **Step 2: Command Prompt / Terminal open karein**
* Project directory open karein. Apne code editor (jaise Visual Studio Code) ke inside terminal open karein, ya run prompt se command line open karke path par navigate karein:
  ```bash
  cd "C:\path\to\earthscape-climate-agency"
  ```

#### **Step 3: Dependency packages install karein**
* Project dependencies ko load karne ke liye terminal me niche di gayi Command run karein:
  ```bash
  npm install --legacy-peer-deps
  ```
  *(Note: `--legacy-peer-deps` parameter React 19 package tree aur Recharts graphs dynamic dependencies conflict ko ignore kar ke accurate build download karne me help karta hai).*

#### **Step 4: Development server start karein**
* Project runtime engine activate karne ke liye ye Command likhein:
  ```bash
  npm run dev
  ```

#### **Step 5: Browser me application check karein**
* Console log me show ho rahe server port (usually `http://localhost:5173/`) par click karein ya copy karke chrome/edge browser window me paste karein:
  👉 **[http://localhost:5173/](http://localhost:5173/)**

---

## 4. Production Build create karna (Presentation / Deployment ke liye)
Agar aapko deploy karne ke liye optimized production-ready bundle generate karna ho, toh terminal me niche di gayi Command run karein:
```bash
npm run build
```
Yeh run karne ke baad project directory ke inside ek **`dist`** folder ban jayega. Us `dist` folder me ek `index.html` file aur compilation JS/CSS files hongi, jinhe aap direct static servers par push kar sakte hain.
