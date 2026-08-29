const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

const markdownFiles = [
    {
        src: path.join(__dirname, '../docs/formation/MODULE_1_FORMATION_CUISINE_KDS.md'),
        dest: path.join(__dirname, '../docs/formation/MODULE_1_FORMATION_CUISINE_KDS.pdf'),
        title: 'Module 1 : Formation Cuisine & KDS Multi-Postes'
    },
    {
        src: path.join(__dirname, '../docs/formation/MODULE_2_FORMATION_SALLE_SERVICE.md'),
        dest: path.join(__dirname, '../docs/formation/MODULE_2_FORMATION_SALLE_SERVICE.pdf'),
        title: 'Module 2 : Formation Salle, Plan 2D & Service'
    },
    {
        src: path.join(__dirname, '../docs/formation/MODULE_3_FORMATION_DIRECTION_GESTION.md'),
        dest: path.join(__dirname, '../docs/formation/MODULE_3_FORMATION_DIRECTION_GESTION.pdf'),
        title: 'Module 3 : Formation Direction, Pricing & Stocks BOM'
    },
    {
        src: path.join(__dirname, '../docs/formation/MODULE_4_FORMATION_CLIENT_PWA.md'),
        dest: path.join(__dirname, '../docs/formation/MODULE_4_FORMATION_CLIENT_PWA.pdf'),
        title: 'Module 4 : Expérience Client, PWA & Paiements'
    },
    {
        src: path.join(__dirname, '../docs/formation/MANUEL_FORMATION_COMPLET_CIAO_BYEBYE.md'),
        dest: path.join(__dirname, '../docs/formation/MANUEL_FORMATION_COMPLET_CIAO_BYEBYE.pdf'),
        title: 'Manuel de Formation Complet & SOP - Ciao Byebye'
    }
];

const pdfDir = path.join(__dirname, '../docs/pdf');
if (!fs.existsSync(pdfDir)) {
    fs.mkdirSync(pdfDir, { recursive: true });
}

