export const isOverdue = (dateString, maxDays) => {
    if(!dateString)
        return false;

    const today = new Date();
    const checkedDate = new Date(dateString);

    const diffTime = Math.abs(today - checkedDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays > maxDays;
}