const fs = require('fs');
const text = fs.readFileSync('c:\\Users\\Micro\\Downloads\\Geonel Site\\overview.txt', 'utf8');

const lines = text.split('\n');
let capturing = false;
let recoveredLines = [];

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes('File Path: `file:///c:/Users/Micro/Downloads/Geonel%20Site/index.html`')) {
        // Let's capture ANY view_file of index.html that starts at line 1, just to be safe
        let j = i;
        while(j < i + 10 && j < lines.length) {
            if (lines[j].includes('Showing lines 1 to')) {
                capturing = true;
                recoveredLines = [];
                break;
            }
            j++;
        }
    }
    
    if (capturing) {
        if (line.startsWith('The above content does NOT show') || line.startsWith('The above content shows')) {
            capturing = false;
        } else {
            const match = line.match(/^(\d+):\s(.*)$/);
            if (match) {
                recoveredLines.push(match[2]);
            }
        }
    }
}

if (recoveredLines.length > 0) {
    fs.writeFileSync('c:\\Users\\Micro\\Downloads\\Geonel Site\\index_recovered.html', recoveredLines.join('\n'), 'utf8');
    console.log("Recovered " + recoveredLines.length + " lines!");
} else {
    console.log("Could not find the lines.");
}
