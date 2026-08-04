import { motion, type Variants } from "framer-motion";
import { LockKeyhole, Eye, EyeOff, User, Shield, Zap, Globe, Fingerprint, ChevronRight } from "lucide-react";
import { MetroBrand } from "@/components/landing/MetroBrand";
import { useState } from "react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const features = [
    { icon: Shield, label: "Seguridad Avanzada" },
    { icon: Zap, label: "Rendimiento Óptimo" },
    { icon: Globe, label: "Acceso Global" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0f1a] flex relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00A651]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00A651]/5 rounded-full blur-3xl" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,166,81,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,166,81,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full flex items-center justify-center p-6 lg:p-12"
      >
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Brand & Info */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-[#00A651]/30 blur-2xl rounded-full animate-pulse" />
                <div className="relative bg-[#0a0f1a]/80 backdrop-blur-xl border border-[#00A651]/30 rounded-2xl p-4">
                  <MetroBrand />
                </div>
              </div>
            </div>

            {/* Hero Text */}
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                Sistema de
                <span className="block text-[#00A651] mt-2">Seguridad Operativa</span>
              </h1>
              <p className="text-xl text-gray-400 leading-relaxed max-w-lg">
                Plataforma integral de gestión para Línea 1 del Metro de Lima. 
                Tecnología de punta para una operación segura y eficiente.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="bg-[#0a0f1a]/50 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center hover:border-[#00A651]/30 transition-all group"
                  >
                    <Icon className="size-6 text-[#00A651] mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-xs text-gray-400">{feature.label}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-4 border-t border-white/10">
              <div>
                <p className="text-3xl font-bold text-white">99.9%</p>
                <p className="text-sm text-gray-500">Uptime</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">24/7</p>
                <p className="text-sm text-gray-500">Soporte</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">SSL</p>
                <p className="text-sm text-gray-500">Encriptado</p>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Login Form */}
          <motion.div variants={itemVariants} className="relative">
            {/* Form Container */}
            <div className="bg-[#0a0f1a]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 lg:p-10 shadow-2xl relative overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00A651] to-transparent" />
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#00A651]/10 rounded-full blur-2xl" />
              
              {/* Header */}
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, type: "spring" }}
                  className="inline-flex items-center justify-center w-16 h-16 bg-[#00A651]/10 rounded-2xl mb-4"
                >
                  <Fingerprint className="size-8 text-[#00A651]" />
                </motion.div>
                <h2 className="text-2xl font-bold text-white mb-2">Acceso al Sistema</h2>
                <p className="text-gray-400 text-sm">Ingrese sus credenciales para continuar</p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Username */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                    Usuario
                  </label>
                  <div className="relative">
                    <div className={`absolute inset-0 bg-gradient-to-r from-[#00A651]/20 to-transparent rounded-xl transition-opacity duration-300 ${focusedField === 'username' ? 'opacity-100' : 'opacity-0'}`} />
                    <User className={`absolute left-4 top-1/2 -translate-y-1/2 size-5 transition-colors ${focusedField === 'username' ? 'text-[#00A651]' : 'text-gray-500'}`} />
                    <input
                      id="username"
                      type="text"
                      placeholder="Ingrese su usuario"
                      onFocus={() => setFocusedField('username')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full pl-12 pr-4 py-4 bg-[#05080D]/80 border border-white/10 rounded-xl focus:ring-2 focus:ring-[#00A651] focus:border-[#00A651] transition-all outline-none text-white placeholder-gray-500 relative z-10"
                      required
                    />
                  </div>
                </motion.div>

                {/* Password */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                    Contraseña
                  </label>
                  <div className="relative">
                    <div className={`absolute inset-0 bg-gradient-to-r from-[#00A651]/20 to-transparent rounded-xl transition-opacity duration-300 ${focusedField === 'password' ? 'opacity-100' : 'opacity-0'}`} />
                    <LockKeyhole className={`absolute left-4 top-1/2 -translate-y-1/2 size-5 transition-colors ${focusedField === 'password' ? 'text-[#00A651]' : 'text-gray-500'}`} />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full pl-12 pr-12 py-4 bg-[#05080D]/80 border border-white/10 rounded-xl focus:ring-2 focus:ring-[#00A651] focus:border-[#00A651] transition-all outline-none text-white placeholder-gray-500 relative z-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#00A651] transition-colors z-10"
                    >
                      {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                    </button>
                  </div>
                </motion.div>

                {/* Options */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="flex items-center justify-between"
                >
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <div className="relative">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                      />
                      <div className="w-4 h-4 border border-white/20 rounded bg-[#05080D]/50 peer-checked:bg-[#00A651] peer-checked:border-[#00A651] transition-all" />
                      <svg className="absolute inset-0 w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Recordar sesión</span>
                  </label>
                  <a href="#" className="text-sm text-[#00A651] hover:text-[#00A651]/80 font-medium transition-colors">
                    ¿Olvidaste tu contraseña?
                  </a>
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#00A651] text-white py-4 rounded-xl font-semibold hover:bg-[#008c45] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#00A651]/20 hover:shadow-[#00A651]/40 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  {isLoading ? (
                    <>
                      <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Autenticando...</span>
                    </>
                  ) : (
                    <>
                      <span>Ingresar al Sistema</span>
                      <ChevronRight className="size-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </motion.button>
              </form>

              {/* Divider */}
              <div className="my-6 relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-[#0a0f1a]/80 text-gray-500">o continúa con</span>
                </div>
              </div>

              {/* Microsoft Button */}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="w-full flex items-center justify-center gap-3 py-4 border border-white/10 rounded-xl hover:bg-white/5 hover:border-[#00A651]/30 transition-all group"
              >
                <svg className="size-5" viewBox="0 0 23 23" fill="none">
                  <path d="M11.5 0H0V11.5H11.5V0Z" fill="#F25022"/>
                  <path d="M23 0H11.5V11.5H23V0Z" fill="#7FBA00"/>
                  <path d="M11.5 11.5H0V23H11.5V11.5Z" fill="#00A4EF"/>
                  <path d="M23 11.5H11.5V23H23V11.5Z" fill="#FFB900"/>
                </svg>
                <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                  Microsoft Entra ID
                </span>
              </motion.button>

              {/* Footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-6 text-center space-y-2"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#05080D]/50 rounded-full border border-white/5">
                  <div className="w-2 h-2 bg-[#00A651] rounded-full animate-pulse" />
                  <p className="text-xs text-gray-500">
                    v2.0.4 • Sistema Activo
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
