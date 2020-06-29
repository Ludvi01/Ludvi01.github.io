let weekDay = new Date().getDay();
let dayName = '';
switch (weekDay) {
    case 0: dayName = "vasárnap"
        break;
    case 1: dayName = "hétfő"
        break;
    case 2: dayName = "kedd"
        break;
    case 3: dayName = "szerda"
        break;
    case 4: dayName = "csütörtök"
        break;
    case 5: dayName = "péntek"
        break;
    case 6: dayName = "szombat"
        break;
    default:  dayName = "unknown"
        break;
}

document.getElementById("mainap").innerHTML = dayName
