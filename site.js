// Данные расписания
const scheduleData = {
    'Пн': [
        { time: '10:00-11:20', type: 'Пр.', subject: 'Английский язык', teacher: 'Иванова А.А.', room: '1-05 (1-корпус, ауд.105)' },
        { time: '11:30-12:50', type: 'Лк.', subject: 'Программирование-робототехника', teacher: 'Петров Б.Б.', room: '2-10 (2-корпус, ауд.210)' },
        { time: '13:00-14:20', type: 'Лб.', subject: 'Физика', teacher: 'Камилов.Ш.С.', room: '3-01 (3-корпус, ауд.312)' },
        { time: '15:20-16:20', type: 'Лк.', subject: 'Информатика 2', teacher: 'Kурсанов.С.С.', room: '3-01 (3-корпус, ауд.312)' }
    ],
    'Вт': [
        { time: '10:00-11:20', type: 'Пр.', subject: 'Физика', teacher: 'Сидоров С.С.', room: '3-01 (3-корпус, ауд.301)' },
        { time: '13:00-14:20', type: 'Лк.', subject: 'Физика', teacher: 'K.С.С.', room: '3-01 (3-корпус, ауд.312)' },
        { time: '15:20-16:20', type: 'Лб.', subject: 'Математика 2', teacher: 'Жанаров.С.Э.', room: '3-01 (3-корпус, ауд.312)' }
    ],
    'Ср': [
        { time: '10:00-11:20', type: 'Лк.', subject: 'Математика 2', teacher: 'Дурмонбаева З.А.', room: '1-16 (2-корпус, ауд.2/307)' },
        { time: '15:00-16:20', type: 'Пр.', subject: 'Инженерная-графика', teacher: 'Кузнецов Д.Д.', room: '1-12 (1-корпус, ауд.112)' }
        
    ],
    'Чт': [
        { time: '10:00-11:20', type: 'Пр.', subject: 'Математика 2', teacher: 'Дурмонбаева З.А.', room: '1-16 (2-корпус, ауд.2/307)' },
        { time: '11:30-12:50', type: 'Пр.', subject: 'История Кыргызстана', teacher: 'Куттубекова В.М.', room: '1-16 (2-корпус, ауд.2/327)' },
        { time: '13:00-14:20', type: 'Пр.', subject: 'Физическая культура и спорт 2', teacher: 'Каюмов Т.А.', room: '1-16 (2-корпус, ауд.Стадион)' },
        { time: '15:00-16:20', empty: true },
        { time: '16:30-17:50', empty: true },
        { time: '18:00-19:20', empty: true },
        { time: '19:30-20:50', type: 'Лек.', subject: 'Математика', teacher: 'Доп. занятие', room: 'Оффлайн/Ауд. уточняется', highlight: true },
        { time: '21:00-22:00', empty: true }
    ],
    'Пт': [
        { time: '08:30-09:50', type: 'Лк.', subject: 'Кыргызский-язык', teacher: 'Нуржанова К.К.', room: '2-05 (2-корпус, ауд.205)' },
        { time: '11:30-12:50', type: 'Пр.', subject: 'История Кыргызстана', teacher: 'Куттубекова В.М.', room: '1-16 (2-корпус, ауд.2/327)' },
        { time: '13:00-14:20', type: 'Пр.', subject: 'Физическая культура и спорт 2', teacher: 'Каюмов Т.А.', room: '1-16 (2-корпус, ауд.Стадион)' },
    ],
    'Сб': [
        { time: '13:00-14:20', type: 'Лк.', subject: 'Физика', teacher: 'K.С.С.', room: '3-01 (3-корпус, ауд.312)' },
    ]
};

const container = document.getElementById('schedule-container');

// Функция отрисовки одного дня
function renderDay(dayName) {
    const items = scheduleData[dayName] || [];
    
    let html = `<div class="schedule-card"><h2 class="day-title">${dayName}</h2>`;

    if (items.length === 0) {
        html += `<div style="color: #999; font-style: italic;">Занятий нет</div>`;
    } else {
        items.forEach(item => {
            if (item.empty) {
                html += `<div class="empty-time">${item.time}</div>`;
            } else {
                html += `
                    <div class="lesson-row ${item.highlight ? 'highlight' : ''}">
                        <div class="time-col">${item.time}</div>
                        <div class="qr-col"><i class="fas fa-qrcode"></i></div>
                        <div class="info-col">
                            <span class="subject-name">${item.type} ${item.subject}</span><br>
                            ${item.teacher} <span class="room-name">${item.room}</span>
                        </div>
                    </div>
                `;
            }
        });
    }
    html += `</div>`;
    return html;
}

// Обработка клика по кнопкам
document.querySelectorAll('.day-btn').forEach(button => {
    button.addEventListener('click', function() {
        // Меняем активную кнопку
        document.querySelectorAll('.day-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const day = this.getAttribute('data-day');
        
        if (day === 'Все') {
            let fullHtml = '';
            ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'].forEach(d => {
                fullHtml += renderDay(d);
            });
            container.innerHTML = fullHtml;
        } else {
            container.innerHTML = renderDay(day);
        }
    });
});

// Инициализация (показываем четверг при загрузке)
window.onload = () => {
    container.innerHTML = renderDay('Чт');
};
