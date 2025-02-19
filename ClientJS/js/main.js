document.addEventListener('DOMContentLoaded', function() {
    // Создаем новый экземпляр ClientJS
    const client = new ClientJS();

    // Собираем данные о клиенте
    const clientData = {
        'Браузер': client.getBrowser(),
        'Версия браузера': client.getBrowserVersion(),
        'Операционная система': client.getOS(),
        'Версия ОС': client.getOSVersion(),
        'CPU архитектура': client.getCPU(),
        'Разрешение экрана': `${client.getScreenPrint()}`,
        'Глубина цвета': client.getColorDepth(),
        'Текущее разрешение': `${window.innerWidth}x${window.innerHeight}`,
        'Часовой пояс': client.getTimeZone(),
        'Язык': client.getLanguage(),
        'Мобильное устройство': client.isMobile() ? 'Да' : 'Нет',
        'Fingerprint': client.getFingerprint(),
        'User Agent': client.getUserAgent(),
        'Cookies включены': client.isCookie() ? 'Да' : 'Нет',
        'Canvas поддерживается': client.isCanvas() ? 'Да' : 'Нет',
        'Java включен': client.isJava() ? 'Да' : 'Нет',
        'Flash включен': client.isFlash() ? 'Да' : 'Нет',
        'Silverlight установлен': client.isSilverlight() ? 'Да' : 'Нет',
    };

    // Получаем элемент для вывода информации
    const clientInfoElement = document.getElementById('clientInfo');

    // Выводим информацию на страницу
    for (const [key, value] of Object.entries(clientData)) {
        const infoItem = document.createElement('div');
        infoItem.className = 'info-item';
        infoItem.innerHTML = `
            <span class="info-label">${key}:</span> 
            <span class="info-value">${value}</span>
        `;
        clientInfoElement.appendChild(infoItem);
    }

    // Добавляем кнопку скачивания после вывода информации
    const downloadButton = document.createElement('button');
    downloadButton.innerText = 'Скачать данные';
    downloadButton.className = 'download-button';
    clientInfoElement.appendChild(downloadButton);

    // Обработчик нажатия на кнопку
    downloadButton.addEventListener('click', function() {
        // Создаем JSON файл
        const dataStr = JSON.stringify(clientData, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        
        // Создаем ссылку для скачивания
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'client-data.json';
        
        // Добавляем ссылку в документ и эмулируем клик
        document.body.appendChild(a);
        a.click();
        
        // Очищаем
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    });
}); 