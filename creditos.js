function limpiarTabla() {
  document.getElementById("tabla").innerHTML = "";
}

function obtenerValorInput(idInput) {
  return Number(document.getElementById(idInput).value);
}

function mostrarAlerta(mensaje) {
  alert(mensaje);
}

function calcularCuotas(capital, cuotas, interes) {
  let cuotasTabla = "";
  let cuotaCapital = capital / cuotas;
  let interesMensual = (capital * interes) / 100 / cuotas;
  let cuotaTotal = cuotaCapital + interesMensual;

  for (let i = 1; i <= cuotas; i++) {
    cuotasTabla += `
      <tr>
        <td>${i}</td>
        <td>${cuotaCapital.toFixed(2)}</td>
        <td>${interesMensual.toFixed(2)}</td>
        <td>${cuotaTotal.toFixed(2)}</td>
      </tr>
    `;
  }

  return {
    cuotasTabla,
    sumaCapital: capital.toFixed(2),
    sumaInteres: (interesMensual * cuotas).toFixed(2),
    sumaTotal: (cuotaTotal * cuotas).toFixed(2)
  };
}

function mostrarResultado(cuotas) {
  document.getElementById("tabla").innerHTML = cuotas.cuotasTabla;
  document.getElementById("t1").innerHTML = cuotas.sumaCapital;
  document.getElementById("t2").innerHTML = cuotas.sumaInteres;
  document.getElementById("t3").innerHTML = cuotas.sumaTotal;
}




const popup = document.getElementById("popup");
const inputName = document.getElementById("input-name");
const inputDoc = document.getElementById("input-doc");
const inputDesc = document.getElementById("input-desc");
const submitName = document.getElementById("submit-name");
const titleName = document.getElementById("title-name");
const domDesc = document.getElementById("dom-desc");
const labelDesc = document.getElementById("label-desc");
submitName.addEventListener("click", function () {
  const name = inputName.value;
  const doc = inputDoc.value;
  const desc = inputDesc.value;
  titleName.innerHTML = "Bienvenido " + name
  domDesc.value = desc
  buscoDescuento(desc)
  verificoUsuario(doc, name)
  popup.style.display = "none";
});

popup.style.display = "flex";

function calcular() {
  const desc = domDesc.value;
  const descuento = buscoDescuento(desc)
  const capital = obtenerValorInput("capital");
  const cuotas = obtenerValorInput("couta");
  const interes = obtenerValorInput("interes") - descuento;

  if (capital > 0) {
    const cuotasCalculadas = calcularCuotas(capital, cuotas, interes);
    mostrarResultado(cuotasCalculadas);
  } else {
    mostrarAlerta("Ingrese un número válido");
  }
}


let codigosDescuento = [
  {
    codigo: "D5",
    descuento: 5
  },
  {
    codigo: "D10",
    descuento: 10
  },
  {
    codigo: "D15",
    descuento: 15
  },
  {
    codigo: "D20",
    descuento: 20
  }
]
domDesc.addEventListener("input", function () {

  let descuento = domDesc.value
  let buscoCod = codigosDescuento.filter(x => x.codigo == descuento)
  if (buscoCod.length > 0) {
    labelDesc.innerHTML = "Codigo de descuento verificado"
  } else {
    labelDesc.innerHTML = "Codigo de descuento no verificado"
  }

});

function buscoDescuento(desc) {
  let buscoCod = codigosDescuento.filter(x => x.codigo == desc)
  if (buscoCod.length > 0) {
    labelDesc.innerHTML = "Codigo de descuento verificado"
    let num = buscoCod[0].descuento
    return num
  } else {
    labelDesc.innerHTML = "Codigo de descuento no verificado"
    return 0
  }
};

function verificoUsuario(documento, nombre) {
  const user = {
    name: '',
    id: ''
  };
  user.name = nombre
  user.id = documento
  if (localStorage.getItem('user')) {
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser.name === user.name && storedUser.id === user.id) {
      alertify.alert('¡Bienvenido de nuevo!', 'Estimado ' + user.name, function () { alertify.success('Calculemos el prestamo'); });
    } else {
      alertify.alert('Parece que no eres el mismo usuario que visitó el sitio anteriormente', 'Te doy la bienvenida igualmente estimado ' + user.name, function () { alertify.success('Calculemos el prestamo'); });
    }
  } else {
    alertify.alert('¡Bienvenido por primera vez!', 'Gracias por visitarnos estimado ' + user.name, function () { alertify.success('Calculemos el prestamo'); });
    localStorage.setItem('user', JSON.stringify(user));
  }

}

fetch("https://criptoya.com/api/dolar")
  .then(response => response.json())
  .then(data => {
    const quotesContainer = document.querySelector('.quotes-container');
    let namedata = ["Dolar oficial", "Dolar solidario", "Dolar blue venta", "Dolar cripto", "Dolar mep", "Dolar ccl", "Dolar mep gd30", "Dolar ccl gd30", "Dolar blue compra", "Dolar qatar", "Hoy"]
    let data1 = Object.entries(data)
    let data2 = data1.map((x, y) => [namedata[y], x[1]])
    let datafecha = new Date(data2[10][1] * 1000);
    data2[10].splice(1, 1, datafecha.toLocaleString())
    data2.forEach(info => {
      const p = document.createElement('p');
      p.classList.add('quote');
      p.textContent = `
       ${info[0]}: ${info[1]}
     `;
      quotesContainer.appendChild(p);
    });
  });

const quotesContainer = document.querySelector('.quotes-container');
const quotes = document.querySelectorAll('.quote');

if (quotes.length > 6) {
  const containerWidth = quotes[0].offsetWidth * quotes.length;
  quotesContainer.style.width = `${containerWidth}px`;
}
