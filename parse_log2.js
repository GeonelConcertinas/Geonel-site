const fs = require('fs');
const lines = fs.readFileSync('c:\\Users\\Micro\\Downloads\\Geonel Site\\overview.txt', 'utf8').split('\n');

for (const line of lines) {
    if (!line) continue;
    try {
        const obj = JSON.parse(line);
        if (obj.source === 'TOOL' || obj.source === 'ENVIRONMENT') {
            if (obj.content && obj.content.includes('Showing lines 1 to')) {
                console.log("Found TOOL output with lines 1 to !");
                const linesArr = obj.content.split('\n');
                let capturing = false;
                let recovered = [];
                for(const l of linesArr) {
                    if (l.includes('Showing lines 1 to')) { capturing = true; continue; }
                    if (capturing) {
                        if (l.startsWith('The above content')) { capturing = false; break; }
                        const match = l.match(/^(\d+):\s(.*)$/);
                        if (match) recovered.push(match[2]);
                        else recovered.push(l); // try pushing as is
                    }
                }
                if (recovered.length > 500) {
                    fs.writeFileSync('c:\\Users\\Micro\\Downloads\\Geonel Site\\index_recovered.html', recovered.join('\n'), 'utf8');
                    console.log("Recovered from TOOL view_file: " + recovered.length + " lines");
                    process.exit(0);
                }
            }
        }
    } catch (e) {}
}
console.log("Failed to find view_file output in TOOL source.");
