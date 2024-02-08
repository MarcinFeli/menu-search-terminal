document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('.link').forEach(link => {
        link.addEventListener('click', () => {
            localStorage.setItem('activeLink', link.getAttribute('href'));
        });
    });
    function setActiveLink() {
        const activeLink = localStorage.getItem('activeLink');
        if (activeLink) {
            document.querySelectorAll('.link').forEach(link => {
                if (link.getAttribute('href') === activeLink) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }
    }
    setActiveLink();
});

