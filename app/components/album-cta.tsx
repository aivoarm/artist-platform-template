import Link from 'next/link';
import Image from 'next/image'; // <-- Must be imported

const imageUrl = "https://res.cloudinary.com/dpmkshcky/image/upload/c_fill,g_auto,h_250,w_970/b_rgb:000000,e_gradient_fade,y_-0.10/c_scale,co_rgb:ffffff,fl_relative,l_text:montserrat_25_style_light_align_center:%20,w_0.1,y_0.1/v1763230260/Cowboy_a3mnzs.png";
  const imageAlt = "Album art for Cowboy by Arman Ayva";
  const imageWidth = 970; // Based on the w_970 in the URL
  const imageHeight = 250; // Based on the h_250 in the URL
export function AlbumCTA() {
  return (
    // Equivalent to style="background-color:#111111; color:#ffffff; text-align:center; padding:60px 20px;"
    <section className="s text-white text-center py-16 px-4 sm:px-6 lg:px-8">
            <hr></hr>

      {/* Equivalent to h2 style="font-size:2rem; margin-bottom:20px;" */}
      <h2 className="text-3xl sm:text-4xl font-bold mb-5 tracking-tight">
        Listet to new release – Cowboy by Arman Ayva 🎷
      </h2>
      
      <div className="mx-auto mb-10 max-w-4xl rounded-lg overflow-hidden shadow-2xl">
        <Image
          src={imageUrl}
          alt={imageAlt}
          width={imageWidth}
          height={imageHeight}
          // The 'layout' prop is often replaced by 'fill' or implied sizing in newer Next.js versions.
          // Since you provided fixed w and h in the URL, we use standard width/height and 'object-cover'.
          className="object-cover w-full h-full" 
          priority // Use 'priority' if this is a high-priority image on the page (e.g., above the fold)
        />
      </div>
      {/* Equivalent to p style="font-size:1.1rem; margin-bottom:30px; max-width:600px;" */}
      <p className="text-lg mb-8 max-w-2xl mx-auto text-neutral-300">
        New music is out!<strong className="text-white">jazz, funk, and world fusion</strong> crafted by 
        **Arman Ayva – Montreal Jazz Composer**. Ride over to Spotify — find “Cowboy.” <strong className="text-white">$9</strong>.
      </p>
      
      {/* Button using Bandcamp's signature orange color (bg-orange-600 is a good match) */}
      <Link
        href="https://ffm.to/thecowboy" 
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-10 rounded-lg text-lg transition-colors duration-300 shadow-xl"
      >
        Listen Now!
      </Link>
      
      {/* Equivalent to p style="font-size:0.9rem; margin-top:15px; color:#cccccc;" */}
      <p className="text-sm mt-4 text-neutral-400">
        Available now every musical platform !
      </p>
      <hr></hr>

   
      {/* Equivalent to h2 style="font-size:2rem; margin-bottom:20px;" */}
      <h2 className="text-3xl sm:text-4xl font-bold mb-5 tracking-tight">
        Get the Album – My Funky Jazzification 🎷
      </h2>
      
      {/* Equivalent to p style="font-size:1.1rem; margin-bottom:30px; max-width:600px;" */}
      <p className="text-lg mb-8 max-w-2xl mx-auto text-neutral-300">
        Dive into 10 tracks of <strong className="text-white">jazz, funk, and world fusion</strong> crafted by 
        **Arman Ayva – Montreal Jazz Composer**. Experience the full album now and support 
        independent music for just <strong className="text-white">$9</strong>.
      </p>
      {/* Button using Bandcamp's signature orange color (bg-orange-600 is a good match) */}
      <Link
        href="https://armanayva.bandcamp.com/album/my-funky-jazzification" 
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-10 rounded-lg text-lg transition-colors duration-300 shadow-xl"
      >
        Buy Album for $9
      </Link>
      
      {/* Equivalent to p style="font-size:0.9rem; margin-top:15px; color:#cccccc;" */}
      <p className="text-sm mt-4 text-neutral-400">
        Available now on Bandcamp – support independent jazz-funk music!
      </p>
            <hr></hr>

    </section>
  );
}