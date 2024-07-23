function saveFile() {
    // Capture the entire content of the webpage
    const fileContent = document.documentElement.outerHTML;

    // Create a Blob with the captured content
    const blob = new Blob([fileContent], { type: 'text/html' });

    // Create an anchor element and set its href to the URL of the Blob
    const anchor = document.createElement('a');
    anchor.href = URL.createObjectURL(blob);

    // Set the download attribute to specify the default filename with the special extension
    anchor.download = 'webpageContent.balls';

    // Trigger a click event on the anchor element to initiate the download
    anchor.click();

    // Clean up by revoking the URL object
    URL.revokeObjectURL(anchor.href);
}

// script.js


document.addEventListener('DOMContentLoaded', function () {
    const unitSystem = 'metric'; // Set the default unit system

    // Function to toggle unit display based on the unit system
    function toggleUnits() {
        const unitSystem = document.querySelector('input[name="unit-system"]:checked').value;

        // Velocity Average Fieldset
        const vavgPressureUnits = document.querySelectorAll('.unit-pressure');
        const vavgDiameterUnits = document.querySelectorAll('.unit-diameter');
        const vavgViscosityUnits = document.querySelectorAll('.unit-viscosity');
        const vavgLengthUnits = document.querySelectorAll('.unit-length');

        vavgPressureUnits.forEach(unit => {
            unit.textContent = unitSystem === 'metric' ? 'psi' : 'kPa';
        });

        vavgDiameterUnits.forEach(unit => {
            unit.textContent = unitSystem === 'metric' ? 'm' : 'in';
        });

        vavgViscosityUnits.forEach(unit => {
            unit.textContent = unitSystem === 'metric' ? 'cP' : 'cP'; // No conversion needed for viscosity
        });

        vavgLengthUnits.forEach(unit => {
            unit.textContent = unitSystem === 'metric' ? 'm' : 'ft';
        });

        // Circular Form Fieldset
        const circularVelocityUnits = document.querySelectorAll('.unit-velocity');
        const circularDensityUnits = document.querySelector('.unit-density');
        const circularViscosityUnits = document.querySelectorAll('.unit-viscosity');
        const circularDiameterUnits = document.querySelectorAll('.unit-diameter');

        circularVelocityUnits.forEach(unit => {
            unit.textContent = unitSystem === 'metric' ? 'm/s' : 'ft/s';
        });

        circularDensityUnits.textContent = unitSystem === 'metric' ? 'kg/m³' : 'lb/ft³';

        circularViscosityUnits.forEach(unit => {
            unit.textContent = unitSystem === 'metric' ? 'cP' : 'cP'; // No conversion needed for viscosity
        });

        circularDiameterUnits.forEach(unit => {
            unit.textContent = unitSystem === 'metric' ? 'm' : 'in';
        });
    }

    // Initial toggle of units based on the default unit system
    toggleUnits();

    // Event listener for changing the unit system
    document.querySelectorAll('input[name="unit-system"]').forEach(input => {
        input.addEventListener('change', toggleUnits);
    });
});







document.querySelectorAll('input[name="unit-system"]').forEach(radio => {
    radio.addEventListener('change', function () {
        setUnits(this.value);
    });
});

let metricValues = {};
let originalValues = {};

function setUnits(unitSystem) {
    if (!originalValues.unitSystem) {
        originalValues = {
            unitSystem: unitSystem,
            pressure1: parseFloat(document.getElementById('pressure-1').value) || 0,
            pressure2: parseFloat(document.getElementById('pressure-2').value) || 0,
            vpipeDiameter: parseFloat(document.getElementById('vpipe-diameter').value) || 0,
            vfluidViscosity: parseFloat(document.getElementById('vfluid-viscosity').value) || 0,
            pipeLength: parseFloat(document.getElementById('pipe-length').value) || 0,
            fluidVelocity: parseFloat(document.getElementById('fluid-velocity').value) || 0,
            fluidDensity: parseFloat(document.getElementById('fluid-density').value) || 0,
            fluidViscosity: parseFloat(document.getElementById('fluid-viscosity').value) || 0,
            pipeDiameter: parseFloat(document.getElementById('pipe-diameter').value) || 0,
        };

        // Store the metric values initially
        metricValues = { ...originalValues };
    }

    if (unitSystem === 'metric') {
        setMetricValues();
    } else if (unitSystem === 'imperial') {
        convertToImperial();
    }

    originalValues.unitSystem = unitSystem;
}

