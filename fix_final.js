const fs = require('fs');
let content = fs.readFileSync('c:\\Users\\Micro\\Downloads\\Geonel Site\\index.html', 'utf8');

const fixes = [
    [/(<lin)[\s\S]( rel=)/g, '$1k$2'],
    [/(<lin)[\s\S]( href=)/g, '$1k$2'],
    [/(description)[\s\S]( content)/g, '$1"$2'],
    [/(v)[\s\S](orize)/g, '$1al$2'],
    [/(Or)[\s\S](amen)[\s\S](o)/g, '$1η$2t$3'],
    [/(Flutuan)[\s\S](o)/g, '$1d$2'],
    [/(fun)[\s\S](o)/g, '$1d$2'],
    [/(In)[\s\S](ova)[\s\S](o)/g, '$1$2ηγ$3'],
    [/(serv)[\s\S](os)/g, '$1iη$2'],
    [/Γ§/g, 'η'],
    [/Γ£/g, 'γ'],
    [/Γ΅/g, 'α'],
    [/Γ©/g, 'ι'],
    [/Γ­/g, 'ν'],
    [/Γ³/g, 'σ'],
    [/ΓΊ/g, 'ϊ'],
    [/ΓΆ/g, 'β'],
    [/Γª/g, 'κ'],
    [/Γ΄/g, 'τ'],
    [/Γµ/g, 'υ'],
    [/Γ/g, 'Α'],
    [/Γ‰/g, 'Ι'],
    [/Γ“/g, 'Σ'],
    [/Γ‡/g, 'Η'],
    [/Γ‚/g, 'Β'],
    [/Γ/g, 'Κ']
];

for (const [regex, replacement] of fixes) {
    content = content.replace(regex, replacement);
}

fs.writeFileSync('c:\\Users\\Micro\\Downloads\\Geonel Site\\index.html', content, 'utf8');
console.log("Applied final fixes.");
