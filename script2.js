document.addEventListener('DOMContentLoaded', function () {
  const music = document.getElementById('music');
  const musicToggle = document.getElementById('music-toggle');
  const musicIcon = document.getElementById('music-icon');
  const musicLabel = document.getElementById('music-label');

  function updateMusicButton(isPlaying) {
    musicToggle.setAttribute('aria-pressed', String(isPlaying));
    musicIcon.textContent = isPlaying ? '❚❚' : '▶';
    musicLabel.textContent = isPlaying ? 'Pausar música' : 'Reproducir música';
  }

  async function playMusic() {
    try {
      await music.play();
      updateMusicButton(true);
    } catch (error) {
      updateMusicButton(false);
    }
  }

  musicToggle.addEventListener('click', function () {
    if (music.paused) {
      playMusic();
    } else {
      music.pause();
      updateMusicButton(false);
    }
  });

  document.addEventListener('pointerdown', function startMusic(event) {
    if (!event.target.closest('#music-toggle') && music.paused) {
      playMusic();
    }
  }, { once: true });

  playMusic();

  const revealElements = document.querySelectorAll('.reveal-photo, .names');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    revealElements.forEach(function (element) {
      observer.observe(element);
    });
  } else {
    revealElements.forEach(function (element) {
      element.classList.add('show');
    });
  }

  let rawParam = window.location.search.substring(1).replace(/\+/g, ' ');
  let decoded = rawParam;
  let previous;

  do {
    previous = decoded;
    try {
      decoded = decodeURIComponent(decoded);
    } catch (error) {
      break;
    }
  } while (decoded !== previous);

  const parts = decoded.split('-');
  if (parts.length >= 3) {
    const firstName = parts[0].trim();
    const lastName = parts[1].trim();
    const numPasses = parts[2].trim();
    const guestName = [firstName, lastName].filter(Boolean).join(' ');

    document.getElementById('name').textContent = guestName;
    document.getElementById('passnumbers').textContent = numPasses;

    if (numPasses === '1') {
      document.getElementById('passes-title').textContent = 'Pase';
      document.getElementById('places-text').textContent = 'Lugar';
      document.getElementById('reserved-phrase').textContent = 'Reservado';
    } else {
      document.getElementById('passes-title').textContent = 'Pases';
      document.getElementById('places-text').textContent = 'Lugares';
      document.getElementById('reserved-phrase').textContent = 'Reservados';
    }
  }

  const backLink = document.getElementById('back-to-invitation');
  backLink.href = 'index.html' + window.location.search;
});
