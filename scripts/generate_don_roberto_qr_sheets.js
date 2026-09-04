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

        // 5. Instruction & Lien direct
        doc.fillColor('#334155')
           .fontSize(8.5)
           .font('Helvetica-Bold')
           .text('Scannez pour commander & payer en direct', x + 10, y + 288, { width: cardWidth - 20, align: 'center' });

        doc.fillColor('#64748b')
           .fontSize(6.5)
           .font('Helvetica')
           .text(`?table=${table.number}&token=${table.token.substring(0, 18)}...`, x + 10, y + 304, { width: cardWidth - 20, align: 'center' });

        doc.fillColor('#94a3b8')
           .fontSize(6)
           .font('Helvetica-Oblique')
           .text('⚡ Ciao Byebye Solution • Don Roberto Nice', x + 10, y + 338, { width: cardWidth - 20, align: 'center' });
    }

    doc.end();

    await new Promise((resolve) => stream.on('finish', resolve));
    console.log('✅ Planche PDF 12 Chevalets avec Logo Officiel générée avec succès :');
    console.log('   - ' + pdfPath);
    console.log('   - ' + publicPdfPath);
}

generateTableSheets().catch(console.error);
