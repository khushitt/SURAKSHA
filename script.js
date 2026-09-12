/* =========================================================
   SURAKSHA — Women's Safety & Emergency Response
   Main JavaScript
   ========================================================= */


/* =========================================================
   1. PAGE INFORMATION
   ========================================================= */

const pageInfo = {

    overview: {
        title: "Personal Safety Command Center",
        subtitle: "Monitor your safety and emergency readiness"
    },

    emergency: {
        title: "Emergency SOS",
        subtitle: "Manage and simulate emergency response"
    },

    location: {
        title: "Live Location",
        subtitle: "Monitor simulated location and movement"
    },

    family: {
        title: "Family Safety",
        subtitle: "Manage trusted contacts and safety alerts"
    },

    ride: {
        title: "Ride Safety Mode",
        subtitle: "Monitor your simulated ride and route"
    },

    responder: {
        title: "Responder Dashboard",
        subtitle: "View simulated emergency response"
    },

    evidence: {
        title: "Evidence Vault",
        subtitle: "Manage simulated safety evidence"
    },

    incidents: {
        title: "Incidents & Analytics",
        subtitle: "Review simulated safety activity"
    },

    settings: {
        title: "Safety Settings",
        subtitle: "Manage privacy and emergency permissions"
    }

};


/* =========================================================
   2. PAGE NAVIGATION
   ========================================================= */

function show(id, btn) {

    // Hide all pages
    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });


    // Show selected page
    const selectedPage = document.getElementById(id);

    if (selectedPage) {
        selectedPage.classList.add("active");
    }


    // Remove active class from all navigation buttons
    document.querySelectorAll(".nav-item").forEach(item => {
        item.classList.remove("active");
    });


    // Add active class to selected navigation button
    if (btn) {
        btn.classList.add("active");
    }


    // Update topbar title
    if (pageInfo[id]) {

        document.getElementById("page-title").textContent =
            pageInfo[id].title;

        document.getElementById("page-subtitle").textContent =
            pageInfo[id].subtitle;
    }


    // Close mobile sidebar
    const sidebar = document.getElementById("sidebar");

    if (sidebar) {
        sidebar.classList.remove("open");
    }


    // Refresh Lucide icons
    if (window.lucide) {
        lucide.createIcons();
    }
}


/* =========================================================
   3. MOBILE MENU
   ========================================================= */

function toggleMenu() {

    const sidebar = document.getElementById("sidebar");

    if (sidebar) {
        sidebar.classList.toggle("open");
    }

}


/* =========================================================
   4. TOAST MESSAGE
   ========================================================= */

function toast(text) {

    const toastElement = document.getElementById("toast");
    const toastText = document.getElementById("toast-text");

    if (!toastElement || !toastText) {
        return;
    }


    toastText.textContent = text;

    toastElement.classList.add("show");


    clearTimeout(window.toastTimer);


    window.toastTimer = setTimeout(() => {

        toastElement.classList.remove("show");

    }, 3000);

}


/* =========================================================
   5. TOGGLE SWITCH
   ========================================================= */

function toggle(element) {

    if (!element) {
        return;
    }


    element.classList.toggle("active");


    if (element.classList.contains("active")) {

        toast("Setting enabled");

    } else {

        toast("Setting disabled");

    }

}


/* =========================================================
   6. SOS VARIABLES
   ========================================================= */

let sosRunning = false;

let sosTimer = null;

let demoTimers = [];


/* =========================================================
   7. START SOS
   ========================================================= */

