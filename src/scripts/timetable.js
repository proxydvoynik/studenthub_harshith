document.addEventListener('DOMContentLoaded', () => {
    const timetableBody = document.getElementById('timetable-body');

    const dayInput = document.getElementById('modal-timetable-day');
    const subjectInput = document.getElementById('modal-timetable-subject');
    const locationInput = document.getElementById('modal-timetable-location');
    const startInput = document.getElementById('modal-timetable-start');
    const endInput = document.getElementById('modal-timetable-end');

    const timeToIdx = {
        "08:00": 0, "09:00": 1, "10:00": 2, "10:30": 3, "11:30": 4,
        "12:30": 5, "01:00": 6, "02:00": 7, "03:00": 8, "03:30": 9, "04:30": 10
    };

    const defaultTimetable = {
        Mon: [], Tue: [], Wed: [], Thu: [], Fri: [], Sat: []
    };

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

    const escapeHTML = (str) => {
        if (!str) return '';
        return str.replace(/[&<>'"]/g, tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag));
    };

    let timetable = loadStorage('studenthub_timetable', defaultTimetable);

    const renderTimetable = () => {
        timetableBody.innerHTML = '';
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        days.forEach(day => {
            const row = document.createElement('tr');
            
            const dayCell = document.createElement('td');
            dayCell.className = 'day-col';
            dayCell.textContent = day;
            row.appendChild(dayCell);

            const slots = Array(10).fill(null);
            const dayEntries = timetable[day] || [];

            dayEntries.forEach(entry => {
                const startIdx = timeToIdx[entry.startTime];
                const endIdx = timeToIdx[entry.endTime];
                if (startIdx !== undefined && endIdx !== undefined && startIdx < endIdx) {
                    slots[startIdx] = entry;
                    for (let j = startIdx + 1; j < endIdx; j++) {
                        slots[j] = { merged: true };
                    }
                }
            });

            for (let i = 0; i < 10; i++) {
                const item = slots[i];
                if (item === null) {
                    const freeTd = document.createElement('td');
                    freeTd.className = 'py-3 px-4 border border-border text-text-secondary opacity-40 italic text-center transition-colors relative';
                    freeTd.textContent = 'Free';
                    row.appendChild(freeTd);
                } else if (item.merged) {
                    continue;
                } else {
                    const td = document.createElement('td');
                    const startIdx = timeToIdx[item.startTime];
                    const endIdx = timeToIdx[item.endTime];
                    const colspan = endIdx - startIdx;
                    
                    if (colspan > 1) {
                        td.colSpan = colspan;
                    }

                    const isBreak = item.subject.toLowerCase().includes('break');
                    if (isBreak) {
                        td.className = 'py-3 px-4 border border-border text-text-secondary bg-neutral/40 italic text-[11px] text-center transition-colors relative group';
                        td.textContent = item.subject;
                    } else {
                        td.className = 'py-3 px-4 border border-border text-accent bg-accent/5 font-heading font-semibold text-center transition-all hover:bg-accent/10 relative group';
                        const roomHTML = item.location ? `<span class="block text-[9px] text-text-secondary font-normal uppercase mt-1">${escapeHTML(item.location)}</span>` : '';
                        td.innerHTML = `
                            ${escapeHTML(item.subject)}
                            ${roomHTML}
                        `;
                    }

                    const deleteBtn = document.createElement('button');
                    deleteBtn.className = 'absolute top-0.5 right-0.5 bg-transparent border-none text-text-secondary text-xs cursor-pointer leading-none opacity-0 group-hover:opacity-100 transition-all hover:text-accent';
                    deleteBtn.title = 'Delete entry';
                    deleteBtn.innerHTML = '&times;';
                    deleteBtn.addEventListener('click', () => {
                        timetable[day] = timetable[day].filter(e => e !== item);
                        saveStorage('studenthub_timetable', timetable);
                        renderTimetable();
                    });

                    td.appendChild(deleteBtn);
                    row.appendChild(td);
                }
            }

            timetableBody.appendChild(row);
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
            modal.querySelectorAll('select').forEach(select => select.selectedIndex = 0);
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

    const timetableModal = setupModal('timetable-modal', 'open-timetable-modal-btn', 'timetable-close-btn', 'timetable-cancel-btn', () => subjectInput.focus());

    const submitTimetableBtn = document.getElementById('timetable-submit-btn');
    if (submitTimetableBtn) {
        submitTimetableBtn.addEventListener('click', () => {
            const day = dayInput.value;
            const subject = subjectInput.value.trim();
            const location = locationInput.value.trim();
            const startTime = startInput.value;
            const endTime = endInput.value;

            if (!subject) {
                alert('Please enter a subject name.');
                return;
            }

            const startIdx = timeToIdx[startTime];
            const endIdx = timeToIdx[endTime];

            if (startIdx >= endIdx) {
                alert('End time must be after the start time.');
                return;
            }

            const dayEntries = timetable[day] || [];
            const overlaps = dayEntries.some(entry => {
                const entryStart = timeToIdx[entry.startTime];
                const entryEnd = timeToIdx[entry.endTime];
                return (startIdx < entryEnd && endIdx > entryStart);
            });

            if (overlaps) {
                alert('This timeslot overlaps with an existing entry.');
                return;
            }

            dayEntries.push({
                subject,
                location,
                startTime,
                endTime
            });

            timetable[day] = dayEntries;
            saveStorage('studenthub_timetable', timetable);
            renderTimetable();
            if (timetableModal) timetableModal.close();
        });
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            const modalEl = document.getElementById('timetable-modal');
            if (modalEl && modalEl.style.display === 'flex' && timetableModal) {
                timetableModal.close();
            }
        }
    });

    renderTimetable();
});
