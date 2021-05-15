export default function formatDate(date: string) {

    const day = String(date.substr(0, 10).split('-')[2]);
    const month = String(date.substr(0, 10).split('-')[1]);
    const year = String(date.substr(0, 10).split('-')[0]);

    return `${day}/${month}/${year}`;

}