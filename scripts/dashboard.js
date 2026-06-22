document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const openBtn = document.getElementById('open-task-modal-btn');
    const modal = document.getElementById('task-modal');
    const closeBtn = document.getElementById('modal-close-btn');
    const cancelBtn = document.getElementById('modal-cancel-btn');
    const submitBtn = document.getElementById('modal-submit-btn');
    
    const taskNameInput = document.getElementById('modal-task-name');
    const taskDateInput = document.getElementById('modal-task-date');
    const taskTagInput = document.getElementById('modal-task-tag');
    const taskList = document.getElementById('task-list');

    // Habit DOM Elements
    const habitOpenBtn = document.getElementById('open-habit-modal-btn');
    const habitModal = document.getElementById('habit-modal');
    const habitCloseBtn = document.getElementById('habit-close-btn');
    const habitCancelBtn = document.getElementById('habit-cancel-btn');
    const habitSubmitBtn = document.getElementById('habit-submit-btn');
    const habitNameInput = document.getElementById('modal-habit-name');
    const habitList = document.getElementById('habit-list');

    // SVGs for task status and actions
    const checkedIcon = `<svg class="checkbox-svg" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none" /><path fill="currentColor" d="m10.6 13.8l-2.15-2.15q-.275-.275-.7-.275t-.7.275t-.275.7.275.7L9.9 15.9q.3.3.7.3t.7-.3l5.65-5.65q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22" /></svg>`;
    const uncheckedIcon = `<svg class="checkbox-svg" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none" /><path fill="currentColor" d="M12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20" /></svg>`;
    const removeIcon = `<svg class="remove-svg" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none" /><path fill="currentColor" d="M6 13q-.425 0-.712-.288T5 12t.288-.712T6 11h12q.425 0 .713.288T19 12t-.288.713T18 13z" /></svg>`;

    // Load saved tasks or initialize with a default one
    let tasks = JSON.parse(localStorage.getItem('studenthub_tasks')) || [];

    // Load saved habits or initialize with default
    let habits = JSON.parse(localStorage.getItem('studenthub_habits')) || [];

    // Synchronize tasks with browser storage
    const saveToStorage = () => {
        localStorage.setItem('studenthub_tasks', JSON.stringify(tasks));
    };

    // Synchronize habits with browser storage
    const saveHabits = () => {
        localStorage.setItem('studenthub_habits', JSON.stringify(habits));
    };

    // Render the task items in the DOM
    const renderTasks = () => {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const taskItem = document.createElement('div');
            taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
            
            taskItem.innerHTML = `
                <button class="task-check-btn ${task.completed ? 'checked' : ''}" title="${task.completed ? 'Mark incomplete' : 'Mark complete'}">
                    ${task.completed ? checkedIcon : uncheckedIcon}
                </button>
                <div class="task-info">
                    <h4 class="task-title">${task.title}</h4>
                    <span class="task-deadline">${task.deadline}</span>
                </div>
                <span class="tag assignment">${task.tag}</span>
                <button class="task-delete-btn" title="Delete task">
                    ${removeIcon}
                </button>
            `;

            // Toggle checkbox status
            taskItem.querySelector('.task-check-btn').addEventListener('click', () => {
                task.completed = !task.completed;
                saveToStorage();
                renderTasks();
            });

            // Delete task item
            taskItem.querySelector('.task-delete-btn').addEventListener('click', () => {
                tasks = tasks.filter(item => item.id !== task.id);
                saveToStorage();
                renderTasks();
            });

            taskList.appendChild(taskItem);
        });
    };

    // Render the weekly habits in the DOM
    const renderHabits = () => {
        habitList.innerHTML = '';
        habits.forEach(habit => {
            const row = document.createElement('div');
            row.className = 'habit-row';
            row.dataset.id = habit.id;

            let rowHTML = `<span class="habit-title">${habit.title}</span>`;
            for (let day = 0; day < 7; day++) {
                const isChecked = habit.history[day] ? 'checked' : '';
                rowHTML += `<input type="checkbox" ${isChecked} data-day="${day}">`;
            }
            rowHTML += `
                <button class="habit-delete-btn" title="Delete habit">
                    ${removeIcon}
                </button>
            `;
            row.innerHTML = rowHTML;

            // Handle checkbox changes
            row.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
                checkbox.addEventListener('change', (event) => {
                    const dayIndex = parseInt(event.target.dataset.day, 10);
                    habit.history[dayIndex] = event.target.checked;
                    saveHabits();
                });
            });

            // Handle habit deletion
            row.querySelector('.habit-delete-btn').addEventListener('click', () => {
                habits = habits.filter(item => item.id !== habit.id);
                saveHabits();
                renderHabits();
            });

            habitList.appendChild(row);
        });
    };

    // Task Modal view handlers
    const openModal = () => {
        modal.style.display = 'flex';
        taskNameInput.focus();
    };

    const closeModal = () => {
        modal.style.display = 'none';
        taskNameInput.value = '';
        taskDateInput.value = '';
        taskTagInput.value = '';
    };

    const submitTask = () => {
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

        saveToStorage();
        renderTasks();
        closeModal();
    };

    // Habit Modal view handlers
    const openHabitModal = () => {
        habitModal.style.display = 'flex';
        habitNameInput.focus();
    };

    const closeHabitModal = () => {
        habitModal.style.display = 'none';
        habitNameInput.value = '';
    };

    const submitHabit = () => {
        const title = habitNameInput.value.trim();
        if (!title) {
            alert('Please enter a habit name.');
            return;
        }

        habits.push({
            id: Date.now(),
            title,
            history: [false, false, false, false, false, false, false]
        });

        saveHabits();
        renderHabits();
        closeHabitModal();
    };

    // Bind Task Event Listeners
    if (openBtn) openBtn.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
    if (submitBtn) submitBtn.addEventListener('click', submitTask);

    // Bind Habit Event Listeners
    if (habitOpenBtn) habitOpenBtn.addEventListener('click', openHabitModal);
    if (habitCloseBtn) habitCloseBtn.addEventListener('click', closeHabitModal);
    if (habitCancelBtn) habitCancelBtn.addEventListener('click', closeHabitModal);
    if (habitSubmitBtn) habitSubmitBtn.addEventListener('click', submitHabit);

    // Close when clicking outside content boxes
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    habitModal.addEventListener('click', (event) => {
        if (event.target === habitModal) {
            closeHabitModal();
        }
    });

    // Close modals on Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            if (modal.style.display === 'flex') {
                closeModal();
            }
            if (habitModal.style.display === 'flex') {
                closeHabitModal();
            }
        }
    });

    // Initial load
    renderTasks();
    renderHabits();
});
