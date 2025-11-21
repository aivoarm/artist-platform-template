// components/Logo.tsx
import Image from 'next/image';

export default function Logo() {
  return (
    <Image
      src="/logo.gif" 
      alt="Arman Ayva Company Logo"
      width={100} // Ensure this is set to the GIF's size or desired size
      height={50} // Ensure this is set
      unoptimized={true} // CRITICAL for GIF animation
    />
  );
}