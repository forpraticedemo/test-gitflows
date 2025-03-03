// Register service worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
  });
}

// Notification Button
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('notification-button').addEventListener('click', () => {
    // 檢查通知權限
    if (!("Notification" in window)) {
      alert("這個瀏覽器不支援通知功能");
    } else if (Notification.permission === "granted") {
      sendNotification();
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          sendNotification();
        }
      });
    }
  });
  
  // Add to Home Screen Button
  document.getElementById('add-to-home-button').addEventListener('click', () => {
    const instructions = document.getElementById('install-instructions');
    instructions.style.display = instructions.style.display === 'block' ? 'none' : 'block';
    
    // 檢測平台並顯示對應說明
    if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
      document.getElementById('ios-instructions').style.display = 'block';
      document.getElementById('android-instructions').style.display = 'none';
      document.getElementById('desktop-instructions').style.display = 'none';
    } else if (/Android/.test(navigator.userAgent)) {
      document.getElementById('ios-instructions').style.display = 'none';
      document.getElementById('android-instructions').style.display = 'block';
      document.getElementById('desktop-instructions').style.display = 'none';
    } else {
      document.getElementById('ios-instructions').style.display = 'none';
      document.getElementById('android-instructions').style.display = 'none';
      document.getElementById('desktop-instructions').style.display = 'block';
    }
  });
});

// 發送通知函數
function sendNotification() {
  const notificationOptions = {
    body: "感謝您使用我的 PWA 應用！",
    icon: "icons/icon-192x192.png",
    vibrate: [200, 100, 200]
  };
  
  if (navigator.serviceWorker.controller) {
    // 通過 Service Worker 發送通知
    navigator.serviceWorker.ready.then(registration => {
      registration.showNotification("通知測試", notificationOptions);
    });
  } else {
    // 直接發送通知
    new Notification("通知測試", notificationOptions);
  }
}