function startSOS() {

    // Prevent multiple SOS activations
    if (sosRunning) {
        return;
    }


    sosRunning = true;


    const sosButtons =
        document.querySelectorAll(".sos-button");


    const safetyStatus =
        document.getElementById("safety-status");


    const emergencyStatus =
        document.getElementById("emergency-status");


    // Change status
    if (safetyStatus) {
        safetyStatus.textContent = "ALERT";
        safetyStatus.style.color = "var(--primary)";
    }


    if (emergencyStatus) {
        emergencyStatus.textContent = "ALERT";
        emergencyStatus.style.color = "var(--primary)";
    }


    // Change button appearance
    sosButtons.forEach(button => {

        button.classList.add("active");

    });


    toast("SOS activated — starting emergency simulation");


    // Countdown
    let countdown = 5;


    toast(`Emergency response starting in ${countdown} seconds`);


    sosTimer = setInterval(() => {

        countdown--;


        if (countdown > 0) {

            toast(
                `Emergency response starting in ${countdown} seconds`
            );

        }


        if (countdown <= 0) {

            clearInterval(sosTimer);

            sosTimer = null;


            runFlow(false);

            // Open Emergency page
            const emergencyButton =
                document.querySelector(
                    '.nav-item[onclick*="emergency"]'
                );


            show("emergency", emergencyButton);

        }

    }, 1000);

}


/* =========================================================
   8. RESET DEMO
   ========================================================= */

function resetDemo() {

    // Stop SOS timer
    if (sosTimer) {

        clearInterval(sosTimer);

        sosTimer = null;
    }


    // Stop all demo timers
    demoTimers.forEach(timer => {

        clearTimeout(timer);

    });


    demoTimers = [];


    sosRunning = false;


    // Reset safety status
    const safetyStatus =
        document.getElementById("safety-status");


    const emergencyStatus =
        document.getElementById("emergency-status");


    if (safetyStatus) {

        safetyStatus.textContent = "SAFE";

        safetyStatus.style.color = "";

    }


    if (emergencyStatus) {

        emergencyStatus.textContent = "SAFE";

        emergencyStatus.style.color = "var(--green)";

    }


    // Reset SOS buttons
    document.querySelectorAll(".sos-button").forEach(button => {

        button.classList.remove("active");

    });


    // Reset responder status
    const responderStatus =
        document.getElementById("responder-status");


    if (responderStatus) {

        responderStatus.textContent = "ACTIVE";

        responderStatus.style.color = "";

    }


    // Reset flow
    document.querySelectorAll(".flow-step").forEach(step => {

        step.classList.remove("active");
        step.classList.remove("completed");

    });


    // Reset network
    const networkStatus =
        document.getElementById("network-status");


    if (networkStatus) {

        networkStatus.textContent =
            "Network Connected";

    }


    toast("Demo has been reset");

}


/* =========================================================
   9. EMERGENCY FLOW
   ========================================================= */

function runFlow(notify = true) {

    const steps =
        document.querySelectorAll(".flow-step");


    if (!steps.length) {
        return;
    }


    // Reset previous flow
    steps.forEach(step => {

        step.classList.remove("active");
        step.classList.remove("completed");

    });


    const messages = [

        "SOS activated",

        "Location secured",

        "Family alerted",

        "Responder notified",

        "Incident resolved"

    ];


    steps.forEach((step, index) => {

        const timer = setTimeout(() => {

            // Mark previous step completed
            if (index > 0) {

                steps[index - 1]
                    .classList.remove("active");

                steps[index - 1]
                    .classList.add("completed");

            }


            // Activate current step
            step.classList.add("active");


            if (notify) {

                toast(messages[index]);

            }


            // Complete final step
            if (index === steps.length - 1) {

                setTimeout(() => {

                    step.classList.remove("active");

                    step.classList.add("completed");


                    const safetyStatus =
                        document.getElementById(
                            "safety-status"
                        );


                    const emergencyStatus =
                        document.getElementById(
                            "emergency-status"
                        );


                    if (safetyStatus) {

                        safetyStatus.textContent = "SAFE";

                        safetyStatus.style.color =
                            "var(--green)";

                    }


                    if (emergencyStatus) {

                        emergencyStatus.textContent =
                            "RESOLVED";

                        emergencyStatus.style.color =
                            "var(--green)";

                    }


                    sosRunning = false;


                    if (notify) {

                        toast(
                            "Emergency simulation resolved"
                        );

                    }

                }, 1000);

            }

        }, index * 1450);


        demoTimers.push(timer);

    });

}


