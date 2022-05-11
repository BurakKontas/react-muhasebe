export function passwordValidator(password) {
    if (!password) return "Şifre Boş Bırakılamaz."
    if (password.length < 5) return 'Şifre 5 karakterden büyük olmalıdır.'
    return ''
  }