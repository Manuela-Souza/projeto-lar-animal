document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('formulario-doacao');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const nome = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const valor = document.getElementById('amount').value;

        const novaDoacao = {
            nome,
            email,
            valor
        };

        fetch('http://localhost:3333/doacoes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novaDoacao)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Doação realizada com sucesso:', data);

            form.reset();
            alert('Doação realizada com sucesso!');
        })
        .catch(error => {
            console.error('Erro ao fazer a doação:', error);
            alert('Erro ao fazer a doação. Tente novamente mais tarde.');
        });
    });
});