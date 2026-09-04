const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

function createPitchDeck(outputPath) {
    // 841.89 x 595.28 points (Standard A4 Landscape)
    const doc = new PDFDocument({
        size: [842, 595],
        margin: 0,
        autoFirstPage: false
    });

    const stream = fs.createWriteStream(outputPath);
    doc.pipe(stream);

    // Helpers
    function drawSlideBackground(categoryName, slideTitle, slideSubtitle) {
        doc.addPage();
        
        // Deep modern dark background
        doc.rect(0, 0, 842, 595).fill('#0b132b');

        // Gold top accent banner
        doc.rect(0, 0, 842, 6).fill('#f59e0b');

        // Subtle footer bar
        doc.rect(0, 565, 842, 30).fill('#0f172a');
        doc.fillColor('#64748b').fontSize(9).font('Helvetica')
           .text('CIAO BYEBYE  •  Plateforme Digitale & Opérationnelle Tout-en-Un pour la Restauration', 35, 575)
           .text(`Page ${doc.bufferedPageRange().count}`, 750, 575, { align: 'right' });

        if (categoryName) {
            // Category Badge
            doc.roundedRect(35, 26, 140, 20, 4).fill('#f59e0b');
            doc.fillColor('#0b132b').fontSize(9).font('Helvetica-Bold')
               .text(categoryName.toUpperCase(), 35, 31, { width: 140, align: 'center' });

            // Slide Title
            doc.fillColor('#ffffff').fontSize(22).font('Helvetica-Bold')
               .text(slideTitle, 35, 52);

            // Subtitle
            if (slideSubtitle) {
                doc.fillColor('#94a3b8').fontSize(11).font('Helvetica')
                   .text(slideSubtitle, 35, 78);
            }

            // Divider line
            doc.strokeColor('#1e293b').lineWidth(1)
               .moveTo(35, 96).lineTo(807, 96).stroke();
        }
    }

    function drawCard(x, y, w, h, title, text, accentColor = '#f59e0b', tag = '') {
        // Card Background
        doc.roundedRect(x, y, w, h, 8).fill('#0f172a');
        doc.roundedRect(x, y, w, h, 8).strokeColor(accentColor).lineWidth(1.2).stroke();

        // Top colored tab
        doc.roundedRect(x, y, w, 28, 8).fill(accentColor);
        doc.rect(x, y + 20, w, 8).fill(accentColor);

        // Title inside tab
        doc.fillColor('#0b132b').fontSize(11).font('Helvetica-Bold')
           .text(title, x + 12, y + 8, { width: w - 24 });

        if (tag) {
            doc.fillColor('#ffffff').fontSize(8).font('Helvetica-Bold')
               .text(tag, x + w - 75, y + 9, { width: 65, align: 'right' });
        }

        // Card Body Text
        doc.fillColor('#cbd5e1').fontSize(9.5).font('Helvetica')
           .text(text, x + 12, y + 36, { width: w - 24, lineGap: 3 });
    }

    // =========================================================================
    // SLIDE 1 : COUVERTURE & VISION
    // =========================================================================
    doc.addPage();
    doc.rect(0, 0, 842, 595).fill('#0b132b');
    doc.rect(0, 0, 842, 8).fill('#f59e0b');

    // Left accent vertical bar
    doc.rect(40, 80, 8, 220).fill('#f59e0b');

    // Main Headers
    doc.fillColor('#f59e0b').fontSize(14).font('Helvetica-Bold')
       .text('SOLUTION RESTAURATION NOUVELLE GÉNÉRATION', 65, 85);

    doc.fillColor('#ffffff').fontSize(46).font('Helvetica-Bold')
       .text('CIAO BYEBYE', 65, 105);

    doc.fillColor('#38bdf8').fontSize(18).font('Helvetica-Bold')
       .text('Commande à Table • Paiement Instantané • KDS Cuisine & Salle Connectée', 65, 160);

    doc.fillColor('#e2e8f0').fontSize(12.5).font('Helvetica')
       .text(
           "La plateforme tout-en-un qui révolutionne l'expérience en restaurant :\n" +
           "Zéro attente pour le client, +30% de rotation des tables, +20% sur le ticket moyen,\n" +
           "et un personnel libéré des allers-retours d'encaissement pour se concentrer sur l'accueil.",
           65, 195, { lineGap: 4, width: 700 }
       );

    // 4 KPI Highlights
    const kpiData = [
        { num: '0 MIN', label: "D'attente client pour commander ou régler", color: '#f59e0b' },
        { num: '+20%', label: "De chiffre d'affaires moyen par couvert", color: '#10b981' },
        { num: '3 SEC', label: "Pour payer en CB, Apple Pay ou Titre-Resto", color: '#38bdf8' },
        { num: '100%', label: "Connecté : Montre, Mobile, Salle, KDS & POS", color: '#c084fc' }
    ];

    const kw = 178;
    kpiData.forEach((kpi, idx) => {
        const kx = 40 + idx * (kw + 18);
        const ky = 340;
        doc.roundedRect(kx, ky, kw, 120, 10).fill('#0f172a');
        doc.roundedRect(kx, ky, kw, 120, 10).strokeColor(kpi.color).lineWidth(1.5).stroke();

        doc.fillColor(kpi.color).fontSize(26).font('Helvetica-Bold')
           .text(kpi.num, kx, ky + 25, { width: kw, align: 'center' });

        doc.fillColor('#cbd5e1').fontSize(10).font('Helvetica')
           .text(kpi.label, kx + 10, ky + 65, { width: kw - 20, align: 'center', lineGap: 2 });
    });

    // Footer
    doc.rect(0, 565, 842, 30).fill('#070d1e');
    doc.fillColor('#64748b').fontSize(9).font('Helvetica')
       .text('Présentation Commerciale & Référentiel Fonctionnel 2026 • Ciao Byebye Store', 40, 575);

    // =========================================================================
    // SLIDE 2 : LES ENJEUX DU RESTAURATEUR
    // =========================================================================
    drawSlideBackground(
        "Constat Marché",
        "Les 4 Grands Défis des Restaurateurs Modernes",
        "Pourquoi les méthodes traditionnelles freinent la rentabilité et épuisent les équipes"
    );

    const defiData = [
        {
            title: "1. Les Goulots d'Étranglement en Caisse",
            desc: "12 à 18 minutes perdues par table entre la demande de l'addition, l'apport du TPE, le calcul des parts et l'encaissement. Cela bloque des tables qui pourraient accueillir de nouveaux clients.",
            color: '#ef4444'
        },
        {
            title: "2. Pénurie de Personnel & Fatigue",
            desc: "Les serveurs parcourent 10 à 15 km par service, encombrés par des tâches administratives à faible valeur. Résultat : stress, turnover élevé et service client dégradé.",
            color: '#f59e0b'
        },
        {
            title: "3. Perte de CA en Période de Rush",
            desc: "Aux heures de pointe, les clients renoncent à recommander une boisson ou un dessert faute d'avoir un serveur sous la main, amputant directement la marge de l'établissement.",
            color: '#38bdf8'
        },
        {
            title: "4. Erreurs de Commande & Tickets Perdus",
            desc: "Les bons papier égarés ou mal transmis entre la salle et la cuisine génèrent des retards, du gaspillage d'ingrédients (gaspillage matière) et des avis négatifs en ligne.",
            color: '#a855f7'
        }
    ];

    defiData.forEach((d, idx) => {
        const col = idx % 2;
        const row = Math.floor(idx / 2);
        const dx = 35 + col * (370 + 32);
        const dy = 115 + row * (195 + 25);
        drawCard(dx, dy, 370, 195, d.title, d.desc, d.color);
    });

    // =========================================================================
    // SLIDE 3 : L'ÉCOSYSTÈME DES 8 INTERFACES CONNECTÉES
    // =========================================================================
    drawSlideBackground(
        "Architecture",
        "L'Écosystème Connecté : 8 Interfaces Synchronisées en Temps Réel",
        "Chaque intervenant dispose d'un outil ergonomique adapté à son poste"
    );

    const interData = [
        { name: "1. Client Web (Menu & Pay)", link: "https://don-roberto.ciao-byebye.store/?table=05", desc: "Zéro appli à installer. Menu visuel HD, filtres allergènes, commande directe, division d'addition et paiement sécurisé.", color: '#10b981' },
        { name: "2. Serveur Mobile (PWA)", link: "dashboard.html (Format Mobile)", desc: "Optimisé smartphone de poche. Prise de commande rapide, notification vibrante d'appel client, consultation du rang.", color: '#38bdf8' },
        { name: "3. Montre Connectée (Watch)", link: "dashboard.html (Format Watch)", desc: "Alertes haptiques immédiates au poignet : 'Table 04 appelle serveur', 'Table 02 commande prête en cuisine'.", color: '#c084fc' },
        { name: "4. Plan de Salle 2D & Caisse", link: "dashboard.html (Rôle Serveur)", desc: "Plan graphique interactif, statuts de service (Libre, Occupée, Servie), fusion/séparation de tables et règlements caisse.", color: '#f59e0b' },
        { name: "5. KDS Cuisine Tactile", link: "dashboard.html (Rôle Cuisine)", desc: "3 colonnes de flux : À Préparer, En Cuisson, Prêt au Passe. Fiches techniques BOM, gestion des suites et mode rupture 86.", color: '#ef4444' },
        { name: "6. KDS Bar & Boissons", link: "dashboard.html (Rôle Bar)", desc: "Routage intelligent : les boissons partent au bar sans encombrer la cuisine, avec synchronisation de la table.", color: '#3b82f6' },
        { name: "7. Dashboard Gérant & Reporting", link: "dashboard.html (Rôle Gérant / Reporting)", desc: "Pilotage complet du CA, analyse des temps de traitement cuisine/service, corrélation notes vs délais et suivi des stocks.", color: '#14b8a6' },
        { name: "8. Studio QR & Anti-Fraude", link: "dashboard.html (Studio QR Code)", desc: "Impression directe de planches complètes ou chevalet unique HD avec logo, et audit caméra anti-fraude intégré.", color: '#eab308' }
    ];

    interData.forEach((it, idx) => {
        const col = idx % 2;
        const row = Math.floor(idx / 2);
        const ix = 35 + col * (370 + 32);
        const iy = 110 + row * (98 + 12);
        
        const fullDesc = `Lien : ${it.link}\n\n${it.desc}`;
        drawCard(ix, iy, 370, 98, it.name, fullDesc, it.color);
    });

    // =========================================================================
    // SLIDE 4 : PARCOURS CLIENT & COMMANDE DIRECTE
    // =========================================================================
    drawSlideBackground(
        "Expérience Client",
        "Un Parcours Client Sans Application & Sans Friction",
        "Comment transformer l'arrivée à table en expérience gastronomique fluide et autonome"
    );

    const clientSteps = [
        { t: "1. Flash QR Code Dédié", d: "Le client scanne le chevalet de table avec son smartphone. La table est reconnue automatiquement sans saisie manuelle.", c: '#38bdf8' },
        { t: "2. Carte HD & Sous-Catégories", d: "Visuels alléchants, sous-catégories nettes (Pizzas, Pâtes, Viandes, Cocktails) et filtres par allergènes (gluten, lactose, végétarien).", c: '#10b981' },
        { t: "3. Personnalisation & Upselling", d: "Choix de sauces, cuissons, suppléments et suggestions automatiques (boissons recommandées, desserts) pour doper le ticket moyen.", c: '#f59e0b' },
        { t: "4. Suivi de Commande en Direct", d: "Le client suit l'avancement : 'Reçue en cuisine' > 'En cours de cuisson' > 'En route vers votre table'. Sérénité absolue.", c: '#c084fc' },
        { t: "5. Bip Appel Serveur Intégré", d: "Un bouton discret 'Appeler le serveur' ou 'Demander du pain/eau' notifie instantanément l'équipe de salle sans geste intempestif.", c: '#3b82f6' },
        { t: "6. Fidélité & Avis Google 5★", d: "Cagnotte de points fidélité cashback et incitation automatique à déposer un avis Google 5 étoiles avant de partir.", c: '#ec4899' }
    ];

    clientSteps.forEach((cs, idx) => {
        const col = idx % 3;
        const row = Math.floor(idx / 3);
        const cx = 35 + col * (242 + 23);
        const cy = 115 + row * (195 + 25);
        drawCard(cx, cy, 242, 195, cs.t, cs.d, cs.c);
    });

    // =========================================================================
    // SLIDE 5 : PAIEMENT & ENCAISSEMENT EN 3 SECONDES
    // =========================================================================
    drawSlideBackground(
        "Paiement & Caisse",
        "L'Encaissement Révolutionné : 3 Secondes au Lieu de 15 Minutes",
        "Une libération totale des équipes et une satisfaction client maximale au départ"
    );

    const payFeatures = [
        { t: "CB, Apple Pay & Google Pay", d: "Règlement en 1 geste via Stripe sécurisé 3D-Secure. Le reçu est envoyé par email ou SMS en direct.", c: '#10b981' },
        { t: "Division d'Addition (Split Bill)", d: "Les convives divisent l'addition à parts égales ou paient chacun précisément leurs propres articles en toute autonomie.", c: '#f59e0b' },
        { t: "Titres-Restaurant Dématérialisés", d: "Acceptation fluide des cartes Titres-Restaurant (Swile, Edenred, Bimpli, etc.) avec plafonds légaux gérés.", c: '#38bdf8' },
        { t: "Paiement en Espèces / Caisse", d: "Option 'Payer en caisse' : notification immédiate sur l'écran serveur pour encaissement physique en espèces.", c: '#a855f7' },
        { t: "Pourboires Intelligents (Tips)", d: "Suggestions de pourboires prédéfinies (+5%, +10%, +15%) augmentant de 30% les gratifications pour la salle.", c: '#eab308' },
        { t: "Clôture de Table Automatisée", d: "Dès que l'addition est soldée, la table passe en statut 'Nettoyage requis' sur le plan de salle 2D.", c: '#14b8a6' }
    ];

    payFeatures.forEach((pf, idx) => {
        const col = idx % 3;
        const row = Math.floor(idx / 3);
        const px = 35 + col * (242 + 23);
        const py = 115 + row * (195 + 25);
        drawCard(px, py, 242, 195, pf.t, pf.d, pf.c);
    });

    // =========================================================================
    // SLIDE 6 : SALLE, MOBILITÉ & SMARTWATCH
    // =========================================================================
    drawSlideBackground(
        "Équipes de Salle",
        "Mobilité Totale : Smartphone de Poche & Montre Connectée",
        "Une salle réactive, coordonnée et disponible pour la relation client"
    );

    const salleFeatures = [
        {
            t: "Plan de Salle 2D Graphique & Interactif",
            d: "Visualisation complète des tables du restaurant, de leur état en temps réel (Libre, Commande en cours, Servie, Addition demandée) et du nombre de couverts. Fusion et dissociation de tables en 1 clic pour les groupes.",
            c: '#f59e0b'
        },
        {
            t: "Application Serveur Mobile (PWA)",
            d: "Accessible directement depuis n'importe quel smartphone iOS ou Android sans investissement matériel lourd. Prise de commande à la volée, envoi direct en cuisine et encaissement mobile instantané.",
            c: '#38bdf8'
        },
        {
            t: "Montre Connectée & Alertes Poignet",
            d: "Les serveurs reçoivent une vibration discrète et immédiate au poignet : 'Table 04 appelle serveur' ou 'Table 02 commande prête au passe'. Zéro appel crié à travers la salle, réactivité divisée par 3.",
            c: '#c084fc'
        },
        {
            t: "Sectorisation & Attribution des Rangs",
            d: "Chaque serveur peut être assigné à une zone ou un ensemble de tables précis. L'interface filtre automatiquement les alertes et commandes pour éviter toute dispersion d'équipe.",
            c: '#10b981'
        }
    ];

    salleFeatures.forEach((sf, idx) => {
        const col = idx % 2;
        const row = Math.floor(idx / 2);
        const sx = 35 + col * (370 + 32);
        const sy = 115 + row * (195 + 25);
        drawCard(sx, sy, 370, 195, sf.t, sf.d, sf.c);
    });

    // =========================================================================
    // SLIDE 7 : CUISINE & BAR (KDS INTELLIGENT)
    // =========================================================================
    drawSlideBackground(
        "Production & Cuisine",
        "KDS Tactile Intelligent & Routage Automatique",
        "Zéro ticket papier égaré, cadencement parfait des cuissons et gestion du passe"
    );

    const kitchenFeatures = [
        {
            t: "3 Colonnes de Flux de Production",
            d: "Organisation ergonomique des bons de commande : 'À Préparer', 'En Cuisson', 'Prêt au Passe'. Chronomètres intégrés avec alertes visuelles de retard pour respecter les standards de qualité.",
            c: '#ef4444'
        },
        {
            t: "Routage Intelligent Plats vs Boissons",
            d: "Séparation automatique : les boissons et cocktails s'affichent uniquement au KDS Bar, tandis que les entrées et plats vont au KDS Cuisine. Synchronisation automatique de la commande globale.",
            c: '#3b82f6'
        },
        {
            t: "Gestion des Suites & Directs",
            d: "Gestion native des envois en cuisine : plats principaux lancés à la suite des entrées ou envoi direct selon la consigne du serveur, pour un repas parfaitement rythmé.",
            c: '#f59e0b'
        },
        {
            t: "Fiches Recettes BOM & Mode 86 Rupture",
            d: "Fiche technique accessible en 1 clic pour chaque plat (allergènes, liste des ingrédients, grammages). Bouton '86' pour passer un ingrédient ou plat en rupture immédiate sur tous les menus.",
            c: '#10b981'
        }
    ];

    kitchenFeatures.forEach((kf, idx) => {
        const col = idx % 2;
        const row = Math.floor(idx / 2);
        const kx = 35 + col * (370 + 32);
        const ky = 115 + row * (195 + 25);
        drawCard(kx, ky, 370, 195, kf.t, kf.d, kf.c);
    });

    // =========================================================================
    // SLIDE 8 : REPORTING, DELAIS & ANALYTICS
    // =========================================================================
    drawSlideBackground(
        "Pilotage & Gestion",
        "Module de Reporting Décisionnel pour la Direction",
        "Des données précises pour identifier les goulots d'étranglement et booster la marge"
    );

    const repFeatures = [
        {
            t: "Délais Cuisine & Service par Table",
            d: "Calcul rigoureux et borné au dixième de minute près : temps moyen de préparation cuisine (~14 min) et temps de portage en salle (~4 min), ventilé par table, par plat, par créneau et jour.",
            c: '#38bdf8'
        },
        {
            t: "Matrice Satisfaction vs Délais d'Attente",
            d: "Démonstration chiffrée de la corrélation entre rapidité et note client : <12 min = 4.85★ (Excellence) contre >30 min = 2.25★ (Zone critique). Un levier puissant de fidélisation.",
            c: '#f59e0b'
        },
        {
            t: "Suivi des Stocks, Consommations & Pertes",
            d: "Suivi des sorties de stock par recette vendue, identification des ingrédients à fort coût matière et valorisation chiffrée en euros du gaspillage (erreurs de préparation, casse, péremption).",
            c: '#ef4444'
        },
        {
            t: "Exports Comptables CSV & Normes Fiscales",
            d: "Export en 1 clic au format CSV compatible avec les logiciels comptables français. Ventilation complète du CA par mode de règlement (Stripe CB, Espèces, Titres-Resto) et par taux de TVA.",
            c: '#10b981'
        }
    ];

    repFeatures.forEach((rf, idx) => {
        const col = idx % 2;
        const row = Math.floor(idx / 2);
        const rx = 35 + col * (370 + 32);
        const ry = 115 + row * (195 + 25);
        drawCard(rx, ry, 370, 195, rf.t, rf.d, rf.c);
    });

    // =========================================================================
    // SLIDE 9 : MATÉRIEL, SÉCURITÉ & CAISSES POS COMPATIBLES
    // =========================================================================
    drawSlideBackground(
        "Technologie & Intégration",
        "Sécurité Anti-Fraude & Compatibilité avec 25+ Caisses POS",
        "Déploiement en 24h sans changer de logiciel de caisse ni vos habitudes"
    );

    // Left block : Studio QR & Security
    drawCard(
        35, 115, 370, 200,
        "Studio QR Code & Sécurité Anti-Fraude",
        "• Impression Planche Complète A4 : Génération vectorielle directe de l'ensemble des chevalets de table avec logo du restaurant.\n\n" +
        "• Chevalet Unique de Remplacement : Impression à la demande d'un QR code unique en 10 secondes en cas de perte ou dégradation.\n\n" +
        "• Correction d'Erreur ECC Niveau H (30%) : Flash instantané même de nuit ou avec trace de doigt sur le plexiglas.\n\n" +
        "• Caméra Anti-Fraude Serveur : Scan intégré permettant de certifier l'authenticité du QR code et bloquer les contrefaçons.",
        '#f59e0b'
    );

    // Right block : POS Integration
    drawCard(
        437, 115, 370, 200,
        "Compatible avec 25+ Logiciels de Caisse",
        "Synchronisation bidirectionnelle native ou fonctionnement autonome sans contrainte technique :\n\n" +
        "✔ Lightspeed Restaurant    ✔ Zelty Cloud\n" +
        "✔ Tiller by SumUp         ✔ L'Addition\n" +
        "✔ Square POS             ✔ Popina\n" +
        "✔ Innovorder             ✔ Clover & Toast\n" +
        "✔ RoverCash / Tactill     ✔ Shopify POS / Odoo\n\n" +
        "Installation en moins de 24 heures sans coupure d'activité ni frais de câblage.",
        '#10b981'
    );

    // Bottom banner : Deployment steps
    doc.roundedRect(35, 340, 772, 180, 10).fill('#0f172a');
    doc.roundedRect(35, 340, 772, 180, 10).strokeColor('#38bdf8').lineWidth(1.2).stroke();

    doc.fillColor('#38bdf8').fontSize(14).font('Helvetica-Bold')
       .text("PLAN DE DÉPLOIEMENT EN 4 ÉTAPES EXPRESS (24H CHRONO)", 55, 358);

    const steps = [
        "1. Numérisation de la Carte : Intégration de vos plats, formules, allergènes et photos HD par nos équipes.",
        "2. Impression des Chevalets : Fourniture des QR codes vectoriels sécurisés personnalisés à vos couleurs.",
        "3. Prise en Main Équipe : 30 minutes de formation pour la cuisine et les serveurs (interface ultra-intuitive).",
        "4. Lancement Opérationnel : Assistance dédiée en direct dès le premier service pour garantir le succès."
    ];

    steps.forEach((st, idx) => {
        doc.fillColor('#ffffff').fontSize(10.5).font('Helvetica')
           .text(st, 55, 395 + idx * 28, { width: 730 });
    });

    // =========================================================================
    // SLIDE 10 : LIENS DE DÉMO & CONTACTS
    // =========================================================================
    drawSlideBackground(
        "Passez à l'Action",
        "Testez la Solution en Direct sur Votre Smartphone",
        "Découvrez la fluidité de Ciao Byebye et contactez notre équipe commerciale"
    );

    // Left card : Live Demos
    drawCard(
        35, 115, 370, 400,
        "LIENS DE DÉMO EN DIRECT (ACCÈS LIBRE)",
        "Scannez ou cliquez sur les liens ci-dessous pour tester l'ensemble des écrans en conditions réelles :\n\n" +
        "📱 1. Menu Client & Commande à Table :\n" +
        "https://don-roberto.ciao-byebye.store/?table=05\n" +
        "(Simule l'arrivée d'un client à la table 05)\n\n" +
        "💻 2. Dashboard Complet (Salle, Cuisine, Gérant) :\n" +
        "https://don-roberto.ciao-byebye.store/dashboard.html\n" +
        "(Basculez entre les rôles Serveur, Cuisine, Bar et Gérant)\n\n" +
        "🎓 3. Centre de Formation des Équipes :\n" +
        "https://don-roberto.ciao-byebye.store/formation/\n" +
        "(Tutoriels vidéos et fiches réflexes opérationnelles)\n\n" +
        "💡 Astuce : Ouvrez le menu client sur votre mobile et le dashboard sur votre ordinateur pour observer la synchronisation instantanée des commandes en cuisine !",
        '#f59e0b',
        'TEST LIVE'
    );

    // Right card : Commercial Offer
    drawCard(
        437, 115, 370, 400,
        "OFFRE COMMERCIALE SANS ENGAGEMENT",
        "Profitez de notre accompagnement premium pour équiper votre établissement sans risque :\n\n" +
        "🎁 OFFRE DÉCOUVERTE 30 JOURS GRATUITS :\n" +
        "• Zéro frais d'installation ni de mise en service\n" +
        "• Chevalets de table QR codes imprimés offerts\n" +
        "• Configuration complète de votre carte offerte\n" +
        "• Formation express sur site ou visio incluse\n" +
        "• Sans aucun engagement de durée\n\n" +
        "CONTACTEZ NOTRE ÉQUIPE DÉDIÉE :\n\n" +
        "✉️ Email Commercial : contact@ciao-byebye.store\n" +
        "🌐 Site Web : www.ciao-byebye.store\n" +
        "📞 Assistance Démo : Disponible 7j/7\n\n" +
        "Augmentez la rentabilité de votre restaurant dès la semaine prochaine avec Ciao Byebye !",
        '#10b981',
        'OFFRE EXCLUSIVE'
    );

    doc.end();

    return new Promise((resolve, reject) => {
        stream.on('finish', () => {
            console.log(`Presentation PDF created successfully at: ${outputPath}`);
            resolve(outputPath);
        });
        stream.on('error', reject);
    });
}

const targetPath = process.argv[2] || path.join(__dirname, '../formation/presentation_ciao_byebye_slides.pdf');
createPitchDeck(targetPath);
