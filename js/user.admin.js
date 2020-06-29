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
  {
    Firstname: "Lakatos",
    Lastname: "Brendon",
    Username: "Brendon",
    Email: "brendon@gmail.com",
    Permisson: "User",
    Age: 32,
    Sex: "Male",
    Activ: true
  },
];

function tableMarkupFromObjectArray(obj) {

  let headers = `
  <th>#</th>
  ${Object.keys(obj[0]).map((col) => {
    return `<th>${col}</th>`
  }).join('')}
  <th>Buttons</th>`

  let content = obj.map((row, idx) => {
    return `<tr>
      <td>${idx + 1}</td>
      ${Object.values(row).map((head) => {
      return `<td>${head}</td>`
    }).join('')}
    <td><div class="btn-group" role="group">
    <button type="button" class="btn btn-info">
      <i class="far fa-edit"></i></button>
    <button type="button" class="btn btn-danger">
      <i class="far fa-trash-alt"></i></button></div></td>
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