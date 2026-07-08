import React, { useState } from 'react';
import { jsPDF } from 'jspdf';

export const InvitationGenerator: React.FC = () => {
    const [guestName, setGuestName] = useState<string>('');
    const [isGenerating, setIsGenerating] = useState<boolean>(false);

    // Event details matching the reference invitation
    const eventDetails = {
        hosts: "Together with Mr. & Mrs. Silva and Mr. & Mrs. Lanarolle",
        bride: { first: "HIMAYA", last: "Medini" },
        groom: { first: "DEEPANA", last: "Lanarolle" },
        month: "JULY",
        day: "30",
        year: "2026",
        time: "At 9 O'clock in the morning",
        venueName: "The Barnhouse Studio",
        venueAddress: "155/9, 2nd Lane, Galpoththa Rd, Panadura 12500",
    };

    const handleDownloadPDF = () => {
        if (!guestName.trim()) {
            alert("Please enter a guest name first!");
            return;
        }

        setIsGenerating(true);

        // Portrait A5 card
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a5', // 148mm x 210mm
        });

        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const centerX = pageWidth / 2;

        const ink = { r: 35, g: 35, b: 35 };
        const softGrey = { r: 90, g: 90, b: 90 };
        const gold = { r: 196, g: 149, b: 60 };

        // --- Consistent vertical rhythm system ---
        // A single line-height multiplier drives per-line spacing so gaps
        // scale predictably with font size, and a small set of named gaps
        // (instead of arbitrary numbers) is used between sections.
        const LINE_HEIGHT = 1.15;
        const mmPerPt = 0.3527;
        const lineStep = (fontSizePt: number) => fontSizePt * mmPerPt * LINE_HEIGHT;

        const BASE_GAP = 4; // mm
        const GAP = {
            tight: BASE_GAP * 0.5,   // 2mm  - within a tightly related pair
            small: BASE_GAP * 1,     // 4mm  - between closely related lines
            medium: BASE_GAP * 2,    // 8mm  - between related sections
            large: BASE_GAP * 3,     // 12mm - between major blocks
        };

        // Background
        doc.setFillColor(255, 255, 255);
        doc.rect(0, 0, pageWidth, pageHeight, 'F');

        let y = 14;

        // --- Hosts line ---
        doc.setTextColor(ink.r, ink.g, ink.b);
        doc.setFont('times', 'italic');
        doc.setFontSize(11);
        const hostLines = doc.splitTextToSize(eventDetails.hosts, pageWidth - 30);
        hostLines.forEach((line: string) => {
            doc.text(line, centerX, y, { align: 'center' });
            y += lineStep(11);
        });

        y += GAP.medium;

        // --- Script "Cordially requesting..." line (approximated with italic serif) ---
        doc.setFont('times', 'italic');
        doc.setFontSize(13.5);
        doc.text("Cordially requesting the honour of your presence", centerX, y, { align: 'center' });
        y += lineStep(13.5) + GAP.tight;

        // --- Regular explanatory lines ---
        doc.setFont('times', 'normal');
        doc.setFontSize(11.5);
        doc.text("and company, as their beloved children", centerX, y, { align: 'center' });
        y += lineStep(11.5);
        doc.text("join in marriage", centerX, y, { align: 'center' });
        y += lineStep(11.5) + GAP.medium;

        // --- Bride name (letter-spaced) ---
        const drawSpacedText = (text: string, yPos: number, fontSize: number) => {
            doc.setFontSize(fontSize);
            const letters = text.split('');
            const spacing = fontSize * 0.32;
            const widths = letters.map((l) => doc.getTextWidth(l));
            const totalWidth = widths.reduce((a, b) => a + b, 0) + spacing * (letters.length - 1);
            let x = centerX - totalWidth / 2;
            letters.forEach((letter, i) => {
                doc.text(letter, x, yPos);
                x += widths[i] + spacing;
            });
        };

        doc.setFont('times', 'bold');
        doc.setTextColor(ink.r, ink.g, ink.b);
        drawSpacedText(eventDetails.bride.first, y, 21);
        y += lineStep(21) - GAP.tight;

        doc.setFont('times', 'italic');
        doc.setFontSize(12);
        doc.text(eventDetails.bride.last, centerX, y, { align: 'center' });
        y += lineStep(12) + GAP.small;

        // --- "and" script accent ---
        doc.setFont('times', 'italic');
        doc.setFontSize(16);
        doc.text("and", centerX, y, { align: 'center' });
        y += lineStep(16) + GAP.small;

        // --- Groom name (letter-spaced) ---
        doc.setFont('times', 'bold');
        doc.setFontSize(21);
        drawSpacedText(eventDetails.groom.first, y, 21);
        y += lineStep(21) - GAP.tight;

        doc.setFont('times', 'italic');
        doc.setFontSize(12);
        doc.text(eventDetails.groom.last, centerX, y, { align: 'center' });
        y += lineStep(12) + GAP.medium;

        // --- Date line: JULY | 30 | 2026 ---
        const monthText = eventDetails.month;
        const dayText = eventDetails.day;
        const yearText = eventDetails.year;

        doc.setFont('times', 'normal');
        doc.setFontSize(13);
        const monthWidth = doc.getTextWidth(monthText);

        doc.setFont('times', 'bold');
        doc.setFontSize(26);
        const dayWidth = doc.getTextWidth(dayText);

        doc.setFont('times', 'normal');
        doc.setFontSize(13);
        const yearWidth = doc.getTextWidth(yearText);

        const dividerGap = 8;
        const dividerWidth = 0.3;
        const totalDateWidth = monthWidth + dividerGap + dividerWidth + dividerGap + dayWidth + dividerGap + dividerWidth + dividerGap + yearWidth;
        let dateX = centerX - totalDateWidth / 2;
        const dateBaselineY = y;

        doc.setFont('times', 'normal');
        doc.setFontSize(13);
        doc.text(monthText, dateX, dateBaselineY);
        dateX += monthWidth + dividerGap;

        doc.setDrawColor(ink.r, ink.g, ink.b);
        doc.setLineWidth(0.4);
        doc.line(dateX, dateBaselineY - 6, dateX, dateBaselineY + 1);
        dateX += dividerGap;

        doc.setFont('times', 'bold');
        doc.setFontSize(26);
        doc.text(dayText, dateX, dateBaselineY + 2);
        dateX += dayWidth + dividerGap;

        doc.setLineWidth(0.4);
        doc.line(dateX, dateBaselineY - 6, dateX, dateBaselineY + 1);
        dateX += dividerGap;

        doc.setFont('times', 'normal');
        doc.setFontSize(13);
        doc.text(yearText, dateX, dateBaselineY);

        y += GAP.large - GAP.tight;

        // --- Time ---
        doc.setFont('times', 'italic');
        doc.setFontSize(10.5);
        doc.text(eventDetails.time, centerX, y, { align: 'center' });
        y += lineStep(10.5) + GAP.medium;

        doc.setFont('times', 'italic');
        doc.setFontSize(9.5);
        doc.setTextColor(softGrey.r, softGrey.g, softGrey.b);
        doc.text("Invited with love", centerX, y, { align: 'center' });
        y += lineStep(9.5) + GAP.small;

        doc.setFont('times', 'bold');
        doc.setFontSize(14);
        doc.setTextColor(ink.r, ink.g, ink.b);
        doc.text(guestName.toUpperCase(), centerX, y, { align: 'center' });
        y += lineStep(14) + GAP.small;

        // --- Dotted divider ---
        doc.setDrawColor(ink.r, ink.g, ink.b);
        doc.setLineWidth(0.35);
        doc.setLineDashPattern([0.6, 1], 0);
        doc.line(14, y, pageWidth - 14, y);
        doc.setLineDashPattern([], 0);
        y += GAP.medium + GAP.tight;

        // --- Venue ---
        doc.setFont('times', 'bold');
        doc.setFontSize(12.5);
        doc.setTextColor(ink.r, ink.g, ink.b);
        drawSpacedText(eventDetails.venueName, y, 12.5);
        y += lineStep(12.5) + GAP.small;

        doc.setFont('times', 'normal');
        doc.setFontSize(9.5);
        doc.setTextColor(softGrey.r, softGrey.g, softGrey.b);
        doc.text(eventDetails.venueAddress, centerX, y, { align: 'center' });
        y += lineStep(9.5) + GAP.large;

        // --- Warmly Invited (gold script accent) ---
        doc.setFont('times', 'italic');
        doc.setFontSize(17);
        doc.setTextColor(gold.r, gold.g, gold.b);
        doc.text("Warmly Invited", centerX, y, { align: 'center' });
        y += lineStep(17) + GAP.medium;

        // --- Guest name block (replaces QR code area) ---
        doc.setDrawColor(gold.r, gold.g, gold.b);
        doc.setLineWidth(0.3);
        doc.line(centerX - 30, y, centerX + 30, y);
        y += GAP.small + GAP.tight;

        // Save
        const sanitizedName = guestName.toLowerCase().replace(/[^a-z0-9]/g, '_');
        doc.save(`wedding_invitation_${sanitizedName}.pdf`);

        setIsGenerating(false);
    };

    return (
        <div className="flex flex-col md:flex-row items-center justify-center max-w-4xl mx-auto my-10 p-6 gap-8 font-sans">
            <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow-md border border-slate-100 flex flex-col justify-center">
                <h2 className="text-xl sm:text-2xl font-serif font-semibold text-slate-800 mb-2">
                    Get Your Invitation Card
                </h2>
                <p className="text-sm text-slate-500 mb-6">
                    Enter your name below to get a beautiful customized PDF invitation card.
                </p>

                <div className="space-y-4">
                    <div>
                        <label htmlFor="guestName" className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                            Add Your Name
                        </label>
                        <input
                            id="guestName"
                            type="text"
                            maxLength={40}
                            value={guestName}
                            onChange={(e) => setGuestName(e.target.value)}
                            placeholder="e.g., Chamika Gihan"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all text-slate-800 text-sm font-medium"
                        />
                    </div>

                    <button
                        onClick={handleDownloadPDF}
                        disabled={isGenerating || !guestName.trim()}
                        className={`w-full py-3.5 px-4 rounded-xl font-medium text-sm shadow-sm transition-all flex items-center justify-center gap-2 mt-2 ${
                            guestName.trim() && !isGenerating
                                ? 'bg-amber-950 text-white hover:bg-amber-900 active:scale-[0.99]'
                                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        }`}
                    >
                        {isGenerating ? (
                            <>
                                <svg className="animate-spin h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Creating Document...
                            </>
                        ) : (
                            <>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                Download PDF Invitation
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};