# Modern Chat Application

A real-time chat application built with HTML, CSS, JavaScript, Node.js, and Firebase. Features a modern UI/UX design with Google authentication.

## Features

- Real-time messaging
- Google Authentication
- Modern and responsive UI
- Clean and intuitive UX
- Message history

## Prerequisites

- Node.js installed on your system
- A Firebase account and project

## Setup

1. Clone or download this repository

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Firebase:
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Google Authentication in the Firebase Console
   - Enable Cloud Firestore in the Firebase Console
   - Copy your Firebase configuration from the Firebase Console
   - Replace the firebaseConfig object in `app.js` with your configuration

4. Start the server:
   ```bash
   npm start
   ```

5. For development with auto-reload:
   ```bash
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:3000`

## Project Structure

- `index.html` - Main HTML file
- `styles.css` - Styling and layout
- `app.js` - Firebase configuration and chat functionality
- `server.js` - Express server for serving static files
- `package.json` - Project dependencies and scripts

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Node.js
- Express.js
- Firebase (Authentication & Firestore)

## Contributing

Feel free to submit issues and enhancement requests.

## License

This project is licensed under the MIT License.