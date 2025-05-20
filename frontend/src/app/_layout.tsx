import { AuthProvider } from '@/contexts/authContext';
import { Slot } from 'expo-router';
export default function RootLayout() {

  return <AuthProvider>
    <Slot />
  </AuthProvider>
}