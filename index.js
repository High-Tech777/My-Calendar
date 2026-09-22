const inputYear=document.querySelector(".inputYear");
const selectMonth=document.querySelector(".selectMonth");

const year=document.querySelector(".year");
const month=document.querySelector(".month");




    inputYear.addEventListener("input", (e)=> {
        year.textContent=e.target.value;
    })

    selectMonth.addEventListener("change", (e)=> {
        month.textContent=e.target.value;
    })


