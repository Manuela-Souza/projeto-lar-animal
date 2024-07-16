document.addEventListener('DOMContentLoaded', function () {
    const submitBtn = document.getElementById('submitBtn');
    const stars = document.querySelectorAll('.star');
    const commentInput = document.getElementById('comment');
    const usernameInput = document.getElementById('username');
    const commentsDiv = document.getElementById('comments');

    stars.forEach((star, index) => {
        star.addEventListener('click', () => {
            const rating = star.getAttribute('data-rating');
            stars.forEach((s, i) => {
                if (i < rating) {
                    s.classList.add('rated');
                } else {
                    s.classList.remove('rated');
                }
            });
        });
    });

    submitBtn.addEventListener('click', (event) => {
        event.preventDefault(); // Impede o comportamento padrão do formulário

        const ratedStars = document.querySelectorAll('.star.rated');
        const comment = commentInput.value;
        const username = usernameInput.value;

        if (ratedStars.length > 0 && comment && username) {
            const commentElement = document.createElement('div');
            commentElement.innerHTML = `<strong>Nome do usuário:</strong> ${username}<br><strong>Avaliação:</strong> ${ratedStars.length} estrela(s)<br><strong>Comentário:</strong> ${comment}`;
            commentsDiv.appendChild(commentElement);

            const novaAvaliacao = {
                username,
                rating: ratedStars.length,
                comment
            };

            fetch('http://localhost:3333/avaliacoes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(novaAvaliacao)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Avaliação realizada com sucesso:', data);

                stars.forEach(star => star.classList.remove('rated'));
                commentInput.value = '';
                usernameInput.value = '';

                alert('Avaliação realizada com sucesso!');
            })
            .catch(error => {
                console.error('Erro ao fazer a avaliação:', error);
                alert('Erro ao fazer a avaliação. Tente novamente mais tarde.');
            });
        } else {
            alert('Por favor, preencha todos os campos: avaliação, comentário e nome do usuário.');
        }
    });

    // Outras lógicas podem ser adicionadas aqui, se necessário
});