function setMetricValues() {
    // Set the metric values back to their original values
    document.getElementById('pressure-1').value = metricValues.pressure1;
    document.getElementById('pressure-2').value = metricValues.pressure2;
    document.getElementById('vpipe-diameter').value = metricValues.vpipeDiameter;
    document.getElementById('vfluid-viscosity').value = metricValues.vfluidViscosity;
    document.getElementById('pipe-length').value = metricValues.pipeLength;
    document.getElementById('fluid-velocity').value = metricValues.fluidVelocity;
    document.getElementById('fluid-density').value = metricValues.fluidDensity;
    document.getElementById('fluid-viscosity').value = metricValues.fluidViscosity;
    document.getElementById('pipe-diameter').value = metricValues.pipeDiameter;
}

function convertToImperial() {
    document.getElementById('pressure-1').value = (originalValues.pressure1 * 6.89476).toFixed(6); // kPa to psi
    document.getElementById('pressure-2').value = (originalValues.pressure2 * 6.89476).toFixed(6); // kPa to psi
    document.getElementById('vpipe-diameter').value = (originalValues.vpipeDiameter / 0.0254).toFixed(6); // meters to inches
    document.getElementById('vfluid-viscosity').value = (originalValues.vfluidViscosity * 1e6).toFixed(6); // m²/s to centipoise (assuming density of 1 g/cm³)
    document.getElementById('pipe-length').value = (originalValues.pipeLength / 0.3048).toFixed(6); // meters to feet
    document.getElementById('fluid-velocity').value = (originalValues.fluidVelocity / 0.3048).toFixed(6); // meters/second to feet/second
    document.getElementById('fluid-density').value = (originalValues.fluidDensity / 16.0185).toFixed(6); // kg/m³ to lb/ft³
    document.getElementById('fluid-viscosity').value = (originalValues.fluidViscosity * 1e6).toFixed(6); // m²/s to centipoise (assuming density of 1 g/cm³)
    document.getElementById('pipe-diameter').value = (originalValues.pipeDiameter / 0.0254).toFixed(6); // meters to inches
}


document.getElementById('type-dropdown').addEventListener('change', function () {
    var selectedValue = this.value;
    var velocityAverageForm = document.getElementById('vavg-form');
    var circularForm = document.getElementById('circular-form');
    var squareForm = document.getElementById('square-form');
    var channelForm = document.getElementById('channel-form');
    var secondPart = document.getElementById('second-part');

    // Hide all forms initially
    circularForm.style.display = 'none';
    squareForm.style.display = 'none';
    channelForm.style.display = 'none';
    velocityAverageForm.style.display = 'none';

    // Show the form corresponding to the selected pipe type
    if (selectedValue === '1') {
        circularForm.style.display = 'block';
        velocityAverageForm.style.display = 'block';
        secondPart.style.display = 'block';
    } else if (selectedValue === '2') {
        squareForm.style.display = 'block';
        secondPart.style.display = 'none';
    } else if (selectedValue === '3') {
        channelForm.style.display = 'block';
        secondPart.style.display = 'none';
    } else {
        secondPart.style.display = 'none';
    }
});

// Function to handle model form selection
document.getElementById('model-option').querySelector('select').addEventListener('change', function () {
    var selectedModel = this.value;
    var darcyForm = document.getElementById('darcy-form');
    var bernoulliForm = document.getElementById('bernoulli-form');

    // Hide both forms initially
    darcyForm.style.display = 'none';
    bernoulliForm.style.display = 'none';

    // Show the form corresponding to the selected model
    if (selectedModel === '1') {
        darcyForm.style.display = 'block';
    } else if (selectedModel === '2') {
        bernoulliForm.style.display = 'block';
    }
});