/* =========================================================
   10. RUN FULL DEMO
   ========================================================= */

function runFullDemo() {

    resetDemo();


    toast("Full SURAKSHA demo started");


    // Start emergency flow
    const flowTimer = setTimeout(() => {

        runFlow(true);

    }, 500);


    demoTimers.push(flowTimer);


    // Update responder status
    const responderTimer =
        setTimeout(() => {

            const status =
                document.getElementById(
                    "responder-status"
                );


            if (status) {

                status.textContent = "RESPONDING";

            }

            toast("Responder R-12 notified");

        }, 4500);


    demoTimers.push(responderTimer);


    // Open responder page
    const responderPageTimer =
        setTimeout(() => {

            const responderButton =
                document.querySelector(
                    '.nav-item[onclick*="responder"]'
                );


            show("responder", responderButton);

        }, 6000);


    demoTimers.push(responderPageTimer);


    // Resolve incident
    const resolveTimer =
        setTimeout(() => {

            resolveResponder();

        }, 7500);


    demoTimers.push(resolveTimer);

}


/* =========================================================
   11. SIMULATE LOCATION MOVEMENT
   ========================================================= */

function moveMarker() {

    const markers =
        document.querySelectorAll(".map-marker");


    // Random position
    const left =
        Math.floor(Math.random() * 60) + 20;


    const top =
        Math.floor(Math.random() * 55) + 20;


    markers.forEach(marker => {

        marker.style.left = `${left}%`;

        marker.style.top = `${top}%`;

    });


    // Generate slightly changed coordinates
    const latitude =
        (26.9124 + (Math.random() - 0.5) * 0.02)
            .toFixed(4);


    const longitude =
        (75.7873 + (Math.random() - 0.5) * 0.02)
            .toFixed(4);


    // Update dashboard coordinates
    const latitudeElement =
        document.getElementById("latitude");


    const longitudeElement =
        document.getElementById("longitude");


    if (latitudeElement) {
        latitudeElement.textContent = latitude;
    }


    if (longitudeElement) {
        longitudeElement.textContent = longitude;
    }


    // Update location page coordinates
    const locationLat =
        document.getElementById("location-lat");


    const locationLong =
        document.getElementById("location-long");


    if (locationLat) {
        locationLat.textContent = latitude;
    }


    if (locationLong) {
        locationLong.textContent = longitude;
    }


    toast(
        `Location updated: ${latitude}, ${longitude}`
    );

}


/* =========================================================
   12. OFFLINE MODE
   ========================================================= */

function offlineMode() {

    const networkStatus =
        document.getElementById("network-status");


    if (networkStatus) {

        networkStatus.textContent =
            "OFFLINE — LAST KNOWN LOCATION";

    }


    const offlineBox =
        document.querySelector(".offline-status");


    if (offlineBox) {

        offlineBox.style.background =
            "rgba(255, 171, 74, 0.06)";

        offlineBox.style.borderColor =
            "rgba(255, 171, 74, 0.15)";

        offlineBox.style.color =
            "var(--orange)";

    }


    toast(
        "Offline mode enabled — using last known location"
    );

}


/* =========================================================
   13. RIDE SAFETY
   ========================================================= */

let familyVisibility = true;


function toggleRide() {

    familyVisibility = !familyVisibility;


    if (familyVisibility) {

        toast(
            "Family visibility enabled"
        );

    } else {

        toast(
            "Family visibility disabled"
        );

    }

}


/* =========================================================
   14. ROUTE DEVIATION
   ========================================================= */

