// components/Logo.tsx
import Image from 'next/image';

export default function Logo() {
  return (
    <div className="w-[70px] h-[70px]"> {/* Fixed container prevents layout shift */}
      <Image
        src="/logo.gif" 
        alt="Arman Ayva Company Logo"
        width={70} 
        height={70}
        unoptimized={true} // Required for GIF animation
        priority // Loads immediately as it's a key brand element
        className="object-cover rounded-full border-2 border-black shadow-lg"
      />
    </div>
  );
}