const $dateInput = document.querySelector(".date-input");
const $calendar = document.querySelector(".calendar");
const $content = document.getElementById("content");
const $prevMonth = document.getElementById("prev");
const $nextMonth = document.getElementById("next");
const $dates = document.querySelector(".dates");
const $current = document.querySelector(".current");

const monthData = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const data = new Date();
const date = data.getDate(); // 날짜
const month = data.getMonth(); // 월
const year = data.getFullYear(); // 연도

let selectYear = year;
let selectMonth = month;

$dateInput.textContent = `${monthData[month]} ${date}, ${year}`;

// 달력 토글
$dateInput.addEventListener("click", () => {
  $calendar.classList.toggle("active");
});

$content.textContent = `${selectYear} ${monthData[selectMonth]}`;

// 달력 날짜 삽입
const fragment = new DocumentFragment();

const setMonth = () => {
  let dates = new Date(year, selectMonth + 1, 0).getDate(); // 이번달 일수
  for (let i = 0; i < dates; i++) {
    let createDate = document.createElement("div");
    createDate.classList.add("date");
    createDate.textContent = i + 1;
    createDate.dataset.date = i + 1;
    fragment.appendChild(createDate);
  }
  // 날짜, 요일 짝 맞추기
  let firstDay = new Date(year, selectMonth, 1).getDay();
  fragment.firstChild.style.gridColumnStart = firstDay + 1;

  $dates.appendChild(fragment);

  // 토요일 색 넣기
  const satEls = $dates.querySelectorAll(
    `.date:nth-child(7n + ${7 - firstDay})`,
  );
  for (let i = 0; i < satEls.length; i++) {
    satEls[i].style.color = "blue";
  }
  // 일요일 색 넣기
  const sunEls = $dates.querySelectorAll(
    firstDay === 0
      ? `.date:nth-child(7n+1)`
      : `.date:nth-child(7n + ${8 - firstDay})`,
  );
  for (let i = 0; i < sunEls.length; i++) {
    sunEls[i].style.color = "red";
  }

  //오늘 표시
  const today = $dates.querySelector(`[data-date="${date}"]`);
  if (selectYear === year && selectMonth === month) {
    today.classList.add("today");
  }
};

setMonth();

// 이번달로 전환
$current.addEventListener("click", () => {
  $dates.textContent = "";
  selectYear = year;
  selectMonth = month;
  $dateInput.textContent = `${monthData[month]} ${date}, ${year}`;
  $content.textContent = `${selectYear} ${monthData[selectMonth]}`;
  setMonth();
});

//선택한 날짜 표시
$dates.addEventListener("click", e => {
  $dates.querySelector(".selected")?.classList.remove("selected");
  e.target.classList.add("selected");
  $dateInput.textContent = `${monthData[selectMonth]} ${e.target.textContent}, ${selectYear}`;
});

// $prevMonth
$prevMonth.addEventListener("click", () => {
  $dates.textContent = "";
  // 날짜 업데이트
  selectMonth -= 1;
  setMonth();
  // 제목부분 업데이트
  if (selectMonth < 0) {
    selectMonth = 11;
    selectYear -= 1;
    $content.textContent = `${selectYear} ${monthData[selectMonth]}`;
    console.log(year - 1);
  }
  $content.textContent = `${selectYear} ${monthData[selectMonth]}`;
});

// $nextMonth
$nextMonth.addEventListener("click", () => {
  $dates.textContent = "";
  // 날짜 업데이트
  selectMonth += 1;
  setMonth();
  // 제목부분 업데이트
  if (selectMonth > 11) {
    selectMonth = 0;
    selectYear += 1;
    $content.textContent = `${selectYear} ${monthData[selectMonth]}`;
  }
  $content.textContent = `${selectYear} ${monthData[selectMonth]}`;
});