function saveParametersToFile() {
    const parameters = {
        P1: document.getElementById('pressure-1').value,
        P2: document.getElementById('pressure-2').value,
        D: document.getElementById('vpipe-diameter').value,
        viscosity: document.getElementById('vfluid-viscosity').value,
        L: document.getElementById('pipe-length').value,
        fluidVelocity: document.getElementById('fluid-velocity').value,
        fluidDensity: document.getElementById('fluid-density').value,
        pipeDiameter: document.getElementById('pipe-diameter').value,
        fluidViscosity: document.getElementById('fluid-viscosity').value,
        darcyFriction: document.getElementById('darcy-friction-factor').value,
        darcyPipeLength: document.getElementById('darcy-pipe-length').value,
        darcyFluidVelocity: document.getElementById('darcy-fluid-velocity').value,
        darcyPipeDiameter: document.getElementById('darcy-pipe-diameter').value,
        bPressure1: document.getElementById('bpressure-1').value,
        bVelocity1: document.getElementById('bvelocity-1').value,
        bElevation1: document.getElementById('belevation-1').value,
        bPressure2: document.getElementById('bpressure-2').value,
        bVelocity2: document.getElementById('bvelocity-2').value,
        bElevation2: document.getElementById('belevation-2').value,
        bHeadloss: document.getElementById('bheadloss').value,
        bPumpHead: document.getElementById('bpump-head').value,
        bTurbineHead: document.getElementById('bturbine-head').value,
        rho1: document.getElementById('rho1').value,
        rho2: document.getElementById('rho2').value,
    };

    const parametersString = JSON.stringify(parameters, null, 2);
    const blob = new Blob([parametersString], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'parameters.txt';
    a.click();

    URL.revokeObjectURL(url);
}




function loadParametersFromFile() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'text/plain';

    input.onchange = function (e) {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = function () {
            const parameters = JSON.parse(reader.result);
            document.getElementById('pressure-1').value = parameters.P1;
            document.getElementById('pressure-2').value = parameters.P2;
            document.getElementById('vpipe-diameter').value = parameters.D;
            document.getElementById('vfluid-viscosity').value = parameters.viscosity;
            document.getElementById('pipe-length').value = parameters.L;
            document.getElementById('fluid-velocity').value = parameters.fluidVelocity;
            document.getElementById('fluid-density').value = parameters.fluidDensity;
            document.getElementById('fluid-viscosity').value = parameters.fluidViscosity;
            document.getElementById('pipe-diameter').value = parameters.pipeDiameter;
            document.getElementById('darcy-friction-factor').value = parameters.darcyFriction;
            document.getElementById('darcy-pipe-length').value = parameters.darcyPipeLength;
            document.getElementById('darcy-fluid-velocity').value = parameters.darcyFluidVelocity;
            document.getElementById('darcy-pipe-diameter').value = parameters.darcyPipeDiameter;
            document.getElementById('bpressure-1').value = parameters.bPressure1;
            document.getElementById('bvelocity-1').value = parameters.bVelocity1;
            document.getElementById('belevation-1').value = parameters.bElevation1;
            document.getElementById('bpressure-2').value = parameters.bPressure2;
            document.getElementById('bvelocity-2').value = parameters.bVelocity2;
            document.getElementById('belevation-2').value = parameters.bElevation2;
            document.getElementById('bheadloss').value = parameters.bHeadloss;
            document.getElementById('bpump-head').value = parameters.bPumpHead;
            document.getElementById('bturbine-head').value = parameters.bTurbineHead;
            document.getElementById('rho1').value = parameters.rho1;
            document.getElementById('rho2').value = parameters.rho2;
        };

        reader.readAsText(file);
    };

    input.click();
}



