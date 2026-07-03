/* ============================================================
   MAIN.JS — Navbar, Tabs, aur test-cards ko TESTS_DATA se render karta hai.
   Isse naya test add karna easy ho jaata hai: sirf tests-data.js edit karo,
   is file ko touch karne ki zaroorat nahi.
   ============================================================ */

// ===== BUILD ONE CARD'S HTML =====
function buildCardHTML(item) {
    const metaBits = [];
    if (item.questions) metaBits.push(`<span><i class="far fa-clock"></i> ${item.questions} પ્રશ્નો</span>`);
    if (item.rating) metaBits.push(`<span><i class="far fa-star"></i> ${item.rating}</span>`);
    if (item.duration) metaBits.push(`<span><i class="far fa-hourglass"></i> ${item.duration} મિનિટ</span>`);
    if (item.year) metaBits.push(`<span><i class="far fa-calendar"></i> ${item.year}</span>`);

    const badgeClass = item.badgeClass ? ` ${item.badgeClass}` : '';

    return `
        <div class="test-card" data-file="${item.file}">
            <div class="card-icon ${item.color}"><i class="fas ${item.icon}"></i></div>
            <h4>${item.title}</h4>
            <div class="meta">${metaBits.join('')}</div>
            <span class="badge${badgeClass}">${item.badge}</span>
        </div>`;
}

// ===== RENDER A GRID FROM AN ARRAY =====
function renderGrid(containerId, items) {
    const container = document.getElementById(containerId);
    if (!container) return;
    if (!items || items.length === 0) {
        container.innerHTML = `<div class="empty-msg">હજુ કોઈ ટેસ્ટ ઉમેરાયો નથી.</div>`;
        return;
    }
    container.innerHTML = items.map(buildCardHTML).join('');

    // Click -> navigate to that test's own HTML file
    container.querySelectorAll('.test-card').forEach(card => {
        card.addEventListener('click', () => {
            const file = card.dataset.file;
            if (file) window.location.href = file;
        });
    });
}

// ===== RENDER ALL THREE TABS FROM TESTS_DATA =====
function renderAllTestGrids() {
    if (typeof TESTS_DATA === 'undefined') return;
    renderGrid('chapterGrid', TESTS_DATA.chapterWise);
    renderGrid('mockGrid', TESTS_DATA.mockTests);
    renderGrid('prevGrid', TESTS_DATA.previousYear);
}

document.addEventListener('DOMContentLoaded', () => {
    renderAllTestGrids();

    // ===== HAMBURGER MENU =====
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => navLinks.classList.remove('open'));
        });
    }

    // ===== TABS =====
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = {
        chapterTab: document.getElementById('chapterTab'),
        mockTab: document.getElementById('mockTab'),
        prevTab: document.getElementById('prevTab'),
    };
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            Object.values(tabContents).forEach(c => c && c.classList.remove('active'));
            const target = btn.dataset.tab;
            if (tabContents[target]) tabContents[target].classList.add('active');
        });
    });

    // ===== PROGRESS BAR ANIMATION (on scroll) =====
    const progressFill = document.querySelector('.progress-bar-track .fill');
    if (progressFill) {
        const targetWidth = progressFill.dataset.width || '68%';
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    progressFill.style.width = targetWidth;
                }
            });
        }, { threshold: 0.3 });
        observer.observe(progressFill);
    }

    // ===== SMOOTH SCROLL FOR NAV LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    console.log('✅ NEET Gujarati Main Page Loaded!');
});

