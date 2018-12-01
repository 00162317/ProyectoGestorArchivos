//formulario para actualizar
document.forms.frmUpdate.addEventListener("submit", function (e) {
    e.preventDefault();
    var data = {};
    if(modificar == 0){
        data = {
            nombres: document.forms.frmUpdate.name.value,
            apellidos: document.forms.frmUpdate.last.value,
            numTarjeta: ""
        }
    } else if(modificar == 1){
        data = {
            nombres: document.forms.frmUpdate.name.value,
            apellidos: document.forms.frmUpdate.last.value,
            numTarjeta: document.forms.frmUpdate.numT.value,
            codSeguridad: document.forms.frmUpdate.codT.value,
            fechaVencimiento: document.forms.frmUpdate.fechaT.value,
            tipoPago: document.forms.frmUpdate.group2.value
        }
    }
    //peticion
    fetch('/drive/'+document.forms.frmUpdate.id.value, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(response => {
            alert("Perfil modificado con exito!!");
        })
        .catch(err => {
            alert("Por favor revise los datos ingresados!!");
            console.log(err);
        });
});

window.onload = () => {
    app.init();
}

let app = {
    init: function () {
        this.mostrararchivos();
    },
    mostrararchivos: function(){
        fetch("/drive", {
            method: "GET"
        }).then(res => res.json())
            .then(data => {
                var user = document.getElementById('email_usuario').innerText;
                var tbody = document.getElementById("fil");
                console.log(data.files);
                console.log(user);
                for(let i = 0; i < data.files.length; i++){
                    if (data.files[i].dueño == user){
                        var respond = {
                            id: data.files[i]._id
                        };
                        var tr = document.createElement("tr");
                        var th5 = document.createElement('th');
                        th5.innerHTML = `<a href="/" class="delete"> Delete </a> `
                        var th1 = document.createElement('th');
                        var th2 = document.createElement('th');
                        var th3 = document.createElement('th');
                        var th4 = document.createElement('th');
                        if (data.files[i].tipoArchivo == 'png' || data.files[i].tipoArchivo == 'jpg' || data.files[i].tipoArchivo == 'jpeg'){
                            th1.innerHTML = `<img src="almacenamiento/${data.files[i].file}", alt="Image", style='height: 5em; margin-left: 2em>`;
                            th2.innerText = data.files[i].tipoArchivo;
                            th3.innerText = data.files[i].size + 'MB';
                            th4.innerHTML = `<div><p>${data.files[i].originalName}</p><a href='almacenamiento/'+${data.files[i].dueño}+'/'+${data.files[i].file}, download=${data.files[i].originalName}>Descargar</a></div>`
                            tr.appendChild(th1);
                            tr.appendChild(th2);
                            tr.appendChild(th3);
                            tr.appendChild(th4);
                            tr.appendChild(th5);
                        }
                        if(data.files[i].tipoArchivo == 'pdf'){
                            th1.innerHTML= `<img src="./public/img/pdf.png", alt="pdf", style='height: 5em; margin-left: 2em>`;
                            th2.innerText = data.files[i].tipoArchivo;
                            th3.innerText = data.files[i].size + 'MB';
                            th4.innerHTML = `<div><p>${data.files[i].originalName}</p><a href='../almacenamiento/'+${data.files[i].dueño}+'/'+${data.files[i].file}, download=${data.files[i].originalName}>Descargar</a></div>`
                            tr.appendChild(th1);
                            tr.appendChild(th2);
                            tr.appendChild(th3);
                            tr.appendChild(th4);
                            tr.appendChild(th5);

                        }
                        if(data.files[i].tipoArchivo == 'mp4'){
                            th1.innerHTML= `<img src="./public/img/mp4.png", alt="mp4", style='height: 5em; margin-left: 2em>`;
                            th2.innerText = data.files[i].tipoArchivo;
                            th3.innerText = data.files[i].size + 'MB';
                            th4.innerHTML = `<div><p>${data.files[i].originalName}</p><a href='./public/almacenamiento/'+${data.files[i].dueño}+'/'+${data.files[i].file}, download=${data.files[i].originalName}>Descargar</a></div>`
                            tr.appendChild(th1);
                            tr.appendChild(th2);
                            tr.appendChild(th3);
                            tr.appendChild(th4);
                            tr.appendChild(th5);

                        }
                        if(data.files[i].tipoArchivo == 'mp3'){
                            th1.innerHTML= `<img src="./public/img/mp3.png", alt="mp3", style='height: 5em; margin-left: 2em>`;
                            th2.innerText = data.files[i].tipoArchivo;
                            th3.innerText = data.files[i].size + 'MB';
                            th4.innerHTML = `<div><p>${data.files[i].originalName}</p><a href='./public/almacenamiento/'+${data.files[i].dueño}+'/'+${data.files[i].file}, download=${data.files[i].originalName}>Descargar</a></div>`
                            tr.appendChild(th1);
                            tr.appendChild(th2);
                            tr.appendChild(th3);
                            tr.appendChild(th4);
                            tr.appendChild(th5);

                        }
                        if(data.files[i].tipoArchivo == 'docx' || data.files[i].tipoArchivo == 'doc'){
                            th1.innerHTML= `<img src="./public/img/docx.png", alt="docx", style='height: 5em; margin-left: 2em>`;
                            th2.innerText = data.files[i].tipoArchivo;
                            th3.innerText = data.files[i].size + 'MB';
                            th4.innerHTML = `<div><p>${data.files[i].originalName}</p><a href='./public/almacenamiento/'+${data.files[i].dueño}+'/'+${data.files[i].file}, download=${data.files[i].originalName}>Descargar</a></div>`
                            tr.appendChild(th1);
                            tr.appendChild(th2);
                            tr.appendChild(th3);
                            tr.appendChild(th4);
                            tr.appendChild(th5);

                        }
                        if(data.files[i].tipoArchivo == 'xlsx' || data.files[i].tipoArchivo == 'xls' || data.files[i].tipoArchivo == 'csv' || data.files[i].tipoArchivo == 'xml'){
                            th1.innerHTML= `<img src="./public/img/excel.png", alt="excel", style='height: 5em; margin-left: 2em>`;
                            th2.innerText = data.files[i].tipoArchivo;
                            th3.innerText = data.files[i].size + 'MB';
                            th4.innerHTML = `<div><p>${data.files[i].originalName}</p><a href='./public/almacenamiento/'+${data.files[i].dueño}+'/'+${data.files[i].file}, download=${data.files[i].originalName}>Descargar</a></div>`
                            tr.appendChild(th1);
                            tr.appendChild(th2);
                            tr.appendChild(th3);
                            tr.appendChild(th4);
                            tr.appendChild(th5);

                        } else{
                            th1.innerHTML = `<img src="./public/img/archivo.png", alt="indefenido", style='height: 5em; margin-left: 2em>`;
                            th2.innerText = data.files[i].tipoArchivo;
                            th3.innerText = data.files[i].size + 'MB';
                            th4.innerHTML = `<div><p>${data.files[i].originalName}</p><a href='./public/almacenamiento/'+${data.files[i].dueño}+'/'+${data.files[i].file}, download=${data.files[i].originalName}>Descargar</a></div>`
                            tr.appendChild(th1);
                            tr.appendChild(th2);
                            tr.appendChild(th3);
                            tr.appendChild(th4);
                            tr.appendChild(th5);
                   
                        }
                        tbody.appendChild(tr);
                    }
                    document.querySelectorAll('.delete').forEach((item)=>{
                        item.addEventListener('click', (event) => {
                            this.deleteFile(event, respond, tr, tbody);
                        })
                    })
                }
            });
        },
        
    deleteFile: (event, data, tr, tbody) => {
        event.preventDefault();
        fetch('/drive/' + data.id, {
                method: 'DELETE'
            }).then(res => res.json())
            .then(res => {
                if (res.ok) {
                    console.log(tr);
                    console.log(tbody);
                    tbody.removeChild(tr);
                }
            })
    },
}
