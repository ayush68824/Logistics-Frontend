# Delivery Label Generator

A web-based application for generating delivery labels with sender and receiver information, featuring a modern UI and PDF output capabilities.

## Live Demo

- Frontend: [https://ayush68824.github.io/Logistics-Frontend](https://ayush68824.github.io/Logistics-Frontend)
- Backend: [https://logistics-backend-hu3k.onrender.com](https://logistics-backend-hu3k.onrender.com)

## Features

- 🔐 Simple authentication system
- 📝 User-friendly form for entering delivery details
- 🏷️ Unique delivery ID generation
- 📊 Barcode generation for each label
- 📄 PDF output with professional formatting
- 🔄 Automatic backend connection handling
- 📱 Responsive design for all devices
- ⚡ Fallback to local generation if backend is unavailable

## Tech Stack

### Frontend
- React.js
- Material-UI (MUI)
- React-Barcode
- jsPDF
- React Router DOM
- GitHub Pages for hosting

### Backend
- Node.js
- Express.js
- CORS enabled
- Render for hosting

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Git

### Frontend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/ayush68824/Logistics-Frontend.git
   cd Logistics-Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Build for production:
   ```bash
   npm run build
   ```

5. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```

### Backend Setup
1. Clone the backend repository:
   ```bash
   git clone https://github.com/ayush68824/Logistics-Backend.git
   cd Logistics-Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   node app.js
   ```

## Usage

1. Access the application at [https://ayush68824.github.io/Logistics-Frontend](https://ayush68824.github.io/Logistics-Frontend)
2. Log in using the test credentials:
   - Username: `test`
   - Password: `test123`
3. Fill in the delivery form with:
   - Sender information
   - Receiver information
4. Generate the label
5. Download the PDF

## API Endpoints

### Backend API (https://logistics-backend-hu3k.onrender.com)

- `GET /api/health` - Health check endpoint
- `POST /api/generate-label` - Generate a new delivery label
- `GET /api/download-label/:id` - Download label PDF

## Environment Variables

### Frontend
- `REACT_APP_API_URL` - Backend API URL (defaults to https://logistics-backend-hu3k.onrender.com)

### Backend
- `FRONTEND_URL` - Frontend URL (defaults to https://ayush68824.github.io)
- `PORT` - Server port (defaults to 5000)

## Error Handling

The application includes comprehensive error handling:
- Backend connection status monitoring
- Automatic fallback to local generation
- User-friendly error messages
- Loading states and indicators

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Material-UI for the component library
- React-Barcode for barcode generation
- jsPDF for PDF generation
- GitHub Pages for frontend hosting
- Render for backend hosting
