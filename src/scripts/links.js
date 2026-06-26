document.addEventListener('DOMContentLoaded', () => {
    const linksContainer = document.getElementById('links-container');
    const modalLinkName = document.getElementById('modal-link-name');
    const modalLinkUrl = document.getElementById('modal-link-url');

    const loadStorage = (key, fallback) => {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : fallback;
        } catch (e) {
            console.error(`Failed to parse localStorage key "${key}":`, e);
            return fallback;
        }
    };

    const saveStorage = (key, data) => {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (e) {
            console.error(`Failed to save localStorage key "${key}":`, e);
        }
    };

    let links = loadStorage('student_links', []);

    const renderLinks = () => {
        linksContainer.innerHTML = '';
        links.forEach(link => {
            const wrapper = document.createElement('div');
            wrapper.className = 'relative flex group';

            const a = document.createElement('a');
            a.className = 'flex-1 flex items-center justify-center text-center py-2.5 px-3.5 bg-accent/5 border border-border rounded-lg text-white font-heading text-sm font-medium transition-all duration-200 hover:bg-accent/10 hover:border-accent hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(255,30,45,0.2)] active:translate-y-0';
            a.textContent = link.name;
            a.href = link.url;
            a.target = '_blank';
            a.rel = 'noopener noreferrer';

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'absolute -top-1.5 -right-1.5 bg-[#181818] border border-border text-text-secondary w-4.5 h-4.5 rounded-full cursor-pointer flex items-center justify-center text-xs opacity-0 transition-all group-hover:opacity-100 hover:bg-accent hover:border-accent hover:text-white z-10';
            deleteBtn.innerHTML = '&times;';
            deleteBtn.title = 'Delete Link';
            deleteBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                links = links.filter(item => item.id !== link.id);
                saveStorage('student_links', links);
                renderLinks();
            });

            wrapper.appendChild(a);
            wrapper.appendChild(deleteBtn);
            linksContainer.appendChild(wrapper);
        });
    };

    const setupModal = (modalId, openBtnId, closeBtnId, cancelBtnId, onOpen) => {
        const modal = document.getElementById(modalId);
        const openBtn = document.getElementById(openBtnId);
        const closeBtn = document.getElementById(closeBtnId);
        const cancelBtn = document.getElementById(cancelBtnId);

        if (!modal) return null;

        const close = () => {
            modal.style.display = 'none';
            modal.querySelectorAll('input').forEach(input => input.value = '');
        };

        const open = () => {
            modal.style.display = 'flex';
            if (onOpen) onOpen();
        };

        if (openBtn) openBtn.addEventListener('click', open);
        [closeBtn, cancelBtn].forEach(btn => {
            if (btn) btn.addEventListener('click', close);
        });

        modal.addEventListener('click', (event) => {
            if (event.target === modal) close();
        });

        return { open, close };
    };

    const linkModal = setupModal('link-modal', 'open-link-modal-btn', 'link-close-btn', 'link-cancel-btn', () => modalLinkName.focus());

    const submitLinkBtn = document.getElementById('link-submit-btn');
    if (submitLinkBtn) {
        submitLinkBtn.addEventListener('click', () => {
            const name = modalLinkName.value.trim();
            let url = modalLinkUrl.value.trim();

            if (!name || !url) {
                alert('Please enter both a name and a URL.');
                return;
            }

            if (url.toLowerCase().startsWith('javascript:')) {
                alert('Invalid URL scheme.');
                return;
            }

            if (!/^https?:\/\//i.test(url)) {
                url = 'https://' + url;
            }

            links.push({
                id: Date.now().toString(),
                name,
                url
            });

            saveStorage('student_links', links);
            renderLinks();
            if (linkModal) linkModal.close();
        });
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            const modalEl = document.getElementById('link-modal');
            if (modalEl && modalEl.style.display === 'flex' && linkModal) {
                linkModal.close();
            }
        }
    });

    renderLinks();
});
