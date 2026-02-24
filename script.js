const firebaseConfig = {
  apiKey: "AIzaSyA5LmONt-L_kyC6zHHihn-hAFyMYxW0pqA",
  authDomain: "school-hub-8ead9.firebaseapp.com",
  projectId: "school-hub-8ead9",
  storageBucket: "school-hub-8ead9.firebasestorage.app",
  messagingSenderId: "326440268613",
  appId: "1:326440268613:web:0b834a72e7786ca97fc42c"
};
function updateCalendar() {
  const calendarEl = document.getElementById('calendarContainer');
  calendarEl.innerHTML = ''; // Clear existing buttons

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 0-based

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  for (let day = 1; day <= lastDay.getDate(); day++) {
    const dateStr = ${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')};

    const btn = document.createElement('button');
    btn.className = 'dateBtn';
    btn.innerText = day;
    btn.addEventListener('click', () => {
      document.querySelectorAll('.dateBtn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      newsBox.innerText = news[dateStr] || 'No announcements';
      holidayBox.innerText = holidays[dateStr] || 'No holiday';
    });

    calendarEl.appendChild(btn);
  }
}
