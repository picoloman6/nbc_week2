export const InfoModal = (movie, $body) => {
  const { id, title, rating } = movie;

  const $wrapper = document.createElement('div');
  const $modal = document.createElement('div');
  const $title = document.createElement('span');
  const $content = document.createElement('span');
  const $button = document.createElement('button');

  $wrapper.className = 'info-modal-wrapper';
  $modal.className = 'info-modal-window';
  $title.className = 'info-modal-title';
  $content.className = 'info-modal-content';

  $title.textContent = title;
  $content.textContent = `ID : ${id} 평점 : ${rating}`;
  $button.textContent = '닫기';

  $modal.appendChild($title);
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
