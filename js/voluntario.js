document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.form-container form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const nome = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const telefone = document.getElementById('phone').value;
        const interesses = document.getElementById('interests').value;

        const novoVoluntario = {
            nome,
            email,
            telefone,
            interesses
        };

        // Simulação do envio dos dados para um servidor (fetch)
        fetch('http://localhost:3333/voluntarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoVoluntario)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Cadastro de voluntário realizado com sucesso:', data);

            // Limpa o formulário após o cadastro ser realizado com sucesso
            form.reset();
            alert('Cadastro de voluntário realizado com sucesso!');
        })
        .catch(error => {
            console.error('Erro ao cadastrar voluntário:', error);
            alert('Erro ao cadastrar voluntário. Tente novamente mais tarde.');
        });
    });
});
