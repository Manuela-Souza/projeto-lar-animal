//URL DA API DE DADOS
URL = 'http://localhost:3333/posts'
let ULL = "http://localhost:3333/comentarios"
//============================================================================================================
//POST - Criar um novo post ou comentário
let enviarConte = document.getElementById("enviar-content")
let comentario = document.getElementById("enviar-newComente")
comentario.addEventListener("click", novoComent)
enviarConte.addEventListener("click", novodado)
function novoComent() {
    let newcComent = document.getElementById("post-content").value;
    let num = Math.random(40)
    let coment = {
        id: num,
        content: newcComent
    }
    fetch(ULL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(coment)
    })
        .then(response => response.json())
        .then(data => console.log(data))



}
function novodado() {
    let comennte = document.getElementById("comment-content").value;
    alert("Entrou função " + comennte)
    let num = Math.random(40)
    alert(num)
    let newComent = {
        id: num,
        title: comennte,
        comments: "Entrei pela primeira vez"
    }
    alert(newComent)
    fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newComent)
    })
        .then(response => response.json())
        .then(data => console.log(data))

}
//===========================================================================================================
//DELETE - excluir um post ou comentário
const comennteDelete = document.getElementById('btn-deletar');
comennteDelete.addEventListener('click', (e) => {
    let id = $('id');
    fetch(`${ULL}/${id}`, {
        method: 'DELETE',
    })
        .then(RES => resizeBy.json())
        .then(() => location.reload());
})
//====================================================================================================================================
// PUT - Editar um comentário ou post
let editConte = document.getElementById("edit-comentario")
let comenta = document.getElementById("enviar-editComente")
comentario.addEventListener("click", novoComent)
enviarConte.addEventListener("click", novodado)
function novoComent() {
    let newcComent = document.getElementById("post-content").value;
    let num = Math.random(40)
    let coment = {
        id: num,
        content: newcComent
    }
    fetch(ULL, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(coment)
    })
        .then(response => response.json())
        .then(data => console.log(data))



}
function novodado() {
    let comennte = document.getElementById("comment-content").value;
    alert("Entrou função " + comennte)
    let num = Math.random(40)
    alert(num)
    let newComent = {
        id: num,
        title: comennte,
        comments: "Entrei pela primeira vez"
    }
    alert(newComent)
    fetch(URL, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newComent)
    })
        .then(response => response.json())
        .then(data => console.log(data))

}
//=================================================================================
//GET - recupera os dados 
fetch(URL)
    .then(res => res.json())
    .then(threads => {
        let posts_respostas = '';
        for (let i = 0; i < threads.length; i++) {
            posts_respostas += `
             <div class="thread">
                <h3>${threads[i].post - title}</h3>
                  <div class="respostas">
                       <p>${posts[i].comment - content}</p>
                         <hr>
                  </div>
              </div>
              `;
            postsList.innerHTML = posts_respostas;
        }
    }
    );
    //========================================================================
