/*
store.js
Script pour gérer la liste de contact en JSON

Pour ajouter un contact:  contactStore.add(_name, _firsname, _date, _adress, _mail);
Pour récuper la liste:    contactStore.getList();
*/
var contactStore = (function () {
    // variable privée


    // Expose these functions via an interface while hiding
    // the implementation of the module within the function() block

    return {
        add: function (_name, _firsname, _date, _adress, _mail) {
            var contact = {
                name: _name,
                firstname: _firsname,
                date: _date,
                adress: _adress,
                mail: _mail,
            };
            let contactListString = localStorage.getItem("contactList");
            var contactList = contactListString ? JSON.parse(contactListString) : [];
            // ajout du contact à la liste
            contactList.push(contact);

            // persistence de la liste dans une base de données local du navigateur web
            // https://developer.mozilla.org/fr/docs/Web/API/Window/localStorage
            localStorage.setItem("contactList", JSON.stringify(contactList));

            return contactList;
        },
        reset: function () {

            localStorage.removeItem("contactList");
            let contactListString = localStorage.getItem("contactList");
            var contactList = contactListString ? JSON.parse(contactListString) : [];

            return contactList;
        },

        getList: function () {
            let contactListString = localStorage.getItem("contactList");
            var contactList = contactListString ? JSON.parse(contactListString) : [];
            return contactList;
        },
    };
})();


function displayContactList() {
    const contactListString = localStorage.getItem('contactList');
    const contactList = contactListString ? JSON.parse(contactListString) : [];

    const contactDiv = document.getElementById("contactListDisplay");
    contactDiv.innerHTML = ""; // Vider la div avant de la remplir

    if (contactList.length === 0) {
        contactDiv.innerHTML = "<p>Aucun contact enregistré.</p>";
        return;
    }

    // Créer une liste HTML pour afficher les contacts
    const list = document.createElement("ul");
    list.classList.add("list-group");

    for (const contact of contactList) {
        const listItem = document.createElement("li");
        listItem.classList.add("list-group-item");
        listItem.innerHTML = `
            <strong>Nom:</strong> ${contact.name} | 
            <strong>Prénom:</strong> ${contact.firstname} | 
            <strong>Date de naissance:</strong> ${contact.date} | 
            <strong>Adresse:</strong> ${contact.adress} | 
            <strong>Email:</strong> ${contact.mail}
        `;
        list.appendChild(listItem);
    }

    contactDiv.appendChild(list);
}

function resetContacts() {
    // Réinitialiser la liste des contacts en localStorage
    localStorage.removeItem('contactList');
    contactStore.reset();
    displayContactList(); // Met à jour l'affichage après la réinitialisation
    alert("La liste des contacts a été réinitialisée.");
}
