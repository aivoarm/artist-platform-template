import { ImageResponse } from 'next/og'

// IMPORTANT: Define the runtime as 'edge' for this API to work correctly.
export const runtime = 'edge'

// The URL for the Cloudinary background image
const HERO_IMAGE_URL = 'https://res.cloudinary.com/ade,y_-0.50/c_scale,co_rgb:'
// The GET function MUST be async to use fetch
export async function GET(request: Request) {
  let url = new URL(request.url)
  let title = url.searchParams.get('title') || 'My Musical Journey, Jazz is everywhere'

  // --- 1. Fetch the External Image ---
  let imageBuffer: ArrayBuffer | undefined;
  try {
      // Use fetch to get the image data
      const response = await fetch(HERO_IMAGE_URL);
      if (response.ok) {
          imageBuffer = await response.arrayBuffer();
      } else {
          console.error(`Failed to fetch background image: ${response.status}`);
      }
  } catch (error) {
      console.error('Error fetching image:', error);
  }

  // --- 2. Render the ImageResponse with the image data ---
  return new ImageResponse(
    (
      <div 
        tw="flex flex-col w-full h-full items-center justify-center text-white"
        style={{
          // Fallback background color if image fails to load
          backgroundColor: '#000', 
        }}
      >
        {/* Render the Image element using the fetched URL */}
        {imageBuffer ? (
            // Use the <img> tag and the full URL
            <img 
                src={HERO_IMAGE_URL} 
                alt="Template User Background" 
                width={1200}
                height={630}
                tw="absolute inset-0 w-full h-full object-cover" 
            />
        ) : (
             // Simple fallback text if the image fails to load
            <div tw="text-4xl">Image Failed to Load</div>
        )}
        
        {/* Black Overlay for Readability */}
        <div tw="absolute inset-0 bg-black opacity-60" />
        
        {/* Content container - place it on top of the overlay */}
        <div tw="relative flex flex-col w-full p-16 justify-center items-center">
          <h1 tw="text-6xl font-bold tracking-tight text-center max-w-4xl">
            {title}
          </h1>
          <p tw="text-2xl mt-4">Template User | Composer & Musician</p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}