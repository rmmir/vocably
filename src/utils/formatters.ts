export function capitalizeFirstLetter(word: string): string {
    return word.toLowerCase().charAt(0).toUpperCase() + word.slice(1)
}