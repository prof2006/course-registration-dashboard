const form = document.getElementById("courseForm");
const table = document.getElementById("courseTable");

let courses = JSON.parse(localStorage.getItem("courses")) || [];

function displayCourses() {
  table.innerHTML = "";
  courses.forEach(course => {
    const row = `
      <tr>
        <td>${course.name}</td>
        <td>${course.matric}</td>
        <td>${course.code}</td>
        <td>${course.title}</td>
      </tr>
    `;
    table.innerHTML += row;
  });
}

displayCourses();

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = studentName.value.trim();
  const matric = matricNumber.value.trim();
  const code = courseCode.value.trim();
  const title = courseTitle.value.trim();

  const matricPattern = /^LCU\/[A-Z]{2}\/\d{4}\/\d{3}$/;

  if (!matricPattern.test(matric)) {
    alert("Invalid matric number format!");
    return;
  }

  const course = { name, matric, code, title };
  courses.push(course);

  localStorage.setItem("courses", JSON.stringify(courses));
  displayCourses();
  form.reset();
});
// API SECTION
const apiData = document.getElementById("apiData");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const refreshBtn = document.getElementById("refreshBtn");

async function fetchCountryData() {
  apiData.innerHTML = "";
  error.textContent = "";
  loading.textContent = "Loading data...";

  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    if (!response.ok) throw new Error("Failed to fetch data");

    const data = await response.json();
    const country = data[Math.floor(Math.random() * data.length)];

    apiData.innerHTML = `
      <h3>${country.name.common}</h3>
      <p>Population: ${country.population}</p>
      <p>Region: ${country.region}</p>
    `;
  } catch (err) {
    error.textContent = err.message;
  } finally {
    loading.textContent = "";
  }
}

refreshBtn.addEventListener("click", fetchCountryData);
fetchCountryData();
