# Unicargo IEEPA Tariff Refund Landing Page

Production-ready landing page for IEEPA tariff refund audit service.

## Features

- ✅ Two-flow logic (ACE registered vs not registered)
- ✅ Escrow model with BDO partner prominently featured
- ✅ Sticky form (desktop) / inline form (mobile)
- ✅ Multiple CTAs throughout page
- ✅ Sample audit dashboard section
- ✅ FAQ with escrow Q&A
- ✅ Mobile-responsive design
- ✅ Fast load time (<3 seconds)

## Quick Start

### Local Testing
```bash
# Open in browser
open index.html
# or double-click the file
```

### Deploy to Railway
1. Push changes to GitHub
2. Railway auto-deploys (30-60 seconds)
3. Check live URL: `unicargo-tariff-refund-landing.up.railway.app`

## Structure

```
├── index.html              (Main landing page — all CSS/JS embedded)
├── README.md               (This file)
└── .gitignore              (Git configuration)
```

## Making Changes

1. Edit `index.html` in your editor
2. Test locally in browser (F5 to refresh)
3. Commit and push to GitHub
   ```bash
   git add index.html
   git commit -m "Update: [what changed]"
   git push origin main
   ```
4. Railway auto-deploys (check live URL in 1 minute)

## Customization

### Update Brand Colors
Find `:root` section in `<style>`:
```css
--primary: #00BFB3;        /* Teal */
--secondary: #1A3A52;      /* Navy */
--accent: #7FCD00;         /* Lime */
```

### Update Company Name
Search for "Uni**CARGO**" and replace with your company name

### Update Form Submission
Find `<form id="mainForm">` and update form action to your email service (Formspree, Zapier, etc.)

### Update Logo/Images
Replace dashboard screenshot placeholder with your actual audit screenshot

## Deployment

Automatically deployed to Railway on every push to `main` branch.

- **Repository:** `unicargo-tariff-refund-landing`
- **Branch:** `main`
- **Live URL:** `https://unicargo-tariff-refund-landing.up.railway.app`
- **Custom Domain:** Configure in Railway settings

## Support

For detailed customization guide, see `LANDING_PAGE_DEPLOYMENT_GUIDE.md`

For email sequence setup, see `FOLLOW_UP_EMAIL_SEQUENCES.md`

For launch strategy, see `LAUNCH_SUMMARY_AND_NEXT_STEPS.md`

---

**Last Updated:** June 2026  
**Built for:** Unicargo Customs Advisory  
**Status:** Production Ready
