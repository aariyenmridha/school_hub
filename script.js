// ---------------------------
// Firebase Imports
// ---------------------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyA5LmONt-L_kyC6zHHihn-hAFyMYxW0pqA",
  authDomain: "school-hub-8ead9.firebaseapp.com",
  projectId: "school-hub-8ead9",
  storageBucket: "school-hub-8ead9.firebasestorage.app",
  messagingSenderId: "326440268613",
  appId: "1:326440268613:web:0b834a72e7786ca97fc42c"
};

// ---------------------------
// Initialize Firebase
// ---------------------------
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// ---------------------------
// Local Storage for Events
// ---------------------------
let news = {};
let holidays = {};

// ---------------------------
// Fetch Data From Firebase
// ---------------------------
const eventsRef = ref(database, 'events');
onValue(eventsRef, (snapshot) => {
  const data = snapshot.val();
  news = {};
  holidays = {};
  
  for (let date in data) {
    if (data[date].news) news[date] = data[date].news;
    if (data[date].holiday) holidays[date] = data[date].holiday;
  }

  // Optional: refresh calendar UI
  updateCalendar();
});

// ---------------------------
// Admin Button
// ---------------------------
const adminBtn = document.getElementById('adminBtn');
adminBtn.addEventListener('click', () => {
  const date = prompt("Enter date (YYYY-MM-DD):");
  const newsText = prompt("Enter News (leave empty if none):");
  const holidayText = prompt("Enter Holiday (leave empty if none):");

  if (!date) return;
  saveData(date, newsText, holidayText);
});

// ---------------------------
// Save Data to Firebase
// ---------------------------
function saveData(date, newsText, holidayText) {
  set(ref(database, 'events/' + date), {
    news: newsText || "",
    holiday: holidayText || ""
  });
  alert('Data saved for ' + date);
}

// ---------------------------
// Calendar Display Logic
// ---------------------------
// Example simple calendar rendering
// You can replace this with your current calendar code

const calendarEl = document.getElementById('calendar');
const newsBox = document.getElementById('newsBox');
const holidayBox = document.getElementById('holidayBox');

function updateCalendar() {
  // This is a simple example: click a date input
  // Your actual calendar code may vary
  // We'll assume you have a <input type="date" id="calendar">
  calendarEl.addEventListener('change', (e) => {
    const selectedDate = e.target.value; // YYYY-MM-DD

    newsBox.innerText = news[selectedDate] || "No announcements";
    holidayBox.innerText = holidays[selectedDate] || "No holiday";
  });
}

// Initialize calendar display
updateCalendar();
