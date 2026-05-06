const fs = require('fs');

let content = fs.readFileSync('c:\\Users\\Micro\\Downloads\\Geonel Site\\index.html', 'utf8');

const replacements = {
    'Segurana': 'Segurança',
    'proteo': 'proteção',
    'invases': 'invasões',
    'instalao': 'instalação',
    'famlia': 'família',
    'imvel': 'imóvel',
    'Oramento': 'Orçamento',
    'Incio': 'Início',
    'Inovao': 'Inovação',
    'Proteo': 'Proteção',
    'Patrimnio': 'Patrimônio',
    'patrimnio': 'patrimônio',
    'resistncia': 'resistência',
    'esttica': 'estética',
    'esprito': 'espírito',
    'segurana': 'segurança',
    'experincia': 'experiência',
    'Dinmico': 'Dinâmico',
    'Instalaes': 'Instalações',
    'Instalao': 'Instalação',
    'Metr': 'Metrô',
    'espaos': 'espaços',
    'instalaes': 'instalações',
    'vo': 'vão',
    'alm': 'além',
    'solues': 'soluções',
    'tticas': 'táticas',
    'Implacvel': 'Implacável',
    'Lminas': 'Lâminas',
    'rgida': 'rígida',
    'ao': 'aço',
    'intruso': 'intrusão',
    'Permetro': 'Perímetro',
    'permetros': 'perímetros',
    'rea': 'área',
    'Concludo_': 'Concluído_',
    'Valorizao': 'Valorização',
    'Imvel': 'Imóvel',
    'respeitveis': 'respeitáveis',
    'Ns': 'Nós',
    'Contedo': 'Conteúdo',
    'Essncia': 'Essência',
    'Tradio': 'Tradição',
    'indstria': 'indústria',
    'altssima': 'altíssima',
    'Viso': 'Visão',
    'matrias': 'matérias',
    'esttico': 'estético',
    'implacvel': 'implacável',
    'dedicao': 'dedicação',
    'inovaes': 'inovações',
    'famlias': 'famílias',
    'negcios': 'negócios',
    'cenrios': 'cenários',
    'invaso': 'invasão',
    'permetro': 'perímetro',
    'padres': 'padrões',
    'tcnicos': 'técnicos',
    'inflexveis': 'inflexíveis',
    'no': 'não',
    'mo': 'mão',
    'execuo': 'execução',
    'Mo': 'Mão',
    'Servio': 'Serviço',
    'milimtrica': 'milimétrica',
    'insupervel': 'insuperável',
    'Satisfao': 'Satisfação',
    'nico': 'único',
    'aceitvel': 'aceitável',
    'Servios': 'Serviços',
    'Catlogo': 'Catálogo',
    'Lana': 'Lança',
    'prtica': 'prática',
    'residncias': 'residências',
    'provisrio': 'provisório',
    'No': 'Não',
    'amanh': 'amanhã',
    'avaliao': 'avaliação',
    'oramento': 'orçamento',
    'voc': 'você',
    'Sees': 'Seções',
    'Ttica': 'Tática',
    'Informaes': 'Informações',
    'Endereo': 'Endereço',
    'Sb': 'Sáb',
    'Rpido': 'Rápido',
    'nmeros': 'números',
    'Prximo': 'Próximo',
    'Localizao': 'Localização',
    'endereo': 'endereço',
    'nmero': 'número',
    'logstica': 'logística',
    'ltimo': 'Último'
};

for (const [key, value] of Object.entries(replacements)) {
    const escapedKey = key.replace(/[.*+?^\${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escapedKey, 'g');
    content = content.replace(regex, value);
}

// Ensure generic replacement characters are handled gracefully via RegExp
content = content.replace(/Prote.o/g, 'Proteção');
content = content.replace(/instala.o/g, 'instalação');
content = content.replace(/Inova.o/g, 'Inovação');
content = content.replace(/resist.ncia/g, 'resistência');
content = content.replace(/est.tica/g, 'estética');
content = content.replace(/experi.ncia/g, 'experiência');
content = content.replace(/Din.mico/g, 'Dinâmico');
content = content.replace(/Instala.o/g, 'Instalação');
content = content.replace(/Metr./g, 'Metrô');
content = content.replace(/v.o/g, 'vão');
content = content.replace(/al.m/g, 'além');
content = content.replace(/t.ticas/g, 'táticas');
content = content.replace(/Implac.vel/g, 'Implacável');
content = content.replace(/L.minas/g, 'Lâminas');
content = content.replace(/intrus.o/g, 'intrusão');
content = content.replace(/.rea/g, 'área');
content = content.replace(/Valoriza.o/g, 'Valorização');
content = content.replace(/respeit.veis/g, 'respeitáveis');
content = content.replace(/Conte.do/g, 'Conteúdo');
content = content.replace(/Ess.ncia/g, 'Essência');
content = content.replace(/Tradi.o/g, 'Tradição');
content = content.replace(/ind.stria/g, 'indústria');
content = content.replace(/Vis.o/g, 'Visão');
content = content.replace(/mat.rias/g, 'matérias');
content = content.replace(/est.tico/g, 'estético');
content = content.replace(/implac.vel/g, 'implacável');
content = content.replace(/dedica.o/g, 'dedicação');
content = content.replace(/cen.rios/g, 'cenários');
content = content.replace(/invas.o/g, 'invasão');
content = content.replace(/t.cnicos/g, 'técnicos');
content = content.replace(/n.o/g, 'não');
content = content.replace(/m.o/g, 'mão');
content = content.replace(/execu.o/g, 'execução');
content = content.replace(/M.o/g, 'Mão');
content = content.replace(/milim.trica/g, 'milimétrica');
content = content.replace(/insuper.vel/g, 'insuperável');
content = content.replace(/Satisfa.o/g, 'Satisfação');
content = content.replace(/.nico/g, 'único');
content = content.replace(/aceit.vel/g, 'aceitável');
content = content.replace(/Cat.logo/g, 'Catálogo');
content = content.replace(/pr.tica/g, 'prática');
content = content.replace(/resid.ncias/g, 'residências');
content = content.replace(/N.o/g, 'Não');
content = content.replace(/amanh./g, 'amanhã');
content = content.replace(/avalia.o/g, 'avaliação');
content = content.replace(/voc./g, 'você');
content = content.replace(/T.tica/g, 'Tática');
content = content.replace(/n.meros/g, 'números');
content = content.replace(/Localiza.o/g, 'Localização');
content = content.replace(/n.mero/g, 'número');
content = content.replace(/.ltimo/g, 'Último');
content = content.replace(/S.b/g, 'Sáb');

fs.writeFileSync('c:\\Users\\Micro\\Downloads\\Geonel Site\\index.html', content, 'utf8');
console.log('Fixed');
