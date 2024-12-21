function sendEmail(event) {
  event.preventDefault();

  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("body").value.trim();

  const mailtoLink =
    `mailto:your_email@example.com` +
    `?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(message)}`;

  window.location.href = mailtoLink;
}
