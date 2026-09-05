const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const QRCode = require('qrcode');

async function generateTableSheets() {
    console.log('🎨 Génération de la planche PDF des 12 Chevalets de Table avec le Logo Officiel Don Roberto...');

    const logoPath = path.join(__dirname, '../frontend/assets/logo-don-roberto.png');

    const tables = [
        { number: '01', name: 'Table 01', token: 'token_don-roberto_table_01', zone: 'Salle Principale' },
        { number: '02', name: 'Table 02', token: 'token_don-roberto_table_02', zone: 'Salle Principale' },
        { number: '03', name: 'Table 03', token: 'token_don-roberto_table_03', zone: 'Salle Principale' },
        { number: '04', name: 'Table 04', token: 'token_don-roberto_table_04', zone: 'Salle Principale' },
        { number: '05', name: 'Table 05', token: 'token_don-roberto_table_05', zone: 'Salle Principale' },
        { number: '06', name: 'Table 06', token: 'token_don-roberto_table_06', zone: 'Salle Principale' },
        { number: '07', name: 'Table 07', token: 'token_don-roberto_table_07', zone: 'Salle Principale' },
        { number: '08', name: 'Table 08', token: 'token_don-roberto_table_08', zone: 'Salle Principale' },
        { number: '09', name: 'Table 09', token: 'token_don-roberto_table_09', zone: 'Terrasse' },
        { number: '10', name: 'Table 10', token: 'token_don-roberto_table_10', zone: 'Terrasse' },
        { number: '11', name: 'Table 11', token: 'token_don-roberto_table_11', zone: 'Terrasse' },
        { number: '12', name: 'Comptoir Bar 6P', token: 'token_don-roberto_table_12', zone: 'Comptoir Bar' }
    ];

    // A4 dimensions: 595.28 x 841.89 points
    const doc = new PDFDocument({
        size: 'A4',
        margin: 30,
        info: {
            Title: 'Chevalets de Table QR Code Officiels — Don Roberto Nice',
            Author: 'Ciao Byebye Solution',
            Subject: 'Planche des 12 Chevalets de Table avec Logo Officiel Don Roberto'
        }
    });

    const pdfPath = path.join(__dirname, '../formation/chevalets_don_roberto_12_tables.pdf');
    const publicPdfPath = path.join(__dirname, '../frontend/chevalets_don_roberto_12_tables.pdf');

    const stream = fs.createWriteStream(pdfPath);
    doc.pipe(stream);
    doc.pipe(fs.createWriteStream(publicPdfPath));

    const cardWidth = 250;
    const cardHeight = 360;
    const marginX = (595.28 - (2 * cardWidth)) / 3; // ~ 31.76 pt
    const marginY = (841.89 - (2 * cardHeight)) / 3; // ~ 40.63 pt

    for (let i = 0; i < tables.length; i++) {
        if (i > 0 && i % 4 === 0) {
            doc.addPage();
        }

        const table = tables[i];
        const posInPage = i % 4; // 0, 1, 2, 3
        const col = posInPage % 2; // 0 (gauche), 1 (droite)
        const row = Math.floor(posInPage / 2); // 0 (haut), 1 (bas)

        const x = marginX + col * (cardWidth + marginX);
        const y = marginY + row * (cardHeight + marginY);

        const targetUrl = `https://don-roberto.ciao-byebye.store/?table=${table.number}&token=${table.token}`;

        // 1. Fond Carte Blanche & Bordure Dorée
        doc.roundedRect(x, y, cardWidth, cardHeight, 12)
           .fillAndStroke('#ffffff', '#f59e0b');
        doc.lineWidth(2.5);

        // Ombre / bordure fine intérieure
        doc.roundedRect(x + 4, y + 4, cardWidth - 8, cardHeight - 8, 10)
           .lineWidth(0.8)
           .stroke('#e2e8f0');

        // 2. En-tête Ruban Sombre avec Logo Officiel Don Roberto
        doc.roundedRect(x + 8, y + 8, cardWidth - 16, 56, 6)
           .fill('#0f172a');

        // Ligne Or
        doc.rect(x + 8, y + 61, cardWidth - 16, 3)
           .fill('#f59e0b');

        if (fs.existsSync(logoPath)) {
            // Intégration du logo officiel Don Roberto dans l'en-tête
            doc.image(logoPath, x + (cardWidth - 120) / 2, y + 12, { width: 120, height: 44, fit: [120, 44], align: 'center', valign: 'center' });
        } else {
            doc.fillColor('#ffffff')
               .fontSize(15)
               .font('Helvetica-Bold')
               .text('DON ROBERTO', x + 8, y + 16, { width: cardWidth - 16, align: 'center' });

            doc.fillColor('#f59e0b')
               .fontSize(8)
               .font('Helvetica-Bold')
               .text('PIZZERIA TRATTORIA • NICE', x + 8, y + 36, { width: cardWidth - 16, align: 'center' });
        }

        // 3. Génération Image QR Code HD
        const qrBuffer = await QRCode.toBuffer(targetUrl, {
            type: 'png',
            width: 340,
            margin: 2,
            errorCorrectionLevel: 'H',
            color: { dark: '#0f172a', light: '#ffffff' }
        });

        const qrSize = 166;
        const qrX = x + (cardWidth - qrSize) / 2;
        const qrY = y + 74;

        // Encadrement du QR Code
        doc.roundedRect(qrX - 5, qrY - 5, qrSize + 10, qrSize + 10, 6)
           .fillAndStroke('#ffffff', '#cbd5e1');

        doc.image(qrBuffer, qrX, qrY, { width: qrSize, height: qrSize });

        // Écusson central avec Logo Officiel Don Roberto dans le QR Code
        const centerX = x + cardWidth / 2;
        const centerY = qrY + qrSize / 2;
        const radius = 20;

        doc.save();
        doc.circle(centerX, centerY, radius + 2)
           .fillAndStroke('#ffffff', '#f59e0b');
        doc.lineWidth(1.5);

        if (fs.existsSync(logoPath)) {
            doc.circle(centerX, centerY, radius).clip();
            doc.image(logoPath, centerX - radius, centerY - 14, { width: radius * 2, height: 28, fit: [radius * 2, 28], align: 'center', valign: 'center' });
        } else {
            doc.fillColor('#0f172a')
               .fontSize(12)
               .font('Helvetica-Bold')
               .text('🍕', centerX - 7, centerY - 6);
        }
        doc.restore();

        // 4. Badge Table
        const badgeY = y + 252;
        doc.roundedRect(x + 20, badgeY, cardWidth - 40, 28, 6)
           .fill('#0f172a');
        doc.roundedRect(x + 20, badgeY, cardWidth - 40, 28, 6)
           .lineWidth(1.5)
           .stroke('#f59e0b');

        doc.fillColor('#f59e0b')
           .fontSize(12)
           .font('Helvetica-Bold')
           .text(`TABLE ${table.number} • ${table.zone.toUpperCase()}`, x + 20, badgeY + 8, { width: cardWidth - 40, align: 'center' });

        // 5. Instruction & Pied de carte
        doc.fillColor('#334155')
           .fontSize(9)
           .font('Helvetica-Bold')
           .text('Scannez pour commander & payer en direct', x + 10, y + 292, { width: cardWidth - 20, align: 'center' });

        doc.fillColor('#64748b')
           .fontSize(7.5)
           .font('Helvetica')
           .text('Menu interactif • Appels serveur • Paiement rapide', x + 10, y + 310, { width: cardWidth - 20, align: 'center' });

        doc.fillColor('#94a3b8')
           .fontSize(6.5)
           .font('Helvetica-Oblique')
           .text('Ciao Byebye Solution • Don Roberto Nice', x + 10, y + 338, { width: cardWidth - 20, align: 'center' });
    }

    doc.end();

    await new Promise((resolve) => stream.on('finish', resolve));
    console.log('✅ Planche PDF 12 Chevalets avec Logo Officiel générée avec succès :');
    console.log('   - ' + pdfPath);
    console.log('   - ' + publicPdfPath);
}

