let keys = ["id", "Firstname", "Lastname", "Username", "Email", "Permisson", "Age", "Sex", "Activ"];
let getDataBtn = document.querySelector("#getDataBtn");
getDataBtn.addEventListener("click", startGetUsers);

//GET
function startGetUsers(url) {
  let fetchOptions = {
    method: "GET",
    mode: "cors",
    cache: "no-cache"
  }

  let url0 = "https://my-json-server.typicode.com/Ludvi01/JSON-Server/users";

  fetch(url0, fetchOptions).then(
    response => response.json(),
    error => console.error(error)
  ).then(
    data => fillDataTable(data, "userTable")
  )
}

startGetUsers()

//a táblázat feltöltése a szerveren lévő adatokból
function fillDataTable(data, tableID) {
  let table = document.querySelector(`#${tableID}`);
  if (!table) {
    console.error(`Table #${tableID} is not found!`);
    return;
  }

  let tBody = table.querySelector("tbody");
  tBody.innerHTML = ""; //azért kell, hogy DELETE/PUT/POST után törölje az eredeti táblázatot, és újra kitöltse az aktuális adatokkal

  //új user beviteli mezők
  let newRow = newUserRow();
  tBody.appendChild(newRow);

  for (let row of data) {
    //a tr-nek id-t s adunk a későbbi hivatkozáshoz
    let rowID = row.id;
    let tr = createAnyElement("tr", {
      id: `id-${rowID}`
    });
    for (let key of keys) {
      let td = createAnyElement("td");
      let input = createAnyElement("input", {
        class: "form-control",
        name: key,
        value: row[key]
      });
      if (key == "id") {
        input.setAttribute("readonly", true);
      }
      td.appendChild(input);
      tr.appendChild(td);

    };

    //gombok hozzáadása a sorhoz
    let btnGroup = createBtnGroup(rowID);
    tr.appendChild(btnGroup);
    tBody.appendChild(tr);
  }
}

//ELEMGYÁR (új elem előállítása - név és attribútumok)
function createAnyElement(name, attr) {
  let element = document.createElement(name);
  for (let k in attr) {
    element.setAttribute(k, attr[k]);
  }
  return element;
}

//új user sor - inputok
function newUserRow() {
  let tr = createAnyElement("tr", {
    id: "newRow"
  });
  for (let key of keys) {
    let td = createAnyElement("td");
    if (key != "id") {
      let input = createAnyElement("input", {
        class: "form-control",
        name: key
      });
      td.appendChild(input);
    };
    tr.appendChild(td);
  }

  //új user felvitele gomb
  let addBtn = createAnyElement("button", {
    class: "btn btn-success",
    onclick: "createRow(this)"
  });
  addBtn.innerHTML = "<i class='fa fa-plus' aria-hidden='true'></i>";
  let td = createAnyElement("td");
  td.appendChild(addBtn);
  tr.appendChild(td);

  return tr;
}

//refresh és delete gombok (gombcsoport)
function createBtnGroup(rowID) {
  let btnGroup = createAnyElement("div", {
    class: "btn btn-group"
  });

  let refreshBtn = createAnyElement("button", {
    name: rowID,
    class: "btn btn-info",
    onclick: "updateRow(this)"
  });
  refreshBtn.innerHTML = "<i class='fa fa-sync-alt' aria-hidden='true'></i>";

  let deleteBtn = createAnyElement("button", {
    name: rowID,
    class: "btn btn-danger",
    onclick: "deleteRow(this)"
  });
  deleteBtn.innerHTML = "<i class='fa fa-trash' aria-hidden='true'></i>";

  btnGroup.appendChild(refreshBtn);
  btnGroup.appendChild(deleteBtn);

  let td = createAnyElement("td");
  td.appendChild(btnGroup);

  return td;
}

//POST
function createRow(btn) {

  let tr = document.querySelector("#newRow");
  let data = getRowData(tr);
  console.log(data)
  data
  console.log(data)


  let fetchOptions = {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(data)
  };

  let url = `https://my-json-server.typicode.com/Ludvi01/JSON-Server/users`;

  fetch(url, fetchOptions).then(
    response => response.json(),
    error => console.error(error)
  ).then(
    data => startGetUsers()
  )
};

//PUT
function updateRow(btn) {

  let rowID = btn.name;
  let tr = document.querySelector(`#id-${rowID}`);
  let data = getRowData(tr);

  let fetchOptions = {
    method: "PUT",
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify(data)
  };

  let url = `https://my-json-server.typicode.com/Ludvi01/JSON-Server/users/${rowID}`;

  fetch(url, fetchOptions).then(
    response => response.json(),
    error => console.error(error)
  ).then(
    data => startGetUsers()
  )
};

function getRowData(tr) {
  let data = {};
  let inputs = tr.querySelectorAll("input");

  for (let i = 0; i < inputs.length; i++) {
    data[inputs[i].name] = inputs[i].value;
  }

  return data;
};

//DELETE
function deleteRow(btn) {

  let rowID = btn.name;
  let url = `https://my-json-server.typicode.com/Ludvi01/JSON-Server/users/${rowID}`;

  let fetchOptions = {
    method: "DELETE"
  };

  if (confirm("Biztosan törli a felhasználót?")) {
    fetch(url, fetchOptions).then(
      response => response.json(),
      error => console.error(error)
    ).then(
      data => startGetUsers()
    )
  };
};
