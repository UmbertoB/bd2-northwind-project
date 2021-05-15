export default function formatDateDatabase(date: string) {
    const dateObj = new Date();

    dateObj.setDate(+date.split('-')[2]);
    dateObj.setMonth(+date.split('-')[1] - 1);
    dateObj.setFullYear(+date.split('-')[0]);

    const day = String(dateObj.getUTCDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();

    return `${year}-${month}-${day}`;

}