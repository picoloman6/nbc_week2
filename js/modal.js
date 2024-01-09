const InfoModal = (movie, $body) => {
  const { id, title, rating } = movie;

  const $wrapper = document.createElement('div');
  const $modal = document.createElement('div');
  const $header = document.createElement('div');
  const $title = document.createElement('span');
  const $content = document.createElement('div');
  const $id = document.createElement('span');
  const $rating = document.createElement('span');
  const $button = document.createElement('button');

  $wrapper.className = 'info-modal-wrapper';
  $modal.className = 'info-modal-window';
  $header.className = 'info-modal-header';
  $content.className = 'info-modal-content';
  $button.className = 'info-modal-button';

  if (title.length > 20) {
    $title.classList.add('slide-text');
  }

  $title.textContent = title;
  $id.textContent = `id : ${id}`;
  $rating.textContent = `평점 : ${rating}`;
  $button.textContent = '닫기';

  $header.append($title);
  $content.appendChild($id);
  $content.appendChild($rating);
  $modal.appendChild($header);
  $modal.appendChild($content);
  $modal.appendChild($button);
  $wrapper.appendChild($modal);

  const closeModal = () => {
    $body.style.overflow = 'auto';
    $body.removeChild($wrapper);
  };

  $button.addEventListener('click', () => {
    closeModal();
  });

  $wrapper.addEventListener('click', (e) => {
    e.target.className === 'info-modal-wrapper' && closeModal();
  });

  return $wrapper;
};

export default InfoModal;
