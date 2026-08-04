import { getWhatsAppHref } from "@/lib/site";

export function WhatsAppFloat() {
  const href = getWhatsAppHref();
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Nous contacter sur WhatsApp"
      className="wa-float fixed bottom-5 right-5 z-[150] flex h-14 w-14 items-center justify-center rounded-full bg-wa text-nuit shadow-[0_10px_28px_color-mix(in_srgb,var(--wa)_40%,transparent)] transition-[transform,box-shadow] duration-[250ms] ease-yuna before:pointer-events-none before:absolute before:-inset-1 before:rounded-full before:border before:border-wa before:opacity-50 before:content-[''] hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-aube motion-reduce:transition-none motion-reduce:before:content-none motion-reduce:hover:scale-100"
    >
      <svg viewBox="0 0 32 32" className="h-7 w-7 fill-current" aria-hidden>
        <path d="M16.04 3C9.4 3 4 8.36 4 14.96c0 2.1.55 4.15 1.6 5.96L4 29l8.28-2.16a12.1 12.1 0 0 0 3.76.6h.01c6.64 0 12.04-5.36 12.04-11.96C28.09 8.36 22.68 3 16.04 3zm0 21.84h-.01a10 10 0 0 1-5.1-1.4l-.36-.21-4.91 1.28 1.31-4.78-.24-.39a9.9 9.9 0 0 1-1.52-5.28c0-5.48 4.5-9.94 10.03-9.94 5.53 0 10.03 4.46 10.03 9.94 0 5.48-4.5 9.94-10.03 9.94zm5.5-7.45c-.3-.15-1.78-.88-2.06-.98-.27-.1-.47-.15-.67.15-.2.3-.77.98-.95 1.18-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.87 1.22 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.17-1.43-.07-.13-.27-.2-.57-.35z" />
      </svg>
    </a>
  );
}
