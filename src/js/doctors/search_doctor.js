import {backend_socket, HttpStatus} from "../common.js";

const search_term_input = document.getElementById('search_term');
const result_component = document.getElementById('results');

search_term_input.addEventListener('keyup', async (event) => {

    const search_term = event.target.value;
    try {
        result_component.innerHTML = null;
        setTimeout(() => {

        }, 100);
        if (search_term.length !== 0) {
            const response = await fetch(`http://localhost:8080/api/doctors?searchTerm=${search_term}`);
            if (response.status === HttpStatus.OK) {
                const doctor_results = await response.json();
                console.log(doctor_results)
                 result_list(doctor_results);
            } else if (response.status === HttpStatus.NO_CONTENT) {
                no_content_component("No results found (0). Please try another search.")
            } else {
                console.error(response.statusMessage)
            }
        } else {
            no_content_component("Enter a search term!")
        }


    } catch (error) {
        console.error(error)
    }


});


function no_content_component(message) {

    const no_content = document.createElement('p');
    no_content.innerText = message;
    no_content.className = 'h3 mt-2';
    result_component.appendChild(no_content)

}

function result_list(results) {

    const no_content = document.createElement('p');
    no_content.innerText = `Results found (${results.length}). Please try another search.`;
    no_content.className = 'h3 mt-2';

    const doctors_list = document.createElement('ul');
    doctors_list.className = 'mt-3'

    for (const doctor of results) {
        const doctor_item = document.createElement('li');
        const doctor_info = document.createElement('a');

        doctor_info.innerText = doctor.firstName + ' ' + doctor.lastName + ' specialized in ' + doctor.specialization;

        doctor_info.href = `${backend_socket}/doctors/details/${doctor.id}`;
        doctor_item.appendChild(doctor_info);
        doctors_list.appendChild(doctor_item)
    }

    result_component.appendChild(no_content)
    result_component.appendChild(doctors_list)


}