tareas();
//crear tareas
function tareas() {
    fetch('/drive/usuario',
        {
            method: 'GET'
        }).then(res => res.json())
        .then(data => {
            let filas = "";
            data.forEach(element => {
                //console.log(element);
            if(element.tipoUsuario == "Normal"){
                filas = filas + `<tr>
                <td>${element.nombres}</td>
                <td>${element.apellidos}</td>
                <td>${element.correo}</td>
                <td>${element.tipoUsuario}</td>
                <td>${element.capacidad}</td>
                <td>
                    <a class="waves-effect waves-light update btn modal-trigger" href="#modal2">Capacidad - Modificar</a>
                </td>
                </tr>`
            }
            });
            document.querySelector("#filas").innerHTML = filas;
            //agregando los eventos para actualizar 
            /*let btn_update = document.querySelectorAll('.update');
            btn_update.forEach(item => {
                item.addEventListener("click", function (e) {
                    e.preventDefault();
                    fetch("/drive/", {
                        method: "GET"
                    }).then(res => res.json())
                        .catch(err => console.error(err))
                        .then(response => {
                            document.forms.formUpdate._id.value = response._id;
                            document.forms.formUpdate.userU.value = response.userName;
                            document.forms.formUpdate.rolU.value = response.rol;
                        });
                });
            });*/
        })
}