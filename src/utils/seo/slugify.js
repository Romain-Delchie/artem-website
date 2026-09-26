/**
 * Transforme un nom de gamme en slug d'URL lisible par les moteurs de recherche.
 * "Toile de repose pâtons" -> "toile-de-repose-patons"
 */
export function slugify(text) {
    return String(text)
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // retire les accents
        .toLowerCase()
        .replace(/['’]/g, ' ')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

/**
 * Retrouve une gamme à partir du slug présent dans l'URL.
 * Accepte aussi un identifiant numérique pour rester compatible
 * avec les anciennes URLs /gamme/1/Toile%20enfourneur.
 */
export function findRangeBySlug(ranges, slug) {
    if (!ranges || !slug) return null;
    const decoded = decodeURIComponent(slug);
    if (/^\d+$/.test(decoded)) {
        return ranges.find((range) => String(range.id) === decoded) || null;
    }
    const normalized = slugify(decoded);
    return ranges.find((range) => slugify(range.name) === normalized) || null;
}

/** URL canonique d'une page gamme. */
export function rangePath(range) {
    return `/gamme/${slugify(range.name)}`;
}
