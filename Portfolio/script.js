// script.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const container = document.querySelector('.container');

    class FormValidator {
        constructor(form) {
            this.form = form;
            this.initialize();
        }

        initialize() {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }

        handleSubmit(e) {
            e.preventDefault();
            this.clearErrors();

            if (this.validateForm()) {
                this.showSuccessMessage();
                this.form.reset();
            }
        }

        validateForm() {
            let isValid = true;

            isValid = this.validateField('#firstName', 'First name is required') && isValid;
            isValid = this.validateField('#lastName', 'Last name is required') && isValid;
            isValid = this.validateEmail('#email') && isValid;
            isValid = this.validatePhone('#phone') && isValid;
            isValid = this.validateRadioGroup('gender', 'Please select a gender') && isValid;
            isValid = this.validateField('#address', 'Address is required') && isValid;
            isValid = this.validateSelect('#country', 'Please select a country') && isValid;
            isValid = this.validateDate('#dob', 'Please enter a valid date of birth') && isValid;

            return isValid;
        }

        validateField(selector, message) {
            const field = this.form.querySelector(selector);
            if (!field.value.trim()) {
                this.showError(field, message);
                return false;
            }
            return true;
        }

        validateEmail(selector) {
            const emailField = this.form.querySelector(selector);
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!emailRegex.test(emailField.value.trim())) {
                this.showError(emailField, 'Please enter a valid email address');
                return false;
            }
            return true;
        }

        validatePhone(selector) {
            const phoneField = this.form.querySelector(selector);
            const phoneRegex = /^\d{10}$/;
            
            if (!phoneRegex.test(phoneField.value.trim())) {
                this.showError(phoneField, 'Please enter a 10-digit phone number');
                return false;
            }
            return true;
        }

        validateRadioGroup(name, message) {
            const radioGroup = this.form.querySelectorAll(`input[name="${name}"]`);
            const isChecked = [...radioGroup].some(radio => radio.checked);
            
            if (!isChecked) {
                this.showError(radioGroup[0].closest('.form-group'), message);
                return false;
            }
            return true;
        }

        validateSelect(selector, message) {
            const selectField = this.form.querySelector(selector);
            if (selectField.value === "") {
                this.showError(selectField, message);
                return false;
            }
            return true;
        }

        validateDate(selector, message) {
            const dateField = this.form.querySelector(selector);
            if (!dateField.value) {
                this.showError(dateField, message);
                return false;
            }
            
            const inputDate = new Date(dateField.value);
            if (inputDate > new Date()) {
                this.showError(dateField, 'Date of birth cannot be in the future');
                return false;
            }
            return true;
        }

        showError(field, message) {
            const formGroup = field.closest('.form-group');
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = message;
            errorDiv.style.color = 'red';
            errorDiv.style.fontSize = '0.875rem';
            errorDiv.style.marginTop = '5px';
            
            formGroup.appendChild(errorDiv);
            field.style.borderColor = 'red';
        }

        clearErrors() {
            this.form.querySelectorAll('.error-message').forEach(error => error.remove());
            this.form.querySelectorAll('input, select, textarea').forEach(field => {
                field.style.borderColor = '#ddd';
            });
        }

        showSuccessMessage() {
            const successDiv = document.createElement('div');
            successDiv.className = 'success-message';
            successDiv.textContent = 'Form submitted successfully!';
            successDiv.style.color = 'green';
            successDiv.style.textAlign = 'center';
            successDiv.style.marginTop = '20px';
            successDiv.style.fontWeight = 'bold';
            
            container.insertBefore(successDiv, form.nextSibling);
            setTimeout(() => successDiv.remove(), 3000);
        }
    }

    // Initialize form validator
    new FormValidator(form);
});