handle_service_worker_bro();
   // Call Install Event
   self.addEventListener('install', e => {
    console.log('Service Worker: Installed');
  });



    try {
        is_user_admin=localStorage.getItem("is_admin");
        
if(is_user_admin!='true'){
    document.querySelector("#is_admin").style.display='none';
}


if(localStorage.getItem('_token')==null){
    document.location.href='login.html?message=you need to login first';
 }else{
     document.querySelector("#loginli").style.display='none';
     document.querySelector('#registerli').style.display='none';

 }
        
    } catch (error) {
        
    }

function handle_service_worker_bro(){
    const cacheName = 'trulysCache';


    // Call Install Event
    self.addEventListener('install', e => {
      console.log('Service Worker: Installed');
    });
    
    // Call Activate Event
    self.addEventListener('activate', e => {
      console.log('Service Worker: Activated');
      // Remove unwanted caches
      e.waitUntil(
        caches.keys().then(cacheNames => {
          return Promise.all(
            cacheNames.map(cache => {
              if (cache !== cacheName) {
                console.log('Service Worker: Clearing Old Cache');
                return caches.delete(cache);
              }
            })
          );
        })
      );
    });
    
    // Call Fetch Event
    self.addEventListener('fetch', e => {
      console.log('Service Worker: Fetching');
      e.respondWith(
        fetch(e.request)
          .then(res => {
            // Make copy/clone of response
            const resClone = res.clone();
            // Open cahce
            caches.open(cacheName).then(cache => {
              // Add response to cache
              cache.put(e.request, resClone);
            });
            return res;
          })
          .catch(err => caches.match(e.request).then(res => res))
      );
    });

}