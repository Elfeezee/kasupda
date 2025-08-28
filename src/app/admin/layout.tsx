import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'KASUPDA Admin',
    description: 'KASUPDA Administration Portal',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
