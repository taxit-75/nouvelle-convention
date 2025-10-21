function createPassenger() {
    const numberOfPassengers = document.getElementById('passenger').value;
    const container = document.getElementById('passengerDivs');
    container.innerHTML = ''; // Clear previous divs
    const forfait = 13;
    const taux = parseFloat(document.getElementById('taux').value) || 1.22;

    for (let i = 0; i < numberOfPassengers; i++) {
        const div = document.createElement('div');
        div.style = "background-color: white; padding: 10px; border: 1px solid #ccc; border-radius: 5px;"
        div.textContent = `Passager ${i + 1}`;

        div.appendChild(document.createElement('br'));

        //Distance (en km) :
        const distanceLabel = document.createElement('label');
        distanceLabel.textContent = 'Distance (en km) : ';
        const distanceInput = document.createElement('input');
        distanceInput.type = 'number';
        div.appendChild(distanceLabel);
        div.appendChild(distanceInput);

        div.appendChild(document.createElement('br'));

        //Nuit / Week-end / Férié
        const nuitInput = document.createElement('input');
        nuitInput.type = 'checkbox';
        nuitInput.onclick = calculate()
        const nuitLabel = document.createElement('label');
        nuitLabel.textContent = 'Nuit / Week-end / Férié';
        div.appendChild(nuitInput);
        div.appendChild(nuitLabel);

        div.appendChild(document.createElement('br'));

        //Retour à vide (hospitalisation)
        const hospitalisationInput = document.createElement('input');
        hospitalisationInput.type = 'checkbox';
        const hospitalisationLabel = document.createElement('label');
        hospitalisationLabel.textContent = 'Retour à vide (hospitalisation)';
        div.appendChild(hospitalisationInput);
        div.appendChild(hospitalisationLabel);

        div.appendChild(document.createElement('br'));

        //Forfait aire métropolitaine (+15 €)
        const metropolitaineInput = document.createElement('input');
        metropolitaineInput.type = 'checkbox';
        const metropolitaineLabel = document.createElement('label');
        metropolitaineLabel.textContent = 'Forfait aire métropolitaine (+15 €)';
        div.appendChild(metropolitaineInput);
        div.appendChild(metropolitaineLabel);

        div.appendChild(document.createElement('br'));

        //Sous-total :
        let sousTotal = forfait + kilometrage + checkboxForfaitAireMetropolitaine; // Initialize total
        const sousTotal = document.createElement('label')
        sousTotal.textContent = 'Sous-total : ';

        container.appendChild(div);
    }
}

function calculate() {
    const forfait = 13;

    const taux = parseFloat(document.getElementById('taux').value) || 1.22;

    const kilometrage = (document.getElementById('kilometrage').value - 4) * taux || 0;

    const checkboxForfaitAireMetropolitaine = document.getElementById('metropolitaine').checked ? 15 : 0;

    let total = forfait + kilometrage + checkboxForfaitAireMetropolitaine; // Initialize total

    if (document.getElementById('nuit').checked) {
        const additionalChargeNuit = total * 0.5; // Add 50% to total
        total += additionalChargeNuit;
    }

    if (document.getElementById('retour').checked && !document.getElementById('nuit').checked) {
        if (kilometrage >= 50) {
            const additionalChargeKilometrage = kilometrage * 0.50; // Add 50% for kilometrage over 50
            total += additionalChargeKilometrage;
        }
        else {
            const additionalChargeRetour = kilometrage * 0.25; // Add 25% for kilometrage under 50
            total += additionalChargeRetour;
        }
    }

    const numberOfPassengers = parseInt(document.getElementById('numberOfPassengers').value);

    if (numberOfPassengers === 2) {
        const reduction = total * 0.23; // 23% reduction for 2 passengers 
        total -= reduction;
    }
    else if (numberOfPassengers === 3) {
        const reduction = total * 0.35; // 35% reduction for 3 passengers
        total -= reduction;
    }
    else if (numberOfPassengers >= 4) {
        const reduction = total * 0.37; // 37% reduction for 4 or more passengers
        total -= reduction;
    }

    total = total.toFixed(2); // Round total to 2 decimal places

    document.getElementById('result').innerText = 'Total: ' + total;
}