document.getElementById('calculate-vavg').addEventListener('click', function () {
    // Get input values
    const P1 = parseFloat(document.getElementById('pressure-1').value);
    const P2 = parseFloat(document.getElementById('pressure-2').value);
    const D = parseFloat(document.getElementById('vpipe-diameter').value);
    const viscosity = parseFloat(document.getElementById('vfluid-viscosity').value);
    const L = parseFloat(document.getElementById('pipe-length').value);

    // Validation: Check if any field is blank or negative
    if (isNaN(P1) || isNaN(P2) || isNaN(D) || isNaN(viscosity) || isNaN(L) ||
        P1 < 0 || P2 < 0 || D < 0 || viscosity < 0 || L < 0) {
        alert("Please fill in all fields with positive values.");
        return;
    }

    // Calculate deltaP
    const deltaP = P1 - P2;

    // Calculate Vavg using Poiseuille's equation
    const Vavg = (deltaP * Math.pow(D, 2)) / (32 * viscosity * L);

    // Display the result
    document.getElementById('vavg-output').textContent = `Average Velocity: ${Vavg.toFixed(6)} m/s`;

    // Automatically set the calculated Vavg, pipe diameter, and fluid viscosity for the Reynolds number calculation
    document.getElementById('fluid-velocity').value = Vavg.toFixed(2);
    document.getElementById('pipe-diameter').value = D;
    document.getElementById('fluid-viscosity').value = viscosity;
});


document.getElementById('estimate-parameters').addEventListener('click', function () {
    // Get input values
    const D = parseFloat(document.getElementById('vpipe-diameter').value);
    const Vavg = parseFloat(document.getElementById('vavg-output').textContent.split(' ')[2]);

    // Validation: Check if any field is blank or negative
    if (isNaN(D) || isNaN(Vavg) || D <= 0 || Vavg <= 0) {
        alert("Please ensure diameter and average velocity are calculated and positive.");
        return;
    }

    // Calculate the area (A = π * (D/2)^2)
    const area = Math.PI * Math.pow(D / 2, 2);

    // Calculate the volumetric flow rate (Q = V * A)
    const flowRate = Vavg * area;

    // Display the results
    document.getElementById('area-result').textContent = area.toFixed(6);
    document.getElementById('flow-rate-result').textContent = flowRate.toFixed(6);


    var parameter1 = document.getElementById('parameters-1');
    if (parameter1.style.display === 'none' || parameter1.style.display === '') {
        parameter1.style.display = 'block';
    } else {
        parameter1.style.display = 'none';
    }
});


document.getElementById('estimate-parameters2').addEventListener('click', function () {
    // Get input values
    const rho = parseFloat(document.getElementById('fluid-density').value);
    const fluidVelocity = parseFloat(document.getElementById('fluid-velocity').value);
    const pipeDiameter = parseFloat(document.getElementById('pipe-diameter').value);

    // Validation: Check if any field is blank or negative
    if (isNaN(rho) || isNaN(fluidVelocity) || isNaN(pipeDiameter) || rho <= 0 || fluidVelocity <= 0 || pipeDiameter <= 0) {
        alert("Please ensure Density, Velocity, and Pipe Diameter are calculated and positive.");
        return;
    }

    // Calculate the mass flow rate (m = Rho * Q)
    const massFlow = rho * fluidVelocity * (Math.PI * pipeDiameter * pipeDiameter) / 4;

    // Display the results
    document.getElementById('mass-rate-result').textContent = massFlow.toFixed(6);

    // Toggle the display of additional parameters section
    var parameter2 = document.getElementById('parameters-2');
    if (parameter2.style.display === 'none' || parameter2.style.display === '') {
        parameter2.style.display = 'block';
    } else {
        parameter2.style.display = 'none';
    }
});



