document.getElementById('header-container').innerHTML = header('career');
document.getElementById('footer-container').innerHTML = footer('career');

var postData = [
  {
    title: 'Product Designer',
    tag: 'Design',
    description:
      'We’re looking for someone motivated and experienced to join our team.',
    location: 'Remote',
    type: 'Full-time',
  },
  {
    title: 'Engineering Manager',
    tag: 'Software Development',
    description:
      'We’re looking for someone motivated and experienced to join our team.',
    location: 'Remote',
    type: 'Full-time',
  },
  {
    title: 'Customer Success Manager',
    tag: 'Customer Success',
    description:
      'We’re looking for someone motivated and experienced to join our team.',
    location: 'Remote',
    type: 'Full-time',
  },
];

function populateContent() {
  const listLoader = document.getElementById('content-list-loader');
  const listEmpty = document.getElementById('content-list-empty');
  const listContainer = document.getElementById('content-list-container');
  const listBody = document.getElementById('content-list-body');

  var totalRecord = [];

  postData.forEach((item) => {
    const card = listBody.cloneNode(true);
    const divs = card.getElementsByTagName('div');

    const title = divs[0].getElementsByTagName('h5');
    const details = divs[0].getElementsByTagName('p');
    const listItem = divs[0].getElementsByTagName('li');
    const button = divs[0].getElementsByTagName('button');

    title[0].innerHTML = `${item.title} <span class="badge badge-pill badge-warning">${item.tag}</span>`;
    details[0].innerHTML = item.description;
    listItem[0].innerHTML = item.location;
    listItem[1].innerHTML = item.type;

    button[0].addEventListener('click', function () {
      window.open(item.application_url, '_blank');
    });

    totalRecord.push(card);
  });

  listLoader.classList.add('hidden');

  if (totalRecord.length === 0) {
    listEmpty.classList.remove('hidden');
    listContainer.classList.add('hidden');
  } else {
    listEmpty.classList.add('hidden');
    listContainer.classList.remove('hidden');

    while (listContainer.firstChild) {
      listContainer.removeChild(listContainer.firstChild);
    }
    totalRecord.forEach((item) => {
      listContainer.appendChild(item);
    });
  }
}

function fetchPostList(page = 1) {
  const options = {
    body: JSON.stringify({
      page: page,
    }),
  };

  fetchAPI(
    `https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/career/all`,
    'POST',
    null,
    options
  )
    .then((data) => {
      if (data?.message) {
        showToast('alert-toast-container', data.message, 'danger');
      } else {
        postData = data.items;
        populateContent(data.items);

        const apiResponse = data;

        const paginationElement = document.getElementById('pagination');
        const curPage = apiResponse.curPage;
        const nextPage = apiResponse.nextPage;
        const prevPage = apiResponse.prevPage;
        const pageTotal = apiResponse.pageTotal;

        // Clear the pagination links
        paginationElement.innerHTML = '';

        // Add the Previous button
        const previousButton = createPaginationButton(
          'Previous',
          prevPage,
          !prevPage
        );
        paginationElement.appendChild(previousButton);

        // Add the page numbers
        for (let page = 1; page <= pageTotal; page++) {
          const pageButton = createPaginationButton(
            page,
            page,
            page === curPage
          );
          paginationElement.appendChild(pageButton);
        }

        // Add the Next button
        const nextButton = createPaginationButton('Next', nextPage, !nextPage);
        paginationElement.appendChild(nextButton);

        function createPaginationButton(text, page, isActive = false) {
          const liElement = document.createElement('li');
          liElement.classList.add('page-item');
          if (isActive) {
            // liElement.classList.add('active');
          }
          if (!page) {
            liElement.classList.add('disabled');
          }

          const aElement = document.createElement('a');
          aElement.classList.add('page-link');
          aElement.href = 'javascript:void(0)'; // Set the href to "javascript:void(0)" to avoid page reload
          aElement.innerText = text;
          if (page) {
            aElement.addEventListener('click', () => onPageLinkClick(page));
          }

          liElement.appendChild(aElement);
          return liElement;
        }

        function onPageLinkClick(clickedPage) {
          fetchPostList(clickedPage);
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        }
      }
    })
    .catch((error) => {
      console.log(error);
      populateContent(postData);
    });
}

$(document).ready(function () {
  fetchPostList(1);
});
