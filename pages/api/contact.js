import nodemailer from 'nodemailer';

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

      // Verificar que las variables de entorno estén configuradas
      if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
        console.log('⚠️ Variables de entorno no configuradas - solo logging');
        console.log('📧 Datos del formulario (sin envío de email):', {
          nombre,
          email,
          empresa,
          telefono,
          producto,
          mensaje,
          timestamp: new Date().toISOString()
        });
        
        res.status(200).json({ 
          success: true, 
          message: 'Formulario recibido (configurar Gmail para envío de emails)' 
        });
        return;
      }

      // Configurar el transporter de Gmail
      const transporter = nodemailer.createTransporter({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD
        }
      });

      // Configurar el email
      const mailOptions = {
        from: process.env.GMAIL_USER,
        to: process.env.DESTINATION_EMAIL || 'Francolucap1@gmail.com',
        subject: `🏭 Nueva Solicitud Industrial - ${nombre}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
            <div style="background: linear-gradient(135deg, #ff6b35, #ffd23f); padding: 30px; border-radius: 15px; text-align: center; margin-bottom: 30px;">
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">🏭 NUEVA SOLICITUD INDUSTRIAL</h1>
            </div>
            
            <div style="background: white; padding: 30px; border-radius: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <h2 style="color: #1a1a1a; border-bottom: 3px solid #ff6b35; padding-bottom: 10px;">📋 Información del Cliente</h2>
              
              <div style="margin: 20px 0;">
                <p style="margin: 10px 0; font-size: 16px;"><strong>👤 Nombre:</strong> ${nombre}</p>
                <p style="margin: 10px 0; font-size: 16px;"><strong>📧 Email:</strong> <a href="mailto:${email}" style="color: #ff6b35;">${email}</a></p>
                <p style="margin: 10px 0; font-size: 16px;"><strong>🏢 Empresa:</strong> ${empresa || 'No especificada'}</p>
                <p style="margin: 10px 0; font-size: 16px;"><strong>📞 Teléfono:</strong> <a href="tel:${telefono}" style="color: #ff6b35;">${telefono}</a></p>
                <p style="margin: 10px 0; font-size: 16px;"><strong>🔧 Producto de Interés:</strong> ${producto}</p>
              </div>
              
              <h3 style="color: #1a1a1a; border-bottom: 2px solid #ffd23f; padding-bottom: 8px;">💬 Mensaje del Cliente</h3>
              <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #ff6b35;">
                <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #495057;">${mensaje}</p>
              </div>
              
              <div style="background: linear-gradient(135deg, #ff6b35, #ffd23f); padding: 20px; border-radius: 10px; text-align: center; margin-top: 30px;">
                <p style="color: white; margin: 0; font-size: 18px; font-weight: bold;">⚡ Respuesta requerida en 24 horas</p>
              </div>
              
              <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid #dee2e6;">
                <p style="color: #6c757d; font-size: 14px; margin: 0;">
                  📅 Enviado el ${new Date().toLocaleString('es-ES', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric', 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </div>
          </div>
        `
      };

      // Enviar el email
      await transporter.sendMail(mailOptions);
      console.log('✅ Email enviado exitosamente a Francolucap1@gmail.com');
      
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
