export const InfoModal = (movie, $body) => {
  const { id, title, rating } = movie;
  const $wrapper = document.createElement('div');
  const $modal = document.createElement('div');
  const $span = document.createElement('span');
  const $button = document.createElement('button');

  $wrapper.className = 'info-modal-wrapper';
  $modal.className = 'info-modal-window';
  $span.className = 'info-modal-content';

  $span.textContent = `${title}(id : ${id})의 평점은 ${rating}점입니다.`;
  $button.textContent = '닫기';

  $modal.appendChild($span);
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
