import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lab SunriseScene",
  robots: { index: false, follow: false },
};

export default function SunriseLabLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
