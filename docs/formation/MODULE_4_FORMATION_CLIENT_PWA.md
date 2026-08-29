# 📱 Module 4 : Guide Expérience Client & PWA Ciao Byebye

**Solution de Commande & Paiement sur Table 100% sans Téléchargement**  
*Destiné aux : Équipes de Salle, Maîtres d'Hôtel, Responsables Marketing et Formation des Équipes.*

---

## 🎯 1. Parcours Client Idéal en 5 Étapes

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│ 1. SCAN QR CODE │ ──► │ 2. MENU INTERACT│ ──► │ 3. PERSONNALIS. │ ──► │ 4. PAIEMENT SEC │ ──► │ 5. LIVE TRACKING│
│ Sans application│     │ Photos HD, Prix │     │ Sièges, Allergie│     │ Split, TR, Tip  │     │ Déroulant & Avis│
└─────────────────┘     └─────────────────┘     └─────────────────┘     └─────────────────┘     └─────────────────┘
```

---

## 📸 2. Interface de la Carte & Affichage des Plats

L'application web client Ciao Byebye propose une interface raffinée avec un design harmonieux :

```
┌─────────────────────────────────────────────────────────────┐
│ 🍔 Burger Signature L'Atelier                  [ 18,50 € ]  │
│ ┌───────────────┐                                           │
│ │               │  Pain brioché artisanal, steak haché      │
│ │   [ PHOTO ]   │  Charolais 180g, cheddar affiné 12 mois,  │
│ │   CENTRÉE     │  oignons caramélisés et sauce secrète.    │
│ │               │                                           │
│ └───────────────┘  [ 🎛️ Personnaliser ]   [ ➕ Ajouter (1) ] │
└─────────────────────────────────────────────────────────────┘
```

### Éléments Clés du Design :
1. **Photo Produit Centrée** : Ratio optimisé avec zoom fluide au survol.
2. **Badge de Catégorie Élégant** : Fond sombre translucide contrasté.
3. **Prix Mis en Valeur** : Badge ambré lumineux aligné sur la ligne du titre pour une lisibilité instantanée.
4. **Boutons Équilibrés** : Hauteurs et proportions harmonieuses entre *« Personnaliser »* et *« Ajouter »*.
5. **Aération & Espacement** : Interlignes généreux et espacement régulier entre les fiches produits.

---

## 🎛️ 3. Personnalisation des Plats & Sécurité Allergènes

En cliquant sur **« Personnaliser »** ou sur la photo du plat, le convive accède au configurateur sur-mesure :

- **Numérotation des Sièges** : Sélection du convive (`🪑 S1`, `🪑 S2`, `🪑 S3`, `🪑 S4`).
- **Préférence de Cuisson** : *Bleu*, *Saignant*, *À point*, *Bien cuit*.
- **Exclusion d'Ingrédients (`SANS`)** : Retrait d'un ingrédient en 1 clic (sans décompte stock).
- **Suppléments Gourmands (`EXTRA`)** : Ajout d'ingrédients payants (double décompte stock).
- **Substitutions (`↔ SUB`)** : Remplacement de la garniture (ex: Frites de patates douces).
- **Déclaration d'Allergies** : Saisie libre ou sélection parmi les 14 allergènes officiels INCO avec transmission prioritaire en cuisine.

---

## 💳 4. Paiement Fractionné, Titres-Restaurant & Pourboire

### A. Division de l'Addition (Split Bill)
- Choix du nombre de parts (1 à 8 personnes).
- Calcul automatique de la part unitaire au centime près.

### B. Paiement Hybride Titres-Restaurant (Paper & Digital)
- Plafond légal journalier pris en compte (jusqu'à 25,00 €).
- Reste à payer ventilé automatiquement par Carte Bancaire (Apple Pay, Google Pay, Stripe) ou en Espèces.

### C. Pourboire Direct pour l'Équipe (Smart Tip)
- Suggestions pré-calculées : **+5%**, **+10%**, **+15%**, **+20%** ou saisie libre.
- 100% reversé à la brigade de salle et de cuisine.

---

## 📋 5. Popin de Suivi en Direct Déroulante & Accordéon

Dès validation de la commande, la popin de suivi s'affiche et reste accessible à tout moment :

```
┌─────────────────────────────────────────────────────────────┐
│ ✕ Fermer                                                    │
│                            [ ✅ ]                           │
│                 Suivi de Commande en Direct                 │
│                 Merci Alex, commande en cuisine             │
│                                                             │
│  Table : 05  •  Commande : #M-8492  •  File d'attente : #Q-1│
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ 📋 Détail des articles commandés (3)               ▲  │  │
│  ├───────────────────────────────────────────────────────┤  │
│  │ • 🪑 S1 1x Burger Signature (Saignant, Sans Oignons)   │  │
│  │ • 🪑 S1 1x Frites Maison                              │  │
│  │ • 🪑 S2 1x Salade César Fraîche                       │  │
│  │ ----------------------------------------------------- │  │
│  │ Sous-total : 38,50 € • Pourboire : +3,00 € • Total : 41,50 € │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
│  [ Payée ✅ ] ───► [ En cuisine 🔥 ] ───► [ Prête 🍽️ ]      │
│                                                             │
│  [ ✕ Fermer & Parcourir le Menu ]                           │
└─────────────────────────────────────────────────────────────┘
```

1. **Déroulement Fluide & Scroll** : Accès complet à l'historique et au récapitulatif détaillé de la commande.
2. **Fermeture Facile** : Bouton `✕` supérieur et bouton d'action inférieur pour continuer à commander en toute sérénité.
3. **Synchronisation Temps Réel** : Passage automatique à l'étape *« Prête au passe »* ou *« Servie à table »* grâce aux WebSockets.

---

## ⭐ 6. Booster d'Avis & Synchronisation Multi-Plateformes

À la fin du repas, le convive est invité à évaluer son expérience :
- **Notation 1 à 5 Étoiles** + Badges rapides (*⚡ Service ultra rapide*, *🍲 Plats savoureux*, *✨ Ambiance au top*).
- **Synchronisation Automatisée** : Si activée par le restaurateur, les avis 4★ et 5★ sont synchronisés vers **Google Business Profile**, **TripAdvisor** et **Trustpilot** pour démultiplier la visibilité de l'établissement.
