// Menu Mobile Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            // Altera o ícone do menu
            const icon = this.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Fechar menu ao clicar em um link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
    
    // Slider de Depoimentos
    initTestimonialSlider();
    
    // Sistema de Abas para Serviços
    initServiceTabs();
    
    // Filtro da Galeria
    initGalleryFilter();
    
    // Modal da Galeria
    initGalleryModal();
    
    // Scroll Suave para Links Internos
    initSmoothScroll();
    
    // Animação de elementos ao scroll
    initScrollAnimation();
});

// Slider de Depoimentos
function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.depoimento');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    
    if (!testimonials.length || !dots.length) return;
    
    let currentIndex = 0;
    
    // Função para mostrar um depoimento específico
    function showTestimonial(index) {
        // Esconde todos os depoimentos
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        
        // Remove a classe active de todos os dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Mostra o depoimento atual e atualiza o dot
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentIndex = index;
    }
    
    // Event listeners para os botões de navegação
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            let newIndex = currentIndex - 1;
            if (newIndex < 0) newIndex = testimonials.length - 1;
            showTestimonial(newIndex);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            let newIndex = currentIndex + 1;
            if (newIndex >= testimonials.length) newIndex = 0;
            showTestimonial(newIndex);
        });
    }
    
    // Event listeners para os dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showTestimonial(index);
        });
    });
    
    // Auto-avanço do slider
    setInterval(function() {
        let newIndex = currentIndex + 1;
        if (newIndex >= testimonials.length) newIndex = 0;
        showTestimonial(newIndex);
    }, 5000);
}

// Sistema de Abas para Serviços
function initServiceTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.servico-content');
    
    if (!tabBtns.length || !tabContents.length) return;
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove a classe active de todos os botões e conteúdos
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Adiciona a classe active ao botão clicado
            this.classList.add('active');
            
            // Mostra o conteúdo correspondente
            const tabId = this.getAttribute('data-tab');
            const tabContent = document.getElementById(tabId);
            if (tabContent) {
                tabContent.classList.add('active');
            }
        });
    });
}

// Filtro da Galeria
function initGalleryFilter() {
    const filterBtns = document.querySelectorAll('.filtro-btn');
    const galleryItems = document.querySelectorAll('.galeria-item');
    
    if (!filterBtns.length || !galleryItems.length) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove a classe active de todos os botões
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Adiciona a classe active ao botão clicado
            this.classList.add('active');
            
            // Filtra os itens da galeria
            const category = this.getAttribute('data-categoria');
            
            galleryItems.forEach(item => {
                if (category === 'todos' || item.getAttribute('data-categoria') === category) {
                    item.style.display = 'block';
                    // Pequeno delay para animação
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Modal da Galeria
function initGalleryModal() {
    const galleryItems = document.querySelectorAll('.galeria-item');
    const modal = document.querySelector('.modal-galeria');
    const modalImg = document.querySelector('.modal-conteudo');
    const captionText = document.querySelector('.modal-legenda');
    const closeModal = document.querySelector('.fechar-modal');
    
    if (!galleryItems.length || !modal) return;
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            modal.style.display = 'block';
            if (modalImg) {
                modalImg.src = this.querySelector('img').src;
            }
            if (captionText) {
                const title = this.querySelector('h3').textContent;
                const description = this.querySelector('p').textContent;
                captionText.innerHTML = `<strong>${title}</strong> - ${description}`;
            }
        });
    });
    
    // Fechar modal
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    // Fechar modal clicando fora da imagem
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Fechar modal com a tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
}

// Scroll Suave para Links Internos
function initSmoothScroll() {
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70; // Ajuste para a navbar fixa
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animação de elementos ao scroll
function initScrollAnimation() {
    const animatedElements = document.querySelectorAll('.destaque-card, .missao-card, .membro-equipe, .diferencial-card');
    
    if (!animatedElements.length) return;
    
    function checkScroll() {
        const windowHeight = window.innerHeight;
        
        animatedElements.forEach(element => {
            const position = element.getBoundingClientRect().top;
            
            if (position < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Configura estado inicial para animação
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Verifica a posição no carregamento e no scroll
    window.addEventListener('load', checkScroll);
    window.addEventListener('scroll', checkScroll);
    
    // Verifica imediatamente
    checkScroll();
}
