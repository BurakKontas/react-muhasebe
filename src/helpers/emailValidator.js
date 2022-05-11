export function emailValidator(email) {
    const re = /\S+@\S+\.\S+/
    if (!email) return "E-Mail Boş Bıraklamaz."
    if (!re.test(email)) return 'Geçerli Bir E-Mail Girmelisin.'
    return ''
  }