function simulateDeviation() {

    const routeStatus =
        document.querySelector(".route-status");


    if (!routeStatus) {
        return;
    }


    const icon =
        routeStatus.querySelector(".route-icon");


    const title =
        routeStatus.querySelector("strong");


    const description =
        routeStatus.querySelector("span");


    if (icon) {

        icon.style.background =
            "rgba(255, 66, 103, 0.1)";

        icon.style.color =
            "var(--primary)";

    }


    if (title) {

        title.textContent =
            "Route Deviation Detected";

    }


    if (description) {

        description.textContent =
            "A simulated route deviation was detected.";

    }


    toast(
        "Route deviation detected — family alert simulated"
    );

}


/* =========================================================
   15. RESPONDER
   ========================================================= */

function resolveResponder() {

    const status =
        document.getElementById("responder-status");


    if (status) {

        status.textContent = "RESOLVED";

        status.style.background =
            "rgba(50, 213, 131, 0.1)";

        status.style.color =
            "var(--green)";

        status.style.borderColor =
            "rgba(50, 213, 131, 0.15)";

    }


    const safetyStatus =
        document.getElementById("safety-status");


    const emergencyStatus =
        document.getElementById("emergency-status");


    if (safetyStatus) {

        safetyStatus.textContent = "SAFE";

        safetyStatus.style.color =
            "var(--green)";

    }


    if (emergencyStatus) {

        emergencyStatus.textContent =
            "RESOLVED";

        emergencyStatus.style.color =
            "var(--green)";

    }


    sosRunning = false;


    toast(
        "Incident #SK-2048 resolved successfully"
    );

}


/* =========================================================
   16. AUDIO WAVEFORM
   ========================================================= */

function makeWave() {

    const waveform =
        document.getElementById("waveform");


    if (!waveform) {
        return;
    }


    waveform.innerHTML = "";


    const barCount = 70;


    for (let i = 0; i < barCount; i++) {

        const bar =
            document.createElement("div");


        bar.className = "wave-bar";


        const height =
            Math.floor(
                Math.random() * 70
            ) + 15;


        bar.style.height =
            `${height}px`;


        waveform.appendChild(bar);

    }


    toast(
        "Audio waveform simulation generated"
    );

}


/* =========================================================
   17. BATTERY SIMULATION
   ========================================================= */

let batteryLevel = 87;


setInterval(() => {

    const battery =
        document.getElementById("battery");


    if (!battery) {
        return;
    }


    // Slowly decrease simulated battery
    batteryLevel -= 0.01;


    if (batteryLevel < 70) {

        batteryLevel = 87;

    }


    battery.textContent =
        `${Math.floor(batteryLevel)}%`;

}, 5000);


/* =========================================================
   18. INITIALIZE APPLICATION
   ========================================================= */

window.addEventListener("load", () => {

    // Initialize Lucide icons
    if (window.lucide) {

        lucide.createIcons();

    }


    // Create waveform
    makeWave();


    // Make sure Overview is active
    const overview =
        document.getElementById("overview");


    if (overview) {

        overview.classList.add("active");

    }


    // Intro screen
    const intro =
        document.getElementById("intro");


    if (intro) {

        setTimeout(() => {

            intro.style.pointerEvents = "none";

        }, 1600);

    }

});


/* =========================================================
   19. CLOSE SIDEBAR WHEN CLICKING OUTSIDE
   ========================================================= */

document.addEventListener("click", event => {

    const sidebar =
        document.getElementById("sidebar");


    const menuButton =
        document.querySelector(".menu-btn");


    if (!sidebar || !menuButton) {
        return;
    }


    if (
        window.innerWidth <= 768 &&
        sidebar.classList.contains("open") &&
        !sidebar.contains(event.target) &&
        !menuButton.contains(event.target)
    ) {

        sidebar.classList.remove("open");

    }

});


/* =========================================================
   20. RESPONSIVE SIDEBAR
   ========================================================= */

window.addEventListener("resize", () => {

    const sidebar =
        document.getElementById("sidebar");


    if (!sidebar) {
        return;
    }


    if (window.innerWidth > 768) {

        sidebar.classList.remove("open");

    }

});