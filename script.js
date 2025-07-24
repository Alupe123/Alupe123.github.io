    // ===== PWA Installation =====
    let deferredPrompt;
    const installBtn = document.getElementById('installBtn');

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      installBtn.style.display = 'block';
      
      // Auto-hide after 10 seconds
      setTimeout(() => {
        if (installBtn.style.display !== 'none') {
          installBtn.style.display = 'none';
        }
      }, 10000);
    });

    installBtn.addEventListener('click', () => {
      installBtn.style.display = 'none';
      deferredPrompt.prompt();
      
      deferredPrompt.userChoice.then(choiceResult => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted install');
        } else {
          console.log('User dismissed install');
        }
        deferredPrompt = null;
      });
    });

    // ===== Service Worker Registration =====
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
          .then(registration => {
            console.log('ServiceWorker registration successful');
            registration.update(); // Check for updates immediately
          })
          .catch(err => {
            console.log('ServiceWorker registration failed: ', err);
          });
      });
    }

    // ===== Loading Animation =====
    let progress = 0;
    const progressText = document.querySelector('.progress-text');
    const progressInterval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress > 100) progress = 100;
      progressText.textContent = `Loading: ${Math.round(progress)}%`;
      
      if (progress === 100) {
        clearInterval(progressInterval);
        setTimeout(() => {
          document.querySelector('.loader-container').style.opacity = '0';
          setTimeout(() => {
            document.querySelector('.loader-container').style.display = 'none';
            document.querySelector('.content').style.display = 'block';
          }, 500);
        }, 500);
      }
    }, 200);

    // ===== Menu Functionality =====
    function openMenu(btn) {
      const menuList = document.querySelector(".menu .list");
      const navLinks = document.querySelector(".nav-links");
      
      if (btn.textContent === "Menu") {
        btn.textContent = "Close";
        menuList.classList.add('active');
        if (window.innerWidth <= 768) {
          navLinks.style.display = "none";
        }
      } else {
        btn.textContent = "Menu";
        menuList.classList.remove('active');
        if (window.innerWidth <= 768) {
          navLinks.style.display = "block";
        }
      }
    }

    // ===== Responsive Menu Handling =====
    function handleResponsiveMenu() {
      const menuBtn = document.querySelector('.menu-btn');
      const navLinks = document.querySelector('.nav-links');
      
      if (window.innerWidth <= 768) {
        menuBtn.style.display = 'block';
        navLinks.style.display = 'none';
      } else {
        menuBtn.style.display = 'none';
        navLinks.style.display = 'block';
        document.querySelector('.menu .list').classList.remove('active');
        document.querySelector('.menu-btn').textContent = 'Menu';
      }
    }

    window.addEventListener('resize', handleResponsiveMenu);
    window.addEventListener('load', handleResponsiveMenu);

    // ===== Network Status Detection =====
    function updateNetworkStatus() {
      const statusElement = document.createElement('div');
      statusElement.style.position = 'fixed';
      statusElement.style.bottom = '10px';
      statusElement.style.left = '10px';
      statusElement.style.padding = '5px 10px';
      statusElement.style.borderRadius = '3px';
      statusElement.style.zIndex = '1000';
      
      if (navigator.onLine) {
        statusElement.textContent = 'Online';
        statusElement.style.backgroundColor = '#4CAF50';
        statusElement.style.color = 'white';
      } else {
        statusElement.textContent = 'Offline - Using cached version';
        statusElement.style.backgroundColor = '#f44336';
        statusElement.style.color = 'white';
      }
      
      document.body.appendChild(statusElement);
      setTimeout(() => {
        statusElement.style.opacity = '0';
        setTimeout(() => {
          document.body.removeChild(statusElement);
        }, 1000);
      }, 3000);
    }

    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);
    window.addEventListener('load', updateNetworkStatus);

    // ===== Smooth Scrolling =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });