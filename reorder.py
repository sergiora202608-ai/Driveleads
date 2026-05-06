import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

hero_match = re.search(r'(<body.*?</section>\s*)<section class="why-youtube-section">', content, re.DOTALL)
why_youtube_match = re.search(r'(<section class="why-youtube-section">.*?</section>\s*)<section class="funnel-section">', content, re.DOTALL)
funnel_match = re.search(r'(<section class="funnel-section">.*?</section>\s*)<section class="steps-section">', content, re.DOTALL)
steps_match = re.search(r'(<section class="steps-section">.*?</section>\s*)<section class="success-section">', content, re.DOTALL)
success_match = re.search(r'(<section class="success-section">.*?</section>\s*)<section class="cta-section">', content, re.DOTALL)
rest_match = re.search(r'(<section class="cta-section">.*)', content, re.DOTALL)

part1 = hero_match.group(1)
part2 = why_youtube_match.group(1)
part3 = funnel_match.group(1)
part4 = steps_match.group(1)
part5 = success_match.group(1)
part6 = rest_match.group(1)

# New Order
new_content = part1 + part5 + part4 + part3 + part2 + part6

# Inject Sticky CTA before </body>
sticky_cta = """
    <div class="sticky-cta">
        <div class="sticky-container">
            <span class="sticky-text">Si no vendemos, no pagas.</span>
            <a href="#" class="sticky-btn">+ Info aquí</a>
        </div>
    </div>
"""
new_content = new_content.replace('</body>', sticky_cta + '\n</body>')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_content)
