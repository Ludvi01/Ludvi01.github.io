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

function startGetUsers() {
  getServerData(userURL).then(
    data => document.querySelector("#userTable").innerHTML = tableMarkupFromObjectArray(data)
  );  
}

startGetUsers();

document.querySelector("#updatebtn").addEventListener("click", startGetUsers)

function tableMarkupFromObjectArray(obj) {
  let headers = `
  ${Object.keys(obj[0]).map((col) => {
    return `<th scope="col">${col}</th>`
  }).join('')}
  <th>Buttons</th>`

  let content = obj.map((row, idx) => {
    return `<tr>
      ${Object.values(row).map((head) => {
      return `<td><input name=${head} value=${head}></td>`
    }).join('')}
    <td><div class="btn-group" role="group">
    <button type="button" class="btn btn-info" onclick="setRow(this)">
      <i class="far fa-edit"></i></button>
    <button type="button" class="btn btn-danger" onclick="delRow(this)">
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

function delRow(btn) {
  let tr = btn.parentElement.parentElement.parentElement;
let id = tr.querySelector("td:first-child").innerHTML;
  let fetchOptions = {
    method: "DELETE",
    mode: "cors",
    cache: "no-cache"
  };
  fetch(`${userURL}/${id}`, fetchOptions).then(
    resp => resp.json(),
    err => console.error(err)
  ).then(
    data => startGetUsers()
  );
}

function createUser(btn) {
  let tr = btn.parentElement.parentElement;
  let data = getRowData(tr);
  delete data.id;
  let fetchOptions = {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };
  fetch(`${userURL}`, fetchOptions).then(
    resp => resp.json(),
    err => console.error(err)
  ).then(
    data => startGetUsers()
  )  
}

function getRowData(tr) {
  let inputs = tr.querySelectorAll("input");
  let data = {};
  for (let i = 0; i < inputs.length; i++) {
    data[inputs[i].name] = inputs[i].value;
  }
  return data;
}

function setRow(btn) {
  let tr = btn.parentElement.parentElement.parentElement;
  let data = getRowData(tr);
  let fetchOptions = {
    method: "PUT",
    mode: "cors",
    cache: "no-cache",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };
  fetch(`${userURL}/${data.id}`, fetchOptions).then(
    resp => resp.json(),
    err => console.error(err)
  ).then(
    data => startGetUsers()
  )
}