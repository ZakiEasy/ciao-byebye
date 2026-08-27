# 🍳 Guide de Formation : Équipe Cuisine & KDS Multi-Postes

**Ciao Byebye Kitchen Display System (KDS)**  
*Destiné aux : Chefs de Cuisine, Cuisiniers, Commis, Chefs de Partie, Barmen et Responsables Passe Expo.*

---

## 🎯 1. Objectifs de la Formation
À l'issue de ce module, l'équipe cuisine sera capable de :
1. Consulter et filtrer les commandes selon leur poste de travail (*Chaud*, *Froid*, *Bar*, *Passe Expo*).
2. Maîtriser le **Course Management** (gestion des suites : *HOLD* / *FIRE* / *Réclame*).
3. Traiter immédiatement les **alertes allergies haute priorité** avec acquittement obligatoire.
4. Interpréter avec précision les modificateurs de plats (*SANS*, *EXTRA*, *Substitutions*, *Cuissons*).
5. Réagir aux alertes de temporisation (*> 20 minutes*).
6. Déclarer les pertes cuisine (*Waste Management*) pour ajuster les stocks en direct.
7. Effectuer le « Bump » (validation) d'un plat ou d'une commande complète.

---

## 🖥️ 2. Prise en Main de l'Écran KDS

### A. Connexion au Portail Pro
1. Rendez-vous sur `https://<domaine>/login.html` ou ouvrez l'application KDS sur votre tablette/écran tactile mural.
2. Cliquez sur le profil **Chef Cuisine** ou connectez-vous avec votre e-mail professionnel via SSO Google/Apple/Microsoft.
3. Vous arrivez directement sur l'écran **🍳 KDS Cuisine**.

### B. Sélection de votre Poste de Travail
En haut de l'écran, sélectionnez le bouton correspondant à votre zone :
- `🍳 Tous / Passe Expo` : Affiche l'intégralité des bons pour le chef et l'aboyeur.
- `🥩 Chaud / Grill` : Isole les viandes, plats chauds, woks, garnitures chaudes.
- `🥗 Froid / Entrées` : Isole les entrées froides, salades, desserts et préparations froides.
- `🍹 Bar / Boissons` : Isole les cocktails, boissons, cafés et softs.

---

## ⏱️ 3. Gestion des Suites (Course Management)

Le système organise automatiquement l'ordre d'envoi des plats pour éviter que les plats principaux ne refroidissent pendant que les clients dégustent leurs entrées :

```
[ SCAN & COMMANDE CLIENT ]
            │
            ├────► Entrées & Boissons ───► [ 🔥 FIRE : En Préparation Immédiate ]
            │
            └────► Plats & Desserts  ───► [ ⏸️ HOLD : En Attente de Réclame ]
                                                     │
                                                     ▼ (Le serveur ou la cuisine clique sur "🔥 Réclame")
                                           [ 🔥 FIRE : Lancement Cuisson ]
```

1. **Plats en `⏸️ HOLD`** : Fond grisé avec badge bleu `⏸️ HOLD`. Ils indiquent à la cuisine la commande globale de la table sans déclencher la cuisson immédiate.
2. **Déclenchement de la Suite (`🔥 Réclame`)** :
   - Lorsque la table termine ses entrées, le serveur ou le chef clique sur le bouton orange `[ 🔥 Réclame ]`.
   - Le statut passe instantanément en `🔥 FIRE` (fond orange pulsant), signalant le début immédiat de la préparation.

---

## ⚠️ 4. Protocole Allergies Haute Priorité

La sécurité des convives est primordiale. Tout plat contenant un allergène déclaré par le client déclenche une alerte visuelle renforcée :

1. **Signal Visuel** :
   - Un bandeau rouge vif clignotant s'affiche en tête de carte : `⚠️ ATTENTION ALLERGIE : GLUTEN, ARACHIDES`.
2. **Acquittement Obligatoire** :
   - Le cuisinier préparant le plat doit obligatoirement cliquer sur le bouton rouge `[ ⚠️ Acquitter ]`.
   - Le badge passe au vert `[ ✅ Acquittée ]` et horodate la prise en compte en cuisine.
   - **Règle d'or** : Aucun plat avec allergie non acquittée ne doit quitter le passe expo !

---

## 🏷️ 5. Modificateurs d'Ingrédients & Cuissons

Les demandes spéciales des clients sont stylisées pour une lisibilité instantanée même à 2 mètres de l'écran :

| Modificateur | Exemple d'Affichage | Action Cuisine |
| :--- | :--- | :--- |
| **SANS (Exclusion)** | <span style="color:#f87171; text-decoration:line-through;">SANS Oignons</span> | Ne pas ajouter l'ingrédient (éviction allergique/goût). |
| **EXTRA (Supplément)** | <span style="color:#34d399; font-weight:700;">+ EXTRA Cheddar</span> | Doubler la dose de l'ingrédient spécifié. |
| **SUB (Substitution)** | <span style="color:#22d3ee; font-style:italic;">↔ Sub Frites / Salade</span> | Remplacer la garniture de base par l'option choisie. |
| **CUISSON** | <span style="color:#fbbf24; font-weight:700;">SAIGNANT / À POINT</span> | Respecter la température à cœur demandée. |

---

## 🚨 6. Alertes Temporisation (> 20 Minutes)

- Lorsqu'une commande dépasse **20 minutes** en statut `en_cuisine` sans avoir été servie :
  - La carte de la commande s'entoure d'un **contour rouge vif clignotant**.
  - Le temps d'attente s'affiche en grand avec un icône d'alerte `🚨 24 min`.
- **Action attendue** : Prioriser immédiatement le bon en cours et informer le passe expo.

---

## 🗑️ 7. Déclaration des Pertes Cuisine (Waste Management)

Lorsqu'un plat est refait (erreur de cuisson, casse d'assiette, avarie ingrédient, erreur allergie) :
1. Ouvrez l'onglet **📦 Stocks & BOM** $\to$ sous-onglet **🗑️ Pertes Cuisine**.
2. Cliquez sur **« Déclarer une Perte »**.
3. Renseignez l'ingrédient ou le plat, la quantité et le motif (*Erreur de cuisson*, *Assiette tombée*, *DLC dépassée*, *Avarie produit*).
4. Cliquez sur **Enregistrer** : le stock réel est immédiatement corrigé et la traçabilité est enregistrée pour le bilan de fin de mois.

---

## ✅ 8. Procédure de Bump (Validation & Envoi)

1. **Par Poste** : Quand le poste Chaud termine sa part du bon, il clique sur `[ Valider Poste Chaud ]`.
2. **Passe Expo (Global)** : Lorsque tous les éléments de la commande sont réunis sur le passe, le chef clique sur **`[ ✅ Prête à Servir ! ]`**.
3. **Effets automatiques** :
   - Le statut passe à `prete`.
   - La table sur le Plan de Tables 2D passe en vert.
   - Le client reçoit une notification push sur son smartphone.
   - Le serveur affecté à la table reçoit l'alerte de retrait au passe.
