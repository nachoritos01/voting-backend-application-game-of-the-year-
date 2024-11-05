const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Cargar las variables del archivo .env
dotenv.config();



// Contenido del archivo serviceAccountKey.json
const serviceAccountKeyContent = {
  type: process.env.TYPE,
  project_id: process.env.PROJECT_ID,
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: process.env.PRIVATE_KEY,
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.CLIENT_ID,
  auth_uri: process.env.AUTH_URI,
  token_uri: process.env.TOKEN_URI,
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
  universe_domain: process.env.UNIVERSE_DOMAIN
};



// Escribir el archivo serviceAccountKey.json en el directorio src
const serviceAccountKeyPath = path.join(__dirname, 'src', 'serviceAccountKey.json');
fs.writeFileSync(serviceAccountKeyPath, JSON.stringify(serviceAccountKeyContent, null, 2));
const serviceAccountKeyLibPath = path.join(__dirname, 'lib', 'serviceAccountKey.json');
fs.writeFileSync(serviceAccountKeyPath, JSON.stringify(serviceAccountKeyLibPath, null, 2));
console.log(`serviceAccountKey.json file has been generated at ${serviceAccountKeyPath}`);