document.addEventListener('DOMContentLoaded', function () {
    const setReminderButton = document.getElementById('set-reminder-btn');

    setReminderButton.addEventListener('click', function () {
        // Obtener el nombre del medicamento, la fecha y la hora del recordatorio
        const medicineName = document.getElementById('medicine-name').value;
        const reminderDate = document.getElementById('reminder-date').value;
        const reminderTime = document.getElementById('reminder-time').value;

        // Validar si se completaron todos los campos
        if (medicineName.trim() === '' || reminderDate.trim() === '' || reminderTime.trim() === '') {
            alert('Por favor complete todos los campos.');
            return;
        }

        // Mostrar una ventana de confirmación al usuario
        const confirmation = confirm(`¿Desea configurar un recordatorio para tomar ${medicineName} el ${reminderDate} a las ${reminderTime}?`);

        // Si el usuario confirma, configurar el recordatorio
        if (confirmation) {
            // Obtener la fecha y hora actual
            const now = new Date();
            // Obtener la fecha y hora del recordatorio
            const reminderDateTime = new Date(`${reminderDate} ${reminderTime}`);

            // Si el recordatorio es para una fecha o hora pasada, configurarlo para el día siguiente
            if (reminderDateTime <= now) {
                reminderDateTime.setDate(reminderDateTime.getDate() + 1);
            }

            // Configurar y mostrar la notificación
            const notification = new Notification('Recordatorio de Medicación', {
                body: `Es hora de tomar ${medicineName}.`,
                // Icono de la notificación
                icon: 'medicine-icon.png'
            });

            // Manejar el clic en la notificación para enfocar la ventana
            notification.onclick = function () {
                window.focus();
                this.close();
            };

            // Cerrar automáticamente la notificación después de 5 segundos
            setTimeout(function () {
                notification.close();
            }, 5000);
        }
    });
});

