const fs = require('fs');
const text = fs.readFileSync('c:\\Users\\Micro\\Downloads\\Geonel Site\\overview.txt', 'utf8');

const lines = text.split('\n');
let indexContent = null;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;
    try {
        const obj = JSON.parse(line);
        if (obj.source === 'TOOL' || obj.source === 'ENVIRONMENT') {
            if (obj.content && obj.content.includes('<!DOCTYPE html>') && obj.content.includes('<html lang="pt-BR">')) {
                // This is probably the view_file output or a write_to_file output
                indexContent = obj.content;
            }
        }
        if (obj.tool_calls) {
            for (const call of obj.tool_calls) {
                if (call.name === 'write_to_file' && call.args && typeof call.args.CodeContent === 'string' && call.args.CodeContent.includes('<!DOCTYPE html>')) {
                    indexContent = call.args.CodeContent;
                }
            }
        }
    } catch(e) {}
}

if (indexContent) {
    fs.writeFileSync('c:\\Users\\Micro\\Downloads\\Geonel Site\\index_recovered.html', indexContent, 'utf8');
    console.log("Found it! Length: " + indexContent.length);
} else {
    console.log("Not found.");
}
