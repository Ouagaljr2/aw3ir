window.onload = function () {
    console.log("DOM ready!");
    displayContactList();


    // Ajout de l'écouteur d'événements pour la soumission du formulaire
    document.getElementById("myForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Empêche la soumission par défaut du formulaire

        // Récupération des valeurs des champs
        const firstName = document.getElementById("validationServer01").value;
        const lastName = document.getElementById("validationServer02").value;
        const email = document.getElementById("validationServerUsername").value;
        const address = document.getElementById("validationServer03").value;
        const birthday = document.getElementById("birthday").value;

        // Validation des champs
        let isValid = true;

        // Vérification des longueurs minimales pour les noms et l'adresse
        if (firstName.length < 5) {
            isValid = false;
            document.getElementById("validationServer01").classList.add("is-invalid");
        } else {
            document.getElementById("validationServer01").classList.remove("is-invalid");
        }

        if (lastName.length < 5) {
            isValid = false;
            document.getElementById("validationServer02").classList.add("is-invalid");
        } else {
            document.getElementById("validationServer02").classList.remove("is-invalid");
        }

        if (address.length < 5) {
            isValid = false;
            document.getElementById("validationServer03").classList.add("is-invalid");
        } else {
            document.getElementById("validationServer03").classList.remove("is-invalid");
        }

        // Vérification de la validité de l'email
        if (!validateEmail(email)) {
            isValid = false;
            document.getElementById("validationServerUsername").classList.add("is-invalid");
        } else {
            document.getElementById("validationServerUsername").classList.remove("is-invalid");
        }

        // Vérification de la date de naissance
        if (new Date(birthday) > new Date()) {
            isValid = false;
            document.getElementById("birthday").classList.add("is-invalid");
        } else {
            document.getElementById("birthday").classList.remove("is-invalid");
        }

        // Affichage de la modale d'erreur si des champs sont invalides
        if (!isValid) {
            var myModalError = new bootstrap.Modal(document.getElementById("myModalError"));
            myModalError.show();
            return;
        }

        // Si tous les champs sont valides, préparer l'URL de la carte
        const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?markers=${encodeURIComponent(address)}&zoom=14&size=400x300&scale=2&key=AIzaSyAkmvI9DazzG9p77IShsz_Di7-5Qn7zkcg`;

        document.getElementById("mapImage").src = mapUrl; // Met à jour l'image de la carte
        document.getElementById("mapLink").href = `http://maps.google.com/maps?q=${encodeURIComponent(address)}`; // Met à jour le lien


        contactStore.add(firstName, lastName, birthday, address, email);
        // Afficher la modale de succès
        var myModalSuccess = new bootstrap.Modal(document.getElementById("myModalSuccess"));
        myModalSuccess.show();
    });
};

// Fonction pour valider le format de l'email
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Fonction pour mettre à jour le nombre de caractères
function updateCharCount(id) {
    const inputField = document.getElementById(id);
    const charCount = document.getElementById(`count${id.charAt(id.length - 1)}`);
    charCount.textContent = inputField.value.length; // Met à jour le nombre de caractères
}
