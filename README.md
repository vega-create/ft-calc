# calc.freetoolkit.cc — Free Online Calculators

20 free calculator tools built with Astro + React Islands. Part of the FreeToolkit ecosystem.

## Tools (20)

### 🔢 Everyday Math
- Percentage Calculator — %, % change, what %
- Tip Calculator — bill splitting, presets
- Discount Calculator — sale price finder
- Average Calculator — mean, median, mode
- Random Number Generator — custom range

### 💰 Finance
- Compound Interest Calculator — with monthly contributions
- Loan Calculator — monthly payments, amortization
- Salary to Hourly Converter — full breakdown
- Unit Price Calculator — compare shopping deals

### 📅 Time & Date
- Age Calculator — exact age + next birthday countdown
- Date Difference Calculator — days, weeks, months between dates
- Time Zone Converter — 14 world time zones

### ❤️ Health
- BMI Calculator — imperial & metric
- Calorie Calculator — TDEE with activity levels
- Body Fat Percentage Calculator — US Navy method

### 🎓 Academic
- GPA Calculator — letter grades + credits
- Grade Calculator — final exam score needed

### 🔄 Conversion
- Temperature Converter — °C, °F, K
- Length Converter — 8 units (mm to miles)
- Weight Converter — 7 units (mg to metric tons)

## Tech Stack
- **Framework:** Astro 5.17
- **Interactive tools:** React Islands (client-side only)
- **Styling:** Tailwind CSS
- **Hosting:** Vercel
- **Colors:** Primary #2563EB (blue) / Accent #6B7280 (gray)

## Setup

```bash
# Install
npm install

# Dev
npm run dev

# Build
npm run build
```

## Deploy

```bash
# Push to GitHub
cd ~/Desktop/calc-freetoolkit
git init && git add -A && git commit -m "初始版本"
git branch -M main
git remote add origin https://github.com/vega-create/ft-calc.git
git push -u origin main

# Import to Vercel → set subdomain: calc.freetoolkit.cc
# Add DNS: CNAME calc → cname.vercel-dns.com
```

## After Deploy Checklist
1. ✅ Vercel subdomain: calc.freetoolkit.cc
2. ✅ DNS CNAME record
3. ⏳ Create GTM container → fill in `site.config.ts`
4. ⏳ Create GA4 property → add to GTM
5. ⏳ Submit sitemap to GSC: `sitemap-index.xml`
6. ⏳ AdSense: set `enabled: true` after freetoolkit.cc approval
7. ⏳ GitHub Actions: add VERCEL_TOKEN, ORG_ID, PROJECT_ID secrets
