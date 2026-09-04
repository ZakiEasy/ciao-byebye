import sys
import os
from fpdf import FPDF

class PresentationPDF(FPDF):
    def __init__(self):
        super().__init__(orientation="landscape", unit="mm", format="A4") # 297 x 210 mm
        self.set_auto_page_break(auto=False)
        
    def draw_slide_background(self, is_dark=True):
        if is_dark:
            self.set_fill_color(11, 19, 43) # #0b132b
            self.rect(0, 0, 297, 210, "F")
            # Accent gold top bar
            self.set_fill_color(245, 158, 11) # #f59e0b
            self.rect(0, 0, 297, 4, "F")
            # Subtle bottom bar
            self.set_fill_color(15, 23, 42)
            self.rect(0, 202, 297, 8, "F")
            self.set_text_color(148, 163, 184)
            self.set_font("Helvetica", "", 8)
            self.set_xy(15, 203)
            self.cell(100, 6, "CIAO BYEBYE - Solution Restauration Digitale & Operationnelle", 0, 0, "L")
            self.set_xy(182, 203)
            self.cell(100, 6, f"Page {self.page_no()}", 0, 0, "R")
        else:
            self.set_fill_color(248, 250, 252) # #f8fafc
            self.rect(0, 0, 297, 210, "F")
            self.set_fill_color(245, 158, 11)
            self.rect(0, 0, 297, 4, "F")
            self.set_fill_color(241, 245, 249)
            self.rect(0, 202, 297, 8, "F")
            self.set_text_color(100, 116, 139)
            self.set_font("Helvetica", "", 8)
            self.set_xy(15, 203)
            self.cell(100, 6, "CIAO BYEBYE - Presentation Commerciale & Fonctionnalites", 0, 0, "L")
            self.set_xy(182, 203)
            self.cell(100, 6, f"Page {self.page_no()}", 0, 0, "R")

    def slide_header(self, category, title, subtitle=""):
        # Category pill
        self.set_xy(15, 12)
        self.set_fill_color(245, 158, 11)
        self.set_text_color(11, 19, 43)
        self.set_font("Helvetica", "B", 9)
        self.cell(len(category)*2.2 + 8, 6, f" {category.upper()} ", 0, 0, "C", fill=True)
        
        # Title
        self.set_xy(15, 20)
        self.set_text_color(255, 255, 255)
        self.set_font("Helvetica", "B", 18)
        self.cell(267, 9, title, 0, 1, "L")
        
        # Subtitle
        if subtitle:
            self.set_xy(15, 29)
            self.set_text_color(148, 163, 184)
            self.set_font("Helvetica", "", 10)
            self.cell(267, 6, subtitle, 0, 1, "L")
            
        # Divider line
        self.set_draw_color(255, 255, 255)
        self.set_line_width(0.2)
        self.line(15, 37, 282, 37)

    def draw_card(self, x, y, w, h, title, icon_text="", border_color=(245, 158, 11), bg_color=(15, 23, 42)):
        self.set_fill_color(*bg_color)
        self.rect(x, y, w, h, "F")
        self.set_draw_color(*border_color)
        self.set_line_width(0.4)
        self.rect(x, y, w, h, "D")
        
        # Header inside card
        self.set_fill_color(*border_color)
        self.rect(x, y, w, 8, "F")
        self.set_text_color(11, 19, 43)
        self.set_font("Helvetica", "B", 9)
        self.set_xy(x + 3, y + 1)
        self.cell(w - 6, 6, f"{icon_text} {title}".strip(), 0, 0, "L")

