/**
 * Interactive Aftercare Guide Logic
 */

document.addEventListener('DOMContentLoaded', async () => {
    // Load SVG manually since we are using plain HTML
    const container = document.getElementById('body-diagram-container');
    const response = await fetch('assets/body-diagram.svg');
    const svgText = await response.text();
    container.innerHTML = svgText;

    // Load Aftercare Templates
    const templatesResponse = await fetch('assets/aftercare-templates.json');
    const templates = await templatesResponse.json();

    // Attach Click Events
    const points = container.querySelectorAll('.piercing-point');
    points.forEach(point => {
        point.addEventListener('click', (e) => {
            const location = e.currentTarget.getAttribute('data-location');
            displayGuide(templates[location]);

            // Highlight selected
            points.forEach(p => p.classList.remove('text-secondary'));
            e.currentTarget.classList.add('text-secondary');
        });
    });
});

function displayGuide(data) {
    if (!data) return;

    const initial = document.getElementById('initial-message');
    const content = document.getElementById('guide-content');
    const title = document.getElementById('guide-title');
    const time = document.getElementById('guide-time');
    const list = document.getElementById('guide-instructions');
    const flags = document.getElementById('guide-red_flags') || document.getElementById('guide-red-flags');

    initial.classList.add('hidden');
    content.classList.remove('hidden');

    title.textContent = data.title;
    time.textContent = `Healing: ${data.healingTime}`;

    list.innerHTML = data.instructions.map(item => `
        <li class="flex items-start">
            <i class="fas fa-circle-check text-primary mt-1 mr-3"></i>
            <span class="text-gray-300 text-sm">${item}</span>
        </li>
    `).join('');

    if (flags && data.redFlags) {
        flags.innerHTML = data.redFlags.map(item => `<li>${item}</li>`).join('');
    }
}
