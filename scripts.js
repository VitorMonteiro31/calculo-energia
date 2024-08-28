// scripts.js
function calculateConsumption() {
    const power = document.getElementById('power').value;
    const hours = document.getElementById('hours').value;
    const days = document.getElementById('days').value;
    const te = document.getElementById('te').value;
    const deviceSelect = document.getElementById('device');
    const otherDevice = document.getElementById('other-device').value;

    // Determine o dispositivo a ser usado
    const deviceName = deviceSelect.value === "0" ? otherDevice : deviceSelect.options[deviceSelect.selectedIndex].text;

    if (power && hours && days && te) {
        const consumption = (power * hours * days) / 1000; // Convert watts to kilowatt-hours
        const totalCost = consumption * parseFloat(te);
        
        document.getElementById('total-consumption').textContent = `Consumo Total: ${consumption.toFixed(2)} kWh`;
        document.getElementById('total-cost').textContent = `Custo Total: R$ ${totalCost.toFixed(2)}`;
        
        // Display the energy flag
        displayEnergyFlag(consumption);

        // Update history table
        updateHistory(deviceName, consumption.toFixed(2));
    } else {
        document.getElementById('total-consumption').textContent = 'Por favor, preencha todos os campos.';
        document.getElementById('total-cost').textContent = '';
        document.getElementById('energy-flag').style.backgroundColor = '#e0e0e0'; // Default color
    }
}

function populatePower() {
    const deviceSelect = document.getElementById('device');
    const powerInput = document.getElementById('power');
    const otherDeviceInput = document.getElementById('other-device');
    const otherDeviceLabel = document.getElementById('other-device-label');

    if (deviceSelect.value === "0") {
        otherDeviceInput.style.display = 'block';
        otherDeviceLabel.style.display = 'block';
        powerInput.value = '';
    } else {
        otherDeviceInput.style.display = 'none';
        otherDeviceLabel.style.display = 'none';
        powerInput.value = deviceSelect.value;
    }
}

function displayEnergyFlag(consumption) {
    const flagContainer = document.getElementById('energy-flag');

    let color;

    if (consumption > 1000) {
        color = '#ff4c4c'; // High consumption (red)
    } else if (consumption > 500) {
        color = '#ffb84c'; // Medium consumption (orange)
    } else if (consumption > 0) {
        color = '#4cff4c'; // Low consumption (green)
    } else {
        color = '#e0e0e0'; // Default color
    }

    flagContainer.style.backgroundColor = color;
}

function updateHistory(device, consumption) {
    const historyTable = document.getElementById('history-table').getElementsByTagName('tbody')[0];
    const newRow = historyTable.insertRow();

    const deviceCell = newRow.insertCell(0);
    const consumptionCell = newRow.insertCell(1);

    deviceCell.textContent = device;
    consumptionCell.textContent = consumption;
}
