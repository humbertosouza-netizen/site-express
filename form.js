document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('siteRequestForm');
    const steps = document.querySelectorAll('.form-step');
    const progressSteps = document.querySelectorAll('.progress-bar .step');
    let currentStep = 1;

    // Navegação entre passos
    function showStep(stepNumber) {
        steps.forEach(step => step.classList.remove('active'));
        progressSteps.forEach((step, index) => {
            if (index + 1 <= stepNumber) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
        document.querySelector(`.form-step[data-step="${stepNumber}"]`).classList.add('active');
    }

    // Botões Próximo
    document.querySelectorAll('.next-btn').forEach(button => {
        button.addEventListener('click', () => {
            if (validateStep(currentStep)) {
                currentStep++;
                showStep(currentStep);
            }
        });
    });

    // Botões Anterior
    document.querySelectorAll('.prev-btn').forEach(button => {
        button.addEventListener('click', () => {
            currentStep--;
            showStep(currentStep);
        });
    });

    // Validação de cada passo
    function validateStep(step) {
        const currentStepElement = document.querySelector(`.form-step[data-step="${step}"]`);
        const inputs = currentStepElement.querySelectorAll('input[required], select[required], textarea[required]');
        let valid = true;

        inputs.forEach(input => {
            if (!input.value) {
                valid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });

        return valid;
    }

    // Envio do formulário
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (validateStep(currentStep)) {
            // Simular envio
            const orderNumber = Math.random().toString(36).substr(2, 9).toUpperCase();
            
            // Mostrar página de confirmação
            document.querySelector('.form-container').style.display = 'none';
            const confirmationPage = document.querySelector('.confirmation-page');
            confirmationPage.style.display = 'flex';
            
            // Atualizar número do pedido
            document.getElementById('orderNumber').textContent = orderNumber;
            document.getElementById('orderLinkNumber').textContent = orderNumber;
            
            // Atualizar link de acompanhamento
            document.getElementById('orderLink').href = `/pedido/${orderNumber}`;
        }
    });
}); 