async function generateMiniStickersSheet() {
    console.log('🎨 Génération de la planche PDF des Autocollants Mini 2.5 x 2.5 cm Don Roberto...');

    const logoPath = path.join(__dirname, '../frontend/assets/logo-don-roberto.png');

    const tables = [
        { number: '01', token: 'token_don-roberto_table_01' },
        { number: '02', token: 'token_don-roberto_table_02' },
        { number: '03', token: 'token_don-roberto_table_03' },
        { number: '04', token: 'token_don-roberto_table_04' },
        { number: '05', token: 'token_don-roberto_table_05' },
        { number: '06', token: 'token_don-roberto_table_06' },
        { number: '07', token: 'token_don-roberto_table_07' },
        { number: '08', token: 'token_don-roberto_table_08' },
        { number: '09', token: 'token_don-roberto_table_09' },
        { number: '10', token: 'token_don-roberto_table_10' },
        { number: '11', token: 'token_don-roberto_table_11' },
        { number: '12', token: 'token_don-roberto_table_12' }
    ];

    // 2.5 cm = 70.866 points (1 cm = 28.3465 pt)
    const stickerSize = 70.866; // 2.5 x 2.5 cm

    // A4: 595.28 x 841.89 pt
    const doc = new PDFDocument({
        size: 'A4',
        margin: 20,
        info: {
            Title: 'Autocollants 2.5x2.5cm QR Code Don Roberto Nice',
            Author: 'Ciao Byebye Solution',
            Subject: 'Planche de Mini QR Codes Autocollants pour Tables'
        }
    });

    const pdfPath = path.join(__dirname, '../formation/autocollants_don_roberto_12_tables_2.5x2.5cm.pdf');
    const publicPdfPath = path.join(__dirname, '../frontend/autocollants_don_roberto_12_tables_2.5x2.5cm.pdf');

    const stream = fs.createWriteStream(pdfPath);
    doc.pipe(stream);
    doc.pipe(fs.createWriteStream(publicPdfPath));

    // Grille 6 colonnes x 9 lignes = 54 vignettes par page (plusieurs exemplaires par table)
    const cols = 6;
    const rows = 9;
    const marginX = (595.28 - (cols * stickerSize)) / (cols + 1);
    const marginY = (841.89 - (rows * stickerSize)) / (rows + 1);

    // Titre de la page
    doc.fillColor('#0f172a').fontSize(14).font('Helvetica-Bold').text('DON ROBERTO — Planche d\'Autocollants 2.5 cm x 2.5 cm', 20, 15, { align: 'center' });

    let stickerIndex = 0;
    // On génère 4 exemplaires par table (48 vignettes au total)
    const stickersList = [];
    for (let rep = 0; rep < 4; rep++) {
        for (const t of tables) {
            stickersList.push(t);
        }
    }

    for (let i = 0; i < stickersList.length; i++) {
        const table = stickersList[i];
        const col = i % cols;
        const row = Math.floor(i / cols);

        const x = marginX + col * (stickerSize + marginX);
        const y = 35 + marginY + row * (stickerSize + marginY);

        const targetUrl = `https://don-roberto.ciao-byebye.store/?table=${table.number}&token=${table.token}`;

        // Contour du sticker (pointillé léger pour la découpe)
        doc.roundedRect(x, y, stickerSize, stickerSize, 4)
           .fillAndStroke('#ffffff', '#cbd5e1');
        doc.lineWidth(0.5);

        // Bandeau supérieur Don Roberto
        doc.roundedRect(x + 2, y + 2, stickerSize - 4, 11, 2).fill('#0f172a');
        doc.fillColor('#f59e0b').fontSize(5).font('Helvetica-Bold').text(`T. ${table.number}`, x + 2, y + 5, { width: stickerSize - 4, align: 'center' });

        // QR Code
        const qrBuffer = await QRCode.toBuffer(targetUrl, {
            type: 'png',
            width: 180,
            margin: 0,
            errorCorrectionLevel: 'M',
            color: { dark: '#0f172a', light: '#ffffff' }
        });

        const qrSize = 48; // ~ 1.7 cm
        const qrX = x + (stickerSize - qrSize) / 2;
        const qrY = y + 14;

        doc.image(qrBuffer, qrX, qrY, { width: qrSize, height: qrSize });

        // Petit logo au centre du QR Code
        if (fs.existsSync(logoPath)) {
            const centerX = x + stickerSize / 2;
            const centerY = qrY + qrSize / 2;
            const r = 6;
            doc.save();
            doc.circle(centerX, centerY, r + 1).fillAndStroke('#ffffff', '#f59e0b');
            doc.circle(centerX, centerY, r).clip();
            doc.image(logoPath, centerX - r, centerY - 4, { width: r * 2, height: 8, fit: [r * 2, 8], align: 'center', valign: 'center' });
            doc.restore();
        }

        // Bas du sticker
        doc.fillColor('#0f172a').fontSize(4.5).font('Helvetica-Bold').text('SCANNEZ & PAYEZ', x + 2, y + stickerSize - 7, { width: stickerSize - 4, align: 'center' });
    }

    doc.end();
    await new Promise((resolve) => stream.on('finish', resolve));
    console.log('✅ Planche Autocollants 2.5x2.5cm générée avec succès :');
    console.log('   - ' + pdfPath);
    console.log('   - ' + publicPdfPath);
}

