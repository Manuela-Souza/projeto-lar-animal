document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('formulario-contato');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const telefone = document.getElementById('telefone').value;
        const motivo = document.getElementById('motivo').value;

        const novoContato = {
            nome,
            email,
            telefone,
            motivo
        };

        fetch('http://localhost:3333/contato', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoContato)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Contato enviado com sucesso:', data);
            

            form.reset();

          
            alert('Contato enviado com sucesso!');
        })
        .catch(error => {
            console.error('Erro ao enviar o contato:', error);

          
            alert('Erro ao enviar o contato. Tente novamente mais tarde.');
        });
        })

});

