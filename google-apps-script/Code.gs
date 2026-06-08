/**
 * Unicargo IEEPA Tariff Refund — Lead Handler (Google Apps Script Web App)
 *
 * What it does on every form submission:
 *   1. Appends the lead to a Google Sheet  (durable record)
 *   2. Emails your team a "new lead" notification
 *   3. Emails the LEAD a branded message, branching on their ACE answer:
 *        - ACE = "no"  -> attaches ACE Registration Guide + ES001/ES003 file-export guide
 *        - ACE = "yes" -> attaches ES001/ES003 file-export guide only
 *
 * SETUP: see GOOGLE_SHEET_EMAIL_SETUP.md (step-by-step).
 */

// ============================================================
//  CONFIG — edit these five values, then deploy
// ============================================================
var CONFIG = {
  SHEET_NAME: 'Leads',

  // Who receives the internal "new lead" notification:
  NOTIFY_EMAIL: 'moshe@explorads.com',

  // Reply-to + sender display name on the email to the lead:
  REPLY_TO: 'moshe@explorads.com',
  FROM_NAME: 'Unicargo Customs Advisory',

  // Google Drive file IDs of the two PDFs (see setup guide for how to get these).
  // Leave as-is and the email still sends — just without that attachment.
  ACE_GUIDE_FILE_ID: '1xoSjenZfDsaDXD5-d1LNn4cmI8aX25K6',
  ES_GUIDE_FILE_ID:  '1FkFR9q_4cqS0Sx0NroD1kt4XjnDeodq4'
};
// ============================================================


function doPost(e) {
  try {
    var p = (e && e.parameter) ? e.parameter : {};
    var data = {
      company:       (p.company || '').trim(),
      email:         (p.email || '').trim(),
      tariffSpend:   p.tariffSpend || '',
      aceRegistered: (p.aceRegistered || '').toLowerCase(),
      timestamp:     new Date()
    };

    logToSheet_(data);
    if (data.email) sendLeadEmail_(data);
    notifyTeam_(data);

    return json_({ ok: true });
  } catch (err) {
    // Still try to capture the error row so no lead is silently lost
    try { logToSheet_({ company: 'ERROR', email: String(err), tariffSpend: '', aceRegistered: '', timestamp: new Date() }); } catch (e2) {}
    return json_({ ok: false, error: String(err) });
  }
}

// Health check — open the web app URL in a browser to confirm it's live
function doGet() {
  return json_({ ok: true, service: 'Unicargo lead handler' });
}

function logToSheet_(d) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(CONFIG.SHEET_NAME) || ss.insertSheet(CONFIG.SHEET_NAME);
  if (sh.getLastRow() === 0) {
    sh.appendRow(['Timestamp', 'Company', 'Email', 'Annual Tariff Spend', 'ACE Registered']);
    sh.getRange(1, 1, 1, 5).setFontWeight('bold');
  }
  sh.appendRow([d.timestamp, d.company, d.email, d.tariffSpend, d.aceRegistered]);
}

function sendLeadEmail_(d) {
  var hasAce = d.aceRegistered === 'yes';

  var subject = hasAce
    ? 'Your IEEPA audit — how to export your ACE files'
    : 'Your IEEPA audit — ACE registration + file export steps';

  var attachments = [];
  var esGuide  = safeBlob_(CONFIG.ES_GUIDE_FILE_ID);
  var aceGuide = safeBlob_(CONFIG.ACE_GUIDE_FILE_ID);
  if (esGuide) attachments.push(esGuide);
  if (!hasAce && aceGuide) attachments.push(aceGuide);

  MailApp.sendEmail({
    to: d.email,
    subject: subject,
    htmlBody: hasAce ? aceYesBody_(d) : aceNoBody_(d),
    name: CONFIG.FROM_NAME,
    replyTo: CONFIG.REPLY_TO,
    attachments: attachments
  });
}

function aceYesBody_(d) {
  return wrap_(
    'You\'re ready to go',
    '<p>Hi' + (d.company ? ' ' + esc_(d.company) + ' team' : '') + ',</p>' +
    '<p>Thanks for requesting your IEEPA tariff refund audit. Since you\'re already ' +
    'registered on <strong>ACE</strong>, we can move straight to pulling your data.</p>' +
    '<h3>Next step: export your ACE files</h3>' +
    '<p>Attached is our step-by-step guide for extracting the two reports we need ' +
    '(<strong>ES-001</strong> and <strong>ES-003</strong>) from your ACE account. ' +
    'It takes about 10 minutes.</p>' +
    '<ol>' +
      '<li>Open the attached <em>ES-001 &amp; ES-003 Download Guide</em>.</li>' +
      '<li>Follow the steps to generate and download both reports.</li>' +
      '<li>Reply to this email with the files attached — we\'ll start your audit and ' +
      'return a full entry-by-entry breakdown within 24–48 hours.</li>' +
    '</ol>' +
    '<p>Questions at any point? Just reply to this email.</p>'
  );
}

function aceNoBody_(d) {
  return wrap_(
    'Let\'s get you set up',
    '<p>Hi' + (d.company ? ' ' + esc_(d.company) + ' team' : '') + ',</p>' +
    '<p>Thanks for requesting your IEEPA tariff refund audit. You mentioned you\'re ' +
    '<strong>not yet registered on ACE</strong> — no problem, we\'ll guide you through it. ' +
    'It usually takes 7–10 days.</p>' +
    '<h3>Step 1: Register for ACE</h3>' +
    '<p>Attached is our <em>ACE Registration Guide</em> with step-by-step instructions ' +
    'and the required forms. Follow it to create your account.</p>' +
    '<h3>Step 2: Export the files we need</h3>' +
    '<p>Once your ACE account is active, use the attached <em>ES-001 &amp; ES-003 Download ' +
    'Guide</em> to generate and download the two reports we use to run your audit.</p>' +
    '<h3>Step 3: Send them to us</h3>' +
    '<p>Reply to this email with both files attached and we\'ll return a full ' +
    'entry-by-entry refund breakdown within 24–48 hours.</p>' +
    '<p>Stuck on registration? Reply to this email and we\'ll help you through it.</p>'
  );
}

function notifyTeam_(d) {
  MailApp.sendEmail({
    to: CONFIG.NOTIFY_EMAIL,
    subject: 'New IEEPA lead: ' + (d.company || d.email || 'unknown'),
    name: CONFIG.FROM_NAME,
    htmlBody:
      '<p>New lead submitted on the landing page:</p>' +
      '<ul>' +
        '<li><strong>Company:</strong> ' + esc_(d.company) + '</li>' +
        '<li><strong>Email:</strong> ' + esc_(d.email) + '</li>' +
        '<li><strong>Annual tariff spend:</strong> ' + esc_(d.tariffSpend) + '</li>' +
        '<li><strong>ACE registered:</strong> ' + esc_(d.aceRegistered) + '</li>' +
        '<li><strong>Time:</strong> ' + d.timestamp + '</li>' +
      '</ul>'
  });
}

// ---------- helpers ----------

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function safeBlob_(id) {
  if (!id || id.indexOf('PASTE') === 0) return null;
  try { return DriveApp.getFileById(id).getBlob(); } catch (e) { return null; }
}

function wrap_(heading, inner) {
  return '' +
    '<div style="font-family:Arial,Helvetica,sans-serif;color:#1A1A1A;max-width:600px;">' +
      '<div style="background:#1A3A52;padding:20px 24px;">' +
        '<span style="color:#fff;font-size:20px;font-weight:bold;">Uni</span>' +
        '<span style="color:#00BFB3;font-size:20px;font-weight:bold;">CARGO</span>' +
      '</div>' +
      '<div style="padding:24px;">' +
        '<h2 style="color:#1A3A52;margin-top:0;">' + esc_(heading) + '</h2>' +
        inner +
        '<p style="margin-top:28px;color:#666;font-size:13px;">' +
          'Unicargo Customs Advisory · This email does not constitute legal or customs advice.' +
        '</p>' +
      '</div>' +
    '</div>';
}

function esc_(s) {
  return String(s == null ? '' : s).replace(/[<>&]/g, function (c) {
    return { '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c];
  });
}

// Optional: run this once from the editor to test without the web form.
function testSubmission_() {
  doPost({ parameter: {
    company: 'Test Co',
    email: CONFIG.NOTIFY_EMAIL,
    tariffSpend: '1m-5m',
    aceRegistered: 'no'
  }});
}
