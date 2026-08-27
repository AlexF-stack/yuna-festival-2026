/**
 * Destination des CTA d'inscription permanents (en-tête, bouton flottant).
 *
 * Toujours la page dédiée, sauf quand on y est déjà : là on défile vers le
 * formulaire au lieu de recharger. On ne traite pas l'accueil comme un cas
 * particulier même s'il porte aussi la section : le `pathname` observé au
 * prérendu ne vaut pas partout `/`, et une règle qui dépend de cette valeur
 * produisait des liens différents en local et en production.
 */
export function registerHref(pathname: string): string {
  return pathname === "/inscription" ? "#inscription" : "/inscription";
}
