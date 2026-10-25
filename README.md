# 🔬 DermaScan AI

AI-powered skin condition screening tool that combines Google's Gemini AI with a trained dermatology model to provide educational skin condition analysis, severity assessment, and specialist recommendations.

> ⚠️ **Disclaimer:** This is an educational tool and NOT a substitute for professional medical advice. Always consult a qualified dermatologist for diagnosis and treatment.

## ✨ Features

- **AI Skin Analysis** — Upload or capture skin images for AI-powered condition identification
- **Dual Analysis Engine** — Gemini AI + trained heuristic model for cross-validated results
- **Confidence Scoring** — Visual confidence meters and severity badges
- **Image Quality Check** — Pre-analysis validation to ensure image quality
- **Dataset Grounding** — Results grounded against benchmark dermatology datasets
- **Find Dermatologists** — Locate nearby verified dermatologists with optional Google Maps integration
- **Demo Mode** — Try the app with sample images without uploading your own
- **Camera Capture** — Direct camera integration for real-time capture
- **Responsive Design** — Works across desktop and mobile devices

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19, TypeScript, Tailwind CSS 4, Framer Motion |
| Backend | Express.js, Node.js |
| AI | Google Gemini API (`@google/genai`) |
| Build | Vite, esbuild |
| Icons | Lucide React |

## 📋 Prerequisites

- **Node.js** (v18 or higher)
- **npm** (comes with Node.js)
- **Gemini API Key** (optional — falls back to trained heuristic model)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/gautam-ayush/DERMASCAN-AI.git
cd DERMASCAN-AI
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

Copy the example env and add your API key:

```bash
cp .env.example .env
```

Edit `.env` and set your keys:

```env
GEMINI_API_KEY=your_gemini_api_key_here
APP_URL=http://localhost:3000
MAPS_API_KEY=                             # Optional
```

> **Note:** The app works without any API keys — it will use the built-in heuristic model and verified clinic directory.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
DERMASCAN-AI/
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/            # Page-level components
│   ├── data/             # Disease database, datasets, providers
│   ├── services/         # API & analysis services
│   ├── types.ts          # TypeScript type definitions
│   ├── App.tsx           # Main application component
│   └── main.tsx          # Entry point
├── public/               # Static assets
├── SKIN_DISEASE_DETECTION/  # ML model training scripts (Python)
│   ├── train.py          # Model training script
│   ├── evaluate.py       # Model evaluation
│   ├── predict.py        # Inference script
│   └── model/            # Trained model artifacts & metrics
├── server.ts             # Express backend server
├── vite.config.ts        # Vite configuration
├── index.html            # HTML entry point
└── .env.example          # Environment variable template
```

## 🧠 ML Training (Optional)

The `SKIN_DISEASE_DETECTION/` directory contains Python scripts for training the underlying Keras skin disease classification model. This is separate from the web app and only needed if you want to retrain the model.

```bash
cd SKIN_DISEASE_DETECTION
python -m venv .venv
.venv\Scripts\activate      # Windows
# source .venv/bin/activate  # macOS/Linux
pip install tensorflow keras
python train.py
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
