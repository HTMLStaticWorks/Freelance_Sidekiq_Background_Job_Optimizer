import os
import re

footer_html = """    <footer class="main-footer">
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
    </footer>"""

css_updates = """
.social-links {
    display: flex;
    gap: 1.25rem;
    margin-top: 1.5rem;
}

.social-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--text-primary);
    font-size: 1.25rem;
    transition: color 0.3s ease;
    text-decoration: none;
}

.social-icon:hover {
    color: var(--accent);
}

.newsletter-form {
    display: flex;
    margin-top: 1.5rem;
}

.newsletter-form input {
    background: transparent;
    border: 1px solid var(--glass-border);
    border-right: none;
    padding: 0.75rem 1rem;
    color: var(--text-primary);
    border-radius: 0.5rem 0 0 0.5rem;
    flex-grow: 1;
    outline: none;
    font-family: inherit;
    font-size: 0.9rem;
    min-width: 0;
}

.newsletter-form input:focus {
    border-color: var(--accent);
}

.newsletter-form button {
    background: var(--gradient-primary);
    border: none;
    color: #fff;
    padding: 0.75rem 1.5rem;
    border-radius: 0 0.5rem 0.5rem 0;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: inherit;
}

.newsletter-form button:hover {
    box-shadow: 0 4px 15px rgba(34, 211, 238, 0.4);
}

.footer-bottom {
    padding-top: 2rem;
    border-top: 1px solid var(--glass-border);
    text-align: center;
}

.footer-bottom p {
    font-size: 0.85rem;
    color: var(--text-secondary);
}

@media (max-width: 1024px) {
    .footer-grid {
        grid-template-columns: 1fr 1fr;
        gap: 3rem;
    }
}

@media (max-width: 640px) {
    .footer-grid {
        grid-template-columns: 1fr;
        gap: 2.5rem;
        text-align: left;
    }
    
    .social-links {
        justify-content: flex-start;
    }
}
"""

def update_html_files():
    for filename in os.listdir('.'):
        if filename.endswith('.html'):
            with open(filename, 'r', encoding='utf-8') as f:
                content = f.read()

            # First, try to replace an existing footer
            if re.search(r'<footer.*?</footer>', content, flags=re.DOTALL):
                new_content = re.sub(r'<footer.*?</footer>', footer_html, content, flags=re.DOTALL)
            else:
                # If no footer exists, inject before </body>
                new_content = content.replace('</body>', f'{footer_html}\\n\\n</body>')

            if new_content != content:
                with open(filename, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Updated {filename}")

def update_css():
    css_path = 'assets/css/style.css'
    with open(css_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    split_marker = ".footer-links a:hover {\\n    color: var(--accent);\\n    padding-left: 5px;\\n}"
    if split_marker in content:
        parts = content.split(split_marker)
        new_css = parts[0] + split_marker + "\\n" + css_updates
        with open(css_path, 'w', encoding='utf-8') as f:
            f.write(new_css)
        print("Updated style.css")
    else:
        print("Could not find split marker in CSS")

if __name__ == '__main__':
    update_html_files()
    update_css()
