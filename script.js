let currentPoints = 1247;
let map;
let binMarkers = [];

function showScreen(screenName) {
    // Masquer tous les écrans
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Désactiver tous les boutons de navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Afficher l'écran sélectionné
    document.getElementById(screenName).classList.add('active');
    
    // Activer le bouton correspondant
    event.target.closest('.nav-btn').classList.add('active');
    
    // Initialiser la carte si on va sur l'écran map
    if (screenName === 'map' && !map) {
        initMap();
    }
}

function showBinInfo(location, status, fillLevel) {
    const binInfo = document.getElementById('bin-info');
    const binTitle = document.getElementById('bin-title');
    const binStatus = document.getElementById('bin-status');
    const binFill = document.getElementById('bin-fill');
    const fillProgress = document.getElementById('fill-progress');
    
    binTitle.textContent = `Smart Bin - ${location}`;
    binStatus.textContent = status === 'available' ? 'Disponible' : 'Pleine';
    binStatus.style.color = status === 'available' ? '#4CAF50' : '#F44336';
    binFill.textContent = `${fillLevel}%`;
    fillProgress.style.width = `${fillLevel}%`;
    fillProgress.style.backgroundColor = fillLevel > 80 ? '#F44336' : '#4CAF50';
    
    binInfo.classList.remove('hidden');
}

function closeBinInfo() {
    document.getElementById('bin-info').classList.add('hidden');
}

function claimOffer(points) {
    if (currentPoints >= points) {
        currentPoints -= points;
        updatePointsDisplay();
        alert(`Offre échangée ! Il vous reste ${currentPoints} points.`);
    } else {
        alert(`Pas assez de points ! Il vous faut ${points} points.`);
    }
}

function updatePointsDisplay() {
    // Mettre à jour l'affichage des points sur l'écran d'accueil
    document.querySelector('.points-value').textContent = currentPoints.toLocaleString();
    
    // Mettre à jour l'affichage des points sur l'écran des offres
    document.querySelector('.points-display strong').textContent = currentPoints.toLocaleString();
}

function initMap() {
    // Initialiser la carte centrée sur Paris
    map = L.map('leaflet-map').setView([48.8566, 2.3522], 13);
    
    // Ajouter les tuiles de la carte
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    // Données des Smart Bins
    const bins = [
        { name: 'Louvre Museum', lat: 48.8606, lng: 2.3376, status: 'available', fill: 25 },
        { name: 'Eiffel Tower', lat: 48.8584, lng: 2.2945, status: 'full', fill: 95 },
        { name: 'Châtelet Station', lat: 48.8583, lng: 2.3470, status: 'available', fill: 40 },
        { name: 'Notre-Dame', lat: 48.8530, lng: 2.3499, status: 'available', fill: 60 },
        { name: 'Arc de Triomphe', lat: 48.8738, lng: 2.2950, status: 'full', fill: 88 },
        { name: 'Sacré-Cœur', lat: 48.8867, lng: 2.3431, status: 'available', fill: 15 },
        { name: 'Place de la Bastille', lat: 48.8532, lng: 2.3692, status: 'available', fill: 72 },
        { name: 'Trocadéro', lat: 48.8620, lng: 2.2877, status: 'full', fill: 92 },
        { name: 'Pantheon', lat: 48.8462, lng: 2.3464, status: 'available', fill: 33 },
        { name: 'Gare du Nord', lat: 48.8809, lng: 2.3553, status: 'available', fill: 55 }
    ];
    
    // Ajouter les marqueurs
    bins.forEach(bin => {
        const icon = L.divIcon({
            html: `<i class="fas fa-trash" style="color: white; font-size: 16px;"></i>`,
            className: `bin-marker-leaflet ${bin.status}`,
            iconSize: [36, 36],
            iconAnchor: [18, 18]
        });
        
        const marker = L.marker([bin.lat, bin.lng], { icon })
            .addTo(map)
            .on('click', () => showBinInfo(bin.name, bin.status, bin.fill));
        
        binMarkers.push(marker);
    });
}

// Animation au chargement
document.addEventListener('DOMContentLoaded', function() {
    // Simuler l'ajout de points en temps réel
    setInterval(() => {
        if (Math.random() < 0.1) { // 10% de chance toutes les 5 secondes
            currentPoints += Math.floor(Math.random() * 5) + 1;
            updatePointsDisplay();
        }
    }, 5000);
});