document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const timetableBody = document.getElementById('timetable-body');
    const openBtn = document.getElementById('open-timetable-modal-btn');
    const modal = document.getElementById('timetable-modal');
    const closeBtn = document.getElementById('timetable-close-btn');
    const cancelBtn = document.getElementById('timetable-cancel-btn');
    const submitBtn = document.getElementById('timetable-submit-btn');

    const dayInput = document.getElementById('modal-timetable-day');
    const subjectInput = document.getElementById('modal-timetable-subject');
    const locationInput = document.getElementById('modal-timetable-location');
    const startInput = document.getElementById('modal-timetable-start');
    const endInput = document.getElementById('modal-timetable-end');

    // Time boundaries mapping to slot indices
    const timeToIdx = {
        "08:00": 0, "09:00": 1, "10:00": 2, "10:30": 3, "11:30": 4,
        "12:30": 5, "01:00": 6, "02:00": 7, "03:00": 8, "03:30": 9, "04:30": 10
    };

    // Default academic entries
    const defaultTimetable = {
        Mon: [
            { subject: 'CHEM', location: 'MBS', startTime: '08:00', endTime: '09:00' },
            { subject: 'IOOP', location: 'TAN', startTime: '09:00', endTime: '10:00' },
            { subject: 'Break', location: '', startTime: '10:00', endTime: '10:30' },
            { subject: 'MATHS', location: 'SHS', startTime: '10:30', endTime: '11:30' },
            { subject: 'EMSB', location: 'BS', startTime: '11:30', endTime: '12:30' },
            { subject: 'Lunch Break', location: '', startTime: '12:30', endTime: '02:00' },
            { subject: 'DAV LAB (2:00 - 5:00 PM)', location: 'AB1: 129', startTime: '02:00', endTime: '04:30' }
        ],
        Tue: [
            { subject: 'Lunch Break', location: '', startTime: '11:30', endTime: '01:00' },
            { subject: 'MATHS', location: 'SHS', startTime: '02:00', endTime: '03:00' },
            { subject: 'Break', location: '', startTime: '03:00', endTime: '03:30' },
            { subject: 'FEE', location: 'SPU', startTime: '03:30', endTime: '04:30' }
        ],
        Wed: [
            { subject: 'EVS (P)', location: 'SSR', startTime: '08:00', endTime: '10:00' },
            { subject: 'Break', location: '', startTime: '10:00', endTime: '10:30' },
            { subject: 'IOOP', location: 'TAN', startTime: '10:30', endTime: '11:30' },
            { subject: 'Lunch Break', location: '', startTime: '12:30', endTime: '02:00' },
            { subject: 'CAEG LAB (2:00 - 5:00 PM)', location: 'PH1: AB1 328; PH2: AB3 331', startTime: '02:00', endTime: '04:30' }
        ],
        Thu: [
            { subject: 'Lunch Break', location: '', startTime: '11:30', endTime: '01:00' },
            { subject: 'FEE', location: 'SPU', startTime: '01:00', endTime: '02:00' },
            { subject: 'CHEM', location: 'MBS', startTime: '02:00', endTime: '03:00' },
            { subject: 'Break', location: '', startTime: '03:00', endTime: '03:30' },
            { subject: 'IOOP', location: 'TAN', startTime: '03:30', endTime: '04:30' }
        ],
        Fri: [
            { subject: 'MATHS', location: 'SHS', startTime: '08:00', endTime: '09:00' },
            { subject: 'FEE', location: 'SPU', startTime: '09:00', endTime: '10:00' },
            { subject: 'Break', location: '', startTime: '10:00', endTime: '10:30' },
            { subject: 'CHEM', location: 'MBS', startTime: '10:30', endTime: '11:30' },
            { subject: 'EMSB', location: 'BS', startTime: '11:30', endTime: '12:30' },
            { subject: 'Lunch Break', location: '', startTime: '12:30', endTime: '02:00' }
        ],
        Sat: [
            { subject: 'IOOP LAB', location: 'AB2: PROGRAMMING LAB 2', startTime: '08:00', endTime: '12:30' },
            { subject: 'Lunch Break', location: '', startTime: '12:30', endTime: '01:00' },
            { subject: 'MATHS', location: 'SHS', startTime: '01:00', endTime: '02:00' },
            { subject: 'EMSB', location: 'BS', startTime: '02:00', endTime: '03:00' },
            { subject: 'Break', location: '', startTime: '03:00', endTime: '03:30' },
            { subject: 'EVS (L)', location: 'SSR', startTime: '03:30', endTime: '04:30' }
        ]
    };

    // Load timetable from local storage or use defaults
    let timetable = JSON.parse(localStorage.getItem('studenthub_timetable')) || defaultTimetable;

    const saveTimetable = () => {
        localStorage.setItem('studenthub_timetable', JSON.stringify(timetable));
    };

    // Render the weekly timetable
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
                    freeTd.className = 'free';
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
                        td.className = 'free';
                        td.textContent = item.subject;
                    } else {
                        const roomHTML = item.location ? `<span class="room">${item.location}</span>` : '';
                        td.innerHTML = `
                            ${item.subject}
                            ${roomHTML}
                        `;
                    }

                    // Hover delete button for cells
                    const deleteBtn = document.createElement('button');
                    deleteBtn.className = 'cell-delete-btn';
                    deleteBtn.title = 'Delete entry';
                    deleteBtn.innerHTML = '&times;';
                    deleteBtn.addEventListener('click', () => {
                        timetable[day] = timetable[day].filter(e => e !== item);
                        saveTimetable();
                        renderTimetable();
                    });

                    td.appendChild(deleteBtn);
                    row.appendChild(td);
                }
            }

            timetableBody.appendChild(row);
        });
    };

    // Modal Handlers
    const openModal = () => {
        modal.style.display = 'flex';
        subjectInput.focus();
    };

    const closeModal = () => {
        modal.style.display = 'none';
        subjectInput.value = '';
        locationInput.value = '';
        startInput.selectedIndex = 0;
        endInput.selectedIndex = 0;
    };

    const submitEntry = () => {
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

        // Overlap verification check
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
        saveTimetable();
        renderTimetable();
        closeModal();
    };

    // Event Bindings
    if (openBtn) openBtn.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
    if (submitBtn) submitBtn.addEventListener('click', submitEntry);

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });

    // Initial timetable load
    renderTimetable();
});
