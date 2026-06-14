// INSKEN Corporate Gift Calculator - Core Logic v2.0

// 1. Database of Gift Categories & Printing Pricing Tiers (Derived from Price List)
const categories = {
    plastic_pen: {
        id: 'plastic_pen',
        name: 'Plastic Pen',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>`,
        printMethod: 'Pad Printing',
        defaultItemCost: 0.80,
        tiers: [
            { min: 1, max: 200, block: 40.00, print: 80.00, isFlat: true },
            { min: 201, max: 1000, block: 30.00, print: 0.30, isFlat: false },
            { min: 1001, max: 5000, block: 0.00, print: 0.25, isFlat: false },
            { min: 5001, max: 10000, block: 0.00, print: 0.18, isFlat: false },
            { min: 10001, max: Infinity, block: 0.00, print: 0.15, isFlat: false }
        ]
    },
    metal_pen: {
        id: 'metal_pen',
        name: 'Metal Pen',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 2 4 4-12 12H6v-4L18 2Z"/><path d="m15 5 4 4"/><path d="m9 11 4 4"/><path d="M4 22h16"/></svg>`,
        printMethod: 'Pad Printing',
        defaultItemCost: 3.50,
        tiers: [
            { min: 1, max: 200, block: 40.00, print: 90.00, isFlat: true },
            { min: 201, max: 1000, block: 20.00, print: 0.40, isFlat: false },
            { min: 1001, max: 5000, block: 0.00, print: 0.30, isFlat: false },
            { min: 5001, max: 10000, block: 0.00, print: 0.28, isFlat: false },
            { min: 10001, max: Infinity, block: 0.00, print: 0.25, isFlat: false }
        ]
    },
    jute_canvas: {
        id: 'jute_canvas',
        name: 'Jute / Canvas',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,
        printMethod: 'Silkscreen (1 Colour)',
        defaultItemCost: 6.00,
        tiers: [
            { min: 1, max: 100, block: 40.00, print: 80.00, isFlat: true },
            { min: 101, max: 200, block: 30.00, print: 0.70, isFlat: false },
            { min: 201, max: 1000, block: 30.00, print: 0.65, isFlat: false },
            { min: 1001, max: 2000, block: 0.00, print: 0.60, isFlat: false },
            { min: 2001, max: Infinity, block: 0.00, print: 0.55, isFlat: false }
        ]
    },
    bag: {
        id: 'bag',
        name: 'Bag (Nylon/Non-woven)',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"/><path d="M9 22V12h6v10"/><path d="M8 5a4 4 0 0 1 8 0v4H8V5Z"/></svg>`,
        printMethod: 'Silkscreen (1 Colour)',
        defaultItemCost: 2.50,
        tiers: [
            { min: 1, max: 100, block: 30.00, print: 80.00, isFlat: true },
            { min: 101, max: 1000, block: 30.00, print: 0.70, isFlat: false },
            { min: 1001, max: 3000, block: 0.00, print: 0.65, isFlat: false },
            { min: 3001, max: Infinity, block: 0.00, print: 0.60, isFlat: false }
        ]
    },
    umbrella: {
        id: 'umbrella',
        name: 'Umbrella',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"/><path d="M12 2a10 10 0 0 1 10 10H2a10 10 0 0 1 10-10z"/><path d="M12 22a3 3 0 0 0 3-3"/></svg>`,
        printMethod: 'Silkscreen (1 Colour)',
        defaultItemCost: 12.00,
        tiers: [
            { min: 1, max: 100, block: 40.00, print: 80.00, isFlat: true },
            { min: 101, max: 1000, block: 40.00, print: 0.90, isFlat: false },
            { min: 1001, max: 3000, block: 0.00, print: 0.85, isFlat: false },
            { min: 3001, max: Infinity, block: 0.00, print: 0.80, isFlat: false }
        ]
    },
    mug_bottle: {
        id: 'mug_bottle',
        name: 'Mug / Bottle',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><path d="M6 2v4"/><path d="M10 2v4"/><path d="M14 2v4"/></svg>`,
        printMethod: 'Silkscreen / Sublimation',
        defaultItemCost: 8.00,
        tiers: [
            { min: 1, max: 100, block: 40.00, print: 80.00, isFlat: true },
            { min: 101, max: 1000, block: 40.00, print: 0.70, isFlat: false },
            { min: 1001, max: 3000, block: 0.00, print: 0.65, isFlat: false },
            { min: 3001, max: Infinity, block: 0.00, print: 0.55, isFlat: false }
        ]
    },
    notebook: {
        id: 'notebook',
        name: 'Notebook / Diary',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
        printMethod: 'Silkscreen / Hot Stamping',
        defaultItemCost: 5.00,
        tiers: [
            { min: 1, max: 100, block: 40.00, print: 70.00, isFlat: true },
            { min: 101, max: 1000, block: 30.00, print: 0.70, isFlat: false },
            { min: 1001, max: 3000, block: 0.00, print: 0.65, isFlat: false },
            { min: 3001, max: Infinity, block: 0.00, print: 0.60, isFlat: false }
        ]
    }
};

// 2. Application State Variables
let currentCategoryId = 'notebook'; // default category

// 3. Selectors
const categoryGrid = document.getElementById('categoryGrid');
const manualCostInput = document.getElementById('manualCost');
const quantityInput = document.getElementById('quantity');
const markupRateInput = document.getElementById('markupRate');
const markupValueDisplay = document.getElementById('markupValueDisplay');
const markupBadge = document.getElementById('markupBadge');
const tierInfoBox = document.getElementById('tierInfoBox');
const sstRateInput = document.getElementById('sstRate');

// Addon Elements
const addonUrgent = document.getElementById('addonUrgent');
const addonTopUrgent = document.getElementById('addonTopUrgent');
const addonMetallicSmall = document.getElementById('addonMetallicSmall');
const addonMetallicBig = document.getElementById('addonMetallicBig');
const addonArtwork = document.getElementById('addonArtwork');
const addonPacking = document.getElementById('addonPacking');
const addonPackingContainer = document.getElementById('addonPackingContainer');

// Output elements
const bannerCategory = document.getElementById('bannerCategory');
const breakdownBody = document.getElementById('breakdownBody');
const txtSubtotal = document.getElementById('txtSubtotal');
const txtSstPercent = document.getElementById('txtSstPercent');
const txtTax = document.getElementById('txtTax');
const txtGrandTotal = document.getElementById('txtGrandTotal');
const txtAvgPrice = document.getElementById('txtAvgPrice');

// Diagnostic outputs
const txtTotalCost = document.getElementById('txtTotalCost');
const txtProfitMarginPercent = document.getElementById('txtProfitMarginPercent');
const txtTotalProfit = document.getElementById('txtTotalProfit');

const btnCopyWhatsapp = document.getElementById('btnCopyWhatsapp');
const toastEl = document.getElementById('toast');

// 4. Initialize Category Grid
function initCategories() {
    categoryGrid.innerHTML = '';
    Object.keys(categories).forEach(key => {
        const cat = categories[key];
        const card = document.createElement('div');
        card.className = `category-card ${key === currentCategoryId ? 'active' : ''}`;
        card.innerHTML = `
            ${cat.icon}
            <span class="category-name">${cat.name}</span>
        `;
        card.addEventListener('click', () => selectCategory(key));
        categoryGrid.appendChild(card);
    });
}

// 5. Select Category Action
function selectCategory(key) {
    currentCategoryId = key;
    
    // Update active class in grid
    document.querySelectorAll('.category-card').forEach(card => {
        card.classList.remove('active');
    });
    const activeIndex = Object.keys(categories).indexOf(key);
    categoryGrid.children[activeIndex].classList.add('active');
    
    // Set default item cost for selected category
    manualCostInput.value = categories[key].defaultItemCost.toFixed(2);

    // Show/Hide Mug/Bottle specific packaging sleeve
    if (key === 'mug_bottle') {
        addonPackingContainer.style.display = 'block';
    } else {
        addonPackingContainer.style.display = 'none';
        addonPacking.checked = false; // Reset if switching
    }

    calculatePricing();
}

// 6. Matching Tier Engine
function findMatchingTier(category, qty) {
    const matched = category.tiers.find(t => qty >= t.min && qty <= t.max);
    return matched || category.tiers[category.tiers.length - 1];
}

// 7. Calculate Pricing Engine
function calculatePricing() {
    const qty = parseInt(quantityInput.value) || 0;
    const itemCost = parseFloat(manualCostInput.value) || 0.00;
    const markupRate = parseFloat(markupRateInput.value) || 0;
    const sstRate = parseFloat(sstRateInput.value) || 0;
    
    const cat = categories[currentCategoryId];
    bannerCategory.textContent = `${cat.name} (${cat.printMethod})`;
    
    // Update Slider Display Text
    markupValueDisplay.textContent = `${markupRate}%`;
    if (markupRate === 65) {
        markupBadge.textContent = '65% Default';
        markupBadge.style.backgroundColor = '#dbeafe';
        markupBadge.style.color = '#1e3a8a';
    } else {
        markupBadge.textContent = 'Custom';
        markupBadge.style.backgroundColor = '#fef3c7';
        markupBadge.style.color = '#d97706';
    }

    if (qty <= 0) {
        tierInfoBox.innerHTML = `⚠️ Sila masukkan kuantiti melebihi 0.`;
        return;
    }

    const matchedTier = findMatchingTier(cat, qty);
    
    // Show tier details in alert box
    if (matchedTier.isFlat) {
        tierInfoBox.innerHTML = `<strong>Kadar Kuantiti (${qty} unit):</strong> Flat printing charge sebanyak <strong>RM ${matchedTier.print.toFixed(2)}</strong> dan Kos Block <strong>RM ${matchedTier.block.toFixed(2)}</strong> (Sebelum markup).`;
    } else {
        const blockText = matchedTier.block > 0 ? `RM ${matchedTier.block.toFixed(2)}` : 'NIL (Percuma)';
        tierInfoBox.innerHTML = `<strong>Kadar Kuantiti (${qty} unit):</strong> Cetakan unit <strong>RM ${matchedTier.print.toFixed(2)}/unit</strong> dan Kos Block <strong>${blockText}</strong> (Sebelum markup).`;
    }

    // --- BASE COST CALCULATIONS (Internal cost to business) ---
    // 1. Base Item Cost
    const totalBaseItemCost = itemCost * qty;
    
    // 2. Base Printing Cost
    let unitBasePrintCost = 0;
    let totalBasePrintCost = 0;
    if (matchedTier.isFlat) {
        totalBasePrintCost = matchedTier.print;
        unitBasePrintCost = matchedTier.print / qty;
    } else {
        unitBasePrintCost = matchedTier.print;
        totalBasePrintCost = matchedTier.print * qty;
    }

    // 3. Base Block Cost
    const totalBaseBlockCost = matchedTier.block;

    // 4. Base Surcharges Cost
    let totalBaseSurchargeCost = 0;
    let unitBaseSurchargeCost = 0;

    // Fixed Flat Surcharges
    if (addonUrgent.checked) totalBaseSurchargeCost += parseFloat(addonUrgent.value);
    if (addonTopUrgent.checked) totalBaseSurchargeCost += parseFloat(addonTopUrgent.value);
    totalBaseSurchargeCost += parseFloat(addonArtwork.value);

    // Per Unit Surcharges
    if (addonMetallicSmall.checked) {
        unitBaseSurchargeCost += parseFloat(addonMetallicSmall.value);
    }
    if (addonMetallicBig.checked) {
        unitBaseSurchargeCost += parseFloat(addonMetallicBig.value);
    }
    if (addonPacking.checked && cat.id === 'mug_bottle') {
        unitBaseSurchargeCost += parseFloat(addonPacking.value);
    }

    const totalBaseUnitSurchargeCost = unitBaseSurchargeCost * qty;
    const finalTotalBaseCost = totalBaseItemCost + totalBasePrintCost + totalBaseBlockCost + totalBaseSurchargeCost + totalBaseUnitSurchargeCost;

    // --- MARKED-UP SELLING PRICES (Client view) ---
    const markupFactor = 1 + (markupRate / 100);

    // Item Marked up
    const sellItemUnit = itemCost * markupFactor;
    const sellItemTotal = sellItemUnit * qty;

    // Print Marked up
    const sellPrintUnit = unitBasePrintCost * markupFactor;
    const sellPrintTotal = matchedTier.isFlat ? (totalBasePrintCost * markupFactor) : (sellPrintUnit * qty);

    // Block Marked up
    const sellBlockTotal = totalBaseBlockCost * markupFactor;

    // Surcharges Marked up
    const sellSurchargeUnit = unitBaseSurchargeCost * markupFactor;
    const sellSurchargeUnitTotal = sellSurchargeUnit * qty;
    const sellSurchargeFixedTotal = totalBaseSurchargeCost * markupFactor;
    const totalSellSurcharges = sellSurchargeUnitTotal + sellSurchargeFixedTotal;

    // Totals
    const subtotalSellingPrice = sellItemTotal + sellPrintTotal + sellBlockTotal + totalSellSurcharges;
    const taxValue = subtotalSellingPrice * (sstRate / 100);
    const grandTotalSellingPrice = subtotalSellingPrice + taxValue;
    const avgSellingPrice = grandTotalSellingPrice / qty;

    // Profit Diagnostics
    const totalProfit = subtotalSellingPrice - finalTotalBaseCost; // tax is pass-through, profit is based on untaxed sales
    const marginPercent = grandTotalSellingPrice > 0 ? (totalProfit / subtotalSellingPrice) * 100 : 0;

    // 8. Render Breakdown Table
    let tableHtml = `
        <tr>
            <td class="bold">1. Kos Item (${cat.name})</td>
            <td class="text-right">RM ${itemCost.toFixed(2)}</td>
            <td class="text-right">RM ${sellItemUnit.toFixed(3)}</td>
            <td class="text-right bold">RM ${sellItemTotal.toFixed(2)}</td>
        </tr>
        <tr>
            <td class="bold">2. Caj Cetakan (${cat.printMethod})</td>
            <td class="text-right">${matchedTier.isFlat ? 'Flat rate' : `RM ${unitBasePrintCost.toFixed(2)}`}</td>
            <td class="text-right">${matchedTier.isFlat ? 'Flat rate' : `RM ${sellPrintUnit.toFixed(3)}`}</td>
            <td class="text-right bold">RM ${sellPrintTotal.toFixed(2)}</td>
        </tr>
    `;

    if (totalBaseBlockCost > 0) {
        tableHtml += `
            <tr>
                <td class="bold">3. Kos Block / Setup</td>
                <td class="text-right">RM ${totalBaseBlockCost.toFixed(2)}</td>
                <td class="text-right">RM ${sellBlockTotal.toFixed(2)}</td>
                <td class="text-right bold">RM ${sellBlockTotal.toFixed(2)}</td>
            </tr>
        `;
    }

    if (totalBaseSurchargeCost > 0 || totalBaseUnitSurchargeCost > 0) {
        const baseSurchargeRep = (totalBaseSurchargeCost / qty) + unitBaseSurchargeCost;
        const sellSurchargeRep = (sellSurchargeFixedTotal / qty) + sellSurchargeUnit;
        tableHtml += `
            <tr>
                <td class="bold">4. Caj Tambahan / Surcharge</td>
                <td class="text-right">RM ${baseSurchargeRep.toFixed(2)}</td>
                <td class="text-right">RM ${sellSurchargeRep.toFixed(2)}</td>
                <td class="text-right bold">RM ${totalSellSurcharges.toFixed(2)}</td>
            </tr>
        `;
    }

    breakdownBody.innerHTML = tableHtml;

    // Update Totals UI
    txtSubtotal.textContent = `RM ${subtotalSellingPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    txtSstPercent.textContent = sstRate;
    txtTax.textContent = `RM ${taxValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    txtGrandTotal.textContent = `RM ${grandTotalSellingPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    txtAvgPrice.textContent = `RM ${avgSellingPrice.toFixed(2)} / unit`;

    // Update Internal Diagnostics UI
    txtTotalCost.textContent = `RM ${finalTotalBaseCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    txtProfitMarginPercent.textContent = `${marginPercent.toFixed(1)}%`;
    txtTotalProfit.textContent = `RM ${totalProfit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// 9. Copy to WhatsApp Template Formatter
function generateWhatsAppText() {
    const qty = parseInt(quantityInput.value) || 0;
    const itemCost = parseFloat(manualCostInput.value) || 0.00;
    const markupRate = parseFloat(markupRateInput.value) || 0;
    const sstRate = parseFloat(sstRateInput.value) || 0;
    const cat = categories[currentCategoryId];
    const matchedTier = findMatchingTier(cat, qty);

    const markupFactor = 1 + (markupRate / 100);

    const sellItemUnit = itemCost * markupFactor;
    const sellItemTotal = sellItemUnit * qty;

    const unitBasePrintCost = matchedTier.isFlat ? (matchedTier.print / qty) : matchedTier.print;
    const sellPrintUnit = unitBasePrintCost * markupFactor;
    const sellPrintTotal = matchedTier.isFlat ? (matchedTier.print * markupFactor) : (sellPrintUnit * qty);

    const sellBlockTotal = matchedTier.block * markupFactor;

    // Surcharges
    let baseFixedSurcharges = 0;
    let surchargeDetailsList = [];
    
    if (addonUrgent.checked) {
        baseFixedSurcharges += parseFloat(addonUrgent.value);
        surchargeDetailsList.push("Urgent Order (2 hari)");
    }
    if (addonTopUrgent.checked) {
        baseFixedSurcharges += parseFloat(addonTopUrgent.value);
        surchargeDetailsList.push("Top Urgent (1 hari)");
    }
    const artworkVal = parseFloat(addonArtwork.value);
    if (artworkVal > 0) {
        baseFixedSurcharges += artworkVal;
        surchargeDetailsList.push(`Lakaran Semula Artwork (Tiada Fail AI)`);
    }

    let unitSurcharges = 0;
    if (addonMetallicSmall.checked) {
        unitSurcharges += parseFloat(addonMetallicSmall.value);
        surchargeDetailsList.push("Metallic Ink (Small)");
    }
    if (addonMetallicBig.checked) {
        unitSurcharges += parseFloat(addonMetallicBig.value);
        surchargeDetailsList.push("Metallic Ink (Big)");
    }
    if (addonPacking.checked && cat.id === 'mug_bottle') {
        unitSurcharges += parseFloat(addonPacking.value);
        surchargeDetailsList.push("Packing Sleeve");
    }

    const sellSurchargeFixedTotal = baseFixedSurcharges * markupFactor;
    const sellSurchargeUnit = unitSurcharges * markupFactor;
    const totalSellSurcharges = sellSurchargeFixedTotal + (sellSurchargeUnit * qty);

    const subtotalSellingPrice = sellItemTotal + sellPrintTotal + sellBlockTotal + totalSellSurcharges;
    const taxValue = subtotalSellingPrice * (sstRate / 100);
    const grandTotalSellingPrice = subtotalSellingPrice + taxValue;
    const avgSellingPrice = grandTotalSellingPrice / qty;

    // Create the message text
    let msg = `*SEBUT HARGA CORPORATE GIFT*\n`;
    msg += `-------------------------------------------\n`;
    msg += `*Kategori:* ${cat.name}\n`;
    msg += `*Kuantiti:* ${qty} unit\n\n`;
    msg += `*Pecahan Harga (Marked-up):*\n`;
    msg += `1️⃣ *Harga Item:* RM ${sellItemUnit.toFixed(2)}/unit (Jumlah: RM ${sellItemTotal.toFixed(2)})\n`;
    msg += `2️⃣ *Caj Cetak (${cat.printMethod}):* ${matchedTier.isFlat ? 'Kadar Flat' : `RM ${sellPrintUnit.toFixed(2)}/unit`} (Jumlah: RM ${sellPrintTotal.toFixed(2)})\n`;
    
    if (sellBlockTotal > 0) {
        msg += `3️⃣ *Kos Block / Setup:* RM ${sellBlockTotal.toFixed(2)} (Flat)\n`;
    }

    if (totalSellSurcharges > 0) {
        msg += `4️⃣ *Caj Tambahan / Servis:* RM ${totalSellSurcharges.toFixed(2)}\n`;
        msg += `   _(${surchargeDetailsList.join(', ')})_\n`;
    }

    msg += `-------------------------------------------\n`;
    msg += `*Subtotal:* RM ${subtotalSellingPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\n`;
    if (sstRate > 0) {
        msg += `*SST (${sstRate}%):* RM ${taxValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\n`;
    }
    msg += `*JUMLAH BERSIH:* RM ${grandTotalSellingPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\n`;
    msg += `*Purata Seunit:* RM ${avgSellingPrice.toFixed(2)} / unit\n`;
    msg += `-------------------------------------------\n`;
    msg += `_Sebut harga di atas sah untuk tempoh 14 hari._\n`;
    msg += `_Terima kasih atas minat anda!_`;

    return msg;
}

// 10. Copy Quote to Clipboard Function
function copyToClipboard() {
    const text = generateWhatsAppText();
    navigator.clipboard.writeText(text).then(() => {
        // Show toast notification
        toastEl.classList.add('show');
        setTimeout(() => {
            toastEl.classList.remove('show');
        }, 3000);
    }).catch(err => {
        alert("Ralat menyalin sebut harga: " + err);
    });
}

// 11. Event Listeners
manualCostInput.addEventListener('input', calculatePricing);
quantityInput.addEventListener('input', calculatePricing);
markupRateInput.addEventListener('input', calculatePricing);
sstRateInput.addEventListener('change', calculatePricing);

addonUrgent.addEventListener('change', () => {
    if (addonUrgent.checked) addonTopUrgent.checked = false; // Mutually exclusive
    calculatePricing();
});
addonTopUrgent.addEventListener('change', () => {
    if (addonTopUrgent.checked) addonUrgent.checked = false; // Mutually exclusive
    calculatePricing();
});
addonMetallicSmall.addEventListener('change', () => {
    if (addonMetallicSmall.checked) addonMetallicBig.checked = false; // Mutually exclusive
    calculatePricing();
});
addonMetallicBig.addEventListener('change', () => {
    if (addonMetallicBig.checked) addonMetallicSmall.checked = false; // Mutually exclusive
    calculatePricing();
});
addonArtwork.addEventListener('change', calculatePricing);
addonPacking.addEventListener('change', calculatePricing);

btnCopyWhatsapp.addEventListener('click', copyToClipboard);

// 12. App Initialization
document.addEventListener('DOMContentLoaded', () => {
    initCategories();
    selectCategory('notebook'); // select Notebook as default on start
});
