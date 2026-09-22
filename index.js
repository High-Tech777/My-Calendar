const lbl_year = document.getElementById("lbl_year");
const lbl_month = document.getElementById("lbl_month");

const year_dom = document.getElementById("year-select");
const month_dom = document.getElementById("month-select");

const calendar_tbody_dom = document.getElementById("calendar-tbody");

const month_names = [
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

year_dom.addEventListener("input", (e) => {
  update();
});

month_dom.addEventListener("change", (e) => {
  update();
});

function update() {
	let year = Number (year_dom.value);
	let month = Number (month_dom.value);
  update_labels(year, month);
  update_calendar(year, month);
}

function update_labels(year, month) {
  lbl_year.innerHTML = year;
  lbl_month.innerHTML = month_names[month];
}

function update_calendar(year, month) {
	const days_in_month = Math.round((
		new Date((month == 11? year+1: year), (month == 11? 0 : month + 1), 1 , 0, 0, 0) - 
		new Date(year, month, 1, 0, 0, 0)
	) / 86400000);

	let weeks = [];

	// make first week
	let first_week = Array.from({length: 7});
	const first_date = new Date(year, month, 1);
	for(let i = first_date.getDay(), j = 1 ; i < 7 ; i ++, j ++){
		first_week[i] = {label: j};
	}
	for(let i = first_date.getDay() - 1, j = 1; i>=0; i--, j++){
		const t_date = new Date(first_date.getTime() - 86400000 * j)
		first_week[i] = {label: t_date.getDate(), class: "old"};
	}
	weeks.push(first_week);

	// next weeks
	let first_date_in_second_week = first_week[6].label + 1;
	let current_date = first_date_in_second_week + 1;
	for(let first_date_in_week = first_date_in_second_week; first_date_in_week < days_in_month ; first_date_in_week += 7){
		let week = Array.from({length: 7});
		for(let i = 0 ; i < 7; i ++){
			week[i] = (first_date_in_week + i > days_in_month)? {label: first_date_in_week + i - days_in_month, class: "old"} : {label: first_date_in_week + i};
		}
		weeks.push(week);
	}
	console.log(weeks);

	calendar_tbody_dom.innerHTML = weeks.map(week => `<tr>${week.map(date => `<td class="${date.class || ""}">${date.label}</td>`).join("")}</tr>`).join("");
	console.log(calendar_tbody_dom.innerHTML);
}

function upDate() {}

const current_date = new Date();
year_dom.value = current_date.getFullYear();
month_dom.value = current_date.getMonth();
update_labels(current_date.getFullYear(), current_date.getMonth());
