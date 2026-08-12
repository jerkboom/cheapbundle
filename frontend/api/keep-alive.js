export default async function handler(req, res) {
  try {
    // Ping the backend root URL to keep it awake
    const response = await fetch('https://cheapbundle.onrender.com/');
    const status = response.status;
    res.status(200).json({ 
      success: true, 
      message: 'Backend pinged successfully to prevent cold starts.', 
      status 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
}