function renderMarkdownToPdf(srcPath, destPath, docTitle) {
    return new Promise((resolve, reject) => {
        const rawMd = fs.readFileSync(srcPath, 'utf8');
        const lines = rawMd.split('\n');

        const doc = new PDFDocument({
            size: 'A4',
            margins: { top: 50, bottom: 50, left: 45, right: 45 },
            bufferPages: true
        });

        const writeStream = fs.createWriteStream(destPath);
        doc.pipe(writeStream);

        // Header
        const drawHeader = () => {
            doc.save();
            doc.fontSize(14).font('Helvetica-Bold').fillColor('#0f172a').text('CIAO', 45, 30, { continued: true });
            doc.fillColor('#f59e0b').text('BYEBYE', { continued: true });
            doc.fillColor('#64748b').fontSize(8).font('Helvetica').text('  |  DOCUMENTATION & FORMATION OFFICIELLE', 140, 35);
            doc.strokeColor('#e2e8f0').lineWidth(1).moveTo(45, 48).lineTo(550, 48).stroke();
            doc.restore();
            doc.y = 60;
        };

        drawHeader();

        let inCodeBlock = false;
        let codeBlockLines = [];

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];

            // Code blocks
            if (line.trim().startsWith('```')) {
                if (inCodeBlock) {
                    // Render accumulated code
                    doc.moveDown(0.3);
                    const startY = doc.y;
                    const codeText = codeBlockLines.join('\n');
                    
                    doc.save();
                    doc.fontSize(8.5).font('Courier');
                    const textHeight = doc.heightOfString(codeText, { width: 490 });
                    
                    doc.rect(45, startY, 505, textHeight + 12).fill('#0f172a');
                    doc.fillColor('#f8fafc').text(codeText, 52, startY + 6, { width: 490 });
                    doc.restore();
                    
                    doc.y = startY + textHeight + 18;
                    inCodeBlock = false;
                    codeBlockLines = [];
                } else {
                    inCodeBlock = true;
                    codeBlockLines = [];
                }
                continue;
            }

            if (inCodeBlock) {
                codeBlockLines.push(line);
                continue;
            }

            // Headings
            if (line.startsWith('# ')) {
                doc.moveDown(0.5);
                doc.fontSize(18).font('Helvetica-Bold').fillColor('#0f172a').text(line.replace('# ', '').trim());
                doc.strokeColor('#f59e0b').lineWidth(2).moveTo(45, doc.y + 2).lineTo(120, doc.y + 2).stroke();
                doc.moveDown(0.6);
            } else if (line.startsWith('## ')) {
                if (doc.y > 680) doc.addPage();
                doc.moveDown(0.8);
                doc.fontSize(13).font('Helvetica-Bold').fillColor('#0f172a').text(line.replace('## ', '').trim());
                doc.strokeColor('#e2e8f0').lineWidth(0.8).moveTo(45, doc.y + 2).lineTo(550, doc.y + 2).stroke();
                doc.moveDown(0.4);
            } else if (line.startsWith('### ')) {
                if (doc.y > 700) doc.addPage();
                doc.moveDown(0.5);
                doc.fontSize(10.5).font('Helvetica-Bold').fillColor('#334155').text(line.replace('### ', '').trim());
                doc.moveDown(0.2);
            } else if (line.startsWith('---')) {
                doc.moveDown(0.4);
                doc.strokeColor('#e2e8f0').lineWidth(0.5).moveTo(45, doc.y).lineTo(550, doc.y).stroke();
                doc.moveDown(0.4);
            } else if (line.startsWith('> ')) {
                // Callouts
                const calloutText = line.replace('> ', '').trim();
                doc.moveDown(0.3);
                const startY = doc.y;
                doc.save();
                doc.fontSize(9.5).font('Helvetica-Oblique').fillColor('#92400e');
                const calloutHeight = doc.heightOfString(calloutText, { width: 480 });
                doc.rect(45, startY, 505, calloutHeight + 10).fill('#fffbeb');
                doc.rect(45, startY, 4, calloutHeight + 10).fill('#f59e0b');
                doc.text(calloutText, 56, startY + 5, { width: 480 });
                doc.restore();
                doc.y = startY + calloutHeight + 14;
            } else if (line.startsWith('- ') || line.startsWith('* ')) {
                const bulletText = line.replace(/^[-*]\s+/, '').replace(/\*\*(.*?)\*\*/g, '$1');
                doc.fontSize(9.5).font('Helvetica').fillColor('#1e293b');
                doc.text('•', 52, doc.y, { continued: true });
                doc.text('  ' + bulletText, { width: 485, indent: 5 });
                doc.moveDown(0.15);
            } else if (/^\d+\.\s+/.test(line)) {
                const itemNum = line.match(/^(\d+\.)\s+/)[1];
                const itemText = line.replace(/^\d+\.\s+/, '').replace(/\*\*(.*?)\*\*/g, '$1');
                doc.fontSize(9.5).font('Helvetica').fillColor('#1e293b');
                doc.text(itemNum, 50, doc.y, { continued: true });
                doc.text(' ' + itemText, { width: 485, indent: 5 });
                doc.moveDown(0.15);
            } else if (line.startsWith('|')) {
                // Table rows
                if (line.includes('---')) continue;
                const cols = line.split('|').map(c => c.trim()).filter(c => c.length > 0);
                if (cols.length > 0) {
                    const isHeader = i > 0 && lines[i + 1] && lines[i + 1].includes('---');
                    doc.fontSize(8.5).font(isHeader ? 'Helvetica-Bold' : 'Helvetica').fillColor(isHeader ? '#0f172a' : '#334155');
                    const colWidth = 500 / cols.length;
                    const curY = doc.y;
                    cols.forEach((col, cIdx) => {
                        const cleanCol = col.replace(/\*\*(.*?)\*\*/g, '$1').replace(/<[^>]+>/g, '');
                        doc.text(cleanCol, 45 + (cIdx * colWidth), curY, { width: colWidth - 5, lineBreak: true });
                    });
                    doc.moveDown(0.4);
                }
            } else if (line.trim().length > 0) {
                const cleanText = line.replace(/\*\*(.*?)\*\*/g, '$1').replace(/<[^>]+>/g, '');
                doc.fontSize(9.5).font('Helvetica').fillColor('#334155').text(cleanText, 45, doc.y, { width: 505, align: 'left', lineGap: 1.5 });
                doc.moveDown(0.25);
            }
        }

        // Footers and Page Numbers
        const range = doc.bufferedPageRange();
        for (let p = 0; p < range.count; p++) {
            doc.switchToPage(p);
            doc.save();
            doc.strokeColor('#e2e8f0').lineWidth(0.8).moveTo(45, 790).lineTo(550, 790).stroke();
            doc.fontSize(8).font('Helvetica').fillColor('#94a3b8');
            doc.text('Ciao Byebye Restaurant Suite — https://ciao-byebye.onrender.com/', 45, 798);
            doc.text(`Page ${p + 1} / ${range.count}`, 490, 798, { align: 'right' });
            doc.restore();
        }

        doc.end();

        writeStream.on('finish', () => {
            console.log(`✅ PDF généré avec succès : ${destPath}`);
            // Also copy to pdfDir
            const copyTarget = path.join(pdfDir, path.basename(destPath));
            fs.copyFileSync(destPath, copyTarget);
            resolve();
        });

        writeStream.on('error', reject);
    });
}

async function main() {
    console.log('🚀 Démarrage de la génération des PDF de formation...');
    for (const item of markdownFiles) {
        console.log(`📄 Génération de ${path.basename(item.dest)}...`);
        await renderMarkdownToPdf(item.src, item.dest, item.title);
    }
    console.log('🎉 Tous les 5 documents de formation et manuels PDF ont été générés avec succès !');
}

main().catch(err => {
    console.error('❌ Erreur:', err);
    process.exit(1);
});
