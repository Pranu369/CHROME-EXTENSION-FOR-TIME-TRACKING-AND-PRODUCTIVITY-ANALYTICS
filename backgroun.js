let currentDomain = '';
let startTime = Date.now();

function getDomain(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
}

function logTime() {
  if (!currentDomain) return;
  const timeSpent = Math.floor((Date.now() - startTime) / 1000);
  if (timeSpent <= 0) return;

  fetch('http://localhost:3000/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ domain: currentDomain, timeSpent })
  });

  console.log(`Tracked ${currentDomain}: ${timeSpent}s`);
}

function update(tab) {
  if (!tab || !tab.url) return;
  const domain = getDomain(tab.url);
  if (domain !== currentDomain) {
    logTime();
    currentDomain = domain;
    startTime = Date.now();
  }
}

chrome.tabs.onActivated.addListener(activeInfo => {
  chrome.tabs.get(activeInfo.tabId, update);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.active && changeInfo.status === 'complete') update(tab);
});

chrome.windows.onFocusChanged.addListener(() => {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    if (tabs.length > 0) update(tabs[0]);
  });
});

chrome.runtime.onSuspend.addListener(() => {
  logTime();
});
