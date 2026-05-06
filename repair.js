const fs = require('fs');
let content = fs.readFileSync('c:\\Users\\Micro\\Downloads\\Geonel Site\\index.html', 'utf8');

const repairs = {
    '</span\ufffd': '</span>',
    '</section\ufffd': '</section>',
    '</button\ufffd': '</button>',
    '</option\ufffd': '</option>',
    'g-photos-btn\ufffd': 'g-photos-btn"',
    '<stron\ufffd': '<strong',
    '<polylin\ufffd': '<polyline',
    'rel="n\ufffdopener n\ufffdoreferrer"': 'rel="noopener noreferrer"',
    'text-decoration\ufffd n\ufffdone;"': 'text-decoration: none;"',
    'footer-column\ufffd style=': 'footer-column" style=',
    'id="closeM\ufffdodalBtn\ufffd': 'id="closeModalBtn"',
    'm\ufffdodal': 'modal',
    'M\ufffdodal': 'Modal',
    'ca\ufffdousel': 'carousel',
    'n\ufffdossas': 'nossas',
    'n\ufffdosso': 'nosso',
    'n\ufffdossos': 'nossos',
    'n\ufffdossa': 'nossa',
    'com\ufffdo ': 'como ',
    'n\ufffdo ': 'no ',
    'n\ufffdo<': 'no<',
    'n\ufffdome': 'nome',
    'com\ufffdomisso': 'compromisso',
    'v\ufffdor': 'valor',
    'In\ufffdorma': 'Informa',
    'da\ufffdos': 'dados',
    'Prote\ufffd\ufffdora': 'Protetora',
    'Concertin\ufffd ': 'Concertina ',
    'Alambra\ufffdo': 'Alambrado',
    'Metr\ufffd\ufffd': 'Metrô',
    'Artefa\ufffdo': 'Artefato',
    'Fun\ufffdonais': 'Funcionais',
    'con\ufffdole': 'controle',
    'a\ufffdrea': 'área',
    'visual\ufffdmente': 'visualmente',
    'S\ufffdbrin\ufffdo': 'Sobrinho',
    'Reservi\ufffdos': 'Reservados',
    'Floatin\ufffd': 'Floating',
    'n\ufffdum\ufffdo': 'número',
    'n\ufffdum\ufffdos': 'números',
    'la\ufffdout': 'layout',
    'n\ufffdº': 'nº'
};

for (const [corrupted, fixed] of Object.entries(repairs)) {
    const escaped = corrupted.replace(/[.*+?^\${}()|[\]\\]/g, '\\$&');
    content = content.replace(new RegExp(escaped, 'g'), fixed);
}

// Handle some loose ends
content = content.replace(/<\/span\ufffd/g, '</span>');
content = content.replace(/<\/section\ufffd\s*/g, '</section>\n');
content = content.replace(/<\/button\ufffd/g, '</button>');
content = content.replace(/<\/option\ufffd/g, '</option>');

fs.writeFileSync('c:\\Users\\Micro\\Downloads\\Geonel Site\\index.html', content, 'utf8');
console.log("Repairs applied.");
