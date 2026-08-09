import { redirect } from "next/navigation";

/** Ancienne URL — redirige vers /soutenir. */
export default function DonRedirectPage() {
  redirect("/soutenir");
}
