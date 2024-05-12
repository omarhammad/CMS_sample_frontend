import {HttpStatus, showToast} from '../common.js';

const submit_btn = document.getElementById('submit_btn');

submit_btn.addEventListener('click', async (event) => {
    event.preventDefault();

    const request_body = getFormData();
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    try {
        const response = await fetch('http://localhost:8080/api/doctors', {
            method: 'POST',
            headers: headers,
            body: request_body
        });

        const data = await response.json();
        if (response.status === HttpStatus.OK) {
            const doctor_name = data.firstName + ' ' + data.lastName;
            showToast(`Dr. ${doctor_name} added!`);
        } else if (response.status === HttpStatus.BAD_REQUEST) {
            if (data.hasOwnProperty('exceptionMsg')) {
                showToast(data.exceptionMsg);
            } else {
                handleFieldsError(data);
            }
        }
    } catch (error) {
        console.error(error);
        showToast('An error occurred while adding the doctor.');
    }
});

function getFormData() {
    const form = document.getElementById('add_form');
    const formData = new FormData(form);
    const formJson = {};
    for (const [key, value] of formData.entries()) {
        formJson[key] = value;
    }
    return JSON.stringify(formJson);
}

function handleFieldsError(fieldsError) {
    const ulElementsList = document.querySelectorAll('.form-error-list');
    ulElementsList.forEach((ul) => {
        ul.innerHTML = null;
    });

    if (fieldsError.hasOwnProperty('firstName')) {
        document.getElementById('first_name')
            .parentElement.appendChild(getFieldsErrorElementList(fieldsError.firstName));
    }

    if (fieldsError.hasOwnProperty('lastName')) {
        document.getElementById('last_name')
            .parentElement.appendChild(getFieldsErrorElementList(fieldsError.lastName));
    }

    if (fieldsError.hasOwnProperty('specialization')) {
        document.getElementById('spec')
            .parentElement.appendChild(getFieldsErrorElementList(fieldsError.specialization));
    }
    if (fieldsError.hasOwnProperty('phoneNumber')) {
        document.getElementById('phone_number')
            .parentElement.appendChild(getFieldsErrorElementList(fieldsError.phoneNumber));
    }
    if (fieldsError.hasOwnProperty('email')) {
        document.getElementById('email')
            .parentElement.appendChild(getFieldsErrorElementList(fieldsError.email));
    }

    if (fieldsError.hasOwnProperty('username')) {
        document.getElementById('username')
            .parentElement.appendChild(getFieldsErrorElementList(fieldsError.username));
    }

    if (fieldsError.hasOwnProperty('password')) {
        document.getElementById('password')
            .parentElement.appendChild(getFieldsErrorElementList(fieldsError.password));
    }

    if (fieldsError.hasOwnProperty('confirmPassword')) {
        document.getElementById('confirm_password')
            .parentElement.appendChild(getFieldsErrorElementList(fieldsError.confirmPassword));
    }
}

function getFieldsErrorElementList(errors) {
    const ulElement = document.createElement('ul');
    ulElement.className = ' form-error-list text-warning';
    errors = errors.split(';');
    for (const error of errors) {
        const ilElement = document.createElement('li');
        ilElement.className = 'form-error';
        ilElement.innerText = '* ' + error;
        ulElement.appendChild(ilElement);

        ulElement.appendChild(document.createElement('br'));
    }

    return ulElement;
}
