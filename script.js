document.addEventListener('DOMContentLoaded', () => {
    // --- Header Scroll Effect ---
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        
        const spans = menuToggle.querySelectorAll('span');
        if (nav.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close mobile menu on link click
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // --- Sticky Scroll Intersection Observer ---
    const scrollBlocks = document.querySelectorAll('.scroll-block');
    
    if (scrollBlocks.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '-30% 0px -30% 0px',
            threshold: 0
        };
        
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                } else {
                    entry.target.classList.remove('active');
                }
            });
        }, observerOptions);
        
        scrollBlocks.forEach(block => {
            scrollObserver.observe(block);
        });
    }

    // --- Badge Text Cycler ---
    const badgeText = document.getElementById('badge-text');
    if (badgeText) {
        const phrases = [
            "Segurança Perimetral Premium",
            "Tire suas Dúvidas pelo WhatsApp 💬",
            "Proteção Real para sua Casa e Empresa"
        ];
        let currentPhrase = 0;
        
        setInterval(() => {
            badgeText.classList.add('hidden');
            setTimeout(() => {
                currentPhrase = (currentPhrase + 1) % phrases.length;
                badgeText.textContent = phrases[currentPhrase];
                badgeText.classList.remove('hidden');
            }, 500);
        }, 3500);
    }

    // --- Product Filter ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('#productsGrid .product-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            productCards.forEach(card => {
                const category = card.dataset.category;
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden-by-filter');
                } else {
                    card.classList.add('hidden-by-filter');
                }
            });
        });
    });

    // --- Complementary Product Gallery (mini carousel) ---
    document.querySelectorAll('.comp-card__gallery').forEach(gallery => {
        const track = gallery.querySelector('.comp-gallery-track');
        if (!track) return;

        const imgs = track.querySelectorAll('img');
        const dots = gallery.querySelectorAll('.comp-dot');
        const prevBtn = gallery.querySelector('.comp-gallery-btn--prev');
        const nextBtn = gallery.querySelector('.comp-gallery-btn--next');
        let current = 0;
        const total = imgs.length;

        const goTo = (index) => {
            current = (index + total) % total;
            track.style.transform = `translateX(-${current * 100}%)`;
            dots.forEach((d, i) => d.classList.toggle('active', i === current));
        };

        if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
        if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));
        dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

        // Touch/swipe support for mobile
        let touchStartX = 0;
        gallery.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
        gallery.addEventListener('touchend', e => {
            const diff = touchStartX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
        }, { passive: true });
    });


    // --- Modal Orçamento Logic (Multi-step) ---
    const budgetModal = document.getElementById('budgetModal');
    const budgetForm = document.getElementById('budgetForm');
    const modalSuccess = document.getElementById('modalSuccess');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const closeSuccessBtn = document.getElementById('closeSuccessBtn');
    const openModalBtns = document.querySelectorAll('.js-open-modal');
    
    // Store selected product if they come from a specific card
    let selectedProductFromCard = '';
    
    const steps = Array.from(document.querySelectorAll('.form-step'));
    const nextBtns = document.querySelectorAll('.btn-next');
    const prevBtns = document.querySelectorAll('.btn-prev');
    const stepDots = document.querySelectorAll('.step-dot');
    let currentStep = 0;

    const updateSteps = () => {
        steps.forEach((step, index) => {
            step.classList.remove('active', 'slide-left');
            if (index === currentStep) {
                step.classList.add('active');
            }
        });
        
        stepDots.forEach((dot, index) => {
            if (index <= currentStep) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    };

    const validateStep = (stepIndex) => {
        const step = steps[stepIndex];
        const inputs = step.querySelectorAll('input[required], select[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.reportValidity();
            }
        });
        
        return isValid;
    };

    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (validateStep(currentStep)) {
                currentStep++;
                updateSteps();
            }
        });
    });

    prevBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            steps[currentStep].classList.add('slide-left');
            setTimeout(() => {
                currentStep--;
                updateSteps();
            }, 50);
        });
    });

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Capture the product name if the button came from a product card
            const product = btn.getAttribute('data-product');
            selectedProductFromCard = product ? product.trim() : '';
            
            budgetModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            currentStep = 0;
            updateSteps();
            budgetForm.reset();
            budgetForm.classList.remove('hidden');
            modalSuccess.classList.add('hidden');
        });
    });
    
    const closeModal = () => {
        budgetModal.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            budgetForm.reset();
            budgetForm.classList.remove('hidden');
            modalSuccess.classList.add('hidden');
            currentStep = 0;
            updateSteps();
        }, 400);
    };
    
    closeModalBtn.addEventListener('click', closeModal);
    closeSuccessBtn.addEventListener('click', closeModal);
    
    budgetModal.addEventListener('click', (e) => {
        if (e.target === budgetModal) {
            closeModal();
        }
    });
    
    // Phone Mask
    const phoneInput = document.getElementById('clientPhone');
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);
        
        if (value.length > 2) {
            value = '(' + value.substring(0, 2) + ') ' + value.substring(2);
        }
        if (value.length > 10) {
            value = value.substring(0, 10) + '-' + value.substring(10);
        }
        e.target.value = value;
    });
    
    // Submit Handler
    budgetForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (!validateStep(currentStep)) return;
        
        const type = document.getElementById('clientType').value || 'Não informado';
        const meters = document.getElementById('clientMeters').value;
        const address = document.getElementById('clientAddress').value;
        const name = document.getElementById('clientName').value;
        const phone = document.getElementById('clientPhone').value;
        
        // Build product line if a specific product was selected
        const productLine = selectedProductFromCard
            ? `%0A*Serviço de interesse:* ${encodeURIComponent(selectedProductFromCard)}`
            : '';
        
        const text = `*ORÇAMENTO PELO SITE*${productLine}%0A%0A*1. Imóvel:* ${type}%0A*2. Metragem:* ${meters} metros%0A*3. Local:* ${address}%0A%0A*Cliente:* ${name}%0A*Contato:* ${phone}%0A%0A_Olá, gostaria de saber o valor estimado._`;
        
        budgetForm.classList.add('hidden');
        modalSuccess.classList.remove('hidden');
        
        setTimeout(() => {
            window.open(`https://wa.me/5521964416652?text=${text}`, '_blank');
        }, 1500);
    });
});
