const fs = require('fs');
const path = require('path');

const footerHtml = `    <footer class="main-footer">
        <div class="container">
            <div class="footer-grid">
                <!-- Column 1: Brand -->
                <div class="footer-brand">
                    <a href="index.html" class="logo">
                        <i class="fa-solid fa-bolt-lightning"></i> Side<span>Pulse</span>
                    </a>
                    <p style="margin-top: 1rem; margin-bottom: 2rem;">High-end Ruby on Rails background job optimization and infrastructure tuning for scaling SaaS teams.</p>
                    <div class="social-links">
                        <a href="#" class="social-icon"><i class="fa-brands fa-github"></i></a>
                        <a href="#" class="social-icon"><i class="fa-brands fa-x-twitter"></i></a>
                        <a href="#" class="social-icon"><i class="fa-brands fa-linkedin"></i></a>
                    </div>
                </div>

                <!-- Column 2: Services -->
                <div class="footer-column">
                    <h4>Services</h4>
                    <ul class="footer-links">
                        <li><a href="services.html">Queue Performance</a></li>
                        <li><a href="services.html">Memory Optimization</a></li>
                        <li><a href="services.html">Dead Job Recovery</a></li>
                    </ul>
                </div>

                <!-- Column 3: Quick Links -->
                <div class="footer-column">
                    <h4>Quick Links</h4>
                    <ul class="footer-links">
                        <li><a href="case-studies.html">Case Studies</a></li>
                        <li><a href="pricing.html">Pricing</a></li>
                        <li><a href="contact.html">Contact Us</a></li>
                    </ul>
                </div>

                <!-- Column 4: Newsletter -->
                <div class="footer-column">
                    <h4>Stay Updated</h4>
                    <p class="text-secondary" style="font-size: 0.95rem; margin-bottom: 1rem;">Join our newsletter for infrastructure inspiration and optimization tips.</p>
                    <form class="newsletter-form">
                        <input type="email" placeholder="Your Email" required>
                        <button type="submit">Join</button>
                    </form>
                </div>
            </div>
            
            <div class="footer-bottom">
                <p>&copy; 2026 SidePulse Labs. All Rights Reserved.</p>
            </div>
        </div>
    </footer>`;

const directory = './';

fs.readdir(directory, (err, files) => {
    if (err) throw err;
    files.forEach(file => {
        if (path.extname(file) === '.html') {
            const filePath = path.join(directory, file);
            let content = fs.readFileSync(filePath, 'utf8');
            
            const footerRegex = /<footer[\s\S]*?<\/footer>/;
            
            if (footerRegex.test(content)) {
                content = content.replace(footerRegex, footerHtml);
            } else {
                content = content.replace('</body>', `${footerHtml}\n\n</body>`);
            }
            
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated ${file}`);
        }
    });
});
