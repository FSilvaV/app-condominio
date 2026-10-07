document.addEventListener("DOMContentLoaded", () => {

    // =====================================================
    // CONFIGURACIÓN
    // =====================================================

    const MODO_DESARROLLO = true;

    const TOTAL_ESTACIONAMIENTOS = 150;

    // =====================================================
    // HISTORIAL
    // =====================================================

    const historialMovimientos = [];


    // =====================================================
    // DATOS DEMO
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
                    observacion:
                        "Vehículo temporal sin estacionamiento permanente"
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
                    observacion:
                        "Utiliza estacionamiento arrendado"
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
    // ESTACIONAMIENTOS 1 - 150
    // =====================================================

    const estacionamientos = Array.from(
        { length: TOTAL_ESTACIONAMIENTOS },
        (_, index) => ({
            numero: index + 1,

            departamentoPropietario: null,

            condicion: null,

            departamentoUso: null,

            autorizado: true,

            fechaInicio: null,

            datosUso: {
                nombre: "",
                telefono: "",
                marca: "",
                modelo: "",
                patente: ""
            },

            observacion: ""
        })
    );


    // =====================================================
    // CONFIGURAR ESTACIONAMIENTO
    // =====================================================

    function configurarEstacionamiento(
        numero,
        propietario,
        condicion,
        departamentoUso,
        observacion = ""
    ) {

        const estacionamiento =
            estacionamientos.find(
                item => item.numero === numero
            );

        if (!estacionamiento) return;


        estacionamiento.departamentoPropietario =
            propietario;

        estacionamiento.condicion =
            condicion;

        estacionamiento.departamentoUso =
            departamentoUso;

        estacionamiento.observacion =
            observacion;

    }


    // =====================================================
    // DATOS DE ESTACIONAMIENTOS DEMO
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

    const estacionamiento45 =
    estacionamientos.find(
        estacionamiento =>
            estacionamiento.numero === 45
    );

        if (estacionamiento45) {

            estacionamiento45.autorizado = true;

            estacionamiento45.fechaInicio =
                "2026-10-01";

            estacionamiento45.datosUso = {
                nombre: "María Soto",
                telefono: "+56 9 7345 1290",
                marca: "Suzuki",
                modelo: "Swift",
                patente: "HJKL22"
            };
        }

    // =====================================================
    // UTILIDADES
    // =====================================================

    function normalizarPatente(valor = "") {

        return valor
            .toUpperCase()
            .replace(/[^A-Z0-9]/g, "");

    }


    function buscarResidente(departamento) {

        return residentes.find(
            residente =>
                residente.departamento === departamento
        );

    }


    function obtenerVehiculosEstacionamiento(numero) {

        const resultado = [];


        residentes.forEach(residente => {

            residente.vehiculos.forEach(vehiculo => {

                if (
                    vehiculo.estacionamiento === numero
                ) {

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

    // Registro general: una entrada inmutable por acción.
    let secuenciaEvento = 0;
    let filtroRegistro = "Todos";
    const categoriasRegistro = ["Todos","Residentes","Estacionamientos","Visitas","Encomiendas"];
    const esc = valor => String(valor ?? "").replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));

    function agregarEvento(datos) {
        const ahora = new Date();
        const evento = {id:`EV-${Date.now()}-${++secuenciaEvento}`,fechaISO:ahora.toISOString(),fecha:ahora.toLocaleDateString("es-CL"),hora:ahora.toLocaleTimeString("es-CL"),categoria:"Estacionamientos",movimiento:"Actualización",persona:"",telefono:"",departamento:"",patente:"",estacionamiento:"",resumen:"",observacion:"",usuario:"Administrador",snapshot:{},...datos};
        historialMovimientos.unshift(evento);
        renderizarHistorial(); renderizarDashboard(); renderizarReportes();
        return evento;
    }
    function registrarMovimiento(datos) {
        const residente=buscarResidente(datos.departamentoUso || datos.departamentoPropietario);
        return agregarEvento({categoria:"Estacionamientos",movimiento:datos.tipo,persona:residente?.nombre || datos.nombre || "",telefono:residente?.telefono || datos.telefono || "",departamento:datos.departamentoUso || datos.departamentoPropietario || "",patente:normalizarPatente(datos.patente || ""),estacionamiento:datos.estacionamiento,resumen:`Est. ${datos.estacionamiento}: ${datos.estadoAnterior || "Sin asignar"} → ${datos.estadoNuevo || "Sin asignar"}`,observacion:datos.observacion || "",snapshot:{...datos}});
    }
    function obtenerHistorialPatente(patente) {return historialMovimientos.filter(e=>e.patente===normalizarPatente(patente));}
    function obtenerHistorialEstacionamiento(numero) {return historialMovimientos.filter(e=>String(e.estacionamiento)===String(numero));}
    function eventosFiltrados(desde="",hasta="") {return historialMovimientos.filter(e=>{const d=e.fechaISO.slice(0,10);return (!desde||d>=desde)&&(!hasta||d<=hasta);});}
    function renderizarHistorial() {
        const lista=document.getElementById("historialLista"); if(!lista)return;
        document.getElementById("totalMovimientosHistorial").textContent=historialMovimientos.length;
        const filtros=document.getElementById("registroFiltros");
        if(filtros&&!filtros.children.length){filtros.innerHTML=categoriasRegistro.map(c=>`<button type="button" data-categoria="${c}">${c}</button>`).join("");filtros.addEventListener("click",e=>{const b=e.target.closest("[data-categoria]");if(b){filtroRegistro=b.dataset.categoria;renderizarHistorial();}});}
        filtros?.querySelectorAll("button").forEach(b=>b.classList.toggle("active",b.dataset.categoria===filtroRegistro));
        const q=(document.getElementById("buscarRegistro")?.value||"").trim().toLocaleLowerCase("es-CL");
        const eventos=eventosFiltrados(document.getElementById("registroDesde")?.value,document.getElementById("registroHasta")?.value).filter(e=>(filtroRegistro==="Todos"||e.categoria===filtroRegistro)&&[e.persona,e.departamento,e.patente,e.estacionamiento,e.resumen,e.movimiento].join(" ").toLocaleLowerCase("es-CL").includes(q));
        lista.innerHTML=eventos.length?eventos.map(e=>`<div class="history-row"><div class="history-date"><strong>${esc(e.fecha)}</strong><small>${esc(e.hora)}</small></div><div>${esc(e.categoria)}</div><div>${esc(e.persona||"—")}</div><div>${esc(e.departamento||"—")}</div><div>${esc(e.patente||"—")}</div><div><span class="history-movement">${esc(e.movimiento)}</span></div><div><button type="button" class="history-detail-button" data-evento-id="${esc(e.id)}">Ver detalles</button></div></div>`).join(""):'<div class="history-empty">Sin movimientos para esta búsqueda.</div>';
    }
    function mostrarDetalleHistorial(id) {
        const e=historialMovimientos.find(item=>item.id===id);const panel=document.getElementById("historialDetalle");if(!e||!panel)return;
        const campos=[["Fecha y hora",`${e.fecha} ${e.hora}`],["Categoría",e.categoria],["Movimiento",e.movimiento],["Persona",e.persona],["Teléfono",e.telefono],["Departamento",e.departamento],["Patente",e.patente],["Estacionamiento",e.estacionamiento],["Resumen",e.resumen],["Observación",e.observacion],["Registrado por",e.usuario],...Object.entries(e.snapshot||{}).filter(([k])=>!["observacion","patente","estacionamiento"].includes(k))];
        panel.innerHTML=`<div class="history-detail-header"><div><span>Detalle del movimiento</span><h3>${esc(e.movimiento)}</h3></div><button type="button" id="cerrarDetalleHistorial" class="history-close-button" aria-label="Cerrar">×</button></div><div class="history-detail-grid">${campos.map(([k,v])=>`<div><span>${esc(k)}</span><strong>${esc(v===true?"Sí":v===false?"No":v||"—")}</strong></div>`).join("")}</div>`;
        panel.classList.add("visible");
    }
    document.getElementById("historialLista")?.addEventListener("click",e=>{const b=e.target.closest("[data-evento-id]");if(b)mostrarDetalleHistorial(b.dataset.eventoId);});
    document.getElementById("historialDetalle")?.addEventListener("click",e=>{if(e.target.closest("#cerrarDetalleHistorial"))e.currentTarget.classList.remove("visible");});
    ["buscarRegistro","registroDesde","registroHasta"].forEach(id=>document.getElementById(id)?.addEventListener("input",renderizarHistorial));

    // =====================================================
    // RELOJ
    // =====================================================

    const clock =
        document.getElementById("clock");


    function actualizarReloj() {

        if (!clock) return;


        clock.textContent =
            new Date().toLocaleTimeString(
                "es-CL",
                {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit"
                }
            );

    }


    actualizarReloj();

    setInterval(
        actualizarReloj,
        1000
    );


    // =====================================================
    // NAVEGACIÓN PRINCIPAL
    // =====================================================

    const menuResidentes =
        document.getElementById(
            "menuResidentes"
        );

    const menuEstacionamientos =
        document.getElementById(
            "menuEstacionamientos"
        );

    const menuHistorial =
        document.getElementById(
            "menuHistorial"
        );


    const sectionResidentes =
        document.getElementById(
            "sectionResidentes"
        );

    const sectionEstacionamientos =
        document.getElementById(
            "sectionEstacionamientos"
        );

    const sectionHistorial =
        document.getElementById(
            "sectionHistorial"
        );

    function mostrarSeccion(
        seccion,
        menu
    ) {

        document
            .querySelectorAll(".app-section")
            .forEach(item => {

                item.classList.remove(
                    "active"
                );

            });


        document
            .querySelectorAll(".menu-item")
            .forEach(item => {

                item.classList.remove(
                    "active"
                );

            });


        if (seccion) {

            seccion.classList.add(
                "active"
            );

        }


        if (menu) {

            menu.classList.add(
                "active"
            );

        }

    }


    menuResidentes?.addEventListener(
        "click",
        event => {

            event.preventDefault();


            mostrarSeccion(
                sectionResidentes,
                menuResidentes
            );


            renderizarResidentes();

        }
    );


    menuEstacionamientos?.addEventListener(
        "click",
        event => {

            event.preventDefault();


            mostrarSeccion(
                sectionEstacionamientos,
                menuEstacionamientos
            );


            renderizarEstacionamientos();

        }
    );

    menuHistorial?.addEventListener(
        "click",
        event => {

            event.preventDefault();

            mostrarSeccion(
                sectionHistorial,
                menuHistorial
            );

            renderizarHistorial();
        }
    );


    [["menuInicio","sectionInicio",()=>renderizarDashboard()],["menuVisitas","sectionVisitas",()=>renderizarVisitas()],["menuEncomiendas","sectionEncomiendas",()=>renderizarEncomiendas()],["menuReportes","sectionReportes",()=>renderizarReportes()]].forEach(([menuId,seccionId,render])=>{document.getElementById(menuId)?.addEventListener("click",event=>{event.preventDefault();mostrarSeccion(document.getElementById(seccionId),document.getElementById(menuId));render();});});
    // =====================================================
    // TABS ESTACIONAMIENTOS
    // =====================================================

    const tabButtons =
        document.querySelectorAll(
            ".parking-tab"
        );


    const tabContents =
        document.querySelectorAll(
            ".parking-tab-content"
        );


    tabButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const target =
                    button.dataset.target;


                tabButtons.forEach(btn => {

                    btn.classList.remove(
                        "active"
                    );

                });


                tabContents.forEach(content => {

                    content.classList.remove(
                        "active"
                    );

                });


                button.classList.add(
                    "active"
                );


                document
                    .getElementById(target)
                    ?.classList.add(
                        "active"
                    );

            }
        );

    });


    // =====================================================
    // RENDER ESTACIONAMIENTOS
    // =====================================================

    function renderizarEstacionamientos() {

        const contenedor =
            document.getElementById(
                "parkingSpaces"
            );


        if (!contenedor) return;


        contenedor.innerHTML = "";


        estacionamientos.forEach(
            estacionamiento => {

                const vehiculos =
                    obtenerVehiculosEstacionamiento(
                        estacionamiento.numero
                    );


                const asignado =
                    estacionamiento
                        .departamentoPropietario !== null;


                const tarjeta =
                    document.createElement(
                        "article"
                    );


                tarjeta.className =
                    `parking-space ${
                        asignado
                            ? "assigned"
                            : "unassigned"
                    }`;


                tarjeta.dataset.parking =
                    estacionamiento.numero;


                tarjeta.dataset.depto =
                    estacionamiento
                        .departamentoUso || "";


                tarjeta.dataset.plates =
                    vehiculos
                        .map(v => v.patente)
                        .join(",");


                // AUTO

                const autoHTML =
                    vehiculos.length > 0

                        ? `

                            <div class="
                                demo-car
                                car-dark
                            ">

                                <span class="
                                    car-window
                                    front
                                "></span>

                                <span class="
                                    car-window
                                    rear
                                "></span>

                            </div>

                        `

                        : `

                            <div class="
                                empty-parking-outline
                            "></div>

                        `;


                // INFORMACIÓN

                let informacionHTML = `

                    <span class="
                        scene-available
                    ">
                        Disponible
                    </span>

                `;


                if (asignado) {

                    const patente =
                        vehiculos.length

                            ? vehiculos[0]
                                .patente

                            : "SIN VEHÍCULO";


                    const adicionales =
                        vehiculos.length > 1

                            ? ` +${
                                vehiculos.length - 1
                              }`

                            : "";


                    informacionHTML = `

                        <strong class="
                            scene-plate
                        ">

                            ${patente}${adicionales}

                        </strong>


                        <span class="
                            scene-depto
                        ">

                            Depto.
                            ${
                                estacionamiento
                                    .departamentoUso
                            }

                        </span>

                    `;

                }


                // ESTADO

                let textoEstado =
                    "SIN ASIGNAR";


                let claseEstado =
                    "unassigned-status";


                if (asignado) {

                    claseEstado =
                        "assigned-status";


                    if (
                        estacionamiento
                            .condicion ===
                        "arrendado"
                    ) {

                        textoEstado =
                            "ARRENDADO";

                    }

                    else if (
                        estacionamiento
                            .condicion ===
                        "cedido"
                    ) {

                        textoEstado =
                            "CEDIDO";

                    }

                    else {

                        textoEstado =
                            "ASIGNADO";

                    }

                }


                tarjeta.innerHTML = `

                    <div class="
                        parking-scene
                    ">

                        <span class="
                            parking-number
                        ">

                            ${
                                estacionamiento
                                    .numero
                            }

                        </span>


                        <div class="
                            parking-bay
                        ">

                            <span class="
                                parking-line
                                left
                            "></span>

                            <span class="
                                parking-line
                                right
                            "></span>

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


                contenedor.appendChild(
                    tarjeta
                );

            }
        );


        actualizarContadores();

    }


    // =====================================================
    // CONTADORES ESTACIONAMIENTOS
    // =====================================================

    function actualizarContadores() {

        const asignados =
            estacionamientos.filter(
                estacionamiento =>
                    estacionamiento
                        .departamentoPropietario !==
                    null
            ).length;


        const sinAsignar =
            TOTAL_ESTACIONAMIENTOS -
            asignados;


        const valores = {

            countAll:
                TOTAL_ESTACIONAMIENTOS,

            countAssigned:
                asignados,

            countUnassigned:
                sinAsignar,

            countAllSummary:
                TOTAL_ESTACIONAMIENTOS,

            countAssignedSummary:
                asignados,

            countUnassignedSummary:
                sinAsignar

        };


        Object.entries(valores)
            .forEach(
                ([id, valor]) => {

                    const elemento =
                        document.getElementById(
                            id
                        );


                    if (elemento) {

                        elemento.textContent =
                            valor;

                    }

                }
            );

    }


    // =====================================================
    // FILTROS ESTACIONAMIENTOS
    // =====================================================

    const botonesFiltro =
        document.querySelectorAll(
            ".filter-btn"
        );


    botonesFiltro.forEach(boton => {

        boton.addEventListener(
            "click",
            () => {

                botonesFiltro.forEach(
                    item => {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                boton.classList.add(
                    "active"
                );


                const filtro =
                    boton.dataset.filter;


                document
                    .querySelectorAll(
                        ".parking-space"
                    )
                    .forEach(elemento => {

                        const asignado =
                            elemento
                                .classList
                                .contains(
                                    "assigned"
                                );


                        let mostrar = true;


                        if (
                            filtro ===
                            "assigned"
                        ) {

                            mostrar =
                                asignado;

                        }


                        if (
                            filtro ===
                            "unassigned"
                        ) {

                            mostrar =
                                !asignado;

                        }


                        elemento.style.display =
                            mostrar
                                ? ""
                                : "none";

                    });

            }
        );

    });


    // =====================================================
    // DETALLE ESTACIONAMIENTO
    // =====================================================

    let estacionamientoSeleccionado = null;


    function obtenerEstadoTexto(estacionamiento) {

        if (!estacionamiento?.departamentoPropietario) {
            return "Sin asignar";
        }

        if (estacionamiento.condicion === "arrendado") {
            return "Arrendado";
        }

        return "Asignado";
    }


    function mostrarDetalleEstacionamiento(numero) {

        const estacionamiento =
            estacionamientos.find(
                item => item.numero === numero
            );

        estacionamientoSeleccionado = numero;

        document
            .querySelectorAll(".parking-space")
            .forEach(item => {
                item.classList.remove("selected");
            });

        document
            .querySelector(
                `.parking-space[data-parking="${numero}"]`
            )
            ?.classList.add("selected");

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

                <div class="detail-title-row">

                    <h3>
                        Detalle del estacionamiento
                    </h3>

                </div>

                <div class="detail-empty">

                    <strong>
                        Estacionamiento ${numero}
                    </strong>

                    <p>
                        Este estacionamiento se encuentra
                        sin asignar.
                    </p>

                </div>

            `;

            return;
        }


        // ---------------------------------------------
        // DATOS
        // ---------------------------------------------

        const propietario =
            buscarResidente(
                estacionamiento.departamentoPropietario
            );

        const usuario =
            buscarResidente(
                estacionamiento.departamentoUso
            );

        const vehiculos =
            obtenerVehiculosEstacionamiento(numero);

        const estado =
            obtenerEstadoTexto(estacionamiento);


        let listaVehiculos = `

            <p class="detail-muted">
                Sin vehículos asociados.
            </p>

        `;


        if (vehiculos.length > 0) {

            listaVehiculos =
                vehiculos.map(
                    vehiculo => `

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

                    `
                ).join("");
        }


        // ---------------------------------------------
        // VISTA DETALLE
        // ---------------------------------------------

        detalle.innerHTML = `

            <div class="detail-title-row">

                <h3>
                    Detalle del estacionamiento
                </h3>

                <button
                    class="detail-edit-button"
                    id="btnEditarEstacionamiento"
                    type="button"
                >
                    <i class="fa-solid fa-pen"></i>
                    Modificar
                </button>

            </div>


            <div class="detail-parking-number">
                ${numero}
            </div>


            <div class="detail-row">

                <span>
                    Estado
                </span>

                <strong>
                    ${estado}
                </strong>

            </div>


            <div class="detail-row">

                <span>
                    Departamento propietario
                </span>

                <strong>
                    Depto.
                    ${estacionamiento.departamentoPropietario}
                </strong>

            </div>


            ${
                propietario

                    ? `

                        <div class="detail-row">

                            <span>
                                Propietario / residente
                            </span>

                            <strong>
                                ${propietario.nombre}
                            </strong>

                        </div>


                        <div class="detail-row">

                            <span>
                                Teléfono
                            </span>

                            <strong>
                                ${propietario.telefono}
                            </strong>

                        </div>

                    `

                    : ""
            }


            ${
                estacionamiento.condicion === "arrendado"

                    ? `

                        <div class="detail-section-title">
                            Datos del arriendo
                        </div>


                        <div class="detail-row">

                            <span>
                                Departamento usuario
                            </span>

                            <strong>
                                ${
                                    estacionamiento.departamentoUso
                                        ? `Depto. ${estacionamiento.departamentoUso}`
                                        : "Sin informar"
                                }
                            </strong>

                        </div>


                        <div class="detail-row">

                            <span>
                                Nombre
                            </span>

                            <strong>
                                ${
                                    estacionamiento.datosUso?.nombre ||
                                    usuario?.nombre ||
                                    "Sin informar"
                                }
                            </strong>

                        </div>


                        <div class="detail-row">

                            <span>
                                Teléfono
                            </span>

                            <strong>
                                ${
                                    estacionamiento.datosUso?.telefono ||
                                    usuario?.telefono ||
                                    "Sin informar"
                                }
                            </strong>

                        </div>


                        <div class="detail-row">

                            <span>
                                Fecha de inicio
                            </span>

                            <strong>
                                ${
                                    estacionamiento.fechaInicio ||
                                    "Sin informar"
                                }
                            </strong>

                        </div>


                        <div class="detail-row">

                            <span>
                                Autorización
                            </span>

                            <strong class="${
                                estacionamiento.autorizado
                                    ? "detail-authorized"
                                    : "detail-not-authorized"
                            }">

                                ${
                                    estacionamiento.autorizado
                                        ? "Autorizado"
                                        : "No autorizado"
                                }

                            </strong>

                        </div>


                        <div class="detail-section-title">
                            Vehículo del arriendo
                        </div>


                        <div class="detail-row">

                            <span>
                                Patente
                            </span>

                            <strong>
                                ${
                                    estacionamiento.datosUso?.patente ||
                                    "Sin informar"
                                }
                            </strong>

                        </div>


                        <div class="detail-row">

                            <span>
                                Vehículo
                            </span>

                            <strong>
                                ${
                                    [
                                        estacionamiento.datosUso?.marca,
                                        estacionamiento.datosUso?.modelo
                                    ]
                                        .filter(Boolean)
                                        .join(" ")
                                    ||
                                    "Sin informar"
                                }
                            </strong>

                        </div>

                    `

                    : `

                        <div class="detail-vehicles">

                            <span class="detail-label">
                                Vehículos autorizados
                            </span>

                            ${listaVehiculos}

                        </div>

                    `
            }


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


        document
            .getElementById("btnEditarEstacionamiento")
            ?.addEventListener(
                "click",
                () => {
                    mostrarFormularioEstacionamiento(numero);
                }
            );
    }


    // =====================================================
    // EDITAR ESTACIONAMIENTO
    // =====================================================

    function mostrarFormularioEstacionamiento(numero) {

        const estacionamiento =
            estacionamientos.find(
                item => item.numero === numero
            );

        if (
            !estacionamiento ||
            !estacionamiento.departamentoPropietario
        ) {
            return;
        }


        const detalle =
            document.querySelector(".detail-card");

        if (!detalle) return;


        const propietario =
            buscarResidente(
                estacionamiento.departamentoPropietario
            );


        const vehiculos =
            obtenerVehiculosEstacionamiento(numero);


        let patenteActual = "";

        let marcaActual = "";

        let modeloActual = "";


        if (estacionamiento.condicion === "arrendado") {

            patenteActual =
                estacionamiento.datosUso?.patente || "";

            marcaActual =
                estacionamiento.datosUso?.marca || "";

            modeloActual =
                estacionamiento.datosUso?.modelo || "";

        }

        else if (vehiculos.length > 0) {

            patenteActual =
                vehiculos[0].patente || "";

            marcaActual =
                vehiculos[0].marca || "";

            modeloActual =
                vehiculos[0].modelo || "";
        }


        detalle.innerHTML = `

            <div class="detail-title-row">

                <h3>
                    Modificar estacionamiento
                </h3>

                <span class="development-badge">
                    Desarrollo
                </span>

            </div>


            <div class="detail-parking-number">
                ${numero}
            </div>


            <div class="edit-info-box">

                <span>
                    Propietario
                </span>

                <strong>
                    Depto.
                    ${estacionamiento.departamentoPropietario}
                </strong>

                ${
                    propietario

                        ? `
                            <small>
                                ${propietario.nombre}
                            </small>
                        `

                        : ""
                }

            </div>


            <div class="parking-edit-form">


                <div class="edit-field">

                    <label for="editarEstado">
                        Estado
                        <span>*</span>
                    </label>

                    <select id="editarEstado"><option value="sin-asignar" ${!estacionamiento.condicion ? "selected" : ""}>Sin asignar</option>

                        <option
                            value="propietario"
                            ${
                                estacionamiento.condicion === "propietario"
                                    ? "selected"
                                    : ""
                            }
                        >
                            Asignado
                        </option>

                        <option
                            value="arrendado"
                            ${
                                estacionamiento.condicion === "arrendado"
                                    ? "selected"
                                    : ""
                            }
                        >
                            Arrendado
                        </option>

                    </select>

                </div>


                <div
                    class="rental-fields"
                    id="camposArriendo"
                >


                    <div class="edit-field">

                        <label for="editarDepartamentoUso">
                            Departamento que utiliza
                            <span>*</span>
                        </label>

                        <input
                            type="text"
                            id="editarDepartamentoUso"
                            value="${
                                estacionamiento.condicion === "arrendado"
                                    ? estacionamiento.departamentoUso || ""
                                    : ""
                            }"
                            placeholder="Ej: 502"
                        >

                    </div>


                    <div class="edit-field">

                        <label for="editarNombreUso">
                            Nombre
                            <span>*</span>
                        </label>

                        <input
                            type="text"
                            id="editarNombreUso"
                            value="${
                                estacionamiento.condicion === "arrendado"
                                    ? estacionamiento.datosUso?.nombre || ""
                                    : ""
                            }"
                            placeholder="Nombre y apellido"
                        >

                    </div>


                    <div class="edit-field">

                        <label for="editarTelefonoUso">
                            Teléfono
                            <span>*</span>
                        </label>

                        <input
                            type="text"
                            id="editarTelefonoUso"
                            value="${
                                estacionamiento.condicion === "arrendado"
                                    ? estacionamiento.datosUso?.telefono || ""
                                    : ""
                            }"
                            placeholder="+56 9..."
                        >

                    </div>


                    <div class="edit-field">

                        <label for="editarFechaInicio">
                            Fecha de inicio
                            <span>*</span>
                        </label>

                        <input
                            type="date"
                            id="editarFechaInicio"
                            value="${
                                estacionamiento.fechaInicio || ""
                            }"
                        >

                    </div>


                    <div class="detail-section-title">
                        Vehículo
                    </div>


                    <div class="edit-field">

                        <label for="editarPatente">
                            Patente
                            <span>*</span>
                        </label>

                        <input
                            type="text"
                            id="editarPatente"
                            maxlength="8"
                            value="${patenteActual}"
                            placeholder="Ej: HJKL22"
                        >

                    </div>


                    <div class="edit-field">

                        <label for="editarMarca">
                            Marca
                            <span>*</span>
                        </label>

                        <input
                            type="text"
                            id="editarMarca"
                            value="${marcaActual}"
                            placeholder="Ej: Suzuki"
                        >

                    </div>


                    <div class="edit-field">

                        <label for="editarModelo">
                            Modelo
                            <span>*</span>
                        </label>

                        <input
                            type="text"
                            id="editarModelo"
                            value="${modeloActual}"
                            placeholder="Ej: Swift"
                        >

                    </div>


                    <div class="edit-field">

                        <label for="editarAutorizado">
                            Autorización
                            <span>*</span>
                        </label>

                        <select id="editarAutorizado">

                            <option
                                value="true"
                                ${
                                    estacionamiento.autorizado
                                        ? "selected"
                                        : ""
                                }
                            >
                                Autorizado
                            </option>

                            <option
                                value="false"
                                ${
                                    !estacionamiento.autorizado
                                        ? "selected"
                                        : ""
                                }
                            >
                                No autorizado
                            </option>

                        </select>

                    </div>

                </div>


                <div class="edit-field">

                    <label for="editarObservacion">
                        Observación
                        <span>*</span>
                    </label>

                    <textarea
                        id="editarObservacion"
                        rows="4"
                        placeholder="Indica motivo del cambio, a quién se arrienda, uso temporal, familiar, etc."
                    >${estacionamiento.observacion || ""}</textarea>

                </div>


                <p class="required-note">

                    * Obligatorio en versión final.

                    ${
                        MODO_DESARROLLO

                            ? `
                                Durante el desarrollo puedes
                                guardar campos incompletos.
                            `

                            : ""
                    }

                </p>


                <div class="edit-actions">

                    <button
                        type="button"
                        class="secondary-edit-button"
                        id="btnCancelarEdicion"
                    >
                        Cancelar
                    </button>

                    <button
                        type="button"
                        class="save-edit-button"
                        id="btnGuardarEstacionamiento"
                    >
                        <i class="fa-solid fa-floppy-disk"></i>
                        Guardar cambios
                    </button>

                </div>

            </div>

        `;


        const selectEstado =
            document.getElementById("editarEstado");

        const camposArriendo =
            document.getElementById("camposArriendo");

        const inputPatente =
            document.getElementById("editarPatente");


        function actualizarCamposArriendo() {

            if (!camposArriendo) return;

            camposArriendo.style.display =
                selectEstado?.value === "arrendado"
                    ? ""
                    : "none";
        }


        actualizarCamposArriendo();


        selectEstado?.addEventListener(
            "change",
            actualizarCamposArriendo
        );


        inputPatente?.addEventListener(
            "input",
            event => {

                event.target.value =
                    normalizarPatente(
                        event.target.value
                    );
            }
        );


        document
            .getElementById("btnCancelarEdicion")
            ?.addEventListener(
                "click",
                () => {

                    mostrarDetalleEstacionamiento(
                        numero
                    );
                }
            );


        document
            .getElementById(
                "btnGuardarEstacionamiento"
            )
            ?.addEventListener(
                "click",
                () => {

                    guardarCambiosEstacionamiento(
                        numero
                    );
                }
            );
    }


    // =====================================================
    // GUARDAR CAMBIOS ESTACIONAMIENTO
    // =====================================================

    function guardarCambiosEstacionamiento(numero) {

        const estacionamiento =
            estacionamientos.find(
                item => item.numero === numero
            );

        if (!estacionamiento) return;


        const estadoAnterior =
            obtenerEstadoTexto(estacionamiento);
        const anterior = JSON.parse(JSON.stringify(estacionamiento));

        const patenteAnterior =
            estacionamiento.condicion === "arrendado"

                ? estacionamiento.datosUso?.patente || ""

                : obtenerVehiculosEstacionamiento(numero)[0]
                    ?.patente || "";


        const nuevaCondicion =
            document
                .getElementById("editarEstado")
                ?.value || "propietario";


        const nuevaObservacion =
            document
                .getElementById("editarObservacion")
                ?.value
                .trim() || "";


        // ---------------------------------------------
        // VALIDACIÓN FINAL
        // ---------------------------------------------

        if (!MODO_DESARROLLO) {

            if (!nuevaObservacion) {

                alert(
                    "La observación es obligatoria."
                );

                return;
            }


            if (nuevaCondicion === "arrendado") {

                const obligatorios = [

                    document
                        .getElementById(
                            "editarDepartamentoUso"
                        )
                        ?.value
                        .trim(),

                    document
                        .getElementById(
                            "editarNombreUso"
                        )
                        ?.value
                        .trim(),

                    document
                        .getElementById(
                            "editarTelefonoUso"
                        )
                        ?.value
                        .trim(),

                    document
                        .getElementById(
                            "editarFechaInicio"
                        )
                        ?.value,

                    document
                        .getElementById(
                            "editarPatente"
                        )
                        ?.value
                        .trim()

                ];


                if (
                    obligatorios.some(
                        valor => !valor
                    )
                ) {

                    alert(
                        "Completa todos los campos obligatorios del arriendo."
                    );

                    return;
                }
            }
        }


        // ---------------------------------------------
        // ARRENDADO
        // ---------------------------------------------

        if (nuevaCondicion === "arrendado") {

            const departamentoUso =
                document
                    .getElementById(
                        "editarDepartamentoUso"
                    )
                    ?.value
                    .trim() || "";


            const nombre =
                document
                    .getElementById(
                        "editarNombreUso"
                    )
                    ?.value
                    .trim() || "";


            const telefono =
                document
                    .getElementById(
                        "editarTelefonoUso"
                    )
                    ?.value
                    .trim() || "";


            const fechaInicio =
                document
                    .getElementById(
                        "editarFechaInicio"
                    )
                    ?.value || "";


            const patente =
                normalizarPatente(
                    document
                        .getElementById(
                            "editarPatente"
                        )
                        ?.value || ""
                );


            const marca =
                document
                    .getElementById(
                        "editarMarca"
                    )
                    ?.value
                    .trim() || "";


            const modelo =
                document
                    .getElementById(
                        "editarModelo"
                    )
                    ?.value
                    .trim() || "";


            const autorizado =
                document
                    .getElementById(
                        "editarAutorizado"
                    )
                    ?.value !== "false";


            estacionamiento.condicion =
                "arrendado";

            estacionamiento.departamentoUso =
                departamentoUso;

            estacionamiento.fechaInicio =
                fechaInicio;

            estacionamiento.autorizado =
                autorizado;

            estacionamiento.datosUso = {
                nombre,
                telefono,
                marca,
                modelo,
                patente
            };

            estacionamiento.observacion =
                nuevaObservacion;




        }


        // ---------------------------------------------
        // ASIGNADO
        // ---------------------------------------------

        else {

            estacionamiento.condicion =
                nuevaCondicion === "sin-asignar" ? null : "propietario";

            estacionamiento.departamentoUso =
                nuevaCondicion === "sin-asignar" ? null : estacionamiento.departamentoPropietario;

            estacionamiento.autorizado =
                true;

            estacionamiento.fechaInicio =
                null;

            estacionamiento.datosUso = {
                nombre: "",
                telefono: "",
                marca: "",
                modelo: "",
                patente: ""
            };

            estacionamiento.observacion =
                nuevaObservacion;




        }


        // ---------------------------------------------
        // ACTUALIZAR INTERFAZ
        // ---------------------------------------------

        registrarCambiosEstacionamiento(anterior, estacionamiento, estadoAnterior);
        renderizarEstacionamientos();

        renderizarResidentes(
            document
                .getElementById("buscarResidente")
                ?.value || "",

            document
                .getElementById("filtroTipoResidente")
                ?.value || "todos"
        );


        mostrarDetalleEstacionamiento(
            numero
        );


        console.log(
            "Historial:",
            historialMovimientos
        );
    }
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


    const btnVerificar =
        document.getElementById(
            "btnVerificar"
        );


    inputPatente?.addEventListener(
        "input",
        event => {

            event.target.value =
                normalizarPatente(
                    event.target.value
                );

        }
    );


    inputPatente?.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter"
            ) {

                verificarPatente();

            }

        }
    );


    btnVerificar?.addEventListener(
        "click",
        verificarPatente
    );


    function verificarPatente() {

        const numero =
            Number(
                inputEstacionamiento
                    ?.value
            );


        const patente =
            normalizarPatente(
                inputPatente
                    ?.value || ""
            );


        if (
            !numero ||
            numero < 1 ||
            numero >
            TOTAL_ESTACIONAMIENTOS
        ) {

            mostrarResultadoVerificacion(
                "warning",
                "Estacionamiento inválido",
                "Ingresa un estacionamiento entre 1 y 150."
            );

            return;

        }


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


        const encontrado =
            vehiculos.find(
                vehiculo =>
                    vehiculo.patente ===
                    patente
            );


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


        if (encontrado) {

            let condicion =
                "Propietario";


            if (
                estacionamiento
                    .condicion ===
                "arrendado"
            ) {

                condicion =
                    "Arrendado";

            }


            if (
                estacionamiento
                    .condicion ===
                "cedido"
            ) {

                condicion =
                    "Cedido temporalmente";

            }


            mostrarResultadoVerificacion(
                "success",
                "Vehículo autorizado",
                `

                    <strong>
                        Patente:
                    </strong>

                    ${encontrado.patente}

                    <br>

                    <strong>
                        Estacionamiento:
                    </strong>

                    ${numero}

                    <br>

                    <strong>
                        Departamento:
                    </strong>

                    ${encontrado.departamento}

                    <br>

                    <strong>
                        Condición:
                    </strong>

                    ${condicion}

                    ${
                        estacionamiento
                            .observacion

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

        else {

            const autorizadas =
                vehiculos.length

                    ? vehiculos
                        .map(v => v.patente)
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

                    no está autorizada
                    para el estacionamiento
                    <strong>
                        ${numero}
                    </strong>.

                    <br><br>

                    <strong>
                        Patentes autorizadas:
                    </strong>

                    ${autorizadas}

                `
            );

        }


        mostrarDetalleEstacionamiento(
            numero
        );

    }


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


        tarjeta
            .querySelector(
                ".verification-result"
            )
            ?.remove();


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
            document.createElement(
                "div"
            );


        resultado.className =
            `verification-result ${tipo}`;


        resultado.innerHTML = `

            <i class="
                fa-solid
                ${icono}
            "></i>

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
    // RESIDENTES
    // =====================================================

    function renderizarResidentes(
        texto = "",
        tipo = "todos"
    ) {

        const contenedor =
            document.getElementById(
                "residentesLista"
            );


        if (!contenedor) return;


        const busqueda =
            texto
                .trim()
                .toUpperCase();


        const filtrados =
            residentes.filter(
                residente => {

                    const coincideTipo =
                        tipo === "todos" ||
                        residente.tipo ===
                        tipo;


                    const patentes =
                        residente
                            .vehiculos
                            .map(
                                vehiculo =>
                                    vehiculo
                                        .patente
                            )
                            .join(" ");


                    const textoCompleto =
                        `

                            ${residente.nombre}

                            ${
                                residente
                                    .departamento
                            }

                            ${patentes}

                        `.toUpperCase();


                    return (
                        coincideTipo &&
                        textoCompleto.includes(
                            busqueda
                        )
                    );

                }
            );


        contenedor.innerHTML = "";


        filtrados.forEach(
            residente => {

                const fila =
                    document.createElement(
                        "div"
                    );


                fila.className =
                    "resident-row";


                const relacionados =
                    estacionamientos.filter(
                        estacionamiento =>

                            estacionamiento
                                .departamentoPropietario ===
                                residente.departamento

                            ||

                            estacionamiento
                                .departamentoUso ===
                                residente.departamento
                    );


                let estacionamientosHTML = `

                    <span class="
                        detail-muted
                    ">
                        No tiene
                    </span>

                `;


                if (
                    relacionados.length > 0
                ) {

                    estacionamientosHTML =
                        relacionados.map(
                            estacionamiento => {

                                const arrendado =
                                    estacionamiento
                                        .condicion ===
                                    "arrendado";


                                return `

                                    <span class="
                                        parking-chip
                                        ${
                                            arrendado
                                                ? "rented"
                                                : ""
                                        }
                                    ">

                                        ${
                                            estacionamiento
                                                .numero
                                        }

                                        ${
                                            arrendado
                                                ? " · Arrendado"
                                                : ""
                                        }

                                    </span>

                                `;

                            }
                        ).join("");

                }


                fila.innerHTML = `

                    <div class="
                        resident-depto
                    ">

                        ${
                            residente
                                .departamento
                        }

                    </div>


                    <div class="
                        resident-name
                    ">

                        <strong>
                            ${residente.nombre}
                        </strong>

                        <small>
                            ${residente.telefono}
                        </small>

                    </div>


                    <div>

                        <span class="
                            resident-type
                        ">

                            ${residente.tipo}

                        </span>

                    </div>


                    <div class="resident-vehicles">

                        ${
                            residente.vehiculos.length > 0

                                ? residente.vehiculos.map(vehiculo => `

                                    <div class="resident-vehicle-item">

                                        <strong>
                                            ${vehiculo.patente}
                                        </strong>

                                        <span>
                                            ${
                                                vehiculo.estacionamiento
                                                    ? `Est. ${vehiculo.estacionamiento}`
                                                    : "Sin estacionamiento"
                                            }
                                        </span>

                                    </div>

                                `).join("")

                                : `

                                    <span class="detail-muted">
                                        Sin vehículos
                                    </span>

                                `
                        }

                    </div>


                    <div class="
                        resident-parkings
                    ">

                        ${estacionamientosHTML}

                    </div>


                    <div>

                        <button
                            class="
                                edit-resident
                            "
                            data-id="${
                                residente.id
                            }"
                            title="
                                Editar residente
                            "
                        >

                            <i class="
                                fa-solid
                                fa-pen
                            "></i>

                        </button>

                    </div>

                `;


                contenedor.appendChild(
                    fila
                );

            }
        );


        actualizarResumenResidentes();

    }


    // =====================================================
    // RESUMEN RESIDENTES
    // =====================================================

    function actualizarResumenResidentes() {

        const totalVehiculos =
            residentes.reduce(
                (
                    total,
                    residente
                ) =>

                    total +
                    residente
                        .vehiculos
                        .length,

                0
            );


        const valores = {

            totalDepartamentos:
                residentes.length,

            totalResidentes:
                residentes.length,

            totalVehiculos:
                totalVehiculos

        };


        Object.entries(valores)
            .forEach(
                ([id, valor]) => {

                    const elemento =
                        document.getElementById(
                            id
                        );


                    if (elemento) {

                        elemento.textContent =
                            valor;

                    }

                }
            );

    }


    // =====================================================
    // BUSCADOR RESIDENTES
    // =====================================================

    const buscarResidenteInput =
        document.getElementById(
            "buscarResidente"
        );


    const filtroTipoResidente =
        document.getElementById(
            "filtroTipoResidente"
        );


    function aplicarFiltroResidentes() {

        renderizarResidentes(

            buscarResidenteInput
                ?.value || "",

            filtroTipoResidente
                ?.value || "todos"

        );

    }


    buscarResidenteInput
        ?.addEventListener(
            "input",
            aplicarFiltroResidentes
        );


    filtroTipoResidente
        ?.addEventListener(
            "change",
            aplicarFiltroResidentes
        );


    // =====================================================
    // BOTÓN NUEVO RESIDENTE
    // Próximo paso
    // =====================================================

    const btnNuevoResidente =
        document.getElementById(
            "btnNuevoResidente"
        );


    btnNuevoResidente
        ?.addEventListener(
            "click",
            () => {

                alert(
                    "En el siguiente paso habilitaremos el formulario para crear residentes."
                );

            }
        );


    // Módulos operativos en memoria.
    const visitas=[];const encomiendas=[];let secuenciaVisita=0;let secuenciaEncomienda=0;
    const txt=v=>esc(v||"—");
    const visible=v=>new Date(v).toLocaleString("es-CL");
    const stat=(titulo,valor)=>`<div class="nova-stat"><span>${titulo}</span><strong>${valor}</strong></div>`;

    function registrarCambiosEstacionamiento(antes,despues,estadoAnterior) {
        const base={estacionamiento:despues.numero,departamentoPropietario:despues.departamentoPropietario,departamentoUso:despues.departamentoUso,patente:despues.datosUso?.patente||"",autorizado:despues.autorizado,observacion:despues.observacion,estadoAnterior,estadoNuevo:obtenerEstadoTexto(despues)};
        const emitir=(tipo,previo,nuevo)=>registrarMovimiento({...base,tipo,previo,nuevo});
        if(antes.condicion!==despues.condicion||antes.departamentoUso!==despues.departamentoUso){const tipo=antes.condicion==="arrendado"&&despues.condicion!=="arrendado"?"Fin de arriendo":despues.condicion==="arrendado"?"Inicio de arriendo":despues.condicion==="propietario"?"Asignación":"Sin asignar";emitir(tipo,`${antes.condicion||"Sin asignar"} · ${antes.departamentoUso||"—"}`,`${despues.condicion||"Sin asignar"} · ${despues.departamentoUso||"—"}`);}
        [["Cambio de vehículo",JSON.stringify(antes.datosUso),JSON.stringify(despues.datosUso)],["Cambio de autorización",antes.autorizado,despues.autorizado],["Cambio de fecha de inicio",antes.fechaInicio,despues.fechaInicio],["Cambio de observación",antes.observacion,despues.observacion]].forEach(([tipo,previo,nuevo])=>{if(previo!==nuevo)emitir(tipo,previo,nuevo);});
    }
    const marcasPatente = new Map();
    const plazasVisita = ["V1", "V2", "V3", "V4", "V5"];
    const horasMs = 60 * 60 * 1000;
    const minutosMs = 60 * 1000;

    function ocupacionVisitas() {
        return new Set(visitas.filter(v => !v.salida && v.estacionamiento).map(v => v.estacionamiento));
    }

    function opcionesVisita(seleccion = "") {
        const ocupadas = ocupacionVisitas();
        return `<option value="" ${seleccion ? "" : "selected"}>Sin estacionamiento</option>` +
            plazasVisita.map(plaza => `<option value="${plaza}" ${plaza === seleccion ? "selected" : ""} ${ocupadas.has(plaza) && plaza !== seleccion ? "disabled" : ""}>${plaza} · ${ocupadas.has(plaza) && plaza !== seleccion ? "(Ocupado)" : "Disponible"}</option>`).join("");
    }

    function duracion(ms) {
        const total = Math.max(0, Math.floor(ms / 1000));
        const h = Math.floor(total / 3600);
        const m = Math.floor((total % 3600) / 60);
        const s = total % 60;
        return `${h} h ${String(m).padStart(2, "0")} min ${String(s).padStart(2, "0")} s`;
    }

    function estadoTiempo(v, ahora = Date.now()) {
        if (!v.estacionamiento || !v.inicioParking || !v.venceParking) return {clase:"", texto:"Sin estacionamiento de visita"};
        const fin = v.salida ? Date.parse(v.salida) : ahora;
        const vence = Date.parse(v.venceParking);
        const usado = duracion(fin - Date.parse(v.inicioParking));
        if (fin > vence) return {clase:"overdue", texto:`Tiempo de uso: ${usado} · Excedido: ${duracion(fin - vence)}`};
        const restante = vence - fin;
        if (!v.salida && restante <= 30 * minutosMs) return {clase:"warning", texto:`Tiempo de uso: ${usado} · Cerca del límite: ${duracion(restante)} restantes`};
        return {clase:"", texto:`Tiempo de uso: ${usado}${v.salida ? "" : ` · Restan ${duracion(restante)}`}`};
    }

    function actualizarTiemposVisitas() {
        document.querySelectorAll("[data-tiempo-visita]").forEach(elemento => {
            const v = visitas.find(item => item.id === Number(elemento.dataset.tiempoVisita));
            if (!v) return;
            const estado = estadoTiempo(v);
            elemento.textContent = estado.texto;
            elemento.className = `nova-time ${estado.clase}`;
            elemento.closest(".nova-visit")?.classList.toggle("warning", estado.clase === "warning");
            elemento.closest(".nova-visit")?.classList.toggle("overdue", estado.clase === "overdue");
        });
        const entrada = document.getElementById("visitaFechaEntrada");
        if (entrada) entrada.textContent = visible(new Date().toISOString());
        const prevista = document.getElementById("visitaFechaPrevista");
        const plaza = document.getElementById("visitaEstacionamiento")?.value;
        const horas = Number(document.getElementById("visitaHoras")?.value || 0);
        if (prevista) prevista.textContent = plaza && horas > 0 ? visible(new Date(Date.now() + horas * horasMs).toISOString()) : "Selecciona un estacionamiento";
    }

    function renderizarParkingVisitas() {
        const ocupadas = ocupacionVisitas();
        const html = plazasVisita.map(plaza => {
            const v = visitas.find(item => !item.salida && item.estacionamiento === plaza);
            return `<span class="nova-space ${ocupadas.has(plaza) ? "busy" : ""}">${plaza} · ${ocupadas.has(plaza) ? "(Ocupado)" : "Disponible"}${v ? `<small>${esc(v.nombre)}</small>` : ""}</span>`;
        }).join("");
        const panel = document.getElementById("visitaDisponibilidad");
        if (panel) panel.innerHTML = html;
        const parking = document.getElementById("visitorParkingStatus");
        if (parking) parking.innerHTML = html;
    }

    function datosEventoVisita(v, movimiento, resumen, extra = {}) {
        return {
            categoria:"Visitas", movimiento, persona:v.nombre, telefono:v.telefono,
            departamento:v.departamento, patente:v.patente, estacionamiento:v.estacionamiento,
            resumen, observacion:extra.observacion ?? v.observacion,
            snapshot:{...v, ...extra}
        };
    }

    let detalleVisitaId = null;
    const fechaInputLocal = iso => {
        const fecha = new Date(iso);
        const local = new Date(fecha.getTime() - fecha.getTimezoneOffset() * 60000);
        return local.toISOString().slice(0, 19);
    };

    function renderizarVisitas() {
        const activas = visitas.filter(v => !v.salida);
        document.getElementById("visitasDentroCount").textContent = activas.length;
        const selector = document.getElementById("visitaEstacionamiento");
        if (selector) {
            const previo = selector.value;
            selector.innerHTML = opcionesVisita(previo);
            if (!plazasVisita.includes(previo) || ocupacionVisitas().has(previo)) selector.value = "";
        }
        const placaInfo = v => {
            const marca = marcasPatente.get(v.patente);
            return marca ? `<small class="nova-plate-alert">Patente ${esc(marca.estado)}: ${esc(marca.nota)}</small>` : "";
        };
        const filaActiva = v => `<div class="nova-row nova-visit nova-visit-summary" data-visita="${v.id}">
            <div class="nova-visit-main"><strong>${txt(v.nombre)}</strong><small>Depto. ${txt(v.departamento)} · Patente ${txt(v.patente)} · ${v.estacionamiento ? `Est. ${txt(v.estacionamiento)}` : "Sin estacionamiento"}</small>${placaInfo(v)}</div>
            <div class="nova-visit-dates"><small>Entrada: ${visible(v.entrada)}</small>${v.inicioParking ? `<small>Salida prevista: ${visible(v.venceParking)}</small>` : ""}<span class="nova-time" data-tiempo-visita="${v.id}"></span></div>
            <button type="button" class="nova-detail-button" data-abrir-detalle="${v.id}">Detalles</button>
        </div>`;
        document.getElementById("visitasDentro").innerHTML = activas.length ? activas.map(filaActiva).join("") : '<p class="nova-empty">No hay visitas dentro.</p>';
        document.getElementById("visitasLista").innerHTML = visitas.length ? visitas.map(v => `<div class="nova-row nova-visit-history"><div><strong>${txt(v.nombre)}</strong><small>Depto. ${txt(v.departamento)} · Patente ${txt(v.patente)} · ${v.estacionamiento ? `Est. ${txt(v.estacionamiento)}` : "Sin estacionamiento"}</small><small>Entrada: ${visible(v.entrada)}${v.salida ? ` · Salida: ${visible(v.salida)}` : " · Dentro"}</small><small>${v.salida && v.inicioParking ? estadoTiempo(v).texto : ""}</small>${v.observacionSalida ? `<small>Observación de salida: ${esc(v.observacionSalida)}</small>` : ""}${placaInfo(v)}</div></div>`).join("") : '<p class="nova-empty">Sin visitas registradas en esta sesión.</p>';
        renderizarParkingVisitas();
        if (detalleVisitaId !== null) pintarDetalleVisita();
        actualizarTiemposVisitas();
    }

    function cerrarDetalleVisita() {
        const modal = document.getElementById("detalleVisitaModal");
        modal.hidden = true;
        document.body.classList.remove("nova-modal-open");
        const id = detalleVisitaId;
        detalleVisitaId = null;
        document.querySelector(`[data-abrir-detalle="${id}"]`)?.focus();
    }

    function abrirDetalleVisita(id) {
        const v = visitas.find(item => item.id === id && !item.salida);
        if (!v) return;
        detalleVisitaId = id;
        pintarDetalleVisita();
        document.getElementById("detalleVisitaModal").hidden = false;
        document.body.classList.add("nova-modal-open");
        document.querySelector(".nova-modal-close")?.focus();
    }

    function pintarDetalleVisita() {
        const v = visitas.find(item => item.id === detalleVisitaId && !item.salida);
        if (!v) { cerrarDetalleVisita(); return; }
        document.getElementById("detalleVisitaTitulo").textContent = `Detalles de ${v.nombre}`;
        const marcaActual = marcasPatente.get(v.patente);
        const permisos = v.permisos.length ? `<div class="nova-permissions"><strong>Permisos especiales</strong>${v.permisos.map(p => `<small>${visible(p.fecha)} · ${p.horas} h · ${esc(p.nota)}${p.excesoAlAutorizar ? ` · Excedido antes del permiso: ${duracion(p.excesoAlAutorizar)}` : ""}</small>`).join("")}</div>` : "";
        document.getElementById("detalleVisitaContenido").innerHTML = `<div class="nova-visit nova-visit-detail">
            <div class="nova-detail-status"><span class="nova-time" data-tiempo-visita="${v.id}"></span>${v.inicioParking ? `<small>Asignado: ${visible(v.inicioParking)} · Límite: ${visible(v.venceParking)}</small>` : ""}</div>
            <form id="detalleVisitaForm" class="nova-form">
                <label>Nombre<input name="nombre" value="${esc(v.nombre)}" required></label>
                <label>Teléfono <span class="nova-phone"><span>+56</span><input name="telefono" type="tel" inputmode="numeric" maxlength="9" pattern="[0-9]{9}" value="${esc(v.telefono.replace(/^\+56/, ""))}" placeholder="9 dígitos"></span></label>
                <label>Patente<input name="patente" value="${esc(v.patente)}"></label>
                <label>Departamento visitado<input name="departamento" value="${esc(v.departamento)}" required></label>
                <label>Persona visitada<input name="personaVisitada" value="${esc(v.personaVisitada)}"></label>
                <label>Fecha y hora de entrada<input name="entrada" type="datetime-local" step="1" value="${fechaInputLocal(v.entrada)}" required></label>
                <label>Estacionamiento de visita<select name="estacionamiento">${opcionesVisita(v.estacionamiento)}</select></label>
                <label>Horas asignadas<input name="horasAsignadas" type="number" min="0.5" step="0.5" value="${v.horasAsignadas ?? 4}"></label>
                <label class="nova-wide">Observación de entrada<textarea name="observacion" rows="2">${esc(v.observacion)}</textarea></label>
                <div class="nova-detail-actions"><button type="submit" class="nova-primary">Guardar y aplicar cambios</button></div>
            </form>
            ${permisos}
            ${v.estacionamiento ? `<div class="nova-detail-section"><h3>Permiso especial</h3><div class="nova-detail-fields"><label>Horas adicionales<input type="number" min="0.5" step="0.5" value="2" data-extension-horas="${v.id}"></label><label>Motivo<textarea rows="2" data-extension-nota="${v.id}"></textarea></label><button type="button" data-extender="${v.id}">Autorizar más tiempo</button></div></div>` : ""}
            <div class="nova-detail-section"><h3>Registrar salida</h3><p>La fecha y hora de salida se guardarán al pulsar el botón.</p><div class="nova-detail-fields"><label>Observación al salir<textarea rows="2" data-salida-observacion="${v.id}"></textarea></label><label>Marca de patente<select data-marca-patente="${v.id}"><option value="">Sin cambios</option><option value="Conflictiva">Conflictiva</option><option value="Vetada">Vetada</option><option value="Quitar">Quitar marca anterior</option></select></label><label>Motivo de la marca<textarea rows="2" data-marca-nota="${v.id}"></textarea></label></div>${marcaActual ? `<p class="nova-plate-alert">Marca actual: ${esc(marcaActual.estado)} · ${esc(marcaActual.nota)}</p>` : ""}<button type="button" class="nova-exit-button" data-salida="${v.id}">Registrar salida ahora</button></div>
        </div>`;
        actualizarTiemposVisitas();
    }

    function actualizarAlertaPatente() {
        const patente = normalizarPatente(document.querySelector('#visitaForm [name="patente"]')?.value || "");
        const marca = marcasPatente.get(patente);
        document.getElementById("alertaPatenteVisita").textContent = marca ? `Patente ${marca.estado}: ${marca.nota}` : "";
    }

    document.addEventListener("input", event => {
        const campo = event.target;
        if (!(campo instanceof HTMLInputElement)) return;
        if (campo.name === "telefono" && campo.closest("#visitaForm, #detalleVisitaForm")) {
            campo.value = campo.value.replace(/\D/g, "").slice(0, 9);
            campo.setCustomValidity(campo.value && campo.value.length !== 9 ? "Ingresa 9 dígitos después de +56." : "");
            return;
        }
        if (["text", "search", ""].includes(campo.type) && !/observacion/i.test(campo.name || campo.id)) {
            campo.value = campo.value.toLocaleUpperCase("es-CL");
        }
        if (campo.name === "patente" && campo.closest("#visitaForm")) actualizarAlertaPatente();
    });
    document.getElementById("visitaEstacionamiento")?.addEventListener("change", actualizarTiemposVisitas);
    document.getElementById("visitaHoras")?.addEventListener("input", actualizarTiemposVisitas);

    document.getElementById("visitaForm")?.addEventListener("submit", event => {
        event.preventDefault();
        const form = event.currentTarget;
        const f = new FormData(form);
        const telefono = String(f.get("telefono") || "").replace(/\D/g, "");
        if (telefono && telefono.length !== 9) {form.querySelector('[name="telefono"]').reportValidity();return;}
        const estacionamiento = String(f.get("estacionamiento") || "");
        const horas = Number(f.get("horas"));
        if (estacionamiento && (!Number.isFinite(horas) || horas < 0.5)) {alert("Indica al menos media hora de uso.");return;}
        if (estacionamiento && (!plazasVisita.includes(estacionamiento) || ocupacionVisitas().has(estacionamiento))) {alert("Ese estacionamiento de visita está ocupado.");renderizarVisitas();return;}
        const ahora = new Date();
        const v = {
            id:++secuenciaVisita, nombre:String(f.get("nombre") || "").trim(),
            telefono:telefono ? `+56${telefono}` : "", patente:normalizarPatente(String(f.get("patente") || "")),
            departamento:String(f.get("departamento") || "").trim(), personaVisitada:String(f.get("personaVisitada") || "").trim(),
            estacionamiento, observacion:String(f.get("observacion") || "").trim(),
            entrada:ahora.toISOString(), salida:null, horasAsignadas:estacionamiento ? horas : null,
            inicioParking:estacionamiento ? ahora.toISOString() : null,
            venceParking:estacionamiento ? new Date(ahora.getTime() + horas * horasMs).toISOString() : null,
            permisos:[], observacionSalida:""
        };
        if (!v.nombre || !v.departamento) return;
        visitas.unshift(v);
        agregarEvento(datosEventoVisita(v, "Entrada", `Visita a ${v.personaVisitada || `Depto. ${v.departamento}`}${estacionamiento ? ` · ${estacionamiento} por ${horas} h` : ""}`));
        form.reset();
        form.querySelector('[name="telefono"]').setCustomValidity("");
        actualizarAlertaPatente();
        renderizarVisitas();
    });

    document.getElementById("sectionVisitas")?.addEventListener("submit", event => {
        if (event.target.id !== "detalleVisitaForm") return;
        event.preventDefault();
        const v = visitas.find(item => item.id === detalleVisitaId && !item.salida);
        if (!v) return;
        const f = new FormData(event.target);
        const telefono = String(f.get("telefono") || "").replace(/\D/g, "");
        if (telefono && telefono.length !== 9) {alert("El teléfono debe tener 9 dígitos después de +56.");return;}
        const plaza = String(f.get("estacionamiento") || "");
        if (plaza && (!plazasVisita.includes(plaza) || (plaza !== v.estacionamiento && ocupacionVisitas().has(plaza)))) {alert("Ese estacionamiento está ocupado.");return;}
        const horas = Number(f.get("horasAsignadas"));
        if (plaza && (!Number.isFinite(horas) || horas < 0.5)) {alert("Indica al menos media hora de uso.");return;}
        const entrada = new Date(String(f.get("entrada") || ""));
        if (Number.isNaN(entrada.getTime())) {alert("Revisa la fecha de entrada.");return;}
        const anterior = JSON.parse(JSON.stringify(v));
        const campos = {
            nombre:String(f.get("nombre") || "").trim().toLocaleUpperCase("es-CL"),
            telefono:telefono ? `+56${telefono}` : "",
            patente:normalizarPatente(String(f.get("patente") || "")),
            departamento:String(f.get("departamento") || "").trim().toLocaleUpperCase("es-CL"),
            personaVisitada:String(f.get("personaVisitada") || "").trim().toLocaleUpperCase("es-CL"),
            entrada:fechaInputLocal(v.entrada) === String(f.get("entrada") || "") ? v.entrada : entrada.toISOString(),
            observacion:String(f.get("observacion") || "").trim()
        };
        if (!campos.nombre || !campos.departamento) {alert("Nombre y departamento son obligatorios.");return;}
        Object.assign(v,campos);
        const plazaCambio = plaza !== anterior.estacionamiento;
        const horasCambio = plaza && horas !== anterior.horasAsignadas;
        if (plazaCambio) {
            v.estacionamiento = plaza;
            v.permisos = [];
            v.horasAsignadas = plaza ? horas : null;
            v.inicioParking = plaza ? new Date().toISOString() : null;
            v.venceParking = plaza ? new Date(Date.parse(v.inicioParking) + horas * horasMs).toISOString() : null;
        } else if (plaza) {
            if (anterior.inicioParking === anterior.entrada && anterior.entrada !== v.entrada) v.inicioParking = v.entrada;
            v.horasAsignadas = horas;
            const adicionales = v.permisos.reduce((suma,p) => suma + Number(p.horas),0);
            v.venceParking = new Date(Date.parse(v.inicioParking) + (horas + adicionales) * horasMs).toISOString();
        }
        const datosCambiaron = Object.keys(campos).some(k => anterior[k] !== v[k]);
        if (datosCambiaron) agregarEvento(datosEventoVisita(v,"Modificación de visita",`Datos de ${v.nombre} actualizados`,{estadoAnterior:anterior}));
        if (plazaCambio) agregarEvento(datosEventoVisita(v,"Cambio de estacionamiento",`${anterior.estacionamiento || "Sin estacionamiento"} → ${plaza || "Sin estacionamiento"}${plaza ? ` · ${horas} h` : ""}`,{estacionamientoAnterior:anterior.estacionamiento,estadoAnterior:anterior}));
        else if (horasCambio) agregarEvento(datosEventoVisita(v,"Cambio de plazo",`${anterior.horasAsignadas} h → ${horas} h`,{horasAnteriores:anterior.horasAsignadas,venceAnterior:anterior.venceParking}));
        renderizarVisitas();
    });

    document.getElementById("sectionVisitas")?.addEventListener("click", event => {
        const abrir = event.target.closest("[data-abrir-detalle]");
        if (abrir) {abrirDetalleVisita(Number(abrir.dataset.abrirDetalle));return;}
        if (event.target.closest("[data-cerrar-detalle]")) {cerrarDetalleVisita();return;}
        const extension = event.target.closest("[data-extender]");
        if (extension) {
            const v = visitas.find(item => item.id === Number(extension.dataset.extender));
            if (!v || v.salida || !v.estacionamiento) return;
            const card = extension.closest(".nova-visit");
            const horas = Number(card.querySelector("[data-extension-horas]").value);
            const nota = card.querySelector("[data-extension-nota]").value.trim();
            if (!Number.isFinite(horas) || horas < 0.5 || !nota) {alert("Indica las horas adicionales y el motivo del permiso especial.");return;}
            const anterior = v.venceParking;
            v.venceParking = new Date(Date.parse(v.venceParking) + horas * horasMs).toISOString();
            const excesoAlAutorizar = Math.max(0, Date.now() - Date.parse(anterior));
            v.permisos.push({fecha:new Date().toISOString(),horas,nota,venceAnterior:anterior,venceNuevo:v.venceParking,excesoAlAutorizar});
            agregarEvento(datosEventoVisita(v, "Permiso especial", `${horas} h adicionales para ${v.estacionamiento}; nuevo límite ${visible(v.venceParking)}`, {observacion:nota,horasAdicionales:horas,venceAnterior:anterior}));
            renderizarVisitas();
            return;
        }
        const salida = event.target.closest("[data-salida]");
        if (!salida) return;
        const v = visitas.find(item => item.id === Number(salida.dataset.salida));
        if (!v || v.salida) return;
        const card = salida.closest(".nova-visit");
        const observacion = card.querySelector("[data-salida-observacion]").value.trim();
        const marca = card.querySelector("[data-marca-patente]").value;
        const notaMarca = card.querySelector("[data-marca-nota]").value.trim();
        if ((marca === "Conflictiva" || marca === "Vetada") && !v.patente) {alert("Ingresa una patente antes de marcarla.");return;}
        if ((marca === "Conflictiva" || marca === "Vetada") && !notaMarca) {alert("Escribe el motivo de la marca de patente.");return;}
        if (marca === "Quitar" && !v.patente) {alert("Esta visita no tiene patente.");return;}
        v.salida = new Date().toISOString();
        v.observacionSalida = observacion;
        const tiempo = estadoTiempo(v);
        agregarEvento(datosEventoVisita(v, "Salida", `Salida de Depto. ${v.departamento} · ${tiempo.texto}`, {observacion,tiempoUso:tiempo.texto,permisos:[...v.permisos]}));
        if (marca === "Conflictiva" || marca === "Vetada") {
            marcasPatente.set(v.patente,{estado:marca,nota:notaMarca,fecha:v.salida});
            agregarEvento(datosEventoVisita(v, "Alerta de patente", `Patente ${v.patente} marcada como ${marca}`, {observacion:notaMarca,marca}));
        } else if (marca === "Quitar" && marcasPatente.has(v.patente)) {
            const anterior = marcasPatente.get(v.patente);
            marcasPatente.delete(v.patente);
            agregarEvento(datosEventoVisita(v, "Retiro de alerta", `Se quitó la marca de ${v.patente}`, {observacion:notaMarca,marcaAnterior:anterior}));
        }
        renderizarVisitas();
    });
    document.addEventListener("keydown", event => {if (event.key === "Escape" && detalleVisitaId !== null) cerrarDetalleVisita();});
    setInterval(actualizarTiemposVisitas, 1000);
    // Encomiendas: ingreso, entrega, historial y consulta en vistas separadas.
    let pestanaEncomienda = "ingreso";

    function mostrarPestanaEncomienda(nombre) {
        const permitidas = ["ingreso", "entrega", "historial", "busqueda"];
        if (!permitidas.includes(nombre)) return;
        pestanaEncomienda = nombre;
        document.querySelectorAll("[data-encomienda-tab]").forEach(boton => {
            const activa = boton.dataset.encomiendaTab === nombre;
            boton.classList.toggle("active", activa);
            boton.setAttribute("aria-selected", String(activa));
        });
        const ids = {ingreso:"panelEncomiendaIngreso",entrega:"panelEncomiendaEntrega",historial:"panelEncomiendaHistorial",busqueda:"panelEncomiendaBusqueda"};
        Object.entries(ids).forEach(([clave,id]) => {document.getElementById(id).hidden = clave !== nombre;});
        if (nombre === "busqueda") renderizarBusquedaEncomiendas();
    }

    function fechaLocalClave(iso) {
        const fecha = new Date(iso);
        return `${fecha.getFullYear()}-${String(fecha.getMonth()+1).padStart(2,"0")}-${String(fecha.getDate()).padStart(2,"0")}`;
    }

    function filaEncomienda(e, conEntrega = false) {
        return `<div class="nova-row nova-package ${e.estado === "Pendiente" ? "pending" : ""}">
            <div><strong>${txt(e.destinatario)} · Depto. ${txt(e.departamento)}</strong>
                <small>${txt(e.descripcion)} · <span class="nova-package-state ${e.estado === "Pendiente" ? "pending" : "delivered"}">${txt(e.estado)}</span></small>
                <small>Recibida: ${visible(e.recepcion)} · Por ${txt(e.recibidoPor)}</small>
                ${e.observacion ? `<small>Observación de ingreso: ${esc(e.observacion)}</small>` : ""}
                ${e.entrega ? `<small>Entregada: ${visible(e.entrega)}</small>` : ""}
                ${e.observacionEntrega ? `<small>Observación de entrega: ${esc(e.observacionEntrega)}</small>` : ""}
            </div>
            ${conEntrega && e.estado === "Pendiente" ? `<div class="nova-package-delivery"><label>Observación de entrega<textarea rows="2" data-observacion-entrega="${e.id}" placeholder="Opcional"></textarea></label><button type="button" data-entregar="${e.id}">Marcar entregada</button></div>` : ""}
        </div>`;
    }

    function renderizarBusquedaEncomiendas() {
        const resultado = document.getElementById("encomiendasResultados");
        if (!resultado) return;
        const texto = (document.getElementById("buscarEncomiendaTexto")?.value || "").trim().toLocaleUpperCase("es-CL");
        const depto = (document.getElementById("buscarEncomiendaDepto")?.value || "").trim().toLocaleUpperCase("es-CL");
        const estado = document.getElementById("buscarEncomiendaEstado")?.value || "todos";
        const receptor = (document.getElementById("buscarEncomiendaReceptor")?.value || "").trim().toLocaleUpperCase("es-CL");
        const desde = document.getElementById("buscarEncomiendaDesde")?.value || "";
        const hasta = document.getElementById("buscarEncomiendaHasta")?.value || "";
        const filtradas = encomiendas.filter(e => {
            const fecha = fechaLocalClave(e.recepcion);
            const contenido = [e.destinatario,e.descripcion,e.observacion,e.observacionEntrega,e.departamento].join(" ").toLocaleUpperCase("es-CL");
            return contenido.includes(texto) && e.departamento.toLocaleUpperCase("es-CL").includes(depto) &&
                (estado === "todos" || e.estado === estado) && e.recibidoPor.toLocaleUpperCase("es-CL").includes(receptor) &&
                (!desde || fecha >= desde) && (!hasta || fecha <= hasta);
        });
        document.getElementById("encomiendasResultadosCount").textContent = `${filtradas.length} resultado${filtradas.length === 1 ? "" : "s"}`;
        resultado.innerHTML = filtradas.length ? filtradas.map(e => filaEncomienda(e)).join("") : '<p class="nova-empty">No hay encomiendas que coincidan con los filtros.</p>';
    }

    function renderizarEncomiendas() {
        const pendientes = encomiendas.filter(e => e.estado === "Pendiente");
        document.getElementById("encomiendasPendientesCount").textContent = pendientes.length;
        document.getElementById("encomiendasPendientes").innerHTML = pendientes.length ? pendientes.map(e => filaEncomienda(e,true)).join("") : '<p class="nova-empty">No hay encomiendas pendientes.</p>';
        document.getElementById("encomiendasHistorial").innerHTML = encomiendas.length ? encomiendas.map(e => filaEncomienda(e)).join("") : '<p class="nova-empty">Sin encomiendas registradas en esta sesión.</p>';
        renderizarBusquedaEncomiendas();
    }

    document.getElementById("sectionEncomiendas")?.addEventListener("click", event => {
        const tab = event.target.closest("[data-encomienda-tab]");
        if (tab) {mostrarPestanaEncomienda(tab.dataset.encomiendaTab);return;}
        if (event.target.closest("#limpiarBusquedaEncomiendas")) {
            document.querySelectorAll("#filtrosEncomiendas input").forEach(input => {input.value = "";});
            document.getElementById("buscarEncomiendaEstado").value = "todos";
            renderizarBusquedaEncomiendas();
            return;
        }
        const boton = event.target.closest("[data-entregar]");
        if (!boton) return;
        const e = encomiendas.find(item => item.id === Number(boton.dataset.entregar));
        if (!e || e.estado !== "Pendiente") return;
        const observacion = boton.closest(".nova-package-delivery").querySelector("[data-observacion-entrega]").value.trim();
        e.estado = "Entregada";
        e.entrega = new Date().toISOString();
        e.observacionEntrega = observacion;
        agregarEvento({categoria:"Encomiendas",movimiento:"Entrega",persona:e.destinatario,departamento:e.departamento,resumen:e.descripcion,observacion,snapshot:{...e}});
        renderizarEncomiendas();
    });

    document.getElementById("encomiendaForm")?.addEventListener("submit", event => {
        event.preventDefault();
        const f = new FormData(event.currentTarget);
        const e = {
            id:++secuenciaEncomienda, departamento:String(f.get("departamento") || "").trim(),
            destinatario:String(f.get("destinatario") || "").trim(), descripcion:String(f.get("descripcion") || "").trim(),
            recibidoPor:String(f.get("recibidoPor") || "").trim(), observacion:String(f.get("observacion") || "").trim(),
            recepcion:new Date().toISOString(), estado:"Pendiente", entrega:null, observacionEntrega:""
        };
        if (!e.departamento || !e.destinatario || !e.descripcion || !e.recibidoPor) return;
        encomiendas.unshift(e);
        agregarEvento({categoria:"Encomiendas",movimiento:"Recepción",persona:e.destinatario,departamento:e.departamento,resumen:e.descripcion,observacion:e.observacion,snapshot:{...e}});
        event.currentTarget.reset();
        renderizarEncomiendas();
    });
    document.getElementById("filtrosEncomiendas")?.addEventListener("input", renderizarBusquedaEncomiendas);
    document.getElementById("buscarEncomiendaEstado")?.addEventListener("change", renderizarBusquedaEncomiendas);
    mostrarPestanaEncomienda(pestanaEncomienda);

    function renderizarDashboard(){const panel=document.getElementById("dashboardStats");if(!panel)return;const asignados=estacionamientos.filter(e=>e.condicion==="propietario").length;const arrendados=estacionamientos.filter(e=>e.condicion==="arrendado").length;const visitaV=[...ocupacionVisitas()].filter(e=>/^V[1-5]$/.test(e)).length;panel.innerHTML=[stat("Departamentos registrados",new Set(residentes.map(r=>r.departamento)).size),stat("Residentes",residentes.length),stat("Estacionamientos asignados",asignados),stat("Estacionamientos arrendados",arrendados),stat("Estacionamientos disponibles",TOTAL_ESTACIONAMIENTOS-asignados-arrendados),stat("Visitas dentro",visitas.filter(v=>!v.salida).length),stat("V1–V5 ocupados",visitaV),stat("V1–V5 disponibles",5-visitaV),stat("Encomiendas pendientes",encomiendas.filter(e=>e.estado==="Pendiente").length)].join("");document.getElementById("dashboardActivity").innerHTML=historialMovimientos.length?historialMovimientos.slice(0,5).map(e=>`<div class="nova-row"><div><strong>${txt(e.movimiento)}</strong><small>${txt(e.categoria)} · ${txt(e.resumen)} · ${txt(e.fecha)} ${txt(e.hora)}</small></div></div>`).join(""):'<p class="nova-empty">Aún no hay movimientos en esta sesión.</p>';}
    function renderizarReportes(){const panel=document.getElementById("reportesStats");if(!panel)return;const eventos=eventosFiltrados(document.getElementById("reporteDesde")?.value,document.getElementById("reporteHasta")?.value);const contar=(categoria,movimiento)=>eventos.filter(e=>e.categoria===categoria&&(!movimiento||e.movimiento===movimiento)).length;const plazas=new Set(eventos.filter(e=>e.categoria==="Estacionamientos").map(e=>e.estacionamiento).filter(Boolean));panel.innerHTML=[stat("Entradas de visitas",contar("Visitas","Entrada")),stat("Estacionamientos con movimientos",plazas.size),stat("Movimientos de estacionamiento",contar("Estacionamientos")),stat("Encomiendas recibidas",contar("Encomiendas","Recepción")),stat("Encomiendas entregadas",contar("Encomiendas","Entrega")),stat("Encomiendas pendientes ahora",encomiendas.filter(e=>e.estado==="Pendiente").length)].join("");document.getElementById("reportesCategorias").innerHTML=categoriasRegistro.slice(1).map(c=>`<div class="nova-row"><strong>${c}</strong><span>${contar(c)} movimientos</span></div>`).join("");}
    ["reporteDesde","reporteHasta"].forEach(id=>document.getElementById(id)?.addEventListener("input",renderizarReportes));
    renderizarVisitas();renderizarEncomiendas();renderizarHistorial();renderizarDashboard();renderizarReportes();

    // =====================================================
    // INICIO
    // =====================================================

    renderizarEstacionamientos();

    actualizarResumenResidentes();

});
