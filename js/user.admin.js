$(document).ready(function () {
  $("#searchInput").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#userTable tbody tr").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});

let userURL = "http://localhost:3000/users";
function getServerData(url) {
  let fetchOptions = {
    method: "GET",
    mode: "cors",
    cache: "no-cache"
  };

  return fetch(url, fetchOptions).then(
    Response => Response.json(),
    err => console.error(err)
  );
}

getServerData(userURL).then(
  data => document.querySelector("#userTable").innerHTML = tableMarkupFromObjectArray(data)
);

document.querySelector("#updatebtn").addEventListener("click", function() {
  getServerData(userURL).then(
    data => document.querySelector("#userTable").innerHTML = tableMarkupFromObjectArray(data)
  );  
})


function tableMarkupFromObjectArray(obj) {
  let headers = `
  ${Object.keys(obj[0]).map((col) => {
    return `<th>${col}</th>`
  }).join('')}
  <th>Buttons</th>`

  let content = obj.map((row, idx) => {
    return `<tr>
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