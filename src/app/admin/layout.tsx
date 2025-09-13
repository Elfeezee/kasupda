
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { initializeFirebaseAdmin } from '@/lib/firebase/admin';

async function verifyAdmin() {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get('__session')?.value;

  if (!sessionCookie) {
    return false;
  }
  
  try {
    const { auth, db } = initializeFirebaseAdmin();
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
    
    // Check for custom admin claim OR role in Firestore
    if (decodedClaims.admin) {
        return true;
    }
    
    const userDoc = await db.collection('users').doc(decodedClaims.uid).get();
    if (userDoc.exists && userDoc.data()?.role === 'Admin') {
        return true;
    }

    return false;
  } catch (error) {
    console.error("Admin verification failed:", error);
    return false;
  }
}

export const metadata: Metadata = {
    title: 'KASUPDA Admin',
    description: 'KASUPDA Administration Portal',
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAdmin = await verifyAdmin();

  if (!isAdmin) {
    // In a real app, you might want to redirect to a specific "access-denied" page
    // or back to the main login with a query param.
    redirect('/admin/login?error=access-denied');
  }

  return <>{children}</>;
}
