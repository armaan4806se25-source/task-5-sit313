function Footer() {

  return (

    <footer
      className="site-footer"
      id="community"
    >

      {/* Newsletter */}
      <div className="newsletter">

        <div>

          <h2>
            Sign Up For Our Daily Insider
          </h2>

          <p>
            Get useful development resources
            and new content in your inbox.
          </p>

        </div>

        <form
          className="newsletter-form"
          onSubmit={(e) => e.preventDefault()}
        >

          <input
            type="email"
            placeholder="Enter your email"
            required
          />

          <button type="submit">
            Subscribe
          </button>

        </form>

      </div>


      {/* Footer Links */}
      <div className="footer-main">

        {/* Explore */}
        <div>

          <h3>
            Explore
          </h3>

          <a href="/">
            Home
          </a>

          <a href="#community">
            Questions
          </a>

          <a href="#articles">
            Articles
          </a>

          <a href="#tutorials">
            Tutorials
          </a>

        </div>


        {/* Support */}
        <div>

          <h3>
            Support
          </h3>

          <a href="#community">
            FAQs
          </a>

          <a href="#community">
            Help
          </a>

          <a href="#community">
            Contact Us
          </a>

        </div>


        {/* Social Media */}
        <div>

          <h3>
            Stay Connected
          </h3>

          <div className="socials">

            <a
              href="#community"
              aria-label="Facebook"
            >
              f
            </a>

            <a
              href="#community"
              aria-label="Twitter"
            >
              t
            </a>

            <a
              href="#community"
              aria-label="Instagram"
            >
              i
            </a>

          </div>

        </div>

      </div>


      {/* Copyright */}
      <div className="footer-bottom">

        <strong>
          DEV@Deakin 2026
        </strong>

        <div className="legal-links">

          <a href="#community">
            Privacy Policy
          </a>

          <a href="#community">
            Terms
          </a>

          <a href="#community">
            Code of Conduct
          </a>

        </div>

      </div>

    </footer>
  );
}

export default Footer;