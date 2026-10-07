document.addEventListener("DOMContentLoaded", () => {

    // =====================================================
    // CONFIGURACIÓN GENERAL
    // =====================================================

    const TOTAL_ESTACIONAMIENTOS = 150;


    // =====================================================
    // RELOJ
    // =====================================================

    const clock = document.getElementById("clock");

    function actualizarReloj() {

        if (!clock) return;

        const ahora = new Date();

        clock.textContent = ahora.toLocaleTimeString("es-CL", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });

    }

    actualizarReloj();
    setInterval(actualizarReloj, 1000);


    // =====================================================
    // PESTAÑAS RESIDENTES / VISITAS
    // =====================================================

    const tabButtons = document.querySelectorAll(".parking-tab");
    const tabContents = document.querySelectorAll(".parking-tab-content");

    tabButtons.forEach(button => {

        button.addEventListener("click", () => {

            const target = button.dataset.target;

            tabButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            tabContents.forEach(content => {
                content.classList.remove("active");
            });

            button.classList.add("active");

            const targetElement = document.getElementById(target);

            if (targetElement) {
                targetElement.classList.add("active");
            }

        });

    });


    // =====================================================
    // DATOS DEMO - RESIDENTES / DEPARTAMENTOS
    // =====================================================

    const residentes = [

        {
            id: 1,
            departamento: "101",
            tipo: "Propietario",
            nombre: "Carlos Muñoz",
            telefono: "+56 9 4123 5678",

            vehiculos: [
                {
                    patente: "ABCD12",
                    marca: "Toyota",
                    modelo: "Corolla",
                    estacionamiento: 1,
                    observacion: ""
                }
            ]
        },

        {
            id: 2,
            departamento: "203",
            tipo: "Propietario",
            nombre: "Andrea Rojas",
            telefono: "+56 9 6234 8910",

            vehiculos: [
                {
                    patente: "BCDF34",
                    marca: "Hyundai",
                    modelo: "Accent",
                    estacionamiento: 8,
                    observacion: ""
                }
            ]
        },

        {
            id: 3,
            departamento: "304",
            tipo: "Propietario",
            nombre: "Juan Pérez",
            telefono: "+56 9 5123 9087",

            vehiculos: [
                {
                    patente: "GKSB78",
                    marca: "Toyota",
                    modelo: "Corolla",
                    estacionamiento: 15,
                    observacion: "Vehículo principal"
                },

                {
                    patente: "MTRS21",
                    marca: "Mazda",
                    modelo: "CX-5",
                    estacionamiento: 15,
                    observacion: "Segundo vehículo autorizado"
                },

                {
                    patente: "XYZT90",
                    marca: "Chevrolet",
                    modelo: "Spark",
                    estacionamiento: null,
                    observacion: "Vehículo temporal sin estacionamiento permanente"
                }
            ]
        },

        {
            id: 4,
            departamento: "502",
            tipo: "Arrendatario",
            nombre: "María Soto",
            telefono: "+56 9 7345 1290",

            vehiculos: [
                {
                    patente: "PLTR90",
                    marca: "Kia",
                    modelo: "Sportage",
                    estacionamiento: 27,
                    observacion: ""
                },

                {
                    patente: "HJKL22",
                    marca: "Suzuki",
                    modelo: "Swift",
                    estacionamiento: 45,
                    observacion: "Utiliza estacionamiento arrendado"
                }
            ]
        },

        {
            id: 5,
            departamento: "605",
            tipo: "Propietario",
            nombre: "Felipe González",
            telefono: "+56 9 8123 4567",

            vehiculos: [
                {
                    patente: "GGTR55",
                    marca: "Nissan",
                    modelo: "Qashqai",
                    estacionamiento: 73,
                    observacion: ""
                }
            ]
        }

    ];


    // =====================================================
    // CREAR ESTACIONAMIENTOS 1 - 150
    // =====================================================

    const estacionamientos = Array.from(
        { length: TOTAL_ESTACIONAMIENTOS },
        (_, index) => ({
            numero: index + 1,

            // Departamento dueño del estacionamiento
            departamentoPropietario: null,

            // propietario | arrendado | cedido
            condicion: null,

            // Departamento que actualmente puede utilizarlo
            departamentoUso: null,

            observacion: ""
        })
    );


    // =====================================================
    // CONFIGURAR ESTACIONAMIENTO
    // =====================================================

    function configurarEstacionamiento(
        numero,
        departamentoPropietario,
        condicion,
        departamentoUso,
        observacion = ""
    ) {

        const estacionamiento = estacionamientos.find(
            item => item.numero === numero
        );

        if (!estacionamiento) return;

        estacionamiento.departamentoPropietario =
            departamentoPropietario;

        estacionamiento.condicion =
            condicion;

        estacionamiento.departamentoUso =
            departamentoUso;

        estacionamiento.observacion =
            observacion;

    }


    // =====================================================
    // ESTACIONAMIENTOS DEMO
    // =====================================================

    configurarEstacionamiento(
        1,
        "101",
        "propietario",
        "101"
    );

    configurarEstacionamiento(
        8,
        "203",
        "propietario",
        "203"
    );

    configurarEstacionamiento(
        15,
        "304",
        "propietario",
        "304",
        "Estacionamiento principal del departamento"
    );

    configurarEstacionamiento(
        27,
        "502",
        "propietario",
        "502"
    );

    // El estacionamiento pertenece al Depto. 304,
    // pero actualmente está arrendado al Depto. 502.

    configurarEstacionamiento(
        45,
        "304",
        "arrendado",
        "502",
        "Arrendado al Depto. 502 hasta diciembre de 2026"
    );

    configurarEstacionamiento(
        73,
        "605",
        "propietario",
        "605"
    );


    // =====================================================
    // NORMALIZAR PATENTE
    // =====================================================

    function normalizarPatente(valor = "") {

        return valor
            .toUpperCase()
            .replace(/[^A-Z0-9]/g, "");

    }


    // =====================================================
    // BUSCAR RESIDENTE POR DEPARTAMENTO
    // =====================================================

    function buscarResidente(departamento) {

        return residentes.find(
            residente =>
                residente.departamento === departamento
        );

    }


    // =====================================================
    // VEHÍCULOS ASOCIADOS A UN ESTACIONAMIENTO
    // =====================================================

    function obtenerVehiculosEstacionamiento(numero) {

        const resultado = [];

        residentes.forEach(residente => {

            residente.vehiculos.forEach(vehiculo => {

                if (vehiculo.estacionamiento === numero) {

                    resultado.push({

                        ...vehiculo,

                        departamento:
                            residente.departamento,

                        residente:
                            residente.nombre

                    });

                }

            });

        });

        return resultado;

    }


    // =====================================================
    // GENERAR MAPA 1 - 150
    // =====================================================

    function renderizarEstacionamientos() {

        const contenedor =
            document.getElementById("parkingSpaces");

        if (!contenedor) return;

        contenedor.innerHTML = "";


        estacionamientos.forEach(estacionamiento => {

            const vehiculos =
                obtenerVehiculosEstacionamiento(
                    estacionamiento.numero
                );


            const asignado =
                estacionamiento.departamentoPropietario !== null;


            const tarjeta =
                document.createElement("article");


            tarjeta.className =
                `parking-space ${
                    asignado
                        ? "assigned"
                        : "unassigned"
                }`;


            tarjeta.dataset.parking =
                estacionamiento.numero;


            tarjeta.dataset.depto =
                estacionamiento.departamentoUso || "";


            tarjeta.dataset.owner =
                estacionamiento.departamentoPropietario || "";


            tarjeta.dataset.plates =
                vehiculos
                    .map(vehiculo => vehiculo.patente)
                    .join(",");


            // =============================================
            // AUTO / ESPACIO VACÍO
            // =============================================

            let autoHTML = `

                <div class="empty-parking-outline"></div>

            `;


            if (vehiculos.length > 0) {

                autoHTML = `

                    <div class="demo-car car-dark">

                        <span class="car-window front"></span>
                        <span class="car-window rear"></span>

                    </div>

                `;

            }


            // =============================================
            // INFORMACIÓN MOSTRADA
            // =============================================

            let informacionHTML = `

                <span class="scene-available">
                    Disponible
                </span>

            `;


            if (asignado) {

                const patentePrincipal =
                    vehiculos.length > 0
                        ? vehiculos[0].patente
                        : "SIN VEHÍCULO";


                const cantidadExtra =
                    vehiculos.length > 1
                        ? ` +${vehiculos.length - 1}`
                        : "";


                informacionHTML = `

                    <strong class="scene-plate">

                        ${patentePrincipal}${cantidadExtra}

                    </strong>

                    <span class="scene-depto">

                        Depto.
                        ${estacionamiento.departamentoUso}

                    </span>

                `;

            }


            // =============================================
            // ESTADO
            // =============================================

            let textoEstado = "SIN ASIGNAR";
            let claseEstado = "unassigned-status";


            if (asignado) {

                claseEstado = "assigned-status";

                if (
                    estacionamiento.condicion ===
                    "arrendado"
                ) {

                    textoEstado = "ARRENDADO";

                } else if (
                    estacionamiento.condicion ===
                    "cedido"
                ) {

                    textoEstado = "CEDIDO";

                } else {

                    textoEstado = "ASIGNADO";

                }

            }


            tarjeta.innerHTML = `

                <div class="parking-scene">

                    <span class="parking-number">

                        ${estacionamiento.numero}

                    </span>


                    <div class="parking-bay">

                        <span class="parking-line left"></span>

                        <span class="parking-line right"></span>

                        ${autoHTML}

                    </div>


                    ${informacionHTML}

                </div>


                <div class="
                    parking-status-bar
                    ${claseEstado}
                ">

                    ${textoEstado}

                </div>

            `;


            tarjeta.addEventListener(
                "click",
                () => {

                    mostrarDetalleEstacionamiento(
                        estacionamiento.numero
                    );

                }
            );


            contenedor.appendChild(tarjeta);

        });


        actualizarContadores();

    }


    // =====================================================
    // CONTADORES
    // =====================================================

    function actualizarContadores() {

        const asignados =
            estacionamientos.filter(
                estacionamiento =>
                    estacionamiento
                        .departamentoPropietario !== null
            ).length;


        const countAll =
            document.getElementById("countAll");

        const countAssigned =
            document.getElementById("countAssigned");

        const countUnassigned =
            document.getElementById("countUnassigned");


        if (countAll) {
            countAll.textContent =
                TOTAL_ESTACIONAMIENTOS;
        }


        if (countAssigned) {
            countAssigned.textContent =
                asignados;
        }


        if (countUnassigned) {
            countUnassigned.textContent =
                TOTAL_ESTACIONAMIENTOS - asignados;
        }

    }


    // =====================================================
    // MOSTRAR DETALLE DEL ESTACIONAMIENTO
    // =====================================================

    function mostrarDetalleEstacionamiento(numero) {

        const estacionamiento =
            estacionamientos.find(
                item => item.numero === numero
            );


        document
            .querySelectorAll(".parking-space")
            .forEach(elemento => {

                elemento.classList.remove("selected");

            });


        const tarjeta =
            document.querySelector(
                `.parking-space[data-parking="${numero}"]`
            );


        if (tarjeta) {
            tarjeta.classList.add("selected");
        }


        if (
            !estacionamiento ||
            !estacionamiento.departamentoPropietario
        ) {

            actualizarDetalleHTML(
                numero,
                null
            );

            return;

        }


        actualizarDetalleHTML(
            numero,
            estacionamiento
        );

    }


    // =====================================================
    // ACTUALIZAR PANEL DE DETALLE
    // =====================================================

    function actualizarDetalleHTML(
        numero,
        estacionamiento
    ) {

        const detalle =
            document.querySelector(".detail-card");


        if (!detalle) return;


        // ---------------------------------------------
        // SIN ASIGNAR
        // ---------------------------------------------

        if (!estacionamiento) {

            detalle.innerHTML = `

                <h3>
                    Detalle del estacionamiento
                </h3>


                <div class="detail-empty">

                    <strong>
                        Estacionamiento ${numero}
                    </strong>

                    <p>
                        Este estacionamiento
                        se encuentra sin asignar.
                    </p>

                </div>

            `;

            return;

        }


        // ---------------------------------------------
        // DATOS
        // ---------------------------------------------

        const residentePropietario =
            buscarResidente(
                estacionamiento
                    .departamentoPropietario
            );


        const residenteUsuario =
            buscarResidente(
                estacionamiento
                    .departamentoUso
            );


        const vehiculos =
            obtenerVehiculosEstacionamiento(
                numero
            );


        // ---------------------------------------------
        // VEHÍCULOS
        // ---------------------------------------------

        let listaVehiculos = `

            <p class="detail-muted">
                Sin vehículos asociados.
            </p>

        `;


        if (vehiculos.length > 0) {

            listaVehiculos =
                vehiculos.map(vehiculo => `

                    <div class="detail-vehicle">

                        <strong>
                            ${vehiculo.patente}
                        </strong>

                        <span>
                            ${vehiculo.marca}
                            ${vehiculo.modelo}
                        </span>

                        ${
                            vehiculo.observacion
                                ? `
                                    <small>
                                        ${vehiculo.observacion}
                                    </small>
                                `
                                : ""
                        }

                    </div>

                `).join("");

        }


        // ---------------------------------------------
        // CONDICIÓN
        // ---------------------------------------------

        let condicionTexto = "Propietario";


        if (
            estacionamiento.condicion ===
            "arrendado"
        ) {

            condicionTexto = "Arrendado";

        }


        if (
            estacionamiento.condicion ===
            "cedido"
        ) {

            condicionTexto = "Cedido temporalmente";

        }


        // ---------------------------------------------
        // HTML
        // ---------------------------------------------

        detalle.innerHTML = `

            <h3>
                Detalle del estacionamiento
            </h3>


            <div class="detail-parking-number">

                ${numero}

            </div>


            <div class="detail-row">

                <span>
                    Condición
                </span>

                <strong>
                    ${condicionTexto}
                </strong>

            </div>


            <div class="detail-row">

                <span>
                    Propietario
                </span>

                <strong>

                    Depto.
                    ${
                        estacionamiento
                            .departamentoPropietario
                    }

                </strong>

            </div>


            ${
                residentePropietario
                    ? `

                        <div class="detail-row">

                            <span>
                                Residente propietario
                            </span>

                            <strong>
                                ${residentePropietario.nombre}
                            </strong>

                        </div>

                    `
                    : ""
            }


            ${
                estacionamiento.condicion !==
                "propietario"

                    ? `

                        <div class="detail-row">

                            <span>
                                Uso autorizado
                            </span>

                            <strong>

                                Depto.
                                ${
                                    estacionamiento
                                        .departamentoUso
                                }

                            </strong>

                        </div>

                    `
                    : ""
            }


            ${
                residenteUsuario
                    ? `

                        <div class="detail-row">

                            <span>
                                Residente autorizado
                            </span>

                            <strong>
                                ${residenteUsuario.nombre}
                            </strong>

                        </div>

                    `
                    : ""
            }


            <div class="detail-vehicles">

                <span class="detail-label">

                    Vehículos autorizados

                </span>

                ${listaVehiculos}

            </div>


            ${
                estacionamiento.observacion

                    ? `

                        <div class="detail-observation">

                            <strong>
                                Observación
                            </strong>

                            <p>
                                ${estacionamiento.observacion}
                            </p>

                        </div>

                    `
                    : ""
            }

        `;

    }


    // =====================================================
    // FILTROS
    // =====================================================

    const botonesFiltro =
        document.querySelectorAll(".filter-btn");


    botonesFiltro.forEach(boton => {

        boton.addEventListener("click", () => {

            botonesFiltro.forEach(item => {

                item.classList.remove("active");

            });


            boton.classList.add("active");


            const filtro =
                boton.dataset.filter;


            document
                .querySelectorAll(".parking-space")
                .forEach(elemento => {

                    const asignado =
                        elemento.classList.contains(
                            "assigned"
                        );


                    let mostrar = true;


                    if (filtro === "assigned") {

                        mostrar = asignado;

                    }


                    if (filtro === "unassigned") {

                        mostrar = !asignado;

                    }


                    elemento.style.display =
                        mostrar
                            ? ""
                            : "none";

                });

        });

    });


    // =====================================================
    // VERIFICACIÓN RÁPIDA
    // =====================================================

    const inputEstacionamiento =
        document.getElementById(
            "verificarEstacionamiento"
        );


    const inputPatente =
        document.getElementById(
            "verificarPatente"
        );


    const botonVerificar =
        document.getElementById(
            "btnVerificar"
        );


    // -----------------------------------------------------
    // PATENTE AUTOMÁTICAMENTE EN MAYÚSCULAS
    // -----------------------------------------------------

    if (inputPatente) {

        inputPatente.addEventListener(
            "input",
            event => {

                event.target.value =
                    normalizarPatente(
                        event.target.value
                    );

            }
        );

    }


    // -----------------------------------------------------
    // BOTÓN VERIFICAR
    // -----------------------------------------------------

    if (botonVerificar) {

        botonVerificar.addEventListener(
            "click",
            verificarPatente
        );

    }


    // -----------------------------------------------------
    // ENTER PARA VERIFICAR
    // -----------------------------------------------------

    if (inputPatente) {

        inputPatente.addEventListener(
            "keydown",
            event => {

                if (event.key === "Enter") {

                    verificarPatente();

                }

            }
        );

    }


    // =====================================================
    // VERIFICAR PATENTE
    // =====================================================

    function verificarPatente() {

        if (
            !inputEstacionamiento ||
            !inputPatente
        ) {

            return;

        }


        const numero =
            Number(
                inputEstacionamiento.value
            );


        const patente =
            normalizarPatente(
                inputPatente.value
            );


        // ---------------------------------------------
        // VALIDAR ESTACIONAMIENTO
        // ---------------------------------------------

        if (
            !numero ||
            numero < 1 ||
            numero > TOTAL_ESTACIONAMIENTOS
        ) {

            mostrarResultadoVerificacion(
                "warning",
                "Estacionamiento inválido",
                "Ingresa un estacionamiento entre 1 y 150."
            );

            return;

        }


        // ---------------------------------------------
        // VALIDAR PATENTE
        // ---------------------------------------------

        if (!patente) {

            mostrarResultadoVerificacion(
                "warning",
                "Patente requerida",
                "Ingresa la patente observada."
            );

            return;

        }


        const estacionamiento =
            estacionamientos.find(
                item =>
                    item.numero === numero
            );


        const vehiculos =
            obtenerVehiculosEstacionamiento(
                numero
            );


        const vehiculoEncontrado =
            vehiculos.find(
                vehiculo =>
                    vehiculo.patente === patente
            );


        // ---------------------------------------------
        // ESTACIONAMIENTO SIN ASIGNAR
        // ---------------------------------------------

        if (
            !estacionamiento
                .departamentoPropietario
        ) {

            mostrarResultadoVerificacion(
                "danger",
                "Estacionamiento sin asignar",
                `
                    El estacionamiento
                    <strong>${numero}</strong>
                    no tiene departamento asociado.
                `
            );


            mostrarDetalleEstacionamiento(
                numero
            );

            return;

        }


        // ---------------------------------------------
        // AUTORIZADO
        // ---------------------------------------------

        if (vehiculoEncontrado) {

            let condicion =
                "Propietario";


            if (
                estacionamiento.condicion ===
                "arrendado"
            ) {

                condicion = "Arrendado";

            }


            if (
                estacionamiento.condicion ===
                "cedido"
            ) {

                condicion =
                    "Cedido temporalmente";

            }


            mostrarResultadoVerificacion(
                "success",
                "Vehículo autorizado",
                `

                    <strong>Patente:</strong>
                    ${vehiculoEncontrado.patente}

                    <br>

                    <strong>Estacionamiento:</strong>
                    ${numero}

                    <br>

                    <strong>Departamento:</strong>
                    ${vehiculoEncontrado.departamento}

                    <br>

                    <strong>Condición:</strong>
                    ${condicion}

                    ${
                        estacionamiento.observacion

                            ? `

                                <br>

                                <strong>
                                    Observación:
                                </strong>

                                ${
                                    estacionamiento
                                        .observacion
                                }

                            `

                            : ""
                    }

                `
            );

        }

        // ---------------------------------------------
        // NO AUTORIZADO
        // ---------------------------------------------

        else {

            const patentesAutorizadas =
                vehiculos.length > 0

                    ? vehiculos
                        .map(
                            vehiculo =>
                                vehiculo.patente
                        )
                        .join(", ")

                    : "Ninguna";


            mostrarResultadoVerificacion(
                "danger",
                "Vehículo no autorizado",
                `

                    La patente

                    <strong>
                        ${patente}
                    </strong>

                    no está autorizada para
                    el estacionamiento

                    <strong>
                        ${numero}
                    </strong>.

                    <br><br>

                    <strong>
                        Patentes autorizadas:
                    </strong>

                    ${patentesAutorizadas}

                `
            );

        }


        mostrarDetalleEstacionamiento(
            numero
        );

    }


    // =====================================================
    // RESULTADO DE VERIFICACIÓN
    // =====================================================

    function mostrarResultadoVerificacion(
        tipo,
        titulo,
        mensaje
    ) {

        const tarjeta =
            document.querySelector(
                ".verification-card"
            );


        if (!tarjeta) return;


        const resultadoAnterior =
            tarjeta.querySelector(
                ".verification-result"
            );


        if (resultadoAnterior) {

            resultadoAnterior.remove();

        }


        let icono =
            "fa-circle-info";


        if (tipo === "success") {

            icono =
                "fa-circle-check";

        }


        if (tipo === "danger") {

            icono =
                "fa-triangle-exclamation";

        }


        if (tipo === "warning") {

            icono =
                "fa-circle-exclamation";

        }


        const resultado =
            document.createElement("div");


        resultado.className =
            `verification-result ${tipo}`;


        resultado.innerHTML = `

            <i class="fa-solid ${icono}"></i>

            <div>

                <strong>
                    ${titulo}
                </strong>

                <p>
                    ${mensaje}
                </p>

            </div>

        `;


        tarjeta.appendChild(
            resultado
        );

    }


    // =====================================================
    // INICIAR APLICACIÓN
    // =====================================================

    renderizarEstacionamientos();

});