document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('task-list');
    const habitList = document.getElementById('habit-list');

    const taskNameInput = document.getElementById('modal-task-name');
    const taskDateInput = document.getElementById('modal-task-date');
    const taskTagInput = document.getElementById('modal-task-tag');
    const habitNameInput = document.getElementById('modal-habit-name');

    const checkedIcon = `<svg class="checkbox-svg" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none" /><path fill="currentColor" d="m10.6 13.8l-2.15-2.15q-.275-.275-.7-.275t-.7.275t-.275.7.275.7L9.9 15.9q.3.3.7.3t.7-.3l5.65-5.65q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22" /></svg>`;
    const uncheckedIcon = `<svg class="checkbox-svg" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none" /><path fill="currentColor" d="M12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20" /></svg>`;
    const removeIcon = `<svg class="remove-svg" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none" /><path fill="currentColor" d="M6 13q-.425 0-.712-.288T5 12t.288-.712T6 11h12q.425 0 .713.288T19 12t-.288.713T18 13z" /></svg>`;

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

    let tasks = loadStorage('studenthub_tasks', []);
    let habits = loadStorage('studenthub_habits', []);

    const renderTasks = () => {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const taskItem = document.createElement('div');
            taskItem.className = `flex items-center gap-2.5 p-2.5 bg-[#111111] border border-border rounded-lg transition-all ${task.completed ? 'opacity-60' : ''}`;
            
            taskItem.innerHTML = `
                <button class="bg-transparent border-none cursor-pointer flex items-center justify-center text-lg p-0 transition-colors ${task.completed ? 'text-accent' : 'text-text-secondary hover:text-accent'}" title="${task.completed ? 'Mark incomplete' : 'Mark complete'}">
                    ${task.completed ? checkedIcon : uncheckedIcon}
                </button>
                <div class="flex-1 min-w-0">
                    <h4 class="font-heading font-medium text-xs m-0 truncate ${task.completed ? 'text-text-secondary line-through' : 'text-white'}">${escapeHTML(task.title)}</h4>
                    <span class="block text-[10px] text-text-secondary mt-0.5">${escapeHTML(task.deadline)}</span>
                </div>
                <span class="font-heading text-[9px] font-semibold py-0.5 px-1.5 rounded uppercase tracking-wider bg-accent/10 text-accent border border-accent/20 flex-shrink-0">${escapeHTML(task.tag)}</span>
                <button class="bg-transparent border-none text-text-secondary cursor-pointer flex items-center justify-center text-lg p-0 transition-colors hover:text-accent" title="Delete task">
                    ${removeIcon}
                </button>
            `;

            taskItem.querySelector('button:first-of-type').addEventListener('click', () => {
                task.completed = !task.completed;
                saveStorage('studenthub_tasks', tasks);
                renderTasks();
            });

            taskItem.querySelector('button:last-of-type').addEventListener('click', () => {
                tasks = tasks.filter(item => item.id !== task.id);
                saveStorage('studenthub_tasks', tasks);
                renderTasks();
            });

            taskList.appendChild(taskItem);
        });
    };

    const renderHabits = () => {
        habitList.innerHTML = '';
        habits.forEach(habit => {
            const row = document.createElement('div');
            row.className = 'grid grid-cols-[1fr_repeat(7,20px)_20px] gap-2 items-center mb-2 last:mb-0';
            row.dataset.id = habit.id;

            let rowHTML = `<span class="text-left text-[11px] text-text-muted truncate font-heading">${escapeHTML(habit.title)}</span>`;
            for (let day = 0; day < 7; day++) {
                const isChecked = habit.history[day] ? 'checked' : '';
                rowHTML += `<input type="checkbox" ${isChecked} data-day="${day}" class="appearance-none w-2.5 h-2.5 rounded-full border border-border bg-transparent outline-none cursor-pointer checked:bg-accent checked:border-accent transition-all">`;
            }
            rowHTML += `
                <button class="bg-transparent border-none text-text-secondary cursor-pointer flex items-center justify-center text-sm p-0 transition-colors hover:text-accent" title="Delete habit">
                    ${removeIcon}
                </button>
            `;
            row.innerHTML = rowHTML;

            row.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
                checkbox.addEventListener('change', (event) => {
                    const dayIndex = parseInt(event.target.dataset.day, 10);
                    habit.history[dayIndex] = event.target.checked;
                    saveStorage('studenthub_habits', habits);
                });
            });

            row.querySelector('button').addEventListener('click', () => {
                habits = habits.filter(item => item.id !== habit.id);
                saveStorage('studenthub_habits', habits);
                renderHabits();
            });

            habitList.appendChild(row);
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

    const taskModal = setupModal('task-modal', 'open-task-modal-btn', 'modal-close-btn', 'modal-cancel-btn', () => taskNameInput.focus());
    const habitModal = setupModal('habit-modal', 'open-habit-modal-btn', 'habit-close-btn', 'habit-cancel-btn', () => habitNameInput.focus());

    const submitTaskBtn = document.getElementById('modal-submit-btn');
    if (submitTaskBtn) {
        submitTaskBtn.addEventListener('click', () => {
            const title = taskNameInput.value.trim();
            const rawDate = taskDateInput.value.trim() || 'No Deadline';
            const tag = taskTagInput.value.trim() || 'Task';

            if (!title) {
                alert('Please enter a task name.');
                return;
            }

            const deadline = rawDate.startsWith('Due:') ? rawDate : `Due: ${rawDate}`;

            tasks.push({
                id: Date.now(),
                title,
                deadline,
                tag,
                completed: false
            });

            saveStorage('studenthub_tasks', tasks);
            renderTasks();
            if (taskModal) taskModal.close();
        });
    }

    const submitHabitBtn = document.getElementById('habit-submit-btn');
    if (submitHabitBtn) {
        submitHabitBtn.addEventListener('click', () => {
            const title = habitNameInput.value.trim();
            if (!title) {
                alert('Please enter a habit name.');
                return;
            }

            habits.push({
                id: Date.now(),
                title,
                history: Array(7).fill(false)
            });

            saveStorage('studenthub_habits', habits);
            renderHabits();
            if (habitModal) habitModal.close();
        });
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            const taskModalEl = document.getElementById('task-modal');
            const habitModalEl = document.getElementById('habit-modal');
            if (taskModalEl && taskModalEl.style.display === 'flex' && taskModal) taskModal.close();
            if (habitModalEl && habitModalEl.style.display === 'flex' && habitModal) habitModal.close();
        }
    });

    renderTasks();
    renderHabits();
});
