# Modern QR Code Generator Web App

A beautiful, fast, and reliable QR code generator built with React, TypeScript, Vite, and Tailwind CSS.

## Features
- Instantly generate QR codes for any link or URL
- Accepts URLs with or without `https://` (auto-normalizes input)
- Download QR codes as PNG images
- Responsive, modern UI
- Robust error handling and user feedback

## Getting Started

### Prerequisites
- Node.js (v18 or newer recommended)
- npm (comes with Node.js)

### Installation
1. Clone the repository:
   ```sh
   git clone <your-repo-url>
   cd <your-repo-folder>
   cd project
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

### Running Locally
Start the development server:
```sh
npm run dev -- --host
```
Open the local or network URL shown in your terminal (e.g., http://localhost:5173 or http://<your-ip>:5173).

### Usage
1. Enter a link (with or without `https://`) in the input field.
2. Click "Generate QR Code".
3. Download the QR code as a PNG, or generate a new one.

## Deployment
You can deploy this app easily to Vercel, Netlify, or GitHub Pages.

## Tech Stack
- React
- TypeScript
- Vite
- Tailwind CSS
- lucide-react (icons)
- qrcode (QR code generation)

## License
MIT
