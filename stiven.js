const register = document.getElementById("from-register");
const tipo = document.getElementById("tipo");
const numero = document.getElementById("numero");
const all_box = document.getElementById("all-box");
let caja = document.getElementById("caja");

const create_caja = () => {
  caja = document.createElement("DIV");
  caja.id = "caja";
  caja.classList.add("row");
  all_box.appendChild(caja);
};

if (register) {
  register.addEventListener("submit", (e) => {
    e.preventDefault();
    all_box.removeChild(caja);
    create_caja();

    const url =
      "https://desarrolloenviexpress.site/e-control/modulos/tracking/index.php";
    const form = new FormData();

    if (![null, ""].includes(tipo.value)) {
      form.append("tipo", tipo.value.toUpperCase());
    }

    if (![null, ""].includes(numero.value)) {
      form.append("numero", numero.value.toUpperCase());
    }

    axios.post(url, form).then((res) => {
      res.data.forEach((element) => {
        const col = document.createElement("DIV");
        col.className = "col-12 col-sm-6 col-md-4 col-lg-3 mb-3";

        const card = document.createElement("DIV");
        card.className = "card p-2";

        const header = document.createElement("DIV");
        header.className = "card-header";

        const cuerpo = document.createElement("DIV");
        cuerpo.className = "card-body";
        // -----------------------------------------------------------------------------------------------------
        header.innerHTML = "<strong>GUIA: </strong>" + "#" + element.CODIGO_PK;

        const Nit = document.createElement("Label");
        Nit.innerHTML = "<strong>● NIT</strong>: " + element.TB_PEDIDOS_NIT;

        const Pedido_cliente = document.createElement("Label");
        Pedido_cliente.innerHTML =
          "<strong>● CLIENTE</strong>: " + element.TB_PEDIDOS_CLIENTE;

        const Marca = document.createElement("Label");
        Marca.innerHTML =
          "<strong>● Marca</strong>: " + element.TB_PEDIDOS_MARCA;

        const Zona = document.createElement("Label");
        Zona.innerHTML =
          "<strong>● COD ZONA</strong>: " + element.TB_PEDIDOS_CODIGO_ZONA;

        const Nombre_Z = document.createElement("Label");
        Nombre_Z.innerHTML =
          "<strong>● NOMBRE ZONA</strong>: " + element.TB_PEDIDOS_NOMBRE_ZONA;

        const Ciudad = document.createElement("Label");
        Ciudad.innerHTML =
          "<strong>● CIUDAD</strong>: " + element.TB_PEDIDOS_CIUDAD;
        // -------------------------------------------------------------------------------------------------
        [Nit, Pedido_cliente, Marca, Zona, Nombre_Z, Ciudad].forEach((elem) =>
          cuerpo.appendChild(elem)
        );

        [header, cuerpo].forEach((elem) => card.appendChild(elem));

        col.appendChild(card);
        caja.appendChild(col);
        numero.value = "";
      });
    });
  });
}
