exports.handler = async (event) => {
  const { password } = JSON.parse(event.body);

  if (password === '123') {
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, dni: '48909439P' }),
    };
  }

  return {
    statusCode: 401,
    body: JSON.stringify({ success: false, message: 'Contraseña incorrecta' }),
  };
};
