const fs = require('fs');
const path = require('path');

const directory = './';

fs.readdir(directory, (err, files) => {
    if (err) throw err;
    files.forEach(file => {
        if (path.extname(file) === '.html') {
            const filePath = path.join(directory, file);
            let content = fs.readFileSync(filePath, 'utf8');
            
            // Replace >Dashboard</a> with ><i class="fa-solid fa-chart-line"></i></a>
            content = content.replace(
                /<a href="dashboard\.html" class="([^"]*?btn-outline[^"]*?)"([^>]*)>Dashboard<\/a>/g,
                '<a href="dashboard.html" class="$1"$2><i class="fa-solid fa-chart-line"></i></a>'
            );
            
            // Also handle dashboard.html which might have class="active btn btn-outline"
            
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated ${file}`);
        }
    });
});
