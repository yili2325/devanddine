// Dev & Dine - Form handling and animations

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Feather icons
    feather.replace();
    
    // Initialize AOS animations
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });

    // Form submission handling
    const applicationForm = document.getElementById('application-form');
    
    if (applicationForm) {
        applicationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(applicationForm);
            const submitButton = applicationForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            
            // Update button state
            submitButton.disabled = true;
            submitButton.innerHTML = '<i data-feather="loader" class="h-5 w-5 mr-2 animate-spin"></i> Submitting...';
            feather.replace();
            
            // Send form data to Formspree
            fetch(applicationForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                // Show success message
                const formContainer = applicationForm.parentNode;
                const successMessage = document.createElement('div');
                successMessage.className = 'bg-green-50 border-l-4 border-green-500 p-4 my-4';
                successMessage.innerHTML = `
                    <div class="flex">
                        <div class="flex-shrink-0">
                            <i data-feather="check-circle" class="h-5 w-5 text-green-500"></i>
                        </div>
                        <div class="ml-3">
                            <p class="text-sm text-green-700">
                                Thank you for your application! I'll get back to you soon.
                            </p>
                        </div>
                    </div>
                `;
                
                formContainer.insertBefore(successMessage, applicationForm);
                feather.replace();
                
                // Reset form
                applicationForm.reset();
                
                // Restore button state after a delay
                setTimeout(() => {
                    submitButton.disabled = false;
                    submitButton.innerHTML = originalButtonText;
                    feather.replace();
                }, 2000);
            })
            .catch(error => {
                // Show error message
                const formContainer = applicationForm.parentNode;
                const errorMessage = document.createElement('div');
                errorMessage.className = 'bg-red-50 border-l-4 border-red-500 p-4 my-4';
                errorMessage.innerHTML = `
                    <div class="flex">
                        <div class="flex-shrink-0">
                            <i data-feather="alert-circle" class="h-5 w-5 text-red-500"></i>
                        </div>
                        <div class="ml-3">
                            <p class="text-sm text-red-700">
                                Sorry, there was a problem submitting your application. Please try again later.
                            </p>
                        </div>
                    </div>
                `;
                
                formContainer.insertBefore(errorMessage, applicationForm);
                feather.replace();
                
                // Restore button state
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
                feather.replace();
                
                console.error('Error:', error);
            });
        });
    }
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
});
