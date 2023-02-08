async function pullProfile() {
  const form = document.querySelector(".form");
  const img = document.querySelector(".profile-pic");
  const res = await fetch("/profile");
  const data = await res.json();
  if (data) {
    form.fullname.value = data.fullname;
    form.bio.value = data.bio;
    img.src = data.pictureURL;
  }
}

function main() {
  pullProfile();

  let imageDataURL;
  const myDropzone = new Dropzone(".profile-pic-container", {
    url: "/falsa",
    clickable: true,
    autoProcessQueue: false,
  });

  myDropzone.on("thumbnail", function (file) {
    // usando este evento pueden acceder al dataURL directamente
    imageDataURL = file;
  });

  const form = document.querySelector(".form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const datosPerfil = {
      fullname: e.target.fullname.value,
      bio: e.target.bio.value,
      pictureURL: imageDataURL.dataURL,
    };
    console.log("los datos son:", datosPerfil.pictureURL);

    fetch("/profile", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(datosPerfil),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => console.log(data));
  });
}

main();
