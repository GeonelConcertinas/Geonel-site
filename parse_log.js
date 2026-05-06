const fs = require('fs');
const lines = fs.readFileSync('c:\\Users\\Micro\\Downloads\\Geonel Site\\overview.txt', 'utf8').split('\n');

let indexHtmlContent = null;

for (const line of lines) {
    if (!line) continue;
    try {
        const obj = JSON.parse(line);
        if (obj.tool_calls) {
            for (const call of obj.tool_calls) {
                if (call.name === 'write_to_file' && call.args && typeof call.args.TargetFile === 'string' && call.args.TargetFile.includes('index.html')) {
                    console.log("Found write_to_file at " + obj.created_at);
                    let content = call.args.CodeContent;
                    if (content.startsWith('"') && content.endsWith('"')) {
                        content = JSON.parse(content);
                    } else {
                        // It might be unquoted or we need to try parsing it inside a JSON structure
                        try { content = JSON.parse('{"a":' + JSON.stringify(content) + '}').a; } catch(e){}
                    }
                    indexHtmlContent = content;
                }
                if (call.name === 'multi_replace_file_content' && call.args && typeof call.args.TargetFile === 'string' && call.args.TargetFile.includes('index.html')) {
                    console.log("Found multi_replace_file_content at " + obj.created_at);
                    // We need to apply the diffs if possible.
                }
            }
        }
        
        // Also check if view_file output is in content
        if (obj.content && obj.content.includes('File Path: `file:///c:/Users/Micro/Downloads/Geonel%20Site/index.html`')) {
            console.log("Found view_file output at " + obj.created_at);
            if (obj.content.includes('Showing lines 1 to')) {
                // Parse it out
                const linesArr = obj.content.split('\n');
                let capturing = false;
                let recovered = [];
                for(const l of linesArr) {
                    if (l.includes('Showing lines 1 to')) { capturing = true; continue; }
                    if (capturing) {
                        if (l.startsWith('The above content')) { capturing = false; break; }
                        const match = l.match(/^(\d+):\s(.*)$/);
                        if (match) recovered.push(match[2]);
                    }
                }
                if (recovered.length > 500) {
                    indexHtmlContent = recovered.join('\n');
                    console.log("Recovered from view_file at " + obj.created_at);
                }
            }
        }
    } catch (e) {
        // ignore parse error
    }
}

if (indexHtmlContent) {
    fs.writeFileSync('c:\\Users\\Micro\\Downloads\\Geonel Site\\index_recovered.html', indexHtmlContent, 'utf8');
    console.log("Done! Length: " + indexHtmlContent.length);
} else {
    console.log("Failed to recover.");
}
