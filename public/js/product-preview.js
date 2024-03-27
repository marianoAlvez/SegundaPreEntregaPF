//Script para previsualizar los datos de un producto en el formulario de creación o edición de productos

document.addEventListener('DOMContentLoaded', function() {
    // Obtén los elementos del formulario y de la vista previa
    const titleInput = document.getElementById('title');
    const descriptionInput = document.getElementById('description');
    const codeInput = document.getElementById('code');
    const categoryInput = document.getElementById('category');
    const statusInput = document.getElementById('status');
    const stockInput = document.getElementById('stock');
    const priceImput = document.getElementById('price');

    const previewTitle = document.getElementById('preview-title');
    const previewDescription = document.getElementById('preview-description');
    const previewCode = document.getElementById('preview-code');
    const previewCategory = document.getElementById('preview-category');
    const previewStatus = document.getElementById('preview-status');
    const previewStock = document.getElementById('preview-stock');
    const previewPrice = document.getElementById('preview-price');

    // Crea una función para actualizar la vista previa
    const updatePreview = function() {
        previewTitle.textContent = titleInput.value;
        previewDescription.textContent = descriptionInput.value;
        previewCode.textContent = codeInput.value;
        previewCategory.textContent = categoryInput.value;
        previewStatus.textContent = statusInput.value === 'true' ? 'Disponible' : 'No disponible';
        previewStock.textContent = stockInput.value;
        previewPrice.textContent = priceImput.value;
    };

    // Añade un evento 'input' a cada campo del formulario para actualizar la vista previa cuando cambie el valor del campo
    titleInput.addEventListener('input', updatePreview);
    descriptionInput.addEventListener('input', updatePreview);
    codeInput.addEventListener('input', updatePreview);
    categoryInput.addEventListener('input', updatePreview);
    statusInput.addEventListener('input', updatePreview);
    stockInput.addEventListener('input', updatePreview);
    priceImput.addEventListener('input', updatePreview);

    // Actualiza la vista previa inicialmente con los valores actuales del formulario
    updatePreview();
});