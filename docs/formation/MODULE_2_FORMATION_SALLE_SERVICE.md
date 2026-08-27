# 🍽️ Guide de Formation : Équipe Salle & Service

**Ciao Byebye Floor Plan 2D & Table Service**  
*Destiné aux : Maîtres d'Hôtel, Responsables de Salle, Chefs de Rang, Serveurs et Barmen.*

---

## 🎯 1. Objectifs de la Formation
À l'issue de ce module, l'équipe de salle sera capable de :
1. Naviguer sur le **Plan de Tables 2D Interactif** et filtrer par zone (*Salle*, *Terrasse*, *Mezzanine*, *Bar*).
2. Ouvrir une table et saisir le **nombre de convives réels** pour optimiser le taux d'occupation et le ticket moyen.
3. Lire et interpréter les **codes couleurs d'état de table en temps réel**.
4. Déclencher la **Réclame des suites** (`🔥 FIRE`) directement depuis la salle.
5. Effectuer des **fusions de tables** (*Table Joining*) pour les groupes et des **dissociations** (*Splitting*).
6. Gérer les états d'hygiène et de rotation de table (*Propre*, *À débarrasser*, *À désinfecter*).
7. Valider les **encaissements en espèces** en caisse ou sur tablette serveur.
8. Répondre aux **appels serveurs** déclenchés par les clients.

---

## 🗺️ 2. Prise en Main du Plan de Tables 2D

### A. Accès au Plan de Tables
1. Connectez-vous sur `https://<domaine>/login.html` avec votre profil **Serveur** (ex: *David*, *Sophie*).
2. Cliquez sur l'onglet **🗺️ Plan de Tables 2D** en haut du Dashboard.

### B. Filtres de Zones
Utilisez la barre de navigation pour isoler rapidement votre rang de travail :
- `🏢 Toutes les Zones` : Vue d'ensemble de l'établissement.
- `🍽️ Salle Principale` : Tables 01, 02, 06, 07.
- `☀️ Terrasse` : Tables 03, 04, 08.
- `🛋️ Mezzanine` : Table 05 et espaces lounge.
- `🍸 Bar` : Sièges comptoir B1, B2 et tables hautes.

---

## 🚦 3. Codes Couleurs & Statuts de Service en Direct

Chaque table affiche visuellement son état physique et son temps d'occupation :

| Statut Visuel | Couleur & Style | Signification Opérationnelle | Action Attendue |
| :--- | :--- | :--- | :--- |
| **🟢 Libre** | Vert émeraude | Table disponible et prête à être dressée. | Installer de nouveaux clients. |
| **🔵 Réservée** | Bleu ciel | Table bloquée pour une réservation à venir. | Vérifier l'heure de réservation. |
| **🟡 Commande prise** | Jaune ambre | Les clients ont scanné et validé leur panier. | Apporter les boissons ou pains. |
| **🔥 En cuisine** | Orange vif pulsant | Les plats sont en cours de cuisson en cuisine. | Surveiller le temps de préparation. |
| **💎 Servie** | Cyan éclatant | Les plats sont sur table, clients en dégustation. | S'assurer de la satisfaction client. |
| **🟣 Addition demandée** | Violet néon | Les clients ont terminé et demandent l'addition / espèces. | Procéder à l'encaissement. |
| **🚨 Alerte > 20 min** | Rouge vif clignotant | Table en attente prolongée sans avancement. | Relancer le passe expo ou aller voir la table. |

---

## 👥 4. Gestion des Couverts & Accueil Client

1. **Capacités Nominal et Min/Max** :
   - Chaque table possède une capacité minimale et maximale (ex: Table 03 : de 2 à 6 personnes).
2. **Saisie des Couverts Réels à l'Ouverture** :
   - Dès que vous installez un groupe sur une table, cliquez sur la table sur le plan 2D.
   - Dans la modale d'action, saisissez le **Nombre de Couverts Réels** (ex: `3` personnes sur une table de 4).
   - Cliquez sur **Mettre à jour** : les statistiques de taux d'occupation et de ticket moyen par convive se mettent à jour automatiquement.

---

## 🪑 5. Numérotation des Sièges (Seat Numbering)

Sur les offres **Pro** et **Chaînes & Multi-sites**, les commandes peuvent être associées au numéro de siège du convive (`🪑 S1`, `🪑 S2`, `🪑 S3`, `🪑 S4`) :
- Les plats apparaissent sur le bon KDS avec leur badge de siège respectif.
- Au moment du service, le serveur dépose immédiatement le bon plat devant la bonne personne **sans demander à la table « Qui a pris le burger ? »**, garantissant une expérience gastronomique haut de gamme.

---

## 🔀 6. Fusion & Découpage de Tables (Joining & Splitting)

### A. Fusion de Tables pour un Grand Groupe (Joining)
1. Cliquez sur la **table principale** (ex: Table 01).
2. Dans la modale, repérez la section **« Fusionner avec d'autres tables »**.
3. Cochez les tables adjacentes (ex: Table 02).
4. Cliquez sur **« Fusionner »** :
   - Les tables secondaires sont rattachées à la table principale.
   - Toutes les commandes du groupe apparaissent sur une vue consolidée.

### B. Dissociation en Fin de Service (Splitting)
1. Cliquez sur la table principale fusionnée.
2. Cliquez sur le bouton rouge **« Dissocier les Tables (Split) »**.
3. Chaque table retrouve instantanément son autonomie sur le plan.

---

## 🧹 7. Hygiène & Rotation de Table

En fin de repas, une fois les clients partis :
1. Cliquez sur la table et modifiez son statut d'hygiène :
   - **`🧹 À débarrasser`** : Signale aux commis de salle que la table doit être débarrassée.
   - **`🧼 À désinfecter`** : Signale que la table doit être nettoyée et désinfectée.
   - **`✨ Propre`** : Remet automatiquement la table en statut **🟢 Libre**.

---

## 💶 8. Encaissement Espèces & Validation en Caisse

Pour les clients choisissant le règlement en espèces :
1. La commande apparaît dans l'onglet KDS / Caisse avec le badge orange **[ À ENCAISSER EN ESPÈCES ]**.
2. Sur le plan de tables, la table passe en **🟣 Addition demandée**.
3. Encaissez le montant indiqué en espèces auprès du client.
4. Cliquez sur le bouton vert **`[ 💶 Valider Encaissement ]`** : la commande est marquée comme payée et archivée.
