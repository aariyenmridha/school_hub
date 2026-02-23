const calendar = document.getElementById("calendar");
const newsList = document.getElementById("news");
const holidayList = document.getElementById("holiday");

let data = JSON.parse(localStorage.getItem("schoolData")) || {};

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();

function generateCalendar() {
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let i = 1; i <= daysInMonth; i++) {
    const div = document.createElement("div");
    div.className = "day";
    div.textContent = i;

    div.addEventListener("click", () => {
      const dateKey = `${year}-${String(month+1).padStart(2,'0')}-${String(i).padStart(2,'0')}`;
      showData(dateKey);
    });

    calendar.appendChild(div);
  }
}

function showData(dateKey) {
  newsList.innerHTML = "";
  holidayList.innerHTML = "";

  if (data[dateKey]) {
    if (data[dateKey].news)
      newsList.innerHTML = `<li>${data[dateKey].news}</li>`;
    if (data[dateKey].holiday)
      holidayList.innerHTML = `<li>${data[dateKey].holiday}</li>`;
  } else {
    newsList.innerHTML = "<li>No news</li>";
    holidayList.innerHTML = "<li>No holiday</li>";
  }
}

document.getElementById("adminBtn").addEventListener("click", () => {
  document.getElementById("adminPanel").classList.toggle("hidden");
});

document.getElementById("saveBtn").addEventListener("click", () => {
  const pass = document.getElementById("adminPass").value;
  if (pass !== "1234") {
    alert("Wrong password");
    return;
  }

  const date = document.getElementById("adminDate").value;
  const news = document.getElementById("adminNews").value;
  const holiday = document.getElementById("adminHoliday").value;

  data[date] = { news, holiday };
  localStorage.setItem("schoolData", JSON.stringify(data));

  alert("Saved!");
});

generateCalendar();
if ("serviceWorker" in navigator) {
navigator.serviceWorker.register("service-worker.js");
}