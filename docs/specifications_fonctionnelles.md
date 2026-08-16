# Spécifications Fonctionnelles & Cahier de Recette : Ciao Byebye

Ce document définit les spécifications détaillées des fonctionnalités de la solution de commande et de paiement sur table **Ciao Byebye**, ainsi que les cas de tests fonctionnels pour valider chaque parcours.

---

## 1. Description Générale & Philosophie

**Ciao Byebye** est une solution SaaS conçue pour fluidifier le service en restaurant et bar.

### Philosophie du Produit
* **Replacer l'humain au cœur de son métier, et non le remplacer** : Automatiser la prise de commande, l'encaissement et le suivi logistique libère le personnel des tâches répétitives pour se concentrer sur l'accueil, le conseil et la relation humaine.
* **Friction Zéro** : Le client s'installe, scanne le QR code, saisit son prénom, commande, paie, consomme et s'en va (*Ciao byebye*). Pas de compte à créer, pas d'application à installer depuis un store.

---

## 2. Parcours Fonctionnels & Flux de Données

### A. Parcours Client (Progressive Web App - PWA)
1. **Accès** : Scan d'un QR Code de table redirigeant vers `https://<domaine>/index.html?table=05`.
2. **Identification** : Saisie obligatoire du prénom (champ `client_name` en base de données) pour identifier le client lors du retrait.
3. **Sélection** : Navigation à travers les catégories du menu (Boissons, Plats, Entrées, Desserts) chargées dynamiquement depuis la base de données.
4. **Panier** : Ajustement des quantités directement sur les cartes du menu via un sélecteur dynamique `[ - ] [ quantité ] [ + ]` ou dans le tiroir de panier coulissant.
5. **Paiement** : Simulation ou déclenchement du paiement Stripe (bouton Apple Pay / Google Pay ou carte).
6. **Suivi** : Redirection vers l'écran de succès affichant les étapes de préparation en direct (*Payé* -> *En cuisine* -> *Prête*).
7. **Retrait** : Réception d'une notification push navigateur lorsque le statut passe à *Prête*.

### B. Parcours Cuisine (Kitchen Display System - KDS)
1. **Accès Sécurisé (SSO)** : Connexion obligatoire via le portail pro (`login.html`) avec authentification rapide Google, Apple ou Microsoft.
2. **Affichage Cuisine** : Visualisation en temps réel des commandes actives sous forme de cartes dans la colonne *« En Préparation »*.
3. **Bip Sonore** : Déclenchement automatique d'un son système à chaque nouvelle commande reçue.
4. **Mise en disponibilité** : Le cuisinier clique sur *« Prête à servir ! »*. La commande est déplacée dans la colonne *« Prêtes / À Retirer »* et notifie instantanément le client par WebSockets.
5. **Clôture** : Le serveur clique sur *« Livrée »* une fois la commande récupérée pour l'archiver.

---

## 3. Schéma de Base de Données

Les données de test exploitent la base PostgreSQL de Render selon le modèle suivant :
* `tables` : Contient la liste des tables physiques et leur jeton QR unique associé (`qr_code_token`).
* `table_sessions` : Session active (`active`, `closed`) ouverte lors du premier scan de table.
* `orders` : Enregistrement des transactions (statut de paiement `complete`, statut de préparation `en_cuisine`/`prete`/`servie`, prénom client `client_name`).
* `products` : Liste des articles du menu avec contrainte d'unicité sur `name` pour éviter les doublons.
* `order_items` : Lignes de commande détaillant la quantité et le prix unitaire en centimes à l'instant de l'achat.

---

## 4. Cahier de Recette & Cas de Tests Fonctionnels

Ce protocole définit les tests de recette requis pour valider le bon fonctionnement de l'application avant sa mise en production.

### TC-01 : Parcours d'Achat & Commande Client (PWA)
* **Objectif** : Valider le parcours complet de commande, de la sélection au paiement fictif.
* **Pré-requis** : Base de données en ligne active avec produits pré-ensemencés.
* **Étapes de test** :
  1. Ouvrir `index.html` dans le navigateur.
  2. Modifier le champ prénom à « Thomas ».
  3. Cliquer sur le bouton « Ajouter » sur le plat *Burger Signature L'Atelier*.
  4. Augmenter la quantité à `2` via le stepper direct de la carte produit.
  5. Cliquer sur le bouton flottant du panier pour l'ouvrir.
  6. Cliquer sur « Passer commande ».
  7. Cliquer sur « Confirmer le paiement ».
* **Résultat Attendu** :
  - Le panier se vide après paiement.
  - L'écran de succès s'affiche avec le prénom « Thomas », la table « 05 » et un identifiant de commande court (ex: `M-A4B8`).
  - L'étape *En cuisine* est marquée active (statut de préparation `en_cuisine` en base de données).

### TC-02 : Synchronisation & Alerte Cuisine en Temps Réel (KDS)
* **Objectif** : Valider la réception instantanée et l'alerte sonore en cuisine via WebSockets.
* **Pré-requis** : Avoir ouvert `dashboard.html` dans un second onglet (authentifié).
* **Étapes de test** :
  1. Placer une commande sur l'écran client (TC-01).
  2. Observer l'écran cuisine `dashboard.html` immédiatement après la confirmation de paiement.
