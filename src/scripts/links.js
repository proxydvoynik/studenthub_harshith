document.addEventListener('DOMContentLoaded', () => {
    const linksContainer = document.getElementById('links-container');
    const openLinkModalBtn = document.getElementById('open-link-modal-btn');
    const linkModal = document.getElementById('link-modal');
    const linkCloseBtn = document.getElementById('link-close-btn');
    const linkCancelBtn = document.getElementById('link-cancel-btn');
    const linkSubmitBtn = document.getElementById('link-submit-btn');

    const modalLinkName = document.getElementById('modal-link-name');
    const modalLinkUrl = document.getElementById('modal-link-url');

    // Default links if none exist in localStorage
    const defaultLinks = [];

    let links = JSON.parse(localStorage.getItem('student_links')) || defaultLinks;

    // Save links to localStorage
    const saveLinks = () => {
        localStorage.setItem('student_links', JSON.stringify(links));
    };

    // Render links in container
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
                deleteLink(link.id);
            });

            wrapper.appendChild(a);
            wrapper.appendChild(deleteBtn);
            linksContainer.appendChild(wrapper);
        });
    };

    // Delete a link by ID
    const deleteLink = (id) => {
        links = links.filter(link => link.id !== id);
        saveLinks();
        renderLinks();
    };

    // Open Modal
    openLinkModalBtn.addEventListener('click', () => {
        linkModal.style.display = 'flex';
        modalLinkName.focus();
    });

    // Close Modal
    const closeModal = () => {
        linkModal.style.display = 'none';
        modalLinkName.value = '';
        modalLinkUrl.value = '';
    };

    linkCloseBtn.addEventListener('click', closeModal);
    linkCancelBtn.addEventListener('click', closeModal);

    // Close Modal on clicking overlay
    linkModal.addEventListener('click', (e) => {
        if (e.target === linkModal) {
            closeModal();
        }
    });

    // Add Link
    linkSubmitBtn.addEventListener('click', () => {
        const name = modalLinkName.value.trim();
        let url = modalLinkUrl.value.trim();

        if (!name || !url) {
            alert('Please enter both a name and a URL.');
            return;
        }

        // Format URL if protocol is missing
        if (!/^https?:\/\//i.test(url)) {
            url = 'https://' + url;
        }

        const newLink = {
            id: Date.now().toString(),
            name: name,
            url: url
        };

        links.push(newLink);
        saveLinks();
        renderLinks();
        closeModal();
    });

    // Initial render
    renderLinks();
});
