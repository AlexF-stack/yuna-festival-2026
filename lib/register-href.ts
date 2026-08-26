/** Pages qui rendent elles-mêmes la section `#inscription`. */
const PAGES_WITH_FORM = ["/", "/inscription"];

/**
 * Depuis une page qui porte le formulaire, on défile ; depuis les autres, on
 * envoie sur la page dédiée plutôt que sur l'ancre de la home, qui atterrit
 * cinq sections plus bas.
 */
export function registerHref(pathname: string): string {
  return PAGES_WITH_FORM.includes(pathname) ? "#inscription" : "/inscription";
}