* **Résultat Attendu** :
  - Un bip audio retentit sur l'écran cuisine.
  - La commande apparaît instantanément dans la colonne *« En Préparation »* sans rechargement de page.
  - Les détails affichent : Prénom du client, table, heure de commande et le détail exact des plats et quantités.

### TC-03 : Portail de Connexion SSO & Authentification
* **Objectif** : Valider le blocage d'accès non autorisé au KDS et la connexion SSO Google/Apple/Microsoft.
* **Pré-requis** : Session effacée (sessionStorage vide).
* **Étapes de test** :
  1. Tenter d'ouvrir `dashboard.html` directement.
  2. Vérifier la redirection automatique vers `login.html`.
  3. Sur la page `login.html`, sélectionner le profil « Chef Cuisine » et cliquer sur le bouton « Se connecter avec Google ».
* **Résultat Attendu** :
  - L'accès direct à `dashboard.html` est bloqué et redirige vers `login.html`.
  - Le clic sur « Se connecter avec Google » déclenche la simulation SSO et redirige vers `dashboard.html`.
  - Le header affiche l'adresse e-mail `chef@atelier-chris.fr` et active les fonctionnalités de cuisine.
  - Cliquer sur le bouton de déconnexion (icône de sortie) renvoie immédiatement vers `login.html` et invalide la session.

### TC-04 : Système de Notification Push Navigateur
* **Objectif** : Valider la demande d'autorisation de notifications et l'alerte push lors du retrait.
* **Pré-requis** : Avoir autorisé les notifications système lors du premier chargement de `index.html`.
* **Étapes de test** :
  1. Effectuer une commande client (TC-01) et rester sur l'écran de succès (suivi de commande).
  2. Sur l'écran cuisine (TC-02), identifier la commande et cliquer sur le bouton « Prête à servir ! ».
* **Résultat Attendu** :
  - Sur l'écran cuisine, la commande glisse de la colonne *« En Préparation »* vers la colonne *« Prêtes / À Retirer »*.
  - Sur l'écran client, l'étape *Prête* du tracker de statut passe au vert (WebSocket `order_status_updated`).
  - Le navigateur du client affiche une notification système push : *« Ciao Byebye - Commande Prête ! [Nom], votre commande est prête au comptoir. Ciao byebye ! »*.

### TC-05 : Affichage KDS Filtré par Rôle (Serveur & Bar)
* **Objectif** : Valider que le serveur et le barman ne voient que les commandes qui les concernent.
* **Étapes de test** :
  1. Se connecter avec le profil `david@atelier-chris.fr` (Serveur - Tables 5, 8, 12).
  2. Vérifier que seules les commandes des tables 5, 8 ou 12 sont affichées dans la liste.
  3. Se déconnecter, puis se connecter avec le profil `barman@atelier-chris.fr` (Barman).
  4. Vérifier que seules les boissons (ex: cocktails, bières) apparaissent sur les fiches de commande, et que les commandes sans boissons sont totalement masquées.
* **Résultat Attendu** :
  - Filtrage automatique et immédiat des fiches KDS selon le profil de l'utilisateur connecté.

### TC-06 : Affectation de Tables en Temps Réel (Chef de salle)
* **Objectif** : Permettre au chef de salle d'attribuer des tables aux serveurs en direct.
* **Étapes de test** :
  1. Se connecter avec le profil `maitre@atelier-chris.fr` (Chef de salle).
  2. Sur le tableau d'affectation, attribuer la **Table 05** à **David**.
  3. Dans un autre onglet, se connecter en tant que David et vérifier que la commande de la table 05 apparaît instantanément.
* **Résultat Attendu** :
  - Les changements d'affectation se synchronisent en temps réel sur tous les écrans KDS via WebSockets.

### TC-07 : Gestion de la Disponibilité du Menu (Cuisine)
* **Objectif** : Masquer un produit en rupture de stock pour empêcher les clients de le commander.
* **Étapes de test** :
  1. Se connecter en tant que Chef Cuisine (`chef@atelier-chris.fr`).
  2. Cliquer sur le bouton « Gérer dispo Menu » dans le header.
  3. Désactiver l'interrupteur à côté de *Moscow Mule Premium*.
  4. Sur l'écran client, rafraîchir le menu et vérifier que le *Moscow Mule Premium* n'est plus proposé ou est marqué indisponible.
* **Résultat Attendu** :
  - Le produit indisponible disparaît du catalogue client instantanément sans redémarrer le serveur.

### TC-08 : Écran Public de Retrait (Borne Comptoir & Kiosque d'Appel)
* **Objectif** : Afficher un écran géant d'information pour les clients au comptoir avec diffusion vidéo de démonstration.
* **Étapes de test** :
  1. Se connecter avec le profil `pickup@atelier-chris.fr`.
  2. Vérifier que l'affichage bascule en mode Kiosque de comptoir public (commandes en cours, commandes prêtes et carrousel vidéo de préparation).
  3. Placer une commande pour "Thomas" et la marquer comme prête en cuisine.
