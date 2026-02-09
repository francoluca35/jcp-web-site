import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../hooks/useAuth';

import SEOHead from '../../components/SEOHead';
import { LogIn, User, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';

export default function Login() {
  const [formData, setFormData] = useState({
    usuario: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const { loginWithUsername, createUser, loading, error } = useAuth();
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');

    try {
      
      // Basic validation
      if (!formData.usuario || !formData.password) {
        return;
      }

      const normalizedUser = formData.usuario.trim();
      if (normalizedUser.includes('@')) {
        setLocalError('Usa tu usuario, no el email.');
        return;
      }

      if (isCreating) {
        const result = await createUser({
          username: normalizedUser,
          email: formData.email.trim(),
          password: formData.password
        });
      } else {
        const result = await loginWithUsername(normalizedUser, formData.password);
      }
      
      // Redirect to admin dashboard after successful login
      
      // Usar window.location para forzar la redirección
      setTimeout(() => {
        window.location.href = '/admin/home';
      }, 100);
      
      
    } catch (err) {
      // Error is handled by the useAuth hook
      console.error('🚨 Error en handleSubmit:', err);
    }
  };

  return (
    <>
      <SEOHead 
        title="Iniciar Sesión - JCP Maquinaria Industrial"
        description="Accede a tu cuenta de JCP Maquinaria Industrial para gestionar tus pedidos y acceder a contenido exclusivo."
        keywords="login, iniciar sesión, JCP, maquinaria industrial, cuenta"
      />
      
      <main className="min-h-screen bg-gradient-to-br from-[#1a1a1a] via-[#2d2d2d] to-[#1a1a1a] flex items-center justify-center px-4 relative">
        {/* Botón para regresar a la página principal - Esquina superior izquierda */}
        <button
          onClick={() => router.push('/')}
          className="absolute top-6 left-6 flex items-center space-x-2 text-[#ff6b35] hover:text-[#ffd23f] transition-colors group z-10"
        >
          <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Volver al inicio</span>
        </button>

        <div className="max-w-md w-full">

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Iniciar Sesión
            </h1>
            <p className="text-[#adb5bd]">
              Accede a tu cuenta de JCP Maquinaria Industrial
            </p>
          </div>

          <div className="bg-[#2d2d2d] border border-[#ff6b35]/20 shadow-2xl rounded-xl p-8">
            <div className="text-center mb-8">
              <div className="mx-auto w-12 h-12 bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] rounded-full flex items-center justify-center mb-4">
                <LogIn className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl text-white font-bold mb-2">
                Bienvenido de vuelta
              </h2>
              <p className="text-[#adb5bd]">
                Ingresa tus credenciales para acceder a tu cuenta
              </p>
            </div>
            
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                {(localError || error) && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400 text-sm">
                    {localError || error}
                  </div>
                )}

                {isCreating && (
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-white font-medium block">
                      Email
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#adb5bd]" />
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="tu@email.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-[#1a1a1a] border border-[#ff6b35]/20 text-white placeholder-[#adb5bd] focus:border-[#ff6b35] focus:ring-2 focus:ring-[#ff6b35]/20 rounded-lg transition-all duration-200"
                        required
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <label htmlFor="usuario" className="text-white font-medium block">
                    Usuario
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#adb5bd]" />
                    <input
                      id="usuario"
                      name="usuario"
                      type="text"
                      placeholder="tu usuario"
                      value={formData.usuario}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-[#1a1a1a] border border-[#ff6b35]/20 text-white placeholder-[#adb5bd] focus:border-[#ff6b35] focus:ring-2 focus:ring-[#ff6b35]/20 rounded-lg transition-all duration-200"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="text-white font-medium block">
                    Contraseña
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#adb5bd]" />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Tu contraseña"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-10 py-3 bg-[#1a1a1a] border border-[#ff6b35]/20 text-white placeholder-[#adb5bd] focus:border-[#ff6b35] focus:ring-2 focus:ring-[#ff6b35]/20 rounded-lg transition-all duration-200"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#adb5bd] hover:text-white transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-[#ff6b35] bg-[#1a1a1a] border-[#ff6b35]/20 rounded focus:ring-[#ff6b35]/20"
                    />
                    <span className="text-sm text-[#adb5bd]">Recordarme</span>
                  </label>
                  <button
                    type="button"
                    className="text-sm text-[#ff6b35] hover:text-[#ffd23f] transition-colors"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] hover:from-[#ff5722] hover:to-[#ffcc02] text-white font-semibold py-3 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 border-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>{isCreating ? 'Creando usuario...' : 'Iniciando sesión...'}</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <LogIn className="h-4 w-4" />
                      <span>{isCreating ? 'Crear Usuario' : 'Iniciar Sesión'}</span>
                    </div>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setLocalError('');
                    setIsCreating((prev) => !prev);
                  }}
                  className="w-full text-sm text-[#ff6b35] hover:text-[#ffd23f] transition-colors"
                >
                  {isCreating ? 'Volver al login' : 'Crear usuario nuevo'}
                </button>
              </form>

            </div>
          </div>

        </div>
      </main>
    </>
  );
}
