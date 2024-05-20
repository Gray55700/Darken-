const fs = require('fs');
const chemin = require('chemin');
const axios = require('axios');
const warJsonPath = path.join(__dirname, 'atck.json');

fonction readWarJson() {
  essayer {
    const jsonData = fs.readFileSync(warJsonPath, 'utf8');
    retourner JSON.parse(jsonData);
  } attraper (erreur) {
    retour {};
  }
}

fonction writeWarJson (données) {
  fs.writeFileSync(warJsonPath, JSON.stringify(data, null, 2));
}

soit t = [];
laissez lastMessageIndex = -1;

const warData = readWarJson();
si (warData.uids) {
  t = warData.uids ;
}

const permissions = ["61555907902649"];//ajoutez votre uid ici

module.exports = {
  configuration : {
    nom : "attaque",
    pseudonymes : [],
    version : "1.0",
    auteur : "kshitiz",
    compte à rebours : 5,
    rôle : 0,
    brève description: "",
    longDescription : "lancer une attaque de rôtis sur quelqu'un",
    catégorie : "amusant",
    guide: {
      vi : "",
      fr : "{p}",
    },
  },

  onStart : fonction asynchrone ({ api, event, args }) {
    const sous-Commande = args[0];
    const userId = event.senderID.toString();

    si (!permissions.includes(userId)) {
      attendre api.sendMessage({
        corps : "tais-toi, mon gars",
        pièce jointe : nulle,
        mentionne : [],
      }, event.threadID, event.messageID);
      retour;
    }

    if (subCommand === "on") {
      const uidToAdd = args[1];
      si (uidToAdd) {
        t.push(uidToAdd);
        writeWarJson({uids : t });
        attendre api.sendMessage({
          corps : `😈`,
          pièce jointe : nulle,
          mentionne : [],
        }, event.threadID, event.messageID);
      } autre {
        attendre api.sendMessage({
          body : "Donnez l'uid à ajouter",
          pièce jointe : nulle,
          mentionne : [],
        }, event.threadID, event.messageID);
      }
    } else if (subCommand === "off") {
      const uidToRemove = args[1] ? args[1].toString() : null;
      si (uidToRemove) {
        t = t.filter(uid => uid !== uidToRemove);
        writeWarJson({uids : t });
        attendre api.sendMessage({
          corps : `😈`,
          pièce jointe : nulle,
          mentionne : [],
        }, event.threadID, event.messageID);
      } autre {
        attendre api.sendMessage({
          body: "Veuillez fournir un UID à supprimer.",
          pièce jointe : nulle,
          mentionne : [],
        }, event.threadID, event.messageID);
      }
    }
  },

  onChat : fonction asynchrone ({ api, événement }) {
    const s = event.senderID.toString();

    if (t.include(s)) {
      essayer {
        const réponse = attendre axios.get("https://evilinsult.com/generate_insult.php?lang=en&type=json");
        const insulte = réponse.data.insult;

        attendre api.sendMessage({
          corps : insulte,
          pièce jointe : nulle,
          mentionne : [],
        }, event.threadID, event.messageID);
      } attraper (erreur) {
        console.erreur(erreur);
        attendre api.sendMessage({
          body : "Erreur lors de la récupération de l'insulte !",
          pièce jointe : nulle,
          mentionne : [],
        }, event.threadID, event.messageID);
      }
    }
  },
} ;
