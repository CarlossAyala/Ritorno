/*
  
  MIS MASCOTAS

*/

//variables
const cardDogs = document.querySelector("#contents");
const modalEdit = document.querySelector("#modalDogEdit");
const modalNew = document.querySelector("#modalDogNew");
const closeModal = document.querySelector("#close");
const btnCancelar = document.querySelector("#cancel");
const showModalNew = document.querySelector(".add");
const divImgEditPet = document.querySelector('#modalDogEdit #details .img img');
const divImgAddPet = document.querySelector('#modalDogNew #details .img img');
const btnEditPet = document.querySelector('#modalDogEdit #details .img .btn');
const btnAddPet = document.querySelector('#modalDogNew #details .img .btn');

//EventListener
loadEventListener();
function loadEventListener() {
  btnEditPet.addEventListener ( 'mouseenter', over);
  btnEditPet.addEventListener ( 'click', gurdarImg);
  btnAddPet.addEventListener ( 'mouseenter', over);
  btnAddPet.addEventListener ( 'click', gurdarImg);
  divImgEditPet.addEventListener ( 'mouseenter', over);
  divImgAddPet.addEventListener ( 'mouseenter', over);
  cardDogs.addEventListener("click", mostrarModal);
  showModalNew.addEventListener("click", mostrarModalNew);
  btnCancelar.addEventListener("click", () => {
    modalEdit.style.display = "none";
  });
  modalNew.querySelector("#close").addEventListener("click", () => {
    modalNew.style.display = "none";
  });
  modalNew.querySelector("#cancel").addEventListener("click", () => {
    modalNew.style.display = "none";
  });
  closeModal.addEventListener("click", () => {
    modalEdit.style.display = "none";
  });
  window.addEventListener("click", (e) => {
    if (e.target == modalDogEdit || e.target == modalDogNew) {
      modalEdit.style.display = "none";
      modalNew.style.display = "none";
    }
  });
}

//Funciones
function mostrarModal(e) {
  e.preventDefault();
  if (e.target.classList.contains("btn-ver")) {
    modalEdit.style.display = "block";

    const dogSeleccionado = e.target.parentElement;
    leerInfoDog(dogSeleccionado);
  }
}
function mostrarModalNew(e) {
  modalNew.style.display = "block";
}
//Extraer info del perro
function leerInfoDog(info) {
  const infoDog = {
    img: info.querySelector("img").src,
    name: info.querySelector(".name-dog span").textContent,
    state: info.querySelector(".state-dog span").textContent,
    code: info.getAttribute("data-id"),
  };
  rellenarModal(infoDog);
}

//Pinta info en el Modal
function rellenarModal(infoDog) {
  const { img, name, state, code } = infoDog;
  const pathDel = "/cuenta/mascotas/delete/" + code;

  modalEdit.querySelector("img").src = img;
  modalEdit.querySelector("#nameDogEdit").value = name.trim();
  seleccionarEstado(state);
  modalEdit.querySelector("#delete").href = pathDel;
  modalEdit.querySelector("#idDogEdit").value = code;
}
//Auto-selecciona el select del Estado de la mascota
function seleccionarEstado(state) {
  if (state.trim() == "encasa") {
    return (document.querySelector("#stateDogEdit").options[1].selected = true);
  } else if (state.trim() == "extraviado") {
    return (document.querySelector("#stateDogEdit").options[2].selected = true);
  }
}

//Solo dispara el evento click en el input type file
function gurdarImg() {
  const btnFile = document.querySelector('#details .img input');
  btnFile.click();
  overout(divImgAddPet);
}

//Mostrar/Ocultar botones del perfil del Pet
function over() {
  divImgEditPet.style.opacity = '50%';
  btnEditPet.style.visibility = 'visible';

  divImgAddPet.style.opacity = '50%';
  btnAddPet.style.visibility = 'visible';
}
function overout() {
  divImgEditPet.style.opacity = '100%';
  btnEditPet.style.visibility = 'hidden';

  divImgAddPet.style.opacity = '100%';
  btnAddPet.style.visibility = 'hidden';
}

/*
  
  jsPDF

*/

//Variables
const btnDownload = document.querySelector('#download button');
if(btnDownload){
  btnDownload.addEventListener('click', () => {
    //htmlToPDF
    const convertToPDF = document.querySelector('#reporte-4');
    html2pdf()
      .set({
          margin: 1,
          filename: 'Informe.pdf',
          image: {
              type: 'jpeg',
              quality: 0.98
          },
          html2canvas: {
              scale: 3, // A mayor escala, mejores gráficos, pero más peso
              letterRendering: true,
          },
          jsPDF: {
              unit: "in",
              format: "a3",
              orientation: 'portrait' // landscape o portrait
          }
      })
      .from(convertToPDF)
      .save()
  });
}