document.addEventListener('DOMContentLoaded', () => {
    // --- Card Nav (GSAP) ---
    const cardNav        = document.getElementById('cardNav');
    const hamburgerBtn   = document.getElementById('hamburgerBtn');
    const cardNavContent = document.getElementById('cardNavContent');
    const navCards       = cardNav ? Array.from(cardNav.querySelectorAll('.nav-card')) : [];

    let cnIsExpanded = false;
    let cnTl         = null;

    const CN_COLLAPSED = 70;
    const CN_DESKTOP_H = 260;
    const cnIsMobile   = () => window.matchMedia('(max-width: 768px)').matches;

    const cnCalcHeight = () => {
        if (!cnIsMobile()) return CN_DESKTOP_H;
        if (!cardNavContent) return CN_DESKTOP_H;
        const wasVis = cardNavContent.style.visibility;
        const wasPos = cardNavContent.style.position;
        const wasH   = cardNavContent.style.height;
        cardNavContent.style.visibility = 'visible';
        cardNavContent.style.position   = 'static';
        cardNavContent.style.height     = 'auto';
        const h = CN_COLLAPSED + cardNavContent.scrollHeight + 16;
        cardNavContent.style.visibility = wasVis;
        cardNavContent.style.position   = wasPos;
        cardNavContent.style.height     = wasH;
        return h;
    };

    const cnCreateTl = () => {
        if (!cardNav) return null;
        gsap.set(cardNav,  { height: CN_COLLAPSED, overflow: 'hidden' });
        gsap.set(navCards, { y: 50, opacity: 0 });
        const tl = gsap.timeline({ paused: true });
        tl.to(cardNav,  { height: cnCalcHeight(), duration: 0.4, ease: 'power3.out' });
        tl.to(navCards, { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out', stagger: 0.08 }, '-=0.1');
        return tl;
    };

    const cnToggle = () => {
        if (!cnTl) return;
        if (!cnIsExpanded) {
            cnIsExpanded = true;
            hamburgerBtn.classList.add('open');
            cardNav.classList.add('open');
            hamburgerBtn.setAttribute('aria-label', 'Fechar menu');
            cardNavContent.classList.remove('invisible');
            cardNavContent.setAttribute('aria-hidden', 'false');
            cnTl.play(0);
        } else {
            cnIsExpanded = false;
            hamburgerBtn.classList.remove('open');
            cardNav.classList.remove('open');
            hamburgerBtn.setAttribute('aria-label', 'Abrir menu');
            cnTl.eventCallback('onReverseComplete', () => {
                cardNavContent.classList.add('invisible');
                cardNavContent.setAttribute('aria-hidden', 'true');
                cnTl.eventCallback('onReverseComplete', null);
            });
            cnTl.reverse();
        }
    };

    if (cardNav) {
        cnTl = cnCreateTl();

        hamburgerBtn.addEventListener('click', cnToggle);
        hamburgerBtn.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); cnToggle(); }
        });

        cardNav.querySelectorAll('.nav-card-link, .card-nav-cta').forEach(el => {
            el.addEventListener('click', () => { if (cnIsExpanded) cnToggle(); });
        });

        document.addEventListener('click', e => {
            const container = document.getElementById('cardNavContainer');
            if (cnIsExpanded && container && !container.contains(e.target)) cnToggle();
        });

        window.addEventListener('resize', () => {
            if (!cnTl) return;
            cnTl.kill();
            cnTl = cnCreateTl();
            if (cnIsExpanded) cnTl.progress(1);
        });
    }

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

    const SHEETS_URL = 'https://script.google.com/macros/s/AKfycbwQ4hKX7l4_abSYUI1aO98E7TqNcHLaFH4rd1eNJ8TKthmgmZHo2gwhJT7D6_ZfaNkj/exec';

    const sendToSheets = (etapa, data = {}) => {
        try {
            const now        = new Date();
            const dataStr    = now.toLocaleDateString('pt-BR');
            const hora       = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
            const nome       = 'nome'       in data ? data.nome       : (document.getElementById('clientName')?.value   || '');
            const whatsapp   = 'whatsapp'   in data ? data.whatsapp   : (document.getElementById('clientPhone')?.value  || '');
            const email      = 'email'      in data ? data.email      : (document.getElementById('clientEmail')?.value  || '');
            const tipoImovel = 'tipoImovel' in data ? data.tipoImovel : (document.getElementById('clientType')?.value   || '');
            const metragem   = 'metragem'   in data ? data.metragem   : (document.getElementById('clientMeters')?.value || '');
            const endereco   = 'endereco'   in data ? data.endereco   : (document.getElementById('clientAddress')?.value || '');

            const query = 'data='        + encodeURIComponent(dataStr)
                        + '&hora='       + encodeURIComponent(hora)
                        + '&nome='       + encodeURIComponent(nome)
                        + '&whatsapp='   + encodeURIComponent(whatsapp)
                        + '&email='      + encodeURIComponent(email)
                        + '&tipoImovel=' + encodeURIComponent(tipoImovel)
                        + '&metragem='   + encodeURIComponent(metragem)
                        + '&endereco='   + encodeURIComponent(endereco)
                        + '&etapa='      + encodeURIComponent(etapa);

            fetch(`${SHEETS_URL}?${query}`, { mode: 'no-cors' }).catch(() => {});
        } catch (_) {}
    };

    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (validateStep(currentStep)) {
                sendToSheets(`etapa-${currentStep + 1}`);
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
        
        sendToSheets('completo');

        // Abre o WhatsApp imediatamente (ainda dentro do evento de submit),
        // pois iOS/Safari bloqueia window.open chamado dentro de setTimeout
        // por não reconhecer como gesto direto do usuário.
        window.open(`https://wa.me/5521974372750?text=${text}`, '_blank');

        budgetForm.classList.add('hidden');
        modalSuccess.classList.remove('hidden');
        
        // Google Ads conversion for WhatsApp lead
        if (typeof gtag_report_conversion_whatsapp === 'function') {
            gtag_report_conversion_whatsapp();
        } else {
            gtag('event', 'conversion', {
                'send_to': 'AW-17942918007/2MvACN2F5LUcEPfm7OtC'
            });
        }
    });

    // --- Hero Inline Form ---
    const heroForm = document.getElementById('heroForm');
    if (heroForm) {
        let hfType = '';

        const hfAllSteps = heroForm.querySelectorAll('.hf-step');
        const hfBars     = heroForm.querySelectorAll('.hf-bar');

        const hfGoTo = (id) => {
            hfAllSteps.forEach(s => s.classList.remove('hf-step--active'));
            document.getElementById(id).classList.add('hf-step--active');
        };

        const hfSetProgress = (n) => {
            hfBars.forEach((b, i) => b.classList.toggle('hf-bar--active', i < n));
        };

        const hfSnapshot = () => ({
            tipoImovel: hfType,
            metragem:   '',
            nome:       document.getElementById('hfName').value  || '',
            whatsapp:   document.getElementById('hfPhone').value || '',
            email:      document.getElementById('hfEmail').value || '',
            endereco:   ''
        });

        // Etapa 1 — Nome
        const hfNameEl  = document.getElementById('hfName');
        const hfNameErr = document.getElementById('hfNameError');
        hfNameEl.addEventListener('input', () => {
            if (hfNameEl.value.trim()) hfNameErr.textContent = '';
        });
        document.getElementById('hfNextNome').addEventListener('click', () => {
            if (!hfNameEl.value.trim()) {
                hfNameErr.textContent = 'Por favor, informe seu nome';
                hfNameEl.focus();
                return;
            }
            hfNameErr.textContent = '';
            gtag('event', 'form_start', { 'form_name': 'hero_orcamento', 'etapa': '1_nome' });
            sendToSheets('etapa-1', hfSnapshot());
            hfSetProgress(2);
            hfGoTo('hfsWapp');
        });

        // Etapa 2 — WhatsApp
        const hfPhoneEl  = document.getElementById('hfPhone');
        const hfPhoneErr = document.getElementById('hfPhoneError');
        hfPhoneEl.addEventListener('input', e => {
            let v = e.target.value.replace(/\D/g, '');
            if (v.length > 11) v = v.slice(0, 11);
            if (v.length > 2)  v = '(' + v.slice(0, 2) + ') ' + v.slice(2);
            if (v.length > 10) v = v.slice(0, 10) + '-' + v.slice(10);
            e.target.value = v;
            if (v.replace(/\D/g, '').length >= 11) hfPhoneErr.textContent = '';
        });
        document.getElementById('hfBackWapp').addEventListener('click', () => {
            hfSetProgress(1);
            hfGoTo('hfsNome');
        });
        document.getElementById('hfNextWapp').addEventListener('click', () => {
            const digits = hfPhoneEl.value.replace(/\D/g, '').length;
            if (digits < 11) {
                hfPhoneErr.textContent = digits === 0
                    ? 'Por favor, informe seu WhatsApp'
                    : 'WhatsApp incompleto — precisa de 11 dígitos';
                hfPhoneEl.focus();
                return;
            }
            hfPhoneErr.textContent = '';
            gtag('event', 'form_step_whatsapp', { 'form_name': 'hero_orcamento', 'etapa': '2_whatsapp' });
            sendToSheets('etapa-2', hfSnapshot());
            hfSetProgress(3);
            hfGoTo('hfsTipo');
        });

        // Etapa 3 — Tipo de instalação
        document.getElementById('hfBackTipo').addEventListener('click', () => {
            hfSetProgress(2);
            hfGoTo('hfsWapp');
        });
        heroForm.querySelectorAll('.hf-type-opt').forEach(btn => {
            btn.addEventListener('click', () => {
                hfType = btn.dataset.value;
                gtag('event', 'form_step_tipo', { 'form_name': 'hero_orcamento', 'etapa': '3_tipo', 'tipo_imovel': hfType });
                sendToSheets('etapa-3', hfSnapshot());
                hfSetProgress(4);
                hfGoTo('hfsEmail');
            });
        });

        // Etapa 4 — Email / submit
        const hfEmailEl  = document.getElementById('hfEmail');
        const hfEmailErr = document.getElementById('hfEmailError');
        hfEmailEl.addEventListener('input', () => {
            const v = hfEmailEl.value.trim();
            if (!v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) hfEmailErr.textContent = '';
        });
        document.getElementById('hfBackEmail').addEventListener('click', () => {
            hfSetProgress(3);
            hfGoTo('hfsTipo');
        });
        document.getElementById('hfSubmit').addEventListener('click', () => {
            const v = hfEmailEl.value.trim();
            if (v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
                hfEmailErr.textContent = 'Verifique seu e-mail';
                hfEmailEl.focus();
                return;
            }
            hfEmailErr.textContent = '';
            gtag('event', 'form_submit', { 'form_name': 'hero_orcamento', 'etapa': '4_conclusao' });
            sendToSheets('completo', hfSnapshot());
            gtag('event', 'conversion', { 'send_to': 'AW-17942918007/2MvACN2F5LUcEPfm7OtC' });
            hfGoTo('hfsSuccess');
        });
    }

    // --- Google Ads Conversion Tracking ---
    
    // Telephone button click tracking
    const phoneBtn = document.querySelector('.cta-phone-btn');
    if (phoneBtn) {
        phoneBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const url = phoneBtn.getAttribute('href');
            if (typeof gtag_report_conversion_phone === 'function') {
                gtag_report_conversion_phone(url);
            } else {
                window.location.href = url;
            }
        });
    }

    // Cookie consent banner
    const cookieBanner = document.getElementById('cookieBanner');
    if (cookieBanner && !localStorage.getItem('cookieConsent')) {
        setTimeout(() => cookieBanner.classList.add('cookie-banner--visible'), 800);
        const dismissBanner = (choice) => {
            localStorage.setItem('cookieConsent', choice);
            cookieBanner.classList.remove('cookie-banner--visible');
        };
        document.getElementById('cookieAccept').addEventListener('click', () => dismissBanner('accepted'));
        document.getElementById('cookieDecline').addEventListener('click', () => dismissBanner('declined'));
    }

    // Direct WhatsApp and Modal trigger click tracking
    const whatsappElements = document.querySelectorAll('a[href*="wa.me"], a[href*="api.whatsapp.com"], .js-open-modal, .mockup-cta-btn, .floating-whatsapp');
    whatsappElements.forEach(element => {
        element.addEventListener('click', () => {
            // Se o elemento é para abrir o modal, não redirecionamos direto para o WhatsApp no clique
            // O formulário do modal lidará com seu próprio rastreamento e redirecionamento no submit
            if (element.classList.contains('js-open-modal')) {
                return;
            }

            if (typeof gtag_report_conversion_whatsapp === 'function') {
                const url = element.getAttribute('href');
                if (url && (url.includes('wa.me') || url.includes('api.whatsapp.com'))) {
                    gtag_report_conversion_whatsapp(url);
                } else {
                    gtag('event', 'conversion', {
                        'send_to': 'AW-17942918007/2MvACN2F5LUcEPfm7OtC'
                    });
                }
            }
        });
    });
});
