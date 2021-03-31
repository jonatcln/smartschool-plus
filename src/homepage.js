(function main() {
    insertShortcutMenuAsHomepageBlock();
    hideInternalLinksInfoWhenReady();
})();

function hideInternalLinksInfoWhenReady() {
    const courseList = document.getElementById('course__list');

    const coursesLoaded = () => courseList.querySelector('.course__block:not(.course__block--loading)');

    if (coursesLoaded()) {
        hideInternalLinksInfo();
    } else {
        const observer = new MutationObserver(() => {
            if (coursesLoaded()) { hideInternalLinksInfo(); }
        });

        observer.observe(courseList, { childList: true });
    }
}

function hideInternalLinksInfo() {
    Object.values(document.links)
        .forEach(anchor => {
            const targetHref = anchor.href;
            if (anchor.hostname === location.hostname) {
                anchor.addEventListener('click', e => {
                    e.preventDefault();
                    window.location.href = targetHref;
                });
                anchor.removeAttribute('href');
            }
        });
}

function insertShortcutMenuAsHomepageBlock() {
    const homepageBlock = document.createElement('div');
    homepageBlock.classList.add('smsc-topnav', 'homepage__block');
    
    const innerHomepageBlock = document.createElement('div');
    innerHomepageBlock.dataset.shortcuts = '';
    innerHomepageBlock.innerHTML = `
    <!-- BEGIN frametitle -->
    <div class="homepage__block__top">
    <div class="homepage__block__top__title">
    <h2 class="smsc-title--1" style="color: #c90001">Ga naar</h2>
    </div>
    <div class="homepage__block__top__buttonbar"></div>
    </div>
    <!-- END frametitle -->`;
    
    const shortcutsMenuClone = document.getElementById('shortcutsMenu').children[0].cloneNode(true);
    shortcutsMenuClone.classList.remove('topnav__menu');
    shortcutsMenuClone.classList.add('splus__shortcuts-menu');
    
    innerHomepageBlock.appendChild(shortcutsMenuClone);
    homepageBlock.appendChild(innerHomepageBlock);

    document.getElementById('centercontainer').prepend(homepageBlock);
}
