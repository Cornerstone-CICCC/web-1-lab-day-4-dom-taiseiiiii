const form = document.querySelector("form");
const employeeList = document.getElementById("employeeList");

const allowedImages = [
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
  "7.jpg",
];

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const firstName = document.querySelector("#firstname").value;
  const lastName = document.querySelector("#lastname").value;
  const email = document.querySelector("#email").value;
  const hireDate = document.querySelector("#hire_date").value;

  const photoInput = document.getElementById("photo");
  const photoFile = photoInput.files[0];

  if (photoFile) {
    const fileName = photoFile.name;

    if (!allowedImages.includes(fileName)) {
      alert(
        `Please select an image from the images directory.\nAllowed files: ${allowedImages.join(
          ", "
        )}`
      );
      return;
    }
    const reader = new FileReader();
    reader.onload = function (e) {
      const photoSrc = e.target.result;

      addEmployeeRow(firstName, lastName, email, hireDate, photoSrc);
      form.reset();
    };
    reader.readAsDataURL(photoFile);
  }
});

function addEmployeeRow(firstname, lastname, email, hireDate, photoSrc) {
  const tr = document.createElement("tr");
  const phototd = document.createElement("td");
  const img = document.createElement("img");
  img.src = photoSrc;
  img.alt = `${firstname} ${lastname}`;
  phototd.appendChild(img);

  const fntd = document.createElement("td");
  fntd.textContent = firstname;

  const latd = document.createElement("td");
  latd.textContent = lastname;

  const etd = document.createElement("td");
  etd.textContent = email;

  const hdtd = document.createElement("td");
  hdtd.textContent = hireDate;

  const actiontd = document.createElement("td");
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.type = "button";
  deleteBtn.addEventListener("click", function () {
    const confirmDelete = confirm(
      "Are you sure you want to delete this employee?"
    );
    if (confirmDelete) {
      tr.remove();
    }
  });
  actiontd.appendChild(deleteBtn);

  tr.appendChild(phototd);
  tr.appendChild(fntd);
  tr.appendChild(latd);
  tr.appendChild(etd);
  tr.appendChild(hdtd);
  tr.appendChild(actiontd);

  employeeList.appendChild(tr);
}
