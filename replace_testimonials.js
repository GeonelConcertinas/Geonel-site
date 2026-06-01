const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

// Find section boundaries
const startMarker = '    <!-- Depoimentos Section -->';
const endMarker = '    <!-- Produtos Section - Final Redesign -->';

const startIdx = html.indexOf(startMarker);
const endIdx = html.indexOf(endMarker);

if (startIdx === -1 || endIdx === -1) {
    console.error('Could not find markers');
    console.log('startIdx:', startIdx, 'endIdx:', endIdx);
    process.exit(1);
}

const newSection = `    <!-- Depoimentos Section -->
    <section class="section testimonials" id="depoimentos">
        <div class="container">
            <div class="section-header reveal">
                <span class="eyebrow">Depoimentos</span>
                <h2 class="section-title">O que dizem os <br><span class="italic-accent">nossos clientes</span></h2>
                <p class="section-subtitle">Opiniões reais de quem já protegeu seu imóvel com a Geonel. Sem filtros, sem edição.</p>
            </div>

            <!-- Layout principal: grade à esq, bloco de crédito + chat à dir -->
            <div class="testimonials-layout">

                <!-- Coluna esquerda: grade 2×3 -->
                <div class="testimonials-grid">

                    <!-- Card 1 -->
                    <div class="testimonial-card reveal">
                        <div class="testimonial-stars">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                        </div>
                        <p class="testimonial-text">"Orçamento no mesmo dia e instalação no dia seguinte. A equipe foi extremamente profissional e não deixou nenhuma sujeira."</p>
                        <div class="testimonial-user">
                            <div class="testimonial-avatar">CE</div>
                            <div class="testimonial-info"><h4>Carlos Eduardo</h4><p>Barra da Tijuca, RJ</p></div>
                            <span class="verified-badge"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Verificado</span>
                        </div>
                    </div>

                    <!-- Card 2 -->
                    <div class="testimonial-card reveal" style="transition-delay:80ms">
                        <div class="testimonial-stars">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                        </div>
                        <p class="testimonial-text">"A concertina flat ficou impecável nos muros laterais. Alinhada, discreta e o acabamento é de um nível que eu não esperava."</p>
                        <div class="testimonial-user">
                            <div class="testimonial-avatar">MS</div>
                            <div class="testimonial-info"><h4>Mariana Souza</h4><p>Recreio, RJ</p></div>
                            <span class="verified-badge"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Verificado</span>
                        </div>
                    </div>

                    <!-- Card 3 -->
                    <div class="testimonial-card reveal" style="transition-delay:160ms">
                        <div class="testimonial-stars">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                        </div>
                        <p class="testimonial-text">"Precisei com urgência para fechar a lateral do meu comércio. Me atenderam no mesmo dia e resolveram tudo rapidinho. Recomendo!"</p>
                        <div class="testimonial-user">
                            <div class="testimonial-avatar">RM</div>
                            <div class="testimonial-info"><h4>Renato Martins</h4><p>Niterói, RJ</p></div>
                            <span class="verified-badge"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Verificado</span>
                        </div>
                    </div>

                    <!-- Card 4 -->
                    <div class="testimonial-card reveal" style="transition-delay:100ms">
                        <div class="testimonial-stars">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                        </div>
                        <p class="testimonial-text">"Contratei para o condomínio onde moro. O síndico e os moradores elogiaram muito. O muro ficou muito mais seguro e o visual melhorou bastante."</p>
                        <div class="testimonial-user">
                            <div class="testimonial-avatar">AP</div>
                            <div class="testimonial-info"><h4>Anderson Pinheiro</h4><p>Jacarepaguá, RJ</p></div>
                            <span class="verified-badge"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Verificado</span>
                        </div>
                    </div>

                    <!-- Card 5 -->
                    <div class="testimonial-card reveal" style="transition-delay:180ms">
                        <div class="testimonial-stars">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                        </div>
                        <p class="testimonial-text">"Pediram autorização antes de qualquer coisa e terminaram antes do prazo combinado. Minha família se sentiu muito mais protegida depois disso."</p>
                        <div class="testimonial-user">
                            <div class="testimonial-avatar">FC</div>
                            <div class="testimonial-info"><h4>Fernanda Castro</h4><p>Campo Grande, RJ</p></div>
                            <span class="verified-badge"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Verificado</span>
                        </div>
                    </div>

                    <!-- Card 6 -->
                    <div class="testimonial-card reveal" style="transition-delay:260ms">
                        <div class="testimonial-stars">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                        </div>
                        <p class="testimonial-text">"Fiz o orçamento pelo WhatsApp na quinta e na sexta já estavam aqui. Trabalho impecável. Vou indicar para todo mundo do meu condomínio!"</p>
                        <div class="testimonial-user">
                            <div class="testimonial-avatar">LO</div>
                            <div class="testimonial-info"><h4>Lucas Oliveira</h4><p>São Gonçalo, RJ</p></div>
                            <span class="verified-badge"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Verificado</span>
                        </div>
                    </div>

                </div>
                <!-- Fim grade -->

                <!-- Coluna direita: bloco de credibilidade + chat WhatsApp -->
                <div class="testimonials-sidebar reveal">

                    <!-- Bloco de credibilidade -->
                    <div class="testimonial-cred-block">
                        <div class="cred-rating-row">
                            <div class="cred-stars">
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="#f59e0b"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="#f59e0b"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="#f59e0b"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="#f59e0b"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="#f59e0b"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            </div>
                            <span class="cred-score">5,0</span>
                        </div>
                        <p class="cred-label">Média de avaliação dos nossos clientes</p>
                        <div class="cred-stats-row">
                            <div class="cred-stat">
                                <span class="cred-stat-value">5.000+</span>
                                <span class="cred-stat-label">projetos entregues</span>
                            </div>
                            <div class="cred-stat">
                                <span class="cred-stat-value">14 anos</span>
                                <span class="cred-stat-label">no mercado</span>
                            </div>
                        </div>
                    </div>

                    <!-- Chat WhatsApp -->
                    <div class="whatsapp-mockup">
                        <div class="mockup-header">
                            <div class="mockup-user-info">
                                <div class="mockup-avatar">G</div>
                                <div>
                                    <div class="mockup-name">Geonel Segurança</div>
                                    <div class="mockup-status">&#9679; online agora</div>
                                </div>
                            </div>
                            <div class="mockup-header-actions">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                            </div>
                        </div>
                        <div class="mockup-body">
                            <div class="message incoming">
                                <p>Ol&#225; Carlos! A equipe finalizou a instala&#231;&#227;o da concertina dupla ontem. Ficou tudo conforme esperava? &#128522;</p>
                                <span class="message-time">09:12</span>
                            </div>
                            <div class="message outgoing">
                                <p>Ficou perfeito! A concertina est&#225; super firme e alinhada. O pessoal foi muito caprichoso e ainda limpou tudo antes de ir embora. Top demais! &#128079;</p>
                                <span class="message-time">09:15 &#10003;&#10003;</span>
                            </div>
                            <div class="message incoming">
                                <p>Boa, Carlos! N&#243;s que agradecemos pela confian&#231;a. Qualquer coisa &#233; s&#243; chamar! &#128737;&#65039;</p>
                                <span class="message-time">09:17</span>
                            </div>
                            <div class="message outgoing">
                                <p>Com certeza vou indicar voc&#234;s pra todo mundo aqui do condom&#237;nio! &#128588;</p>
                                <span class="message-time">09:19 &#10003;&#10003;</span>
                            </div>
                        </div>
                        <div class="mockup-footer">
                            <a href="https://wa.me/5521974372750" class="mockup-cta-btn" target="_blank" rel="noopener noreferrer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.474-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.463 1.065 2.876 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                                Falar no WhatsApp agora
                            </a>
                        </div>
                    </div>
                    <!-- Fim chat -->

                </div>
                <!-- Fim sidebar -->

            </div>
            <!-- Fim layout principal -->

        </div>
    </section>

`;

const before = html.slice(0, startIdx);
const after = html.slice(endIdx);

const result = before + newSection + after;
fs.writeFileSync(filePath, result, 'utf8');
console.log('Done! File written successfully.');
console.log('Section removed from index:', startIdx, 'to', endIdx);
