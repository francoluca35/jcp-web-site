export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      const { nombre, email, empresa, telefono, producto, mensaje } = req.body;

      // Log del envío
      console.log('📧 Nuevo envío de formulario:', {
        nombre,
        email,
        empresa,
        telefono,
        producto,
        mensaje,
        timestamp: new Date().toISOString()
      });

      // Por ahora, solo loguear y devolver éxito (sin envío de email)
      console.log('✅ Formulario procesado exitosamente');
      
      res.status(200).json({ 
        success: true, 
        message: 'Formulario enviado exitosamente' 
      });
      return;

    } catch (error) {
      console.error('❌ Error procesando formulario:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Error interno del servidor' 
      });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
