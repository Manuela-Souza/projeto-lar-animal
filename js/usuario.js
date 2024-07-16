$(document).ready(function () {

    const baseUrl = "http://localhost:3333/usuario";

    function getDadosUsuario(tipo) {
        const usuario = {
            nome: $('input[name="nome"]').val(),
            email: $('input[name="email"]').val(),
            senha: $('input[name="senha"]').val(),
            documento: $('input[name="documento"]').val(),
            cep: $('input[name="cep"]').val(),
            estado: $('input[name="estado"]').val(),
            cidade: $('input[name="cidade"]').val(),
            bairro: $('input[name="bairro"]').val(),
            logradouro: $('input[name="logradouro"]').val(),
            numero: $('input[name="numero"]').val(),
            telefone: $('input[name="telefone"]').val(),
            tipo: tipo //PF ou PJ
        };

        return usuario;
    }

    function salvarDadosUsuario(usuario) {
        $.post({
            url: baseUrl,
            data: usuario,
            success: function (response) {
                console.log("POST request successful:", response);
                window.location.href = "login.html";
            },
            error: function (error) {
                window.alert("Erro ao cadastrar usuário");
            }
        })
    }

    $('#btn-cadastro-pf').on('click', function (e) {
        e.preventDefault();
        const usuario = getDadosUsuario('PF');
        salvarDadosUsuario(usuario)
    });

    $('#btn-cadastro-pj').on('click', function (e) {
        e.preventDefault();
        
        e.preventDefault();
        const usuario = getDadosUsuario('PJ');
        usuario.tipoEstabelecimento = $('select[name="tipo"]').val();
        console.log(usuario.tipoEstabelecimento)
        salvarDadosUsuario(usuario)
    });
});