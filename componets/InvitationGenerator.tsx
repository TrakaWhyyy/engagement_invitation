import React, { useState } from 'react';
import { jsPDF } from 'jspdf';

export const InvitationGenerator: React.FC = () => {
    const [guestName, setGuestName] = useState<string>('');
    const [isGenerating, setIsGenerating] = useState<boolean>(false);

    // Hardcoded event details matching your timeline
    const eventDetails = {
        couple: "Sophia & James",
        date: "October 15, 2026",
        time: "06:15 PM",
        venue: "Aloft Panadura Grand Ballroom"
    };

    const handleDownloadPDF = () => {
        if (!guestName.trim()) {
            alert("Please enter a guest name first!");
            return;
        }

        setIsGenerating(true);

        // 1. Create a single-page portrait PDF document (Standard A5 Size is great for invitations)
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a5', // 148mm x 210mm
        });

        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();

        // 2. Background Paint (Vintage Warm Ivory/White)
        doc.setFillColor(255, 253, 245);
        doc.rect(0, 0, pageWidth, pageHeight, 'F');

        // 3. Draw Decorative Vintage Double Border (Gold Palette)
        const goldColor = { r: 212, g: 175, b: 55 }; // Traditional Gold
        const darkCharcoal = { r: 44, g: 44, b: 44 };  // Vintage Ink Black

        // Outer Gold Border
        doc.setDrawColor(goldColor.r, goldColor.g, goldColor.b);
        doc.setLineWidth(0.8);
        doc.rect(8, 8, pageWidth - 16, pageHeight - 16);

        // Inner Gold Border (Creates classic vintage frame layout)
        doc.setLineWidth(0.3);
        doc.rect(10, 10, pageWidth - 20, pageHeight - 20);

        // 4. Set Typographic Layouts
        doc.setTextColor(darkCharcoal.r, darkCharcoal.g, darkCharcoal.b);

        // Header Line
        doc.setFont('times', 'italic');
        doc.setFontSize(14);
        doc.text("You are warmly invited to the", pageWidth / 2, 32, { align: 'center' });

        doc.setFont('times', 'normal');
        doc.setFontSize(15);
        doc.text("Engagement Celebration of", pageWidth / 2, 42, { align: 'center' });

        // Couple Names (Gold Highlight)
        doc.setTextColor(goldColor.r, goldColor.g, goldColor.b);
        doc.setFont('times', 'bold');
        doc.setFontSize(28);
        doc.text(eventDetails.couple, pageWidth / 2, 60, { align: 'center' });

        // Event logistics text
        doc.setTextColor(darkCharcoal.r, darkCharcoal.g, darkCharcoal.b);
        doc.setFont('times', 'normal');
        doc.setFontSize(12);
        doc.text(`${eventDetails.date}  |  ${eventDetails.time}`, pageWidth / 2, 76, { align: 'center' });

        doc.setFont('times', 'italic');
        doc.setFontSize(11);
        doc.text(eventDetails.venue, pageWidth / 2, 84, { align: 'center' });

        // 5. Dynamic Guest Section Frame Box (Vintage Crest style frame)
        doc.setFillColor(255, 255, 255); // Pure white inside text box
        doc.setDrawColor(goldColor.r, goldColor.g, goldColor.b);
        doc.setLineWidth(0.4);
        doc.rect(20, 100, pageWidth - 40, 22, 'FD');

        // Guest Name Text
        doc.setTextColor(darkCharcoal.r, darkCharcoal.g, darkCharcoal.b);
        doc.setFont('times', 'bold');
        doc.setFontSize(14);
        doc.text(guestName.toUpperCase(), pageWidth / 2, 113, { align: 'center' });

        // Footnote signature
        doc.setFont('times', 'italic');
        doc.setFontSize(9);
        doc.setTextColor(140, 140, 140);
        doc.text("Please present this digital copy upon entry", pageWidth / 2, 192, { align: 'center' });

        // Save and execute local download action
        const sanitizedName = guestName.toLowerCase().replace(/[^a-z0-9]/g, '_');
        doc.save(`engagement_invitation_${sanitizedName}.pdf`);

        setIsGenerating(false);
    };

    return (
        <div className="flex flex-col md:flex-row items-center justify-center max-w-4xl mx-auto my-10 p-6 gap-8 font-sans">
            {/* RIGHT PANEL: Configuration Inputs */}
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