
// Formata string tira hifen e coloca primeira string antes do espaço em maiúsculo 
export function formatCategoryName (name) {
    if(!name) return '';
    const formatter = name.split("_").map(word => word.replace(word[0], word.charAt(0).toUpperCase()));
    return formatter.join(' ')
}

