# ⚙️ Guide de Formation : Direction, Managers & Propriétaires

**Ciao Byebye Administration, Pricing & Inventory Management**  
*Destiné aux : Directeurs de Restaurant, Propriétaires, Gérants, Responsables F&B et Managers d'Exploitation.*

---

## 🎯 1. Objectifs de la Formation
À l'issue de ce module, la direction sera capable de :
1. Comprendre et activer les **3 Formules d'Abonnement Core (Essentiel, Pro, Chaînes & Multi-sites)**.
2. Déployer en 1 clic les **Verticales Métiers (Café & Bar, Bistro & Brasserie, Gastronomique, Fast Casual)**.
3. Configurer de manière granulaire chaque fonctionnalité via les **Commutateurs Unitaires (Feature Toggles)**.
4. Piloter les **Stocks Dynamiques (BOM - Fiches Recettes)** et comprendre les règles de décompte en temps réel.
5. Maîtriser le **Passage Rupture 86 Automatique** et les réassorts en direct.
6. Analyser le **Journal des Pertes Cuisine (Waste Management)** et optimiser le coût matière (Food Cost).

---

## 💼 2. Les 3 Formules d'Abonnement Core (Pricing)

Le modèle tarifaire repose sur 3 offres simples et évolutives, configurables directement depuis l'onglet **⚙️ Modules & Offres** :

```
┌─────────────────────────┐   ┌─────────────────────────┐   ┌─────────────────────────┐
│     🟢 ESSENTIEL        │   │        🔵 PRO           │   │ 🟣 CHAÎNES & MULTI-SITES│
│     49 € HT / mois      │   │     99 € HT / mois      │   │ 199 € HT / mois / site  │
├─────────────────────────┤   ├─────────────────────────┤   ├─────────────────────────┤
│ • Commande & Paiement QR│   │ • TOUT ESSENTIEL INCLUS │   │ • TOUT LE PRO INCLUS    │
│ • Paiement CB & Espèces │   │ • Plan de Tables 2D     │   │ • KDS Multi-Postes      │
│ • KDS Monoposte 1 écran │   │ • Suites HOLD / FIRE    │   │ • Sièges / Couverts S1..│
│ • Carte & Menu en direct│   │ • Alertes Allergies 20m │   │ • Multi-zones / Sites   │
│                         │   │ • Stocks BOM & Mode 86  │   │ • Support 24/7 & API    │
└─────────────────────────┘   └─────────────────────────┘   └─────────────────────────┘
```

### Comment basculer d'une formule à l'autre ?
1. Rendez-vous sur `dashboard.html` $\to$ onglet **⚙️ Modules & Offres**.
2. Dans la section **1. Formules d'Abonnement Core**, cliquez sur le bouton **`[ Activer Formule ]`** de votre choix.
3. Tous les modules autorisés sont instantanément activés et synchronisés sur les écrans du restaurant via WebSockets.

---

## 🏢 3. Les Verticales Métiers (Configurations Sectorielles)

Les verticales sont des **presets opérationnels** qui pré-configurent les règles métier adaptées au concept du restaurant :

| Verticale Métier | Profil Type | Règles & Modules Activés |
| :--- | :--- | :--- |
| **☕ Café, Bar & Comptoir** | Bar à bières, coffee shop, salon de thé, bar à cocktails | Débit rapide, auto-fire des boissons, tables de comptoir et encaissement express. |
| **🍽️ Bistro & Brasserie** | Brasserie traditionnelle, restaurant de quartier | Plan de salle & terrasse, suites entrée/plat/dessert, fusions de tables et alertes >20 min. |
| **👑 Gastronomique & Fine Dining** | Restaurant étoilé, cuisine d'auteur, tables d'exception | Sièges individuels (`🪑 S1`), passe expo dédié, fiches recettes BOM et acquittement strict des allergies. |
| **🌯 Fast Casual & Food Court** | Street food, burgers gourmets, food hall, cantine asiatique | Postes de préparation séparés (grill, assemblage, boissons), rupture 86 express et appel client. |

---

## 🎛️ 4. Commutateurs Unitaires (Feature Toggles)

Si un établissement a des besoins spécifiques (ex: un bistro voulant ajouter la numérotation des sièges sans passer par le forfait multi-sites) :
- La section **3. Commutateurs de Modules Unitaires** permet d'activer ou de désactiver chaque module individuellement avec un simple interrupteur à bascule.
- Chaque modification est persistée immédiatement dans la base de données **Supabase** et diffusée en direct.

---

## 📦 5. Pilotage des Stocks Dynamiques (BOM) & Mode 86

### A. Principe des Fiches Techniques (Bill of Materials)
Chaque produit du menu est décomposé en ingrédients élémentaires avec un grammage précis :
- *Exemple : Burger Signature* = 1 Pain Brioché (1 pc) + 1 Steak Charolais 180g (1 pc) + 40g Cheddar + 150g Frites.

### B. Règles de Décompte Intelligent en Temps Réel
1. **Commande standard** : Les quantités exactes de la fiche technique sont décomptées du stock à chaque commande validée.
2. **Modificateur `SANS`** (ex: *SANS Oignons*) : L'ingrédient exclu n'est **pas décompté du stock**.
3. **Modificateur `EXTRA`** (ex: *+ EXTRA Cheddar*) : La quantité décomptée est **doublée**.

### C. Déclenchement Automatique de la Rupture 86
- Lorsque le stock d'un ingrédient atteint `0` ou passe en dessous de son seuil critique :
  - L'ingrédient passe en statut `is_86 = TRUE`.
  - **Tous les plats du menu dépendant de cet ingrédient sont automatiquement désactivés** sur la PWA client avec le badge **`ÉPUISÉ (86)`**.
  - Dès réception d'une livraison, un clic sur `[ ✅ Réassort ]` réactive immédiatement tous les plats liés.

---

## 📊 6. Suivi des Pertes Cuisine & Maîtrise du Food Cost

- L'onglet **📦 Stocks & BOM** $\to$ sous-onglet **🗑️ Pertes Cuisine** enregistre chaque incident déclaré par la cuisine.
- Les motifs permettent d'identifier les axes d'amélioration :
  - **Erreur de cuisson** $\to$ calibrage des temps de cuisson.
  - **Casse / Assiette tombée** $\to$ fluidification des circulations en salle.
  - **Avarie / DLC** $\to$ ajustement des commandes fournisseurs.
- Vous disposez ainsi d'un journal comptable transparent pour vos bilans de matières premières.