async function generateTakeAwayPosterA4() {
    console.log('🎨 Génération de l\'Affiche A4 Take Away / Vente à Emporter Don Roberto...');

    const logoPath = path.join(__dirname, '../frontend/assets/logo-don-roberto.png');
    const targetUrl = 'https://don-roberto.ciao-byebye.store/?table=99&token=token_don-roberto_take_away&mode=takeaway';

    const doc = new PDFDocument({
        size: 'A4',
        margin: 0,
        autoFirstPage: true,
        bufferPages: true,
        info: {
            Title: 'Affiche A4 Take Away — Don Roberto Nice',
            Author: 'Ciao Byebye Solution',
            Subject: 'Commandes à Emporter & Drive QR Code'
        }
    });

    const pdfPath = path.join(__dirname, '../formation/affiche_take_away_don_roberto_A4.pdf');
    const publicPdfPath = path.join(__dirname, '../frontend/affiche_take_away_don_roberto_A4.pdf');

    const stream = fs.createWriteStream(pdfPath);
    doc.pipe(stream);
    doc.pipe(fs.createWriteStream(publicPdfPath));

    const width = 595.28;
    const height = 841.89;

    // 1. En-tête Fond Sombre Luxe
    doc.rect(0, 0, width, 180).fill('#0f172a');
    doc.rect(0, 175, width, 6).fill('#f59e0b');

    if (fs.existsSync(logoPath)) {
        doc.image(logoPath, (width - 240) / 2, 25, { width: 240, height: 90, fit: [240, 90], align: 'center' });
    }

    doc.fillColor('#f59e0b')
       .fontSize(16)
       .font('Helvetica-Bold')
       .text('PIZZERIA TRATTORIA • NICE', 0, 125, { width: width, align: 'center' });

    doc.fillColor('#ffffff')
       .fontSize(13)
       .font('Helvetica')
       .text('COMMANDE À EMPORTER • TAKE AWAY', 0, 148, { width: width, align: 'center' });

    // 2. Badge Titre Central
    doc.roundedRect((width - 380) / 2, 210, 380, 50, 12).fill('#f59e0b');
    doc.fillColor('#0f172a')
       .fontSize(20)
       .font('Helvetica-Bold')
       .text('COMMANDER À EMPORTER', 0, 224, { width: width, align: 'center' });

    // 3. QR Code Géant A4 (280x280)
    const qrSize = 280;
    const qrX = (width - qrSize) / 2;
    const qrY = 285;

    doc.roundedRect(qrX - 15, qrY - 15, qrSize + 30, qrSize + 30, 20)
       .fillAndStroke('#ffffff', '#cbd5e1');
    doc.lineWidth(2);

    const qrBuffer = await QRCode.toBuffer(targetUrl, {
        type: 'png',
        width: 600,
        margin: 2,
        errorCorrectionLevel: 'H',
        color: { dark: '#0f172a', light: '#ffffff' }
    });

    doc.image(qrBuffer, qrX, qrY, { width: qrSize, height: qrSize });

    // Logo central écusson dans le QR Code
    const centerX = width / 2;
    const centerY = qrY + qrSize / 2;
    const r = 35;

    doc.save();
    doc.circle(centerX, centerY, r + 3).fillAndStroke('#ffffff', '#f59e0b');
    doc.lineWidth(2.5);

    if (fs.existsSync(logoPath)) {
        doc.circle(centerX, centerY, r).clip();
        doc.image(logoPath, centerX - r, centerY - 24, { width: r * 2, height: 48, fit: [r * 2, 48], align: 'center', valign: 'center' });
    }
    doc.restore();

    // 4. Instructions & Étapes
    doc.fillColor('#0f172a')
       .fontSize(16)
       .font('Helvetica-Bold')
       .text('Scannez ce QR Code avec votre téléphone', 0, 615, { width: width, align: 'center' });

    doc.fillColor('#475569')
       .fontSize(12)
       .font('Helvetica')
       .text('1. Choisissez vos Pizzas & Spécialités Italiennes\n2. Réglez en ligne de façon 100% sécurisée\n3. Récupérez votre commande au comptoir !', 0, 642, { width: width, align: 'center', lineGap: 6 });

    // 5. Bas de page / Footer
    doc.rect(0, height - 70, width, 70).fill('#0f172a');
    doc.fillColor('#f59e0b')
       .fontSize(12)
       .font('Helvetica-Bold')
       .text('DON ROBERTO • 158 Avenue de la Californie, 06200 Nice', 0, height - 52, { width: width, align: 'center' });

    doc.fillColor('#94a3b8')
       .fontSize(9)
       .font('Helvetica')
       .text('Service Click & Collect Express par Ciao Byebye Solution', 0, height - 32, { width: width, align: 'center' });

    doc.end();
    await new Promise((resolve) => stream.on('finish', resolve));
    console.log('✅ Affiche A4 Take Away générée avec succès :');
    console.log('   - ' + pdfPath);
    console.log('   - ' + publicPdfPath);
}

async function run() {
    await generateTableSheets();
    await generateMiniStickersSheet();
    await generateTakeAwayPosterA4();
}

run().catch(console.error);


