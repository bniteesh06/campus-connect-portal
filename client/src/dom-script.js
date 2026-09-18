

document.addEventListener('DOMContentLoaded', () => {

  const slides = Array.from(document.querySelectorAll('.slide'));
  const dots = Array.from(document.querySelectorAll('.dot'));
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const carousel = document.querySelector('.carousel-wrapper');
  let currentSlide = 0;
  let carouselTimer;

  function showSlide(index) {
    if (!slides.length) return;
    currentSlide = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) =>
      slide.classList.toggle('active-slide', slideIndex === currentSlide)
    );
    dots.forEach((dot, dotIndex) =>
      dot.classList.toggle('active-dot', dotIndex === currentSlide)
    );
  }

  function startCarousel() {
    carouselTimer = window.setInterval(() => showSlide(currentSlide + 1), 4000);
  }

  if (prevBtn && nextBtn && carousel) {
    prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
    dots.forEach((dot) =>
      dot.addEventListener('click', () => showSlide(Number(dot.dataset.index)))
    );

    carousel.addEventListener('mouseenter', () => window.clearInterval(carouselTimer));
    carousel.addEventListener('mouseleave', startCarousel);
    startCarousel();
  }

  // Step 3: Select relevant elements using DOM selection methods
  const noticeInput = document.getElementById('noticeInput');
  const addNoticeBtn = document.getElementById('addNoticeBtn');
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const charCount = document.getElementById('charCount');
  const noticeList = document.getElementById('noticeList');

  // Step 5 & 7: Real-Time Input Event Listener
  // Dynamically tracks characters typed without page reloads
  if (noticeInput && charCount) {
    noticeInput.addEventListener('input', (event) => {
      const length = event.target.value.length;
      charCount.textContent = `${length} / 120 characters`;
      console.log('[Exp 3 - Input Event]: Characters typed ->', length);
    });
  }

  // Step 8 & 9: Create, append, and remove dynamic list items
  function createNoticeItem(text) {
    if (!noticeList) return;

    // Create <li> element
    const li = document.createElement('li');
    li.className = 'notice-list-item';

    // Create <span> for text
    const span = document.createElement('span');
    span.className = 'item-text';
    span.textContent = `📢 ${text}`;

    // Create delete <button>
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.setAttribute('title', 'Delete announcement');
    deleteBtn.setAttribute('aria-label', 'Delete announcement');
    deleteBtn.innerHTML = '&times;';

    // Step 9: Remove item dynamically on click
    deleteBtn.addEventListener('click', () => {
      li.classList.add('removing');
      setTimeout(() => {
        li.remove();
        console.log('[Exp 3 - DOM Removal]: Removed item ->', text);
      }, 200);
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    noticeList.appendChild(li);

    console.log('[Exp 3 - DOM Append]: Appended new notice ->', text);
  }

  function handleAddNotice() {
    if (!noticeInput) return;
    const content = noticeInput.value.trim();
    if (!content) {
      alert('Please enter an announcement before adding!');
      noticeInput.focus();
      return;
    }

    createNoticeItem(content);

    // Reset input field and character counter
    noticeInput.value = '';
    if (charCount) charCount.textContent = '0 / 120 characters';
    noticeInput.focus();
  }

  // Step 4: Click Event Listener on button
  if (addNoticeBtn) {
    addNoticeBtn.addEventListener('click', handleAddNotice);
  }

  // Step 5: Keyboard Event Listener (Press 'Enter' to submit)
  if (noticeInput) {
    noticeInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        console.log('[Exp 3 - Keyboard Event]: "Enter" key pressed');
        handleAddNotice();
      }
    });
  }

  // Step 6: Toggle Dark Mode / Normal Mode Style & Text Dynamically
  function toggleThemeMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');

    const buttonLabel = isDark ? '☀️ Normal Mode' : '🌙 Dark Mode';

    if (themeToggleBtn) themeToggleBtn.textContent = buttonLabel;

    console.log('[Exp 3 - Style Toggle]: Dark mode active ->', isDark);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleThemeMode);
  }

  // Attach delete handlers to default items
  if (noticeList) {
    const existingDeleteBtns = noticeList.querySelectorAll('.delete-btn');
    existingDeleteBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const parentItem = e.target.closest('.notice-list-item');
        if (parentItem) {
          parentItem.remove();
          console.log('[Exp 3 - DOM Removal]: Deleted default item.');
        }
      });
    });
  }

  console.log('[Exp 3]: Client-side scripting with Dark Mode toggle and DOM manipulation initialized.');
});