document.getElementById('calculate-btn').addEventListener('click', function (event) {
    event.preventDefault();

    // Get input values for Reynolds number calculation
    var fluidVelocity = parseFloat(document.getElementById('fluid-velocity').value);
    var fluidDensity = parseFloat(document.getElementById('fluid-density').value);
    var fluidViscosity = parseFloat(document.getElementById('fluid-viscosity').value);
    var pipeDiameter = parseFloat(document.getElementById('pipe-diameter').value);

    // Validation: Check if any field is blank or negative
    if (isNaN(fluidVelocity) || isNaN(fluidDensity) || isNaN(fluidViscosity) || isNaN(pipeDiameter) ||
        fluidVelocity < 0 || fluidDensity < 0 || fluidViscosity < 0 || pipeDiameter < 0) {
        alert("Please fill in all fields with positive values.");
        return;
    }

    // Calculate Reynolds number
    var reynoldsNumber = (fluidDensity * fluidVelocity * pipeDiameter) / fluidViscosity;
    var flowRegime = '';
    var frictionFactor = 0;

    // Determine flow regime
    if (reynoldsNumber <= 2300) {
        flowRegime = "Laminar";
        frictionFactor = 64 / reynoldsNumber;
        document.getElementById('roughness-input-container').style.display = 'none';
    } else if (reynoldsNumber <= 4000) {
        flowRegime = "Transitional";
        alert("Transitional flow regime is complex and not handled by this calculator.");
    } else {
        flowRegime = "Turbulent";
        document.getElementById('roughness-input-container').style.display = 'block';
        var pipeRoughness = parseFloat(document.getElementById('pipe-roughness').value) || 0;
        if (pipeRoughness > 0) {
            frictionFactor = calculateTurbulentFrictionFactor(reynoldsNumber, pipeDiameter, pipeRoughness);
        } else {
            alert("Please input a valid pipe roughness for turbulent flow.");
            return;
        }
    }

    // Display the result
    document.getElementById('reynolds-number-output').textContent = `Reynolds Number = ${reynoldsNumber.toFixed(6)} (${flowRegime})`;
    document.getElementById('friction-factor-result').textContent = frictionFactor.toFixed(6);

    // Auto-fill the Darcy-Weisbach form
    document.getElementById('darcy-friction-factor').value = frictionFactor.toFixed(6);
    document.getElementById('darcy-pipe-length').value = document.getElementById('pipe-length').value;
    document.getElementById('darcy-fluid-velocity').value = fluidVelocity.toFixed(6);
    document.getElementById('darcy-pipe-diameter').value = pipeDiameter.toFixed(6);
});


function calculateTurbulentFrictionFactor(re, d, e) {
    // Initial guess for friction factor
    let f = 0.02;
    let previousF = 0;
    let iteration = 0;
    const maxIterations = 100;
    const tolerance = 1e-6;

    while (Math.abs(f - previousF) > tolerance && iteration < maxIterations) {
        previousF = f;
        f = 1 / Math.pow(-2 * Math.log10((e / d) / 3.7 + 2.51 / (re * Math.sqrt(f))), 2);
        iteration++;
    }

    if (iteration === maxIterations) {
        alert("Friction factor calculation did not converge.");
    }

    return f;
}


document.getElementById('darcy-btn').addEventListener('click', function (event) {
    event.preventDefault();

    // Get input values for Darcy-Weisbach calculation
    var frictionFactor = parseFloat(document.getElementById('darcy-friction-factor').value);
    var pipeLength = parseFloat(document.getElementById('darcy-pipe-length').value);
    var fluidVelocity = parseFloat(document.getElementById('darcy-fluid-velocity').value);
    var pipeDiameter = parseFloat(document.getElementById('darcy-pipe-diameter').value);

    // Validation: Check if any field is blank or negative
    if (isNaN(frictionFactor) || isNaN(pipeLength) || isNaN(fluidVelocity) || isNaN(pipeDiameter) ||
        frictionFactor < 0 || pipeLength < 0 || fluidVelocity < 0 || pipeDiameter < 0) {
        alert("Please fill in all fields with positive values.");
        return;
    }

    // Calculate frictional head loss using Darcy-Weisbach equation
    var headLoss = (frictionFactor * pipeLength * Math.pow(fluidVelocity, 2)) / (2 * 9.81 * pipeDiameter);

    // Display the result
    document.getElementById('head-loss').textContent = `Frictional Head Loss = ${headLoss.toFixed(6)} m`;
});

