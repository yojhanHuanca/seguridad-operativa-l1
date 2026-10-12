export function newPasswordError(password: string, confirmation: string): string | null {
  if (password.trim().length < 6) return "La nueva contraseña debe tener al menos 6 caracteres";
  if (new TextEncoder().encode(password).length > 72) return "La contraseña no puede superar los 72 bytes";
  if (password !== confirmation) return "La confirmación no coincide con la nueva contraseña";
  return null;
}
