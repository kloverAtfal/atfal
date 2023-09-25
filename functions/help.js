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

const accordionData_1 = [
  {
    question: 'What is Atfal, and what services do you offer?',
    answer:
      'Atfal is a leading logistics and shipping platform specializing in parcel and shipment services, primarily from China to Kuala Lumpur. Our services encompass parcel tracking, secure payments, Alipay top-ups, user accounts, and an affiliate program for an enhanced logistics experience.',
  },
  {
    question: 'What sets Atfal apart from other logistics providers?',
    answer:
      'Atfal stands out with its commitment to innovation, security, global reach, strong partnerships, and a diverse team of professionals. We continually innovate to offer cutting-edge logistics solutions while prioritizing the security of your transactions.',
  },
  {
    question: 'Can I trust Atfal with my logistics needs?',
    answer:
      "Absolutely. Atfal's reputation is built on trust. We ensure the security of your data and payments and maintain a global network to deliver your shipments reliably.",
  },
  {
    question: `What is Atfal's vision for the future?`,
    answer:
      'Atfal envisions a future where logistics is seamless, reliable, and accessible to all. We aim to expand our global reach, introduce new features, and enhance our services to better serve our customers.',
  },
  {
    question: 'How can I join Atfal and start using your services?',
    answer:
      'Joining Atfal is easy. Simply click on the "Sign Up" or "Register" button on our homepage, complete the required information, and follow the prompts to create your account and start benefiting from our services.',
  },
];

const accordionData_2 = [
  {
    question: 'How can I track my parcels with Atfal?',
    answer: `Parcel tracking is straightforward with Atfal. Enter your tracking number on our website, and you'll receive real-time updates on your shipment's location and status.`,
  },
  {
    question: 'What kind of tracking information can I expect to see?',
    answer:
      'Our tracking provides detailed information, including the status of your parcel, expected delivery date, and any important status changes during transit.',
  },
  {
    question: 'Is parcel tracking available for international shipments?',
    answer: `
      Yes, Atfal offers parcel tracking for both domestic and international shipments, ensuring you have visibility into the entire journey.`,
  },
  {
    question: 'How often is tracking information updated?',
    answer: `Our tracking system updates information regularly, providing you with real-time insights into the progress of your shipment. You can check for updates as frequently as you like.
    `,
  },
  {
    question: `What should I do if there's a discrepancy or issue with my parcel's tracking information?`,
    answer: `If you encounter any discrepancies or issues with your parcel's tracking, please don't hesitate to reach out to our customer support team. We're here to assist and resolve any concerns.
    `,
  },
];

const accordionContainer = document.getElementById('accordion-container');

accordionData_1.forEach((item, index) => {
  const card = document.createElement('div');

  card.innerHTML = `
    <div >
      <div class="justify-content-between d-flex align-items-center" id="heading${index}">
          <h5 data-toggle="collapse" data-target="#collapse${index}" aria-expanded="false" aria-controls="collapse${index}">
            ${item.question}
          </h5>
          <span class="toggle-icon">+</span> 
      </div>
      <div id="collapse${index}" class="collapse" aria-labelledby="heading${index}" data-parent="#accordion-container">
          <p class="text-muted">
              ${item.answer}
          </p>
      </div>
      <hr>
    </div>
  `;

  accordionContainer.appendChild(card);

  const mainDiv = card.querySelector('div');
  const toggleIcon = card.querySelector('.toggle-icon');
  const heading = card.querySelector('h5');

  // Use Bootstrap collapse events to toggle the icon
  $(`#collapse${index}`).on('show.bs.collapse', () => {
    toggleIcon.textContent = '-';
    heading.setAttribute('aria-expanded', 'true');
  });

  $(`#collapse${index}`).on('hide.bs.collapse', () => {
    toggleIcon.textContent = '+';
    heading.setAttribute('aria-expanded', 'false');
  });

  mainDiv.addEventListener('click', () => {
    // Trigger a click on the heading to toggle the accordion
    heading.click();
  });
});

const accordionContainer2 = document.getElementById('accordion-container-2');

accordionData_2.forEach((item, index) => {
  const card = document.createElement('div');

  card.innerHTML = `
    <div>
      <div class="justify-content-between d-flex align-items-center" id="heading2-${index}"> <!-- Change the ID to distinguish from the first accordion -->
          <h5 data-toggle="collapse" data-target="#collapse2-${index}" aria-expanded="false" aria-controls="collapse2-${index}"> <!-- Change the data attributes and IDs accordingly -->
            ${item.question}
          </h5>
          <span class="toggle-icon">+</span> 
      </div>
      <div id="collapse2-${index}" class="collapse" aria-labelledby="heading2-${index}" data-parent="#accordion-container-2"> <!-- Change the data attributes and IDs accordingly -->
          <p class="text-muted">
              ${item.answer}
          </p>
      </div>
      <hr>
    </div>
  `;

  accordionContainer2.appendChild(card);

  const mainDiv = card.querySelector('div');
  const toggleIcon = card.querySelector('.toggle-icon');
  const heading = card.querySelector('h5');

  // Use Bootstrap collapse events to toggle the icon
  $(`#collapse2-${index}`).on('show.bs.collapse', () => {
    toggleIcon.textContent = '-';
    heading.setAttribute('aria-expanded', 'true');
  });

  $(`#collapse2-${index}`).on('hide.bs.collapse', () => {
    toggleIcon.textContent = '+';
    heading.setAttribute('aria-expanded', 'false');
  });

  mainDiv.addEventListener('click', () => {
    // Trigger a click on the heading to toggle the accordion
    heading.click();
  });
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