document.getElementById('new-button').addEventListener('click', function () {
    // Reset all input values
    document.querySelectorAll('input[type="number"]').forEach(input => input.value = '');

    // Clear all output results and hide the result sections
    const outputSections = document.querySelectorAll('.result-section');
    outputSections.forEach(section => {
        section.querySelector('output').textContent = '';
        section.style.display = 'none';
    });
});




document.getElementById('model-option').querySelector('select').addEventListener('change', function () {
    var selectedModel = this.value;
    var darcyForm = document.getElementById('darcy-form');
    var bernoulliForm = document.getElementById('bernoulli-form');

    // Hide both forms initially
    darcyForm.style.display = 'none';
    bernoulliForm.style.display = 'none';

    // Show the form corresponding to the selected model
    if (selectedModel === '1') {
        darcyForm.style.display = 'block';
    } else if (selectedModel === '2') {
        bernoulliForm.style.display = 'block';
    }
});

// Handle case selection for Bernoulli
document.querySelectorAll('input[name="case"]').forEach(function (elem) {
    elem.addEventListener('change', function () {
        var bernoulliCase1 = document.getElementById('bernoulli-case-1');
        var bernoulliCase2 = document.getElementById('bernoulli-case-2');
        if (this.value === '1') {
            bernoulliCase1.style.display = 'block';
            bernoulliCase2.style.display = 'none';
        } else {
            bernoulliCase1.style.display = 'none';
            bernoulliCase2.style.display = 'block';
        }
    });
});

// Handle Bernoulli calculation
document.getElementById('bernoulli-calculate').addEventListener('click', function () {
    var selectedCase = document.querySelector('input[name="case"]:checked').value;

    if (selectedCase === '1') {
        var caseInputs = document.querySelectorAll('#bernoulli-case-1 input[type="number"]');
        var unknown;
        var values = {};
        var unknownCount = 0;

        // Scan for the unknown field and gather all values
        caseInputs.forEach(function (input) {
            var value = parseFloat(input.value);
            if (isNaN(value)) {
                unknown = input.id;
                unknownCount++;
            } else {
                values[input.id] = value;
            }
        });

        // Densities
        var rho1 = parseFloat(document.getElementById('rho1').value) || 1000;
        var rho2 = parseFloat(document.getElementById('rho2').value) || 1000;

        // Check if densities are unknown
        if (isNaN(rho1) || isNaN(rho2)) {
            document.getElementById('bernoulli-output').textContent = 'Density cannot be the unknown variable.';
            return;
        }

        // If no unknown or more than one unknown found, alert the user
        if (unknownCount !== 1) {
            document.getElementById('bernoulli-output').textContent = 'Please leave exactly one field empty as the unknown variable.';
            return;
        }

        var g = 9.81; // Acceleration due to gravity

        // Extract values with proper defaults for unknowns
        var P1 = values['bpressure-1'] || 0;
        var v1 = values['bvelocity-1'] || 0;
        var z1 = values['belevation-1'] || 0;
        var P2 = values['bpressure-2'] || 0;
        var v2 = values['bvelocity-2'] || 0;
        var z2 = values['belevation-2'] || 0;
        var hf = values['bheadloss'] || 0;

        function calculateUnknown(unknown, params) {
            switch (unknown) {
                case 'bpressure-1':
                    return params.P2 + 0.5 * params.rho2 * Math.pow(params.v2, 2) + params.rho2 * g * params.z2 + params.rho2 * g * params.hf - 0.5 * params.rho1 * Math.pow(params.v1, 2) - params.rho1 * g * params.z1;
                case 'bvelocity-1':
                    return Math.sqrt((params.P2 + 0.5 * params.rho2 * Math.pow(params.v2, 2) + params.rho2 * g * params.z2 + params.rho2 * g * params.hf - params.P1 - params.rho1 * g * params.z1) * 2 / params.rho1);
                case 'belevation-1':
                    return (params.P2 + 0.5 * params.rho2 * Math.pow(params.v2, 2) + params.rho2 * g * params.z2 + params.rho2 * g * params.hf - params.P1 - 0.5 * params.rho1 * Math.pow(params.v1, 2)) / (params.rho1 * g);
                case 'bpressure-2':
                    return params.P1 + 0.5 * params.rho1 * Math.pow(params.v1, 2) + params.rho1 * g * params.z1 - params.rho1 * g * params.hf - 0.5 * params.rho2 * Math.pow(params.v2, 2) - params.rho2 * g * params.z2;
                case 'bvelocity-2':
                    return Math.sqrt((params.P1 + 0.5 * params.rho1 * Math.pow(params.v1, 2) + params.rho1 * g * params.z1 - params.rho1 * g * params.hf - params.P2 - params.rho2 * g * params.z2) * 2 / params.rho2);
                case 'belevation-2':
                    return (params.P1 + 0.5 * params.rho1 * Math.pow(params.v1, 2) + params.rho1 * g * params.z1 - params.P2 - 0.5 * params.rho2 * Math.pow(params.v2, 2) - params.rho2 * g * params.hf) / (params.rho2 * g);
                case 'bheadloss':
                    return (params.P1 + 0.5 * params.rho1 * Math.pow(params.v1, 2) + params.rho1 * g * params.z1 - params.P2 - 0.5 * params.rho2 * Math.pow(params.v2, 2) - params.rho2 * g * params.z2) / (params.rho1 * g);
                default:
                    return 'Unknown variable not recognized.';
            }
        }

        var result = calculateUnknown(unknown, {
            P1, v1, z1, P2, v2, z2, hf, rho1, rho2
        });



        document.getElementById('bernoulli-output').textContent = `${unknown} = ${result}`;
    }
});


