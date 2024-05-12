const nav_items = document.querySelectorAll('.nav-link');

nav_items.forEach(nav_item => {
    nav_item.addEventListener('click', (event) => {
        const section_id = event.target.getAttribute('href').replace('#', '');

        show_section(section_id);
    })
})


export function show_section(section_id) {
    const sections = document.querySelectorAll('section');
    let all_non_indicator = 0
    sections.forEach(section => {
        if (section.id === section_id) {
            section.style.display = 'block';
        } else {
            all_non_indicator++;
            section.style.display = 'none';
        }

    })

    if (all_non_indicator === sections.length) {
        window.location.href = '/#'

    }
}