# PharmaBot

A RAG-based Pharmaceutical Assistant that provides high-confidence medicine information by combining **OpenFDA API** data, **multi-dataset vector search**, and **LLM reasoning** with strict safety guardrails.

## Key Features

- **Three-Tier Confidence**: FDA-verified (high) → Dataset-matched (medium) → Insufficient data (low, "consult doctor")
- **Threaded Conversations**: Follow-up queries within persistent in-memory chat threads
- **OpenFDA Integration**: Live lookup of FDA-approved drug labels (indications, warnings, dosage, interactions)
- **Multi-Collection ChromaDB**: 15,000 medicines + 405 diseases + 512 disease-medicine mappings
- **Symptom Checker**: Educational symptom-based information (NOT a diagnosis tool)
- **Model Fallback**: Automatically retries with fallback LLM models if primary is rate-limited
- **Comet ML Monitoring**: Optional experiment tracking (disabled gracefully if key not set)
- **Safety Guardrails**: Never fabricates medical info; always cites sources; includes disclaimers

## Architecture

```
Browser → Vite Dev Server (port 5173)
              │  proxy /api/*
              ▼
         FastAPI Backend (port 8000)
              │
              ├── OpenFDA API (real-time FDA drug label lookup)
              ├── ChromaDB (persistent vector search)
              │    ├── medicines        — 15,000 docs
              │    ├── diseases         — 405 docs
              │    └── disease_medicine_map — 512 docs
              └── OpenRouter LLM (gemma-3-4b-it:free + fallbacks)
```

## Datasets

| File | Records | Key Fields |
|------|---------|------------|
| `medicine_dataset.csv` | ~50K | Name, Category, Dosage Form, Strength, Manufacturer, Indication |
| `Diseases_Symptoms.csv` | ~405 | Name, Symptoms, Treatments, Contagious, Chronic |
| `A_Z_medicines_dataset_of_India.csv` | ~250K | Name, Price, Manufacturer, Composition, Type |

## Getting Started

### Prerequisites

- Python 3.10+
- Node.js 18+
- An [OpenRouter](https://openrouter.ai/) API key (free tier works)

### 1. Clone & Configure

```bash
git clone https://github.com/Erebuzzz/PharmaBot.git
cd PharmaBot
```

Create a `.env` file in the project root:

```env
# LLM — OpenRouter (free)
LLM_PROVIDER=openrouter
OPENROUTER_API_KEY=your_openrouter_key_here
LLM_MODEL=google/gemma-3-4b-it:free
LLM_FALLBACK_MODELS=liquid/lfm-2.5-1.2b-instruct:free,google/gemma-3n-e4b-it:free

# Embeddings & Vector DB
EMBEDDING_MODEL=all-MiniLM-L6-v2
CHROMA_DB_PATH=./chroma_db

# RAG settings
CONFIDENCE_THRESHOLD=0.35
OPENFDA_CACHE_TTL=3600

# Comet ML (optional — leave blank to disable)
COMET_API_KEY=
COMET_PROJECT_NAME=pharmabot
COMET_WORKSPACE=
```

> Get a free OpenRouter key at https://openrouter.ai — no credit card required for free models.

### 2. Backend Setup

```bash
cd backend
pip install -r requirements.txt
```

### 3. Ingest Data into ChromaDB

```bash
cd backend
python data_ingest.py
```

This populates three ChromaDB collections from the CSV files in the project root. Takes a few minutes on first run; subsequent starts are instant.

### 4. Start Backend

```bash
cd backend
uvicorn main:app --host 0.0.0.0 --port 8000
# Docs at http://localhost:8000/docs
```

### 5. Start Frontend

```bash
cd frontend
npm install
npm run dev --host 0.0.0.0
# UI at http://localhost:5173
```

> The Vite dev server proxies all `/api/*` requests to the backend automatically — no CORS issues in the browser.

## Opening the App

**Local**: http://localhost:5173

**GitHub Codespaces**: Use the forwarded port URL shown in the **PORTS** tab (port 5173), or construct it as:
```
https://<codespace-name>-5173.app.github.dev
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/chat` | RAG chat with threaded conversation support |
| POST | `/api/search` | Semantic medicine search |
| GET | `/api/medicine/{name}` | Detailed medicine info (FDA + dataset) |
| GET | `/api/disease/{name}/medicines` | Medicines linked to a disease |
| POST | `/api/symptoms` | Symptom-based educational lookup |

### Example Request

```bash
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What is amoxicillin used for?"}'
```

## Project Structure

```
PharmaBot/
├── .env                        — API keys and configuration
├── medicine_dataset.csv        — Primary medicine dataset
├── Diseases_Symptoms.csv       — Disease & symptom dataset
├── A_Z_medicines_dataset_of_India.csv
├── backend/
│   ├── main.py                 — FastAPI application & routes
│   ├── rag_service.py          — RAG pipeline, LLMService, CometLogger
│   ├── openfda_service.py      — FDA API client with TTL cache
│   ├── data_ingest.py          — CSV → ChromaDB ingestion
│   ├── data_cleaning.py        — Data preprocessing pipeline
│   ├── data_schema.py          — Unified schema & column mappings
│   ├── prompts.py              — LLM prompt templates with safety rules
│   ├── config.py               — Settings loaded from .env
│   ├── requirements.txt        — Python dependencies
│   └── chroma_db/              — Persistent ChromaDB storage (git-ignored)
├── frontend/
│   ├── vite.config.js          — Vite config with /api proxy
│   ├── src/
│   │   ├── api.js              — API client (uses relative URLs via proxy)
│   │   ├── App.jsx             — Root component
│   │   └── components/
│   │       ├── ChatInterface.jsx   — Chat UI with thread support
│   │       ├── MessageBubble.jsx   — Message with confidence badge
│   │       ├── MedicineCard.jsx    — Structured medicine info card
│   │       ├── SafetyBanner.jsx    — Medical disclaimer banner
│   │       └── SourceTag.jsx       — FDA/Dataset/AI source labels
└── docs/                       — Planning and design documentation
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite 7, Tailwind CSS |
| Backend | FastAPI, Uvicorn, Python 3.12 |
| Vector DB | ChromaDB 1.5 (persistent) |
| Embeddings | `sentence-transformers/all-MiniLM-L6-v2` |
| LLM | OpenRouter API (free models) |
| FDA Data | OpenFDA REST API (no key needed) |
| Monitoring | Comet ML (optional) |

## Disclaimer

**This tool is for educational & informational purposes only.** It does not substitute professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider before making any medical decisions.