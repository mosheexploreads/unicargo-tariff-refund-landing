# 🚀 START HERE — Get Your Landing Page Live in 10 Minutes

## What You Have

```
C:\Users\moshe\Downloads\Explorads\Unicargo\
├── index.html                           ← Your landing page (ready to deploy)
├── .gitignore                           ← GitHub config (already set up)
├── README.md                            ← GitHub repo documentation
├── GITHUB_RAILWAY_SETUP.md              ← Detailed setup instructions
└── [Other docs for reference]
```

---

## 3-Step Quick Start

### ✅ Step 1: Create GitHub Repo (2 min)

Go to https://github.com/new

Fill in:
```
Repository name: unicargo-tariff-refund-landing
Public: Yes
```

Click **"Create repository"** → You'll see your new repo URL

---

### ✅ Step 2: Push Your Files to GitHub (5 min)

Open **PowerShell** in your Unicargo folder and copy/paste:

```powershell
# Move to your project folder
cd "C:\Users\moshe\Downloads\Explorads\Unicargo"

# Initialize Git
git init
git remote add origin https://github.com/mosheexploreads/unicargo-tariff-refund-landing.git
git branch -M main

# Push all files
git add .
git commit -m "Initial commit: IEEPA tariff refund landing page"
git push -u origin main
```

**Note:** If Git asks for password, use your GitHub Personal Access Token (see detailed instructions in GITHUB_RAILWAY_SETUP.md)

---

### ✅ Step 3: Deploy to Railway (3 min)

1. Go to https://railway.app
2. Click **"+ New Project"**
3. Select **"Deploy from GitHub repo"**
4. Select: `unicargo-tariff-refund-landing`
5. Click **"Deploy"**

**Done!** Railway gives you a live URL (looks like: `unicargo-tariff-refund-landing.up.railway.app`)

---

## Test It

Open your live URL in a browser. You should see:
- ✅ Landing page loads
- ✅ Form responds
- ✅ Mobile looks good
- ✅ All colors correct

---

## From Now On: Easy Updates

Every time you want a change:

```powershell
# 1. Tell me what to change

# 2. I edit index.html and push to GitHub

# 3. You just run:
git pull origin main

# 4. Open your live URL — changes are live in 30-60 seconds
```

No manual uploads. No FTP. No complexity.

---

## Troubleshooting

### "Git not found"
→ Install Git: https://git-scm.com/download/win

### "Fatal: Repository not found"
→ Check username is correct: `mosheexploreads`  
→ Use Personal Access Token instead of password (see GITHUB_RAILWAY_SETUP.md)

### "Push rejected"
→ Make sure repo is public on GitHub  
→ Check branch is `main` (not `master`)

### Can't find Railway URL
→ Go to Railway project → Click **"Settings"** → Copy "Public URL"

---

## What's Next?

Once live, we can:
1. **Connect form** → Wire to Zapier/Formspree/HubSpot
2. **A/B test** → Change headlines, test different CTAs
3. **Add tracking** → Google Analytics, Facebook pixel
4. **Custom domain** → Point tariff-refund.yourcompany.com to it

But first: **Get it live and test it.**

---

## One File You Really Need

👉 **GITHUB_RAILWAY_SETUP.md** — This has detailed steps with examples. Bookmark it.

---

**Ready?** Start with Step 1 above. Let me know if you hit any snags.

Once you have the live URL, send it to me and I can start making improvements right away.