document.getElementById('bernoulli-calculate').addEventListener('click', function () {
    var selectedCase = document.querySelector('input[name="case"]:checked').value;

    if (selectedCase === '2') {
        var caseInputs = document.querySelectorAll('#bernoulli-case-2 input[type="number"]');
        var unknown;
        var values = {};
        var unknownCount = 0;

        // Scan for the unknown field and gather all values
        caseInputs.forEach(function (input) {
            var value = parseFloat(input.value);
            if (isNaN(value)) {
                unknown = input.id;
                unknownCount++;
            } else {
                values[input.id] = value;
            }
        });

        // Densities
        var rho1 = parseFloat(document.getElementById('rho1').value) || 1000;
        var rho2 = parseFloat(document.getElementById('rho2').value) || 1000;

        // Check if densities are unknown
        if (isNaN(rho1) || isNaN(rho2)) {
            document.getElementById('bernoulli-output').textContent = 'Density cannot be the unknown variable.';
            return;
        }

        // If no unknown or more than one unknown found, alert the user
        if (unknownCount !== 1) {
            document.getElementById('bernoulli-output').textContent = 'Please leave exactly one field empty as the unknown variable.';
            return;
        }

        var g = 9.81; // Acceleration due to gravity

        // Extract values with proper defaults for unknowns
        var P1 = values['bpressure-1'] || 0;
        var v1 = values['bvelocity-1'] || 0;
        var z1 = values['belevation-1'] || 0;
        var P2 = values['bpressure-2'] || 0;
        var v2 = values['bvelocity-2'] || 0;
        var z2 = values['belevation-2'] || 0;
        var hf = values['bheadloss'] || 0;
        var hp = values['bpump-head'] || 0;
        var ht = values['bturbine-head'] || 0;

        function calculateUnknown(unknown, params) {
            switch (unknown) {
                case 'bpressure-1':
                    return params.P2 + 0.5 * params.rho2 * Math.pow(params.v2, 2) + params.rho2 * g * params.z2 + params.rho2 * g * params.hf + params.rho2 * g * params.ht - 0.5 * params.rho1 * Math.pow(params.v1, 2) - params.rho1 * g * params.z1 - params.rho1 * g * params.hp;
                case 'bvelocity-1':
                    return Math.sqrt((params.P2 + 0.5 * params.rho2 * Math.pow(params.v2, 2) + params.rho2 * g * params.z2 + params.rho2 * g * params.hf + params.rho2 * g * params.ht - params.P1 - params.rho1 * g * params.z1 - params.rho1 * g * params.hp) * 2 / params.rho1);
                case 'belevation-1':
                    return (params.P2 + 0.5 * params.rho2 * Math.pow(params.v2, 2) + params.rho2 * g * params.z2 + params.rho2 * g * params.hf + params.rho2 * g * params.ht - params.P1 - 0.5 * params.rho1 * Math.pow(params.v1, 2) - params.rho1 * g * params.hp) / (params.rho1 * g);
                case 'bpressure-2':
                    return params.P1 + 0.5 * params.rho1 * Math.pow(params.v1, 2) + params.rho1 * g * params.z1 + params.rho1 * g * params.hp - params.rho1 * g * params.hf - params.rho1 * g * params.ht - 0.5 * params.rho2 * Math.pow(params.v2, 2) - params.rho2 * g * params.z2;
                case 'bvelocity-2':
                    return Math.sqrt((params.P1 + 0.5 * params.rho1 * Math.pow(params.v1, 2) + params.rho1 * g * params.z1 + params.rho1 * g * params.hp - params.rho1 * g * params.hf - params.rho1 * g * params.ht - params.P2 - params.rho2 * g * params.z2) * 2 / params.rho2);
                case 'belevation-2':
                    return (params.P1 + 0.5 * params.rho1 * Math.pow(params.v1, 2) + params.rho1 * g * params.z1 + params.rho1 * g * params.hp - params.P2 - 0.5 * params.rho2 * Math.pow(params.v2, 2) - params.rho2 * g * params.hf - params.rho2 * g * params.ht) / (params.rho2 * g);
                case 'bheadloss':
                    return (params.P1 + 0.5 * params.rho1 * Math.pow(params.v1, 2) + params.rho1 * g * params.z1 + params.rho1 * g * params.hp - params.P2 - 0.5 * params.rho2 * Math.pow(params.v2, 2) - params.rho2 * g * params.z2 - params.rho2 * g * params.ht) / (params.rho1 * g);
                case 'bpump-head':
                    return (params.P2 + 0.5 * params.rho2 * Math.pow(params.v2, 2) + params.rho2 * g * params.z2 + params.rho2 * g * params.hf + params.rho2 * g * params.ht - params.P1 - 0.5 * params.rho1 * Math.pow(params.v1, 2) - params.rho1 * g * params.z1) / (params.rho1 * g);
                case 'bturbine-head':
                    return (params.P1 + 0.5 * params.rho1 * Math.pow(params.v1, 2) + params.rho1 * g * params.z1 + params.rho1 * g * params.hp - params.P2 - 0.5 * params.rho2 * Math.pow(params.v2, 2) - params.rho2 * g * params.z2 - params.rho2 * g * params.hf) / (params.rho1 * g);
                default:
                    return 'Unknown variable not recognized.';
            }
        }

        var result = calculateUnknown(unknown, {
            P1, v1, z1, P2, v2, z2, hf, hp, ht, rho1, rho2
        });

        document.getElementById('bernoulli-output').textContent = `${unknown} = ${result}`;
    }
});

// Handle exit button
document.getElementById('exit-button').addEventListener('click', function () {
    window.location.href = "https://www.google.com";
});

//Handle new button
document.getElementById('new-button').addEventListener('click', function () {
    // Clear inputs
    document.querySelectorAll('input[type=text]').forEach(input => input.value = '');
});

document.addEventListener('DOMContentLoaded', function () {
    adjustFooter();

    window.addEventListener('resize', adjustFooter);

    function adjustFooter() {
        const footer = document.querySelector('footer.footer');
        const body = document.body;
        const html = document.documentElement;

        const totalHeight = body.scrollHeight;
        const viewportHeight = html.clientHeight;

        if (totalHeight > viewportHeight) {
            footer.style.position = 'relative';
        } else {
            footer.style.position = 'fixed';
            footer.style.bottom = '0';
        }
    }
});
