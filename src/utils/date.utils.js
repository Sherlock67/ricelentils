function isDateSame(date1, date2) {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
}

function formatDateToYMD(date) {
    return date
        .toLocaleDateString("se-SE", { 
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
}

exports.isDateSame = isDateSame;
exports.formatDateToYMD = formatDateToYMD;