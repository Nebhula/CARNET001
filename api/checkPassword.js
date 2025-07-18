export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const { password } = req.body;

  if (password === '123456') {
    res.status(200).json({ success: true, dni: '48915466X' });
  } else {
    res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
  }
}
