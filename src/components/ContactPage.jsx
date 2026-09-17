
import "./ContactPage.css";

export default function ContactPage() {
  return (
    <div className="contact-page">

      <img
        src="/pages/contact.png"
        alt="Atharv Farjand Contact"
        className="contact-page-image"
      />

      {/* Email */}
      <a
        href="mailto:YOUR_EMAIL@example.com"
        className="contact-link contact-email"
        aria-label="Email"
      />

      {/* LinkedIn */}
      <a
        href="YOUR_LINKEDIN_URL"
        target="_blank"
        rel="noopener noreferrer"
        className="contact-link contact-linkedin"
        aria-label="LinkedIn"
      />

      {/* GitHub */}
      <a
        href="YOUR_GITHUB_URL"
        target="_blank"
        rel="noopener noreferrer"
        className="contact-link contact-github"
        aria-label="GitHub"
      />

      {/* Resume */}
      <a
        href="/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="contact-link contact-resume"
        aria-label="Resume"
      />

    </div>
  );
}

