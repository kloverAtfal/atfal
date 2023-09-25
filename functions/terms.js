document.getElementById('header-container').innerHTML = header('index');
document.getElementById('footer-container').innerHTML = footer('index');

document
  .getElementById('log-in-nav-btn')
  .addEventListener('click', function () {
    window.location.href = 'log-in';
  });

document
  .getElementById('sign-up-nav-btn')
  .addEventListener('click', function () {
    window.location.href = 'sign-up';
  });

const termsData = [
  {
    title: `Information We Collect`,
    description: `<p class="lead text-muted">
    Personal Information: When you sign up for an account or use our
    services, we may collect personal information such as your name,
    email address, contact information, and payment details.
  </p>
  <p class="lead text-muted">
    Usage Information: We gather data on how you interact with our
    website and services, including device information, browser type,
    IP address, and pages visited.
  </p>
  <p class="lead text-muted">
    Cookies: We use cookies and similar technologies to enhance your
    browsing experience, personalize content, and analyze usage
    patterns.
  </p>`,
  },
  {
    title: `How We Use Your Information`,
    description: `<p class="lead text-muted">
    Providing Services: We use your data to deliver our services, process transactions, and provide customer support.
  </p>
  <p class="lead text-muted">
  Improving User Experience: We analyze user behavior to enhance our website, tailor content, and develop new features.
  </p>
  <p class="lead text-muted">
  Marketing: We may send you promotional materials, updates, and offers based on your preferences.
  </p>`,
  },
  {
    title: `Data Sharing`,
    description: `<p class="lead text-muted">
    We do not sell, rent, or trade your personal information to third parties. However, we may share your data with:
  </p>
  <p class="lead text-muted">
  Service Providers: We may engage third-party service providers to assist with our operations, such as payment processing and customer support.
  </p>
  <p class="lead text-muted">
  Legal Compliance: We may disclose information to comply with legal obligations, protect our rights, or respond to lawful requests.
  </p>`,
  },
  {
    title: `Security`,
    description: `<p class="lead text-muted">
    We employ industry-standard security measures to protect your data from unauthorized access, disclosure, or alteration.
    </p>`,
  },
  {
    title: `Your Choices`,
    description: `<p class="lead text-muted">
    You can:
    </p>
    <p class="lead text-muted">
    Access Your Data:
Review and update your personal information by logging into your account.
    </p>
    <p class="lead text-muted">
    Cookies:
    Adjust your browser settings to manage or disable cookies.
    </p>
    <p class="lead text-muted">
    Unsubscribe:
    Opt out of receiving marketing communications at any time.
    </p>
    `,
  },
  {
    title: `Changes to this Privacy Policy`,
    description: `<p class="lead text-muted">
    We may update this Privacy Policy as our practices evolve. We will notify you of significant changes.
    </p>
    `,
  },
  {
    title: `Contact Us`,
    description: `<p class="lead text-muted">
    If you have questions or concerns about this Privacy Policy or your data, please contact us at hello@atfal.co
    </p>
    <p class="lead text-muted">
    By using our website and services, you agree to the terms outlined in this Privacy Policy.
    </p>
    `,
  },
];

const termsContainer = document.getElementById('terms-container');

termsData.forEach((item, index) => {
  const card = document.createElement('div');

  card.innerHTML = `
    <hr />
    <div class="row">
    <div class="col-12 col-lg-6 mb-10 mb-lg-0">
            <p class="lead text-muted">${item.title}</p>
          </div>
          <div class="col-12 col-lg-6">
          ${item.description}
    </div>
    </div>
  `;

  termsContainer.appendChild(card);
});

document.addEventListener('DOMContentLoaded', function () {
  const navbar = document.querySelector('.navbar');

  // Function to add or remove the "navbar-scrolled" class based on scroll position
  function toggleNavbarBlur() {
    if (window.scrollY > 0) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  }

  // Call the function on page load and whenever the user scrolls
  toggleNavbarBlur();
  window.addEventListener('scroll', toggleNavbarBlur);
});
