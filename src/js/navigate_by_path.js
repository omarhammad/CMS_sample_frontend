import {show_section} from "./navbar.js";

window.addEventListener('DOMContentLoaded', () => {
    const section_id = window.location.href.split('/').pop().replaceAll(/[?#]/g, '');
    if (section_id.length === 0) {
        show_section('home');
    } else {
        show_section(section_id);
    }
})