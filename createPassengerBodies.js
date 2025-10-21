function createPassengerBodies() {
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