import { FastifyInstance } from "fastify";
// const https = require('https');

export async function revokeToken(app: FastifyInstance, userCredential: { access_token: string }) {
  // Make sure userCredential.access_token is a valid access token

  // // Build the string for the POST request
  // let postData = "token=" + 'ya29.a0AfB_byCG_PPPD7KR0xvx5Z5M2PbSRUJnrztau5jp8gbt6yhAlsW_KeWcwjwRbhhOtlcSWO7KFNZd5vu3OxrOwx_diUVzT5EOydQYzvdsORFiPr_Py9QH67vxYbpKfAewfUgBYNOjOV54ckrZs7w-UaviuOPpHU2g12dPaCgYKASMSARMSFQHGX2MikYD7KVreL5DC4BO_vxpjMA0171';

  // // Options for POST request to Google's OAuth 2.0 server to revoke a token
  // let postOptions = {
  //   host: 'oauth2.googleapis.com',
  //   port: '443',
  //   path: '/revoke',
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //     'Content-Length': Buffer.byteLength(postData)
  //   }
  // };

  // // Set up the request
  // const postReq = https.request(postOptions, function (res: any) {
  //   res.setEncoding('utf8');
  //   res.on('data', d => {
  //     console.log('Response: ' + d);
  //   });
  // });

  // postReq.on('error', error => {
  //   console.log(error);
  // });

  // // Post the request with data
  // postReq.write(postData);
  // postReq.end();
}
