
// XXX switch this to background script
let id = 'always-paste'
  , options = {
      id,
      title:    'Paste Anyway!',
      contexts: ['edtiable'],
      icons:    {
        16: './clippy-octicon.svg',
      },
      enabled:   false,
    }
;

browser.contextMenus.create(options);
browser.contextMenus.onClicked.addListener((info) => {
    if (info.menuItemId === id) {
      let el = browser.menus.getTargetElement(info.targetElementId);
      if (!el) return;
      navigator
        .clipboard
        .readText()
        .then(txt => el.value = txt)
      ;
    }
});
browser.contextMenus.onShown.addListener(async function (info) {
  let txt = await navigator.clipboard.readText();
  browser.menus.update(id, { enabled: !!txt });
  browser.menus.refresh();
});
