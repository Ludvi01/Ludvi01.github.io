$(document).ready(function () {
  $("#searchInput").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#userTable tbody tr").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});

let users = [
  {
    Firstname: "Ludvány",
    Lastname: "Marci",
    Username: "Ludvi",
    Email: "ludvi4@gmail.com",
    Permisson: "Admin",
    Age: 18,
    Sex: "Male",
    Activ: true
  },
];

function tableMarkupFromObjectArray(obj) {

  let headers = `
  <th>ID</th>
  ${Object.keys(obj[0]).map((col) => {
    return `<th>${col}</th>`
  }).join('')}`

  let content = obj.map((row, idx) => {
    return `<tr>
      <td>${idx}</td>
      ${Object.values(row).map((datum) => {
      return `<td>${datum}</td>`
    }).join('')}
    </tr>
`}).join('')

  let tablemarkup = `
  <table>
  <thead>
  ${headers}

  </thead>
  <tbody>
  ${content}
  </tbody>
  </table>
  `
  return tablemarkup
}

document.querySelector("#userTable").innerHTML = tableMarkupFromObjectArray(users)