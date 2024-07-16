const baseUrl = "http://localhost:3333/agendamentos";

async function loadAppointments() {
    try {
        const response = await $.get(baseUrl);
        return response || [];
    } catch (error) {
        window.alert("Erro ao carregar os agendamentos");
        return [];
    }
}

function showPopup(clinicName, clinicAddress) {
    document.getElementById('clinicName').textContent = clinicName;
    document.getElementById('clinicAddress').textContent = 'Endereço: ' + clinicAddress;
    document.getElementById('clinicPopup').style.display = 'block';
}

function closePopup() {
    document.getElementById('clinicPopup').style.display = 'none';
}

function limparDadosAgendamento() {
    document.getElementById('clinicName').textContent = ''
    document.getElementById('clinicAddress').textContent = '';
    document.getElementById('appointmentDate').value = '';
    document.getElementById('appointmentTime').value = '';
    document.getElementById('appointmentId').value = '';
}

$(document).ready(function () {
    const btnAgendamento = document.getElementById('btn-agendar');

    btnAgendamento.addEventListener('click', async function (event) {
        event.preventDefault();

        const clinicName = document.getElementById('clinicName').textContent;
        const appointmentDate = document.getElementById('appointmentDate').value;
        const appointmentTime = document.getElementById('appointmentTime').value;
        const id = document.getElementById('appointmentId').value;

        const agendamento = {
            clinicName,
            appointmentDate,
            appointmentTime,
            id
        };

        if (id) {
            await $.ajax({
                url: `${baseUrl}/${agendamento.id}`,
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(agendamento),
                success: async function(result) {
                    await showAppointmentsList();
                    limparDadosAgendamento();
                    closePopup();
                },
                error: function(error) {
                  console.error('Error in PUT request', error);
                }
              });
              return;
        }

        $.ajax({
            url: baseUrl,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(agendamento),
            success: async function(result) {
                await showAppointmentsList();
                limparDadosAgendamento();
                closePopup();
              console.log('POST request successful', result);
            },
            error: function(error) {
              console.error('Error in POST request', error);
            }
          });
    
    });
});

async function agendarConsulta() {
    const clinicName = document.getElementById('clinicName').textContent;
    const appointmentDate = document.getElementById('appointmentDate').value;
    const appointmentTime = document.getElementById('appointmentTime').value;

    const appointmentData = {
        clinicName,
        appointmentDate,
        appointmentTime
    };

    const existingAppointments = await loadAppointments();
    existingAppointments.push(appointmentData);
    alert(`Consulta agendada em ${clinicName} em ${appointmentDate} às ${appointmentTime}`);
    closePopup();
    await showAppointmentsList();
}

function formatarDataBrasil(data) {
    const partes = data.split('-');
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

async function showAppointmentsList() {
    const appointmentsList = document.getElementById('appointmentsList');
    appointmentsList.innerHTML = '';

    const existingAppointments = await loadAppointments();

    console.log('Agendamentos existentes:', existingAppointments)
    existingAppointments.forEach((appointment, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
        <div class="appointment-box">
            <strong>Clinica:</strong> ${appointment.clinicName} - <strong>Data:</strong> ${formatarDataBrasil(appointment.appointmentDate)} - <strong>Hora:</strong> ${appointment.appointmentTime}
            <div class="appointment-buttons">
                <button id="${appointment.id}" onclick="editAppointment(${appointment.id})">Editar</button>
                <button id="btn-delete" id="${appointment.id}" onclick=deleteAppointment(${appointment.id})>Excluir</button>
            </div>
        </div>`;

        appointmentsList.appendChild(listItem);
    });
}

async function editAppointment(id) {
    const appointment = await findAppointmentById(id);

    if (appointment) {
        document.getElementById('clinicName').textContent = appointment.clinicName;
        document.getElementById('clinicAddress').textContent = '';
        document.getElementById('appointmentDate').value = appointment.appointmentDate;
        document.getElementById('appointmentTime').value = appointment.appointmentTime;
        document.getElementById('appointmentId').value = appointment.id;
    
        // Exibir o popup
        document.getElementById('clinicPopup').style.display = 'block';
    } 
}

async function findAppointmentById(id) {
    let appointment = null;
    await $.get(`${baseUrl}/${id}`, function (data) {
        appointment = data;
    }).fail(function (error) {
        console.log("Agendamento não encontrado")
    });
    return appointment;
}

async function deleteAppointment(id) {
    const deleteAppointment = window.confirm("Tem certeza que deseja excluir esse atendimento? ");

    if (deleteAppointment) {
        $.ajax({
            url: `${baseUrl}/${id}`,
            type: 'DELETE',
            success: async function (result) {
                console.log('DELETE request successful', result);
                await showAppointmentsList();
            },
            error: function (error) {
                console.error('Error in DELETE request', error);
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', async function () {
    await showAppointmentsList();
});