* **Résultat Attendu** :
  - Le prénom de Thomas apparaît dans la colonne *« En Préparation »* puis glisse dans la colonne *« Prêt au comptoir »* en clignotant.
  - La 3ème colonne diffuse en continu les vidéos de préparation du chef (Milkshake, Tacos, Burgers, Cocktails) avec sélection interactive.

### TC-09 : Internationalisation (Multi-langue & Support RTL Arabe)
* **Objectif** : Valider le basculement instantané de la langue et de l'orientation droite-à-gauche.
* **Étapes de test** :
  1. Sur la PWA Client (`index.html`) ou sur le KDS (`dashboard.html`), cliquer sur le sélecteur de langue dans le header.
  2. Sélectionner « 🇸🇦 العربية ».
  3. Vérifier que l'ensemble des textes est traduit en arabe, que la typographie *Cairo* est appliquée et que la mise en page bascule en mode `dir="rtl"` (inversion des colonnes, alignement des textes à droite, position du panier).
  4. Sélectionner ensuite « 🇬🇧 EN » puis « 🇪🇸 ES ».
* **Résultat Attendu** :
  - Traduction immédiate de l'interface sans rechargement de page et disposition RTL fluide.

### TC-10 : Multi-devises Dynamiques
* **Objectif** : Valider la conversion et l'affichage des prix dans différentes devises internationales.
* **Étapes de test** :
  1. Sur l'écran client, ouvrir le sélecteur de devises (EUR, USD, GBP, MAD, SAR, AED).
  2. Sélectionner « USD ($) » : vérifier que les prix s'affichent au format `$ 13.50`.
  3. Sélectionner « MAD (DH) » : vérifier que les prix s'affichent au format `135.00 DH`.
  4. Ajouter un produit au panier et vérifier que le sous-total, le total et la modale de paiement Stripe reflètent la devise sélectionnée.
* **Résultat Attendu** :
  - Mise à jour instantanée de tous les prix dans le catalogue et le panier.

### TC-11 : Mode Plein Écran TV (KDS & Comptoir Kiosque)
* **Objectif** : Valider l'adaptation grand écran et l'activation du plein écran pour les affichages en cuisine et au bar.
* **Étapes de test** :
  1. Sur `dashboard.html`, cliquer sur le bouton d'agrandissement (icône d'expansion) dans le header.
  2. Vérifier que le navigateur bascule en mode plein écran natif (Full Screen).
  3. Afficher le mode Comptoir Public (`pickup@atelier-chris.fr`) sur un écran haute résolution (1080p / 4K).
* **Résultat Attendu** :
  - Les cartes de commande et les prénoms des clients s'affichent avec une typographie géante et un contraste élevé lisible à plus de 10 mètres.

### TC-12 : Persistance de Session Invité (Rétention 3 Heures) & Restauration Automatique
* **Objectif** : Valider que le client invité conserve sa session et sa commande active pendant 3 heures, même après rechargement ou réouverture du navigateur.
* **Étapes de test** :
  1. Accéder à `index.html` en tant qu'invité et passer une commande pour la Table 05.
  2. Vérifier que la clé `ciao_guest_expires_at` est initialisée à `Date.now() + 3h` dans le `localStorage`.
  3. Rafraîchir la page (F5) ou fermer l'onglet puis rouvrir `index.html`.
* **Résultat Attendu** :
  - La commande en cours est immédiatement restaurée.
  - La bannière flottante de suivi actif réapparaît au bas de l'écran avec le statut temps réel (`🔥 En cuisine`).
  - L'ouverture du tiroir de compte indique le temps restant de la session invité (ex: `Valide encore 2h 58min`).

### TC-13 : Espace Client Authentifié & Barre Flottante Minimisable
* **Objectif** : Permettre au client de continuer à naviguer sur le menu tout en gardant un accès direct à sa commande.
* **Étapes de test** :
  1. Passer commande puis cliquer sur « Réduire & Continuer à Parcourir ».
  2. Vérifier que la modale se ferme et que la barre flottante reste active en bas de l'écran.
  3. Cliquer sur le bouton « Invité / Mon Espace » dans le header pour ouvrir le tiroir latéral.
  4. Vérifier la présence de la carte de commande active avec son statut et le bouton de suivi direct.
* **Résultat Attendu** :
  - Navigation fluide sans perte de contexte de commande.

### TC-14 : Carrousel Vidéo de Préparation & Offres Spéciales sur Borne Comptoir
* **Objectif** : Vérifier la lecture et le changement interactif des vidéos de démonstration et promotions.
* **Étapes de test** :
  1. Sur l'écran comptoir (`pickup@atelier-chris.fr`), observer la 3ème colonne média.
  2. Cliquer sur l'onglet « 🥤 Milkshake Gourmet Fraise & Chantilly » : vérifier que la vidéo démarre automatiquement en boucle.
  3. Cliquer sur « 🌮 Tacos & Smash Burgers Grill » puis « 🍹 Cocktails & Mocktails Maison ».
* **Résultat Attendu** :
  - Lecture vidéo fluide et instantanée avec mise à jour du badge de démonstration.



