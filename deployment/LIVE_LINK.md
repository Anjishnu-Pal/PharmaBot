# PharmaBot — Live Website

## 🌐 Website URL

**https://urban-palm-tree-695xx496gjqrc5xvr-5173.app.github.dev**

Anyone with this link can open the website and use PharmaBot directly in their browser — no login required.

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
