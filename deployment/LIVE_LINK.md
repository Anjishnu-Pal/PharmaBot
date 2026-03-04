# PharmaBot — Live Website

## 🌐 Codespace URL (Active while codespace is running)

**https://urban-palm-tree-695xx496gjqrc5xvr-5173.app.github.dev**

> ⚠️ **This link only works while the GitHub Codespace is awake.** When the codespace sleeps (after ~4 hours of inactivity), the website goes offline. For 24/7 availability, deploy to permanent hosting below.

---

## 🚀 Deploy for 24/7 Availability (Free, Permanent)

Deploy the backend to **Render** and the frontend to **Vercel** — both are free and always on.

### Step 1 — Push code to GitHub
Make sure your latest code is pushed:
```bash
git add -A && git commit -m "Add deployment configs" && git push
```

### Step 2 — Deploy Backend on Render

1. Go to **https://render.com** → sign up / log in with GitHub
2. Click **"New +"** → **"Web Service"**
3. Connect your **Erebuzzz/PharmaBot** repository
4. Render auto-detects `render.yaml` — click **"Apply"**
5. In the **Environment** section, add the secret:
   - Key: `OPENROUTER_API_KEY`
   - Value: your OpenRouter key
6. Click **"Create Web Service"**
7. Wait ~5 minutes for the first deploy. Your backend URL will be:
   `https://pharmabot-backend.onrender.com`

### Step 3 — Deploy Frontend on Vercel

1. Go to **https://vercel.com** → sign up / log in with GitHub
2. Click **"Add New Project"** → import **Erebuzzz/PharmaBot**
3. Set **Root Directory** to `frontend`
4. Add environment variable:
   - Key: `VITE_API_URL`
   - Value: `https://pharmabot-backend.onrender.com`
5. Click **"Deploy"**
6. Your permanent frontend URL will be something like:
   `https://pharmabot.vercel.app`

### Step 4 — Update this file with your permanent URL

Replace the Codespace URL at the top of this file with your Vercel URL.

---

## What You Can Ask

- `What is the dose of paracetamol?`
- `What are the side effects of ibuprofen?`
- `What is amoxicillin used for?`
- `I have fever, headache and body ache — what could it be?`
- `What are the warnings for metformin?`
- `What medicines are used for diabetes?`

---

## Architecture

| Component | Codespace | Permanent (free) |
|-----------|-----------|-----------------|
| Frontend | Vite dev server port 5173 | Vercel |
| Backend | FastAPI port 8000 | Render |
| Vector DB | Local `chroma_db/` | Render persistent disk |
| LLM | OpenRouter API | OpenRouter API (same) |

---

## Restart Codespace Manually (if needed)

1. Go to [github.com/codespaces](https://github.com/codespaces)
2. Resume codespace `urban-palm-tree-695xx496gjqrc5xvr`
3. Services start automatically via `.devcontainer/start.sh`


---

## What You Can Ask

- `What is the dose of paracetamol?`
- `What are the side effects of ibuprofen?`
- `What is amoxicillin used for?`
- `I have fever, headache and body ache — what could it be?`
- `What are the warnings for metformin?`
- `What medicines are used for diabetes?`

---

## How It Works

The website is hosted on **GitHub Codespaces**. The link stays active as long as the codespace is running.

| Component | Status | Details |
|-----------|--------|---------|
| Frontend | ✅ Running | React + Vite on port 5173 (public) |
| Backend | ✅ Running | FastAPI on port 8000 (internal) |
| Vector DB | ✅ Ready | 15,000 medicines + 405 diseases |
| LLM | ✅ Active | OpenRouter `google/gemma-3-4b-it:free` |
| FDA Data | ✅ Live | OpenFDA real-time lookup |

---

## If the Link Is Unavailable

The codespace may have gone to sleep. To restart:

1. Go to [github.com/codespaces](https://github.com/codespaces)
2. Resume the codespace `urban-palm-tree-695xx496gjqrc5xvr`
3. Run the start commands:

```bash
# Terminal 1 — Backend
cd backend && uvicorn main:app --host 0.0.0.0 --port 8000

# Terminal 2 — Frontend
cd frontend && npm run dev -- --host 0.0.0.0
```

4. Set port 5173 to **Public** in the PORTS tab

The link will be the same URL above.
