// Initialize Firebase
firebase.initializeApp({
    apiKey: "AIzaSyAfThsoZ5vDjKxgwf7IOWD83WTDUfJecFU",
    authDomain: "chat-c0352.firebaseapp.com",
    projectId: "chat-c0352",
    storageBucket: "chat-c0352.firebasestorage.app",
    messagingSenderId: "29148754465",
    appId: "1:29148754465:web:0801abe77d4837df87a960",
    measurementId: "G-SR413TF7KB"
});

// Initialize services
const auth = firebase.auth();
const db = firebase.firestore();

// DOM elements
const messagesDiv = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const loginButton = document.getElementById('loginButton');
const logoutButton = document.getElementById('logoutButton');
const chatInput = document.querySelector('.chat-input');

// Initialize user state
let currentUser = null;

// Hide chat input initially
chatInput.style.display = 'none';

// Authentication state observer
auth.onAuthStateChanged((user) => {
    if (user) {
        currentUser = user;
        loginButton.style.display = 'none';
        logoutButton.style.display = 'block';
        chatInput.style.display = 'flex';
        messageInput.disabled = false;
        sendButton.disabled = false;
        loadMessages();
    } else {
        currentUser = null;
        loginButton.style.display = 'block';
        logoutButton.style.display = 'none';
        chatInput.style.display = 'none';
        messageInput.disabled = true;
        sendButton.disabled = true;
        messagesDiv.innerHTML = '<p class="text-center">Please login to chat</p>';
    }
});

// Google Sign-in
loginButton.addEventListener('click', async () => {
    try {
        const provider = new firebase.auth.GoogleAuthProvider();
        await auth.signInWithPopup(provider);
    } catch (error) {
        console.error('Error signing in:', error);
        alert('Failed to sign in. Please try again.');
    }
});

// Sign out
logoutButton.addEventListener('click', () => {
    auth.signOut();
});

// Send message
async function sendMessage() {
    if (!messageInput.value.trim() || !currentUser) return;

    try {
        await db.collection('messages').add({
            text: messageInput.value,
            userId: currentUser.uid,
            userName: currentUser.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        messageInput.value = '';
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

// Send message on button click
sendButton.addEventListener('click', sendMessage);

// Send message on Enter key
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Load and display messages
function loadMessages() {
    db.collection('messages')
        .orderBy('timestamp')
        .limit(50)
        .onSnapshot((snapshot) => {
            messagesDiv.innerHTML = '';
            snapshot.forEach((doc) => {
                const message = doc.data();
                const messageElement = document.createElement('div');
                messageElement.classList.add('message');
                messageElement.classList.add(
                    message.userId === currentUser.uid ? 'sent' : 'received'
                );
                messageElement.textContent = `${message.userName}: ${message.text}`;
                messagesDiv.appendChild(messageElement);
            });
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        });
}

// Initial UI setup
messageInput.disabled = true;
sendButton.disabled = true;