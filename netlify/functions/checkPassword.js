exports.handler = async (event) => {
  const { password } = JSON.parse(event.body);

  if (password === '12345') {
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, dni: '48915466' }),
    };
  }

  return {
    statusCode: 401,
    body: JSON.stringify({ success: false, message: 'Contraseña incorrecta' }),
  };
};
