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

    // Rastreamento de clique nos links de WhatsApp
    const whatsappElements = document.querySelectorAll('a[href*="wa.me"], a[href*="api.whatsapp.com"], .mockup-cta-btn');
    whatsappElements.forEach(element => {
        element.addEventListener('click', () => {
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

