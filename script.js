// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5LmONt-L_kyC6zHHihn-hAFyMYxW0pqA",
  authDomain: "school-hub-8ead9.firebaseapp.com",
  databaseURL:https://school-hub-8ead9-default-rtdb.asia-southeast1.firebasedatabase.app/
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
// Local storage objects
// ---------------------------
let news = {};
let holidays = {};

// ---------------------------
// Fetch data from Firebase
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

  // Refresh calendar display if already rendered
  renderCalendar();
});

// ---------------------------
// Admin Button
// ---------------------------
document.addEventListener('DOMContentLoaded', () => {
  const adminBtn = document.getElementById('adminBtn');

  adminBtn.addEventListener('click', () => {
    const date = prompt("Enter date (YYYY-MM-DD):");
    const newsText = prompt("Enter News (leave empty if none):");
    const holidayText = prompt("Enter Holiday (leave empty if none):");

    if (!date) return;
    saveData(date, newsText, holidayText);
  });
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
// Calendar Rendering
// ---------------------------
let calendarRendered = false;

function renderCalendar() {
  const calendarEl = document.getElementById('calendarContainer');
  const newsBox = document.getElementById('newsBox');
  const holidayBox = document.getElementById('holidayBox');

  if (!calendarEl) return;
  calendarEl.innerHTML = ''; // clear old buttons

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 0-based

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  for (let day = 1; day <= lastDay.getDate(); day++) {
    const dateStr = `${year}-${String(month + 1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;

    const btn = document.createElement('button');
    btn.innerText = day;
    btn.className = 'dateBtn';

    btn.addEventListener('click', () => {
      document.querySelectorAll('.dateBtn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');

      newsBox.innerText = news[dateStr] || 'No announcements';
      holidayBox.innerText = holidays[dateStr] || 'No holiday';
    });

    calendarEl.appendChild(btn);
  }

  calendarRendered = true;
}

// ---------------------------
// Initial Render
// ---------------------------
document.addEventListener('DOMContentLoaded', () => {
  renderCalendar();
});

