# Lead Capture Setup — Google Sheet + Auto-Email (10 minutes)

This connects the landing page form to a **Google Sheet** and sends an **automatic, branded email** to each lead — with the right PDFs attached based on whether they have an ACE account.

No paid tools. Everything runs in your Google account.

---

## What you'll end up with

- Every lead saved as a row in a Google Sheet
- You get a "new lead" notification email
- The lead gets an instant email:
  - **No ACE account** → ACE Registration Guide + ES-001/ES-003 file-export guide
  - **Has ACE account** → ES-001/ES-003 file-export guide only

---

## Step 1 — Create the Google Sheet (1 min)

1. Go to https://sheets.google.com → **Blank spreadsheet**
2. Name it: **Unicargo IEEPA Leads**
3. Leave it open.

---

## Step 2 — Upload the two PDFs to Google Drive (2 min)

The auto-email attaches these. They must live in Google Drive.

1. Go to https://drive.google.com
2. Upload these two files (from your `Explorads\Unicargo` folder):
   - `ACE Registratio Guide-Unicargo.May.2026.pdf`
   - `ES001 and ES003 download guide.pdf`
3. For **each** file: right-click → **Open** (or double-click). Look at the browser URL:
   ```
   https://drive.google.com/file/d/1AbCdEfGhIjKlMnOpQrStUvWxYz/view
                                    └──────────── this is the FILE ID ────────────┘
   ```
4. Copy the **FILE ID** (the long string between `/d/` and `/view`) for each.

   Keep both IDs handy:
   - ACE Registration Guide ID: `________________`
   - ES-001/ES-003 Guide ID: `________________`

---

## Step 3 — Add the script (3 min)

1. Back in your Google Sheet, click **Extensions → Apps Script**
2. Delete any starter code in the editor
3. Open `google-apps-script/Code.gs` (in your project folder), copy **all** of it, paste into the editor
4. At the top, edit the **CONFIG** block:
   ```javascript
   var CONFIG = {
     SHEET_NAME: 'Leads',
     NOTIFY_EMAIL: 'moshet20@gmail.com',     // <- where you want lead alerts
     REPLY_TO: 'moshet20@gmail.com',         // <- replies from leads go here
     FROM_NAME: 'Unicargo Customs Advisory',
     ACE_GUIDE_FILE_ID: 'PASTE_ACE...',      // <- paste ACE guide FILE ID
     ES_GUIDE_FILE_ID:  'PASTE_ES...'        // <- paste ES guide FILE ID
   };
   ```
5. Click the **💾 Save** icon.

---

## Step 4 — Authorize it (1 min)

1. In the Apps Script toolbar, choose the function **`testSubmission_`** from the dropdown
2. Click **Run**
3. A permissions popup appears → **Review permissions** → pick your Google account → **Allow**
   - (Google may warn "unverified app" — click **Advanced → Go to (project name)**. This is your own script; it's safe.)
4. Check: your Sheet should now have a test row, and `NOTIFY_EMAIL` + the test lead email should receive messages.

---

## Step 5 — Deploy as a Web App (2 min)

1. Top-right: **Deploy → New deployment**
2. Click the gear ⚙ next to "Select type" → **Web app**
3. Set:
   - **Description:** `Unicargo lead handler`
   - **Execute as:** **Me**
   - **Who has access:** **Anyone**
4. Click **Deploy** → **Authorize** if asked
5. **Copy the Web app URL** — it looks like:
   ```
   https://script.google.com/macros/s/AKfy..../exec
   ```

---

## Step 6 — Send me the URL

Paste that Web app URL back to me in chat. I'll wire it into the landing page and push it live.

That's it. From then on, every form submission flows straight into your Sheet and triggers the right email automatically.

---

## Testing after it's live

1. Go to the live landing page
2. Submit the form with **ACE = No** using a test email you control → you should get the email **with both PDFs**
3. Submit again with **ACE = Yes** → email **with just the ES guide**
4. Check your Sheet — both rows should appear

---

## Updating the emails or PDFs later

- **Change email wording:** edit `aceYesBody_` / `aceNoBody_` in the script → Save → **Deploy → Manage deployments → Edit → Version: New → Deploy**
- **Swap a PDF:** upload the new file to Drive, copy its new FILE ID into CONFIG, redeploy
- (Re-deploying with a **new version** is required for script changes to take effect — just saving isn't enough for the live web app.)

---

## Troubleshooting

| Problem | Fix |
|---|---|
| No email received | Run `testSubmission_` in the editor; check the execution log (View → Executions) for errors |
| Email sends but no attachment | The FILE ID is wrong or the file isn't in *your* Drive. Re-copy the ID from the Drive URL |
| "Authorization required" on live form | You deployed with "Execute as: Me" + "Anyone" — re-check Step 5 settings |
| Sheet not updating | Make sure the script is bound to the Sheet (opened via Extensions → Apps Script *from that sheet*) |
| Gmail daily limit | Free Gmail allows ~100 emails/day via Apps Script; Workspace allows ~1,500. Fine for early volume |
