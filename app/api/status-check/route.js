// This file is responsible for handling the API route

export async function GET(req) {
  // We assume the URL to check is passed as a query parameter
  const url = req.nextUrl.searchParams.get("url"); // Correctly extract the 'url' parameter

  if (!url) {
    return new Response(JSON.stringify({ success: false, message: "URL parameter is required" }), { status: 400 });
  }

  try {
    // Attempt to fetch the website using the default `fetch` API available in Next.js
    const response = await fetch(url);

    // If the request was successful, return the website status
    if (response.ok) {
      return new Response(JSON.stringify({ success: true, message: "Website is up" }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ success: false, message: "Website is down" }), { status: 200 });
    }
  } catch (error) {
    // If an error occurs (e.g., network issues, timeout), return an error message
    return new Response(
      JSON.stringify({ success: false, message: "Error reaching the website", error: error.message }),
      { status: 500 }
    );
  }
}
