const CACHE_NAME = 'my-site-cache-v1';
const urlsToCache = [
  './',
  
  './images/abc.webp',
'./images/jenga.webp',
'./images/Calpol GSK Logo.webp',
'./images/Calpol-2-Sonic-Rush-Game-Logo-01.webp',
'./images/Calpol-2-Sonic-Rush-Game-Logo-02.webp',
'./images/CLOUD-01.webp',
'./images/CLOUD-02.webp',
'./images/CLOUD-03.webp',
'./images/Correct.gif',
'./images/Wrong.gif',
'./images/FINALRESULT-01.webp',
'./images/game-01.webp',
'./images/game-02.webp',
'./images/game-03.webp',
'./images/home-back.webp',
'./images/home-back1.webp',
'./images/home-back2.webp',
'./images/home-backnew-01.webp',
'./images/newrope.webp',
'./images/newTablesBg.webp',
'./images/qBg.webp',
'./images/resultCould-(1).webp',
'./images/resultCould-(2).webp',
'./images/resultCould-(3).webp',
'./images/resultpage-01.webp',
'./images/rope.webp',
'./images/roundnew-01.webp',
'./images/roundnew-02.webp',
'./images/roundnew-03.webp',
'./images/roundnew-04.webp',
'./images/RULE 1 NEW-01-01.webp',
'./images/RULE 3-01.webp',
'./images/RULE2-01.webp',
'./images/Sonic Or.webp',
'./images/Sonic Red.webp',
'./images/sonic.webp',
'./images/tablesBg.webp',
'./images/thankyou-01.webp',
'./images/puzzlePic.webp',

    //sound files

    './sounds/Applause.mp3',
    './sounds/backSong.mp3',
    './sounds/click.mp3',
    './sounds/newSecondCounDown.mp3',
    './sounds/next-question.mp3',
    './sounds/success.mp3',
    './sounds/teamsSelection.mp3',
    './sounds/Timer 15 sec.mp3',
    './sounds/wrong-answer-Buzzer (1).mp3',



  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css',
  'https://cdn.jsdelivr.net/npm/@tsparticles/confetti@3.0.3/tsparticles.confetti.bundle.min.js'
];


 


self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return Promise.all(urlsToCache.map(url => {
          return fetch(url).then(response => {
            if (!response.ok) {
              throw new Error(`Request for ${url} failed with status ${response.status}`);
            }
            return cache.put(url, response);
          }).catch(error => {
            console.error(`Failed to cache ${url}:`, error);
          });
        }));
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});