$(document).ready(function () {
    $('#cep').on('blur', function () {
        var cep = $(this).val().replace(/\D/g, '');

        if (cep.length != 8) {
            alert('CEP inválido.');
            return;
        }

        $.getJSON('https://viacep.com.br/ws/' + cep + '/json/', function (data) {
            if (!('erro' in data)) {
                $('#estado').val(data.uf);
                $('#cidade').val(data.localidade);
                $('#bairro').val(data.bairro);
                $('#logradouro').val(data.logradouro);
            } else {
                alert('CEP não encontrado.');
            }
        });
    });
});