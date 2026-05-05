// ============================================================
//  HATUA ZA USANIDI WA EMAILJS
//  1. Nenda https://www.emailjs.com na ujiandikishe (bure)
//  2. Bonyeza "Add New Service" → chagua Gmail au barua pepe yako
//     → Nakili SERVICE_ID
//  3. Bonyeza "Email Templates" → "Create New Template"
//     Weka maudhui haya kwenye template:
//
//     Subject:  Ujumbe Mpya kutoka {{first_name}} {{last_name}}
//
//     Body:
//     Jina:     {{first_name}} {{last_name}}
//     Barua:    {{email}}
//     Simu:     {{phone}}
//     Mada:     {{subject}}
//     Ujumbe:   {{message}}
//
//     → Nakili TEMPLATE_ID
//  4. Nenda Account → API Keys → Nakili PUBLIC_KEY
//  5. Weka maadili hayo hapa chini badala ya '...'
// ============================================================

const EMAILJS_PUBLIC_KEY  = 's7FE-R2IXceo2w_NS';
const EMAILJS_SERVICE_ID  = 'service_6x0ilu6';
const EMAILJS_TEMPLATE_ID = 'template_fpcn7tn';

// Anzisha EmailJS
emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

document.addEventListener('DOMContentLoaded', () => {
  const form       = document.getElementById('contact-form');
  const submitBtn  = document.getElementById('submit-btn');
  const btnText    = document.getElementById('btn-text');
  const spinner    = document.getElementById('btn-spinner');
  const successBox = document.getElementById('form-success');
  const errorBox   = document.getElementById('form-error');
  const errorDetail = document.getElementById('error-detail');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Thibitisha fomu
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Onyesha spinner, zima kitufe
    setLoading(true);
    successBox.classList.add('hidden');
    errorBox.classList.add('hidden');

    // Kusanya data ya fomu
    const templateParams = {
      first_name: document.getElementById('first_name').value.trim(),
      last_name:  document.getElementById('last_name').value.trim(),
      email:      document.getElementById('email').value.trim(),
      phone:      document.getElementById('phone').value.trim() || 'Haikutolewa',
      subject:    document.getElementById('subject').value,
      message:    document.getElementById('message').value.trim(),
    };

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);

      // Mafanikio
      form.reset();
      successBox.classList.remove('hidden');
      successBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    } catch (err) {
      // Hitilafu
      console.error('EmailJS error:', err);
      const msg = err?.text || 'Hitilafu isiyojulikana. Tafadhali jaribu tena.';
      errorDetail.textContent = msg;
      errorBox.classList.remove('hidden');
      errorBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    } finally {
      setLoading(false);
    }
  });

  function setLoading(isLoading) {
    submitBtn.disabled = isLoading;
    spinner.classList.toggle('hidden', !isLoading);
    btnText.textContent = isLoading ? 'Inatuma...' : 'Tuma Ujumbe';
    submitBtn.classList.toggle('opacity-70', isLoading);
    submitBtn.classList.toggle('cursor-not-allowed', isLoading);
  }
});
