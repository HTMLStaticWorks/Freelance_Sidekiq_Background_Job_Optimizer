const fs = require('fs');
const filePath = 'login.html';

if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove header
    content = content.replace(/<header[\s\S]*?<\/header>/gi, '');
    
    // Remove footer
    content = content.replace(/<footer[\s\S]*?<\/footer>/gi, '');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Removed header and footer from login.html');
}
