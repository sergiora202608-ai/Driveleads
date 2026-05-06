const fs = require('fs');

const content = fs.readFileSync('index.html', 'utf-8');

const heroMatch = content.match(/(<body[\s\S]*?<\/section>\s*)<section class="why-youtube-section">/);
const whyYoutubeMatch = content.match(/(<section class="why-youtube-section">[\s\S]*?<\/section>\s*)<section class="funnel-section">/);
const funnelMatch = content.match(/(<section class="funnel-section">[\s\S]*?<\/section>\s*)<section class="steps-section">/);
const stepsMatch = content.match(/(<section class="steps-section">[\s\S]*?<\/section>\s*)<section class="success-section">/);
const successMatch = content.match(/(<section class="success-section">[\s\S]*?<\/section>\s*)<section class="cta-section">/);
const restMatch = content.match(/(<section class="cta-section">[\s\S]*)/);

if (!heroMatch || !whyYoutubeMatch || !funnelMatch || !stepsMatch || !successMatch || !restMatch) {
    console.error("Match failed!");
    process.exit(1);
}

const part1 = heroMatch[1];
const part2 = whyYoutubeMatch[1];
const part3 = funnelMatch[1];
const part4 = stepsMatch[1];
const part5 = successMatch[1];
const part6 = restMatch[1];

// New Order:
// 1. Hero (part1)
// 2. Success (part5)
// 3. Steps (part4)
// 4. Funnel (part3)
// 5. Why Youtube (part2)
// 6. CTA+Rest (part6)

let newContent = part1 + part5 + part4 + part3 + part2 + part6;

const stickyCta = `
    <div class="sticky-cta">
        <div class="sticky-container">
            <span class="sticky-text">Si no vendemos, no pagas.</span>
            <a href="#" class="sticky-btn">+ Info aquí</a>
        </div>
    </div>
`;
newContent = newContent.replace('</body>', stickyCta + '</body>');

fs.writeFileSync('index.html', newContent, 'utf-8');
console.log("Success!");
