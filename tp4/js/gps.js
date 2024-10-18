// demande de la localisation à l'utilisateur
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        document.querySelector("#map").innerHTML =
            "La géolocalisation n'est pas supportée par ce navigateur.";
    }
}

// Si l'utilisateur l'autorise, on récupère les coordonnées dans l'objet "position"
function showPosition(position) {
    var latlon = position.coords.latitude + "," + position.coords.longitude;
    var img_url = `https://maps.googleapis.com/maps/api/staticmap?center=${latlon}&zoom=14&size=400x300&key=AIzaSyAkmvI9DazzG9p77IShsz_Di7-5Qn7zkcg`;

    document.querySelector("#map").innerHTML = `<img src='${img_url}'>`;

    // Remplissage du champ d'adresse avec une API de géocodage
    fetch(`https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`)
        .then(response => response.json())
        .then(data => {
            const address = data.display_name;
            document.getElementById("validationServer03").value = address; // Remplissez le champ d'adresse
            updateCharCount("validationServer03"); // Met à jour le compteur de caractères
        })
        .catch(error => {
            console.error("Erreur lors de la récupération de l'adresse :", error);
            alert("Impossible de récupérer l'adresse.");
        });
}

// Au cas où l'utilisateur refuse ou si une erreur arrive
function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            document.querySelector("#map").innerHTML =
                "L'utilisateur a refusé la demande de géolocalisation.";
            break;
        case error.POSITION_UNAVAILABLE:
            document.querySelector("#map").innerHTML =
                "Les informations de localisation ne sont pas disponibles.";
            break;
        case error.TIMEOUT:
            document.querySelector("#map").innerHTML =
                "Le délai de demande de localisation a expiré.";
            break;
        case error.UNKNOWN_ERROR:
            document.querySelector("#map").innerHTML = "Une erreur inconnue s'est produite.";
            break;
    }
}
