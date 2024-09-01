export function formatDate(dateString: string) {
    const date = new Date(dateString);
    const currentYear = new Date().getFullYear();
    const year = date.getFullYear();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');

    if (year === currentYear) {
        return `${day}/${month}`;
    } else {
        return `${day}/${month}/${year}`;
    }
}