def build_pdf(output_path):
    pdf = PresentationPDF()
    
    # ==========================================
    # SLIDE 1 : COVER SLIDE
    # ==========================================
    pdf.add_page()
    pdf.draw_slide_background(is_dark=True)
    
    # Decorative elements
    pdf.set_fill_color(245, 158, 11)
    pdf.rect(15, 45, 6, 95, "F")
    
    pdf.set_xy(28, 48)
    pdf.set_font("Helvetica", "B", 14)
    pdf.set_text_color(245, 158, 11)
    pdf.cell(200, 8, "PLATEFORME DIGITALE & OPERATIONNELLE TOUT-EN-UN", 0, 1)
    
    pdf.set_xy(28, 58)
    pdf.set_font("Helvetica", "B", 36)
    pdf.set_text_color(255, 255, 255)
    pdf.cell(200, 18, "CIAO BYEBYE", 0, 1)
    
    pdf.set_xy(28, 78)
    pdf.set_font("Helvetica", "B", 16)
    pdf.set_text_color(56, 189, 248) # #38bdf8
    pdf.cell(250, 10, "Commande a Table • Paiement Instantane • KDS Cuisine & Salle Connectee", 0, 1)
    
    pdf.set_xy(28, 92)
    pdf.set_font("Helvetica", "", 12)
    pdf.set_text_color(203, 213, 225)
    description = (
        "La solution qui libere les restaurateurs des temps morts, augmente le panier moyen\n"
        "de 20%, accelere la rotation des tables de 30% et offre un parcours client premium sans attente."
    )
    pdf.multi_cell(240, 7, description)
    
    # 4 Key Value Props Boxes
    box_w = 62
    props = [
        ("0 ATTENTE", "Scan & commande directe", (245, 158, 11)),
        ("+20% PANIER", "Photos HD & suggestions", (16, 185, 129)),
        ("3 SECONDES", "Paiement CB & Titre-Resto", (56, 189, 248)),
        ("100% CONNECTE", "Montre, Mobile, KDS, Caisse", (192, 132, 252))
    ]
    for i, (title, sub, col) in enumerate(props):
        bx = 28 + i * (box_w + 6)
        pdf.set_fill_color(15, 23, 42)
        pdf.rect(bx, 145, box_w, 38, "F")
        pdf.set_draw_color(*col)
        pdf.set_line_width(0.6)
        pdf.rect(bx, 145, box_w, 38, "D")
        
        pdf.set_xy(bx, 150)
        pdf.set_font("Helvetica", "B", 13)
        pdf.set_text_color(*col)
        pdf.cell(box_w, 7, title, 0, 1, "C")
        
        pdf.set_xy(bx, 160)
        pdf.set_font("Helvetica", "", 9)
        pdf.set_text_color(203, 213, 225)
        pdf.cell(box_w, 6, sub, 0, 1, "C")

    # ==========================================
    # SLIDE 2 : ECOSYSTEME DES INTERFACES & LIENS
    # ==========================================
    pdf.add_page()
    pdf.draw_slide_background(is_dark=True)
    pdf.slide_header("Architecture", "Les 8 Interfaces Connectees de la Solution", "Un ecosysteme synchronise en temps reel pour couvrir chaque metre carre du restaurant")
    
    interfaces = [
        ("1. Interface Client (Menu & Pay)", "don-roberto.ciao-byebye.store", "Menu interactif HD, allergenes, commande, split bill, CB Stripe, pourboires, avis Google 5 etoiles."),
        ("2. Serveur Mobile & Tablettes", "dashboard.html (Vue Mobile)", "Prise de commande mobile minute, suivi des tables assignees, alertes vibrantes en poche."),
        ("3. Montre Connectee Serveur", "dashboard.html (Vue Watch)", "Alertes poignet instantanees : 'Table 04 appelle serveur', 'Table 02 commande prete au passe'."),
        ("4. Plan de Salle 2D & Caisse", "dashboard.html (Vue Serveur)", "Plan graphique de salle, etat du service (occupee, servie), fusion/separation de tables, encaissement."),
        ("5. KDS Cuisine 3 Colonnes", "dashboard.html (Vue Cuisine)", "A preparer, En cuisson, Pret au passe. Gestion des suites, fiches BOM recettes, Mode 86 rupture."),
        ("6. KDS Bar & Boissons", "dashboard.html (Vue Bar)", "Decoupage automatique : les cocktails & boissons arrivent au bar sans polluer la cuisine."),
        ("7. Dashboard Gerant & Analytics", "dashboard.html (Vue Gerant)", "Supervision complete, reporting des delais cuisine/service, correlation satisfaction, stocks & pertes."),
        ("8. Studio QR Code & Securite", "dashboard.html (Studio QR)", "Impression directe planche A4 des tables, chevalet unique HD, scan camera anti-fraude.")
    ]
    
    col_w = 128
    col_h = 34
    for i, (name, link, desc) in enumerate(interfaces):
        col = i % 2
        row = i // 2
        x = 15 + col * (col_w + 11)
        y = 44 + row * (col_h + 5)
        
        pdf.draw_card(x, y, col_w, col_h, name, "[*]", (56, 189, 248), (15, 23, 42))
        
        pdf.set_xy(x + 4, y + 10)
        pdf.set_font("Helvetica", "B", 8)
        pdf.set_text_color(245, 158, 11)
        pdf.cell(col_w - 8, 5, f"Lien : https://{link}", 0, 1)
        
        pdf.set_xy(x + 4, y + 16)
        pdf.set_font("Helvetica", "", 8)
        pdf.set_text_color(203, 213, 225)
        pdf.multi_cell(col_w - 8, 4.5, desc)

    # ==========================================
    # SLIDE 3 : PARCOURS CLIENT & COMMANDE A TABLE
    # ==========================================
    pdf.add_page()
    pdf.draw_slide_background(is_dark=True)
    pdf.slide_header("Experience Client", "Parcours Client Sans Application & Sans Friction", "L'arrivee a table transformee en experience gastronomique fluide et autonome")
    
    cards_c = [
        ("1. Scan QR Code Dedie", "Le client flashe le chevalet de sa table avec son smartphone sans telecharger d'application. La table est automatiquement reconnue (?table=05)."),
        ("2. Menu HD & Filtres Intelligents", "Visuels appetissants, sous-categories claires (Pizzas, Pates, Viandes, Cocktails), filtres allergenes et regimes alimentaires."),
        ("3. Personnalisation & Supplemens", "Choix des cuissons, sauces, options sans gluten, suggestions automatiques de boissons et desserts pour doper le ticket moyen."),
        ("4. Suivi de Commande en Direct", "Validation en 1 clic. Le client suit en temps reel : 'Recue en cuisine' > 'En cours de cuisson' > 'En route vers votre table'."),
        ("5. Bip d'Appel Serveur", "Un bouton discret 'Appeler le serveur' ou 'Demander du pain/eau' notifie aussitot le serveur sans geste intempestif."),
        ("6. Fidelite & Avis Google Direct", "Cagnotte de points fidelite cashback et incitation automatique a poster un avis 5 etoiles sur Google avant de quitter l'etablissement.")
    ]
    
    for i, (title, desc) in enumerate(cards_c):
        col = i % 3
        row = i // 3
        w = 84
        h = 70
        x = 15 + col * (w + 10)
        y = 46 + row * (h + 10)
        
        pdf.draw_card(x, y, w, h, title, ">>", (16, 185, 129), (15, 23, 42))
        pdf.set_xy(x + 5, y + 14)
        pdf.set_font("Helvetica", "", 9)
        pdf.set_text_color(226, 232, 240)
        pdf.multi_cell(w - 10, 5.5, desc)

    # ==========================================
    # SLIDE 4 : PAIEMENT & ENCAISSEMENT MULTI-CANAUX
    # ==========================================
    pdf.add_page()
    pdf.draw_slide_background(is_dark=True)
    pdf.slide_header("Paiement", "L'Encaissement Instantane en 3 Secondes", "Finies les 15 minutes d'attente pour obtenir l'addition et la queue au comptoir")
    
    p_cards = [
        ("Paiement CB & Mobile Instantane", "Compatible Apple Pay, Google Pay et CB via Stripe securise 3D Secure. Recu par email instantane."),
        ("Division d'Addition (Split Bill)", "Les convives divisent l'addition a parts egales ou paient chacun leurs propres consommations en toute autonomie."),
        ("Titres-Restaurant & Dematerialise", "Acceptation fluide des cartes Titres-Restaurant (Swile, Edenred, Bimpli, etc.) avec gestion des plafonds legaux."),
        ("Reglement Especes & Caisse", "Possibilite de selectionner 'Payer en caisse' : notification immediate sur l'ecran du serveur pour encaissement physique."),
        ("Pourboires Intelligents (Tips)", "Suggestions de pourboires valorisees (+5%, +10%, +15%) qui augmentent significativement la remuneration des serveurs."),
        ("Cloture de Table Automatique", "Des la note payee, la table passe automatiquement en statut 'Nettoyage requis' sur le plan de salle 2D.")
    ]
    for i, (title, desc) in enumerate(p_cards):
        col = i % 3
        row = i // 3
        w = 84
        h = 70
        x = 15 + col * (w + 10)
        y = 46 + row * (h + 10)
        
        pdf.draw_card(x, y, w, h, title, "[$]", (245, 158, 11), (15, 23, 42))
        pdf.set_xy(x + 5, y + 14)
        pdf.set_font("Helvetica", "", 9)
        pdf.set_text_color(226, 232, 240)
        pdf.multi_cell(w - 10, 5.5, desc)

    # ==========================================
    # SLIDE 5 : SALLE, SERVEUR MOBILE & MONTRE WATCH
    # ==========================================
    pdf.add_page()
    pdf.draw_slide_background(is_dark=True)
    pdf.slide_header("Equipe de Salle", "Mobilite Totale : Smartphone de Poche & Smartwatch", "Moins de pas inutiles, plus de relation humaine et une reactivite decuplee")
    
    salle_cards = [
        ("Plan de Salle 2D Graphique", "Visualisation interactive de la salle, etat des tables en temps reel (Libre, Commande en cours, Servie, Addition demandee). Fusion et division de tables en 1 clic."),
        ("Application Serveur Mobile", "Accessible directement sur n'importe quel smartphone iOS ou Android sans materiel dedie couteux. Prise de commande a la volee et encaissement."),
        ("Smartwatch & Alertes Poignet", "Les serveurs recoivent des vibrations discretes au poignet avec le numero de table des qu'une commande est prete ou qu'un client appelle."),
        ("Sectorisation & Rang", "Possibilite d'assigner specifiquement les tables par serveur. Chaque collaborateur ne visualise que son rang pour eviter toute confusion.")
    ]
    for i, (title, desc) in enumerate(salle_cards):
        col = i % 2
        row = i // 2
        w = 128
        h = 68
        x = 15 + col * (w + 11)
        y = 48 + row * (h + 10)
        
        pdf.draw_card(x, y, w, h, title, "[O]", (192, 132, 252), (15, 23, 42))
        pdf.set_xy(x + 6, y + 16)
        pdf.set_font("Helvetica", "", 9.5)
        pdf.set_text_color(226, 232, 240)
        pdf.multi_cell(w - 12, 6, desc)

    # ==========================================
    # SLIDE 6 : CUISINE & BAR (KDS INTELLIGENT)
    # ==========================================
    pdf.add_page()
    pdf.draw_slide_background(is_dark=True)
    pdf.slide_header("Cuisine & Bar", "KDS Tactile Intelligent & Routage Automatique", "Zero ticket papier perdu, coordination parfaite du passe et fluidite de cuisson")
    
    kitchen_cards = [
        ("3 Colonnes de Production", "Organisation limpide des bons : 'A Preparer' > 'En Cuisson' > 'Pret au Passe'. Chronometres avec alertes visuelles de retard."),
        ("Routage Plats vs Boissons", "Separation intelligente des commandes : les boissons s'affichent au KDS Bar, les plats au KDS Cuisine. Synchronisation automatique des tables."),
        ("Gestion des Suites & Directs", "Gestion native des envois en cuisine : plats envoyes a la suite des entrees ou immediatement sur consigne du serveur."),
        ("Fiches Recettes BOM & Mode 86", "Fiche technique des allergenes et ingredients par recette. Mise en rupture immediate d'un plat en 1 clic sur tous les ecrans.")
    ]
    for i, (title, desc) in enumerate(kitchen_cards):
        col = i % 2
        row = i // 2
        w = 128
        h = 68
        x = 15 + col * (w + 11)
        y = 48 + row * (h + 10)
        
        pdf.draw_card(x, y, w, h, title, "[!]", (239, 68, 68), (15, 23, 42))
        pdf.set_xy(x + 6, y + 16)
        pdf.set_font("Helvetica", "", 9.5)
        pdf.set_text_color(226, 232, 240)
        pdf.multi_cell(w - 12, 6, desc)

    # ==========================================
    # SLIDE 7 : REPORTING, ANALYTICS & DELAIS
    # ==========================================
    pdf.add_page()
    pdf.draw_slide_background(is_dark=True)
    pdf.slide_header("Pilotage Gerant", "Module de Reporting & Analytics Decisionnel", "Des donnees precises pour identifier les goulots d'etranglement et maximiser la rentabilite")
    
    rep_cards = [
        ("Delais Cuisine & Service", "Calcul au dixieme de minute pres du temps de preparation en cuisine et du temps de portage en salle, par table, plat, creneau et jour."),
        ("Correlation Delais vs Notes", "Matrice prouvant l'impact de l'attente sur la satisfaction client (<12 min = 4.85 etoiles vs >30 min = 2.2 etoiles)."),
        ("Suivi des Stocks & Gaspillage", "Valorisation en euros du gaspillage (erreurs, peremption, casse) et identification des ingredients a fort cout matiere."),
        ("Exports Comptables CSV", "Extraction en 1 clic de l'ensemble des ventes, ventilation des encaissements et TVA conforme aux normes comptables francaises.")
    ]
    for i, (title, desc) in enumerate(rep_cards):
        col = i % 2
        row = i // 2
        w = 128
        h = 68
        x = 15 + col * (w + 11)
        y = 48 + row * (h + 10)
        
        pdf.draw_card(x, y, w, h, title, "[#]", (56, 189, 248), (15, 23, 42))
        pdf.set_xy(x + 6, y + 16)
        pdf.set_font("Helvetica", "", 9.5)
        pdf.set_text_color(226, 232, 240)
        pdf.multi_cell(w - 12, 6, desc)

    # ==========================================
    # SLIDE 8 : GENERATEUR QR CODE & SECURITE
    # ==========================================
    pdf.add_page()
    pdf.draw_slide_background(is_dark=True)
    pdf.slide_header("Securite & Materiel", "Studio QR Code & Protection Anti-Fraude", "Impression autonome prete a l'emploi et certification cryptographique des tables")
    
    sec_cards = [
        ("Impression Planche Complete A4", "Generation vectorielle instantanee de tous les chevalets de table du restaurant avec numerotation automatique et logo de l'etablissement."),
        ("Chevalet Unique de Remplacement", "En cas de perte ou degradation d'un QR code de table, impression a la demande d'un seul chevalet de remplacement en 10 secondes."),
        ("Haute Densite ECC Niveau H", "Technologie de correction d'erreur a 30% garantissant une lecture instantanee de jour comme de nuit, meme avec trace de doigt ou logo au centre."),
        ("Camera Anti-Fraude Serveur", "Scanner integre a l'application serveur permettant de verifier sur le champ l'authenticite du QR code et bloquer les fraudes ou faux QR codes.")
    ]
    for i, (title, desc) in enumerate(sec_cards):
        col = i % 2
        row = i // 2
        w = 128
        h = 68
        x = 15 + col * (w + 11)
        y = 48 + row * (h + 10)
        
        pdf.draw_card(x, y, w, h, title, "[@]", (245, 158, 11), (15, 23, 42))
        pdf.set_xy(x + 6, y + 16)
        pdf.set_font("Helvetica", "", 9.5)
        pdf.set_text_color(226, 232, 240)
        pdf.multi_cell(w - 12, 6, desc)

    # ==========================================
    # SLIDE 9 : COMPATIBILITE POS & DEPLOIEMENT
    # ==========================================
    pdf.add_page()
    pdf.draw_slide_background(is_dark=True)
    pdf.slide_header("Integration & Deploiement", "Compatible avec 25+ Caisses Enregistreuses POS", "Installation en 24h sans changer vos habitudes ni votre logiciel de caisse existant")
    
    pdf.set_xy(15, 45)
    pdf.set_font("Helvetica", "B", 11)
    pdf.set_text_color(245, 158, 11)
    pdf.cell(267, 6, "LOGICIELS DE CAISSE CERTIFIES ET SYNCHRONISABLES :", 0, 1)
    
    pos_list = [
        "Lightspeed", "Zelty", "Tiller / SumUp", "L'Addition", "Square", "Clover", "Toast", 
        "Popina", "Innovorder", "RestoMax", "RoverCash", "Tactill", "Shopify POS", "Odoo Restaurant"
    ]
    
    # Render POS Pills
    pw = 63
    ph = 14
    for i, p in enumerate(pos_list):
        r = i // 4
        c = i % 4
        px = 15 + c * (pw + 5)
        py = 56 + r * (ph + 5)
        pdf.set_fill_color(15, 23, 42)
        pdf.rect(px, py, pw, ph, "F")
        pdf.set_draw_color(56, 189, 248)
        pdf.set_line_width(0.3)
        pdf.rect(px, py, pw, ph, "D")
        pdf.set_xy(px, py + 4)
        pdf.set_font("Helvetica", "B", 9)
        pdf.set_text_color(255, 255, 255)
        pdf.cell(pw, 6, f"+ {p}", 0, 0, "C")
        
    # Deployment steps banner
    pdf.set_fill_color(16, 185, 129)
    pdf.rect(15, 135, 267, 52, "F")
    
    pdf.set_xy(25, 142)
    pdf.set_font("Helvetica", "B", 14)
    pdf.set_text_color(11, 19, 43)
    pdf.cell(240, 7, "DEPLOIEMENT CLES EN MAIN EN MOINS DE 24 HEURES :", 0, 1)
    
    steps = (
        "1. Configuration de votre carte & photos HD effectuee par notre equipe technique.\n"
        "2. Impression des chevalets de table avec QR codes securises personnalises a votre marque.\n"
        "3. Formation express de votre personnel (en 30 minutes, aucun apprentissage complexe).\n"
        "4. Lancement immediat sans interruption de service avec accompagnement dedie."
    )
    pdf.set_xy(25, 151)
    pdf.set_font("Helvetica", "B", 10)
    pdf.set_text_color(11, 19, 43)
    pdf.multi_cell(245, 6, steps)

    # ==========================================
    # SLIDE 10 : CONTACT & ESSAI DIRECT
    # ==========================================
    pdf.add_page()
    pdf.draw_slide_background(is_dark=True)
    pdf.slide_header("Passez a l'Action", "Testez la Solution en Direct sur Votre Smartphone", "Decouvrez l'experience par vous-meme et boostez votre chiffre d'affaires")
    
    # Left Card : Test Links
    pdf.draw_card(15, 46, 130, 138, "ACCES DEMO EN DIRECT", "[DEMO]", (245, 158, 11), (15, 23, 42))
    pdf.set_xy(22, 60)
    pdf.set_font("Helvetica", "B", 10)
    pdf.set_text_color(245, 158, 11)
    pdf.cell(115, 6, "1. Scannez ou Ouvrez le Menu Client :", 0, 1)
    pdf.set_xy(22, 67)
    pdf.set_font("Helvetica", "", 9)
    pdf.set_text_color(56, 189, 248)
    pdf.cell(115, 5, "https://don-roberto.ciao-byebye.store/?table=05", 0, 1)
    
    pdf.set_xy(22, 78)
    pdf.set_font("Helvetica", "B", 10)
    pdf.set_text_color(245, 158, 11)
    pdf.cell(115, 6, "2. Dashboard Cuisine, Salle & Direction :", 0, 1)
    pdf.set_xy(22, 85)
    pdf.set_font("Helvetica", "", 9)
    pdf.set_text_color(56, 189, 248)
    pdf.cell(115, 5, "https://don-roberto.ciao-byebye.store/dashboard.html", 0, 1)
    
    pdf.set_xy(22, 96)
    pdf.set_font("Helvetica", "B", 10)
    pdf.set_text_color(245, 158, 11)
    pdf.cell(115, 6, "3. Espace Formation Equipes :", 0, 1)
    pdf.set_xy(22, 103)
    pdf.set_font("Helvetica", "", 9)
    pdf.set_text_color(56, 189, 248)
    pdf.cell(115, 5, "https://don-roberto.ciao-byebye.store/formation/", 0, 1)
    
    pdf.set_xy(22, 118)
    pdf.set_font("Helvetica", "", 9)
    pdf.set_text_color(203, 213, 225)
    note = (
        "Vous pouvez tester tous les roles (Client, Serveur, Cuisine, Bar, Gerant)\n"
        "en temps reel pour mesurer la vitesse et la fluidite de synchronisation."
    )
    pdf.multi_cell(115, 5.5, note)

    # Right Card : Commercial Offer
    pdf.draw_card(152, 46, 130, 138, "OFFRE COMMERCIALE SANS ENGAGEMENT", "[OFFRE]", (16, 185, 129), (15, 23, 42))
    
    pdf.set_xy(160, 60)
    pdf.set_font("Helvetica", "B", 12)
    pdf.set_text_color(16, 185, 129)
    pdf.cell(115, 7, "Offre Decouverte 30 Jours Gratuits", 0, 1)
    
    pdf.set_xy(160, 70)
    pdf.set_font("Helvetica", "", 9.5)
    pdf.set_text_color(226, 232, 240)
    details = (
        "+ Aucuns frais d'installation ni de mise en service.\n"
        "+ Chevalets de table vectoriels offerts.\n"
        "+ Formation express de l'equipe incluse.\n"
        "+ Support prioritaire 7j/7 par telephone & WhatsApp.\n"
        "+ Sans aucun engagement de duree."
    )
    pdf.multi_cell(115, 6.5, details)
    
    pdf.set_xy(160, 115)
    pdf.set_font("Helvetica", "B", 11)
    pdf.set_text_color(245, 158, 11)
    pdf.cell(115, 6, "Contactez Notre Equipe Commerciale :", 0, 1)
    
    pdf.set_xy(160, 124)
    pdf.set_font("Helvetica", "", 10)
    pdf.set_text_color(255, 255, 255)
    pdf.cell(115, 6, "Email : contact@ciao-byebye.store", 0, 1)
    pdf.set_xy(160, 132)
    pdf.cell(115, 6, "Web : www.ciao-byebye.store", 0, 1)

    # Output file
    os.makedirs(os.path.dirname(os.path.abspath(output_path)), exist_ok=True)
    pdf.output(output_path)
    print(f"PDF Presentation successfully generated at: {output_path}")

if __name__ == "__main__":
    out_file = sys.argv[1] if len(sys.argv) > 1 else "formation/presentation_ciao_byebye_slides.pdf"
    build_pdf(out_file)
