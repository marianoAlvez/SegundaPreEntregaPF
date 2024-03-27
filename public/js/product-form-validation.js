//Script para validar el formulario de creación o edición de productos

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('productForm');
    const guardarBtn = document.getElementById('guardarBtn');

    form.addEventListener('input', function(event) {
        if (event.target.tagName.toLowerCase() === 'input' || event.target.tagName.toLowerCase() === 'select' || event.target.tagName.toLowerCase() === 'textarea') {
            if (event.target.checkValidity()) {
                event.target.classList.remove('is-invalid');
                event.target.classList.add('is-valid');
                event.target.nextElementSibling.textContent = '';
            } else {
                event.target.classList.remove('is-valid');
                event.target.classList.add('is-invalid');
                event.target.nextElementSibling.textContent = event.target.title || 'Valor inválido';
            }
        }

        if (form.checkValidity()) {
            guardarBtn.disabled = false;
        } else {
            guardarBtn.disabled = true;
        }
    });

    form.addEventListener('submit', function(event) {
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();

            for (let i = 0; i < form.length; i++) {
                const field = form[i];
                if (field.tagName.toLowerCase() === 'input' || field.tagName.toLowerCase() === 'select' || field.tagName.toLowerCase() === 'textarea') {
                    if (!field.checkValidity()) {
                        field.classList.add('is-invalid');
                        if (!field.nextElementSibling.classList.contains('invalid-feedback')) {
                            const errorFeedback = document.createElement('div');
                            errorFeedback.classList.add('invalid-feedback');
                            field.parentNode.insertBefore(errorFeedback, field.nextSibling);
                        }
                        field.nextElementSibling.textContent = field.title || 'Valor inválido';
                    }
                }
            }
        }
        form.classList.add('was-validated');
    });
});

