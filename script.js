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
// API SECTION (Random User API)
document.addEventListener("DOMContentLoaded", () => {
  const apiData = document.getElementById("apiData");
  const loading = document.getElementById("loading");
  const error = document.getElementById("error");
  const refreshBtn = document.getElementById("refreshBtn");

  async function fetchData() {
    loading.textContent = "Loading data...";
    error.textContent = "";
    apiData.innerHTML = "";

    try {
      const res = await fetch("https://api.github.com/users/octocat");
      const data = await res.json();

      apiData.innerHTML = `
        <h3>${data.login}</h3>
        <p>Public Repos: ${data.public_repos}</p>
        <p>Followers: ${data.followers}</p>
      `;
    } catch (e) {
      error.textContent = "Error loading data";
    } finally {
      loading.textContent = "";
    }
  }

  refreshBtn.addEventListener("click", fetchData);
  fetchData();
});
