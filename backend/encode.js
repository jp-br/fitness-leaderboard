const mySecretJson = `
{
  "type": "service_account",
  "project_id": "fitness-leaderboard-56e48",
  "private_key_id": "f4fa32d035019073cd23775c3df6afeb5519dd40",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC6JEW3FewEW1Ph\noJQdUSJqyG1wTpkmhmCgV1n+3dyXgBfSlLfy85wMQa7EYtxpIXfn2PvcAi6Hp7FY\nRp11P4JE+NpgcmRozqtBkDiTF+931KiEl0Xd3FmrzSI3ZbsJbX+mrn6sif2Kog4/\nlWw2OtMOcpAKpzrHw1aBm0+htNCrVlui2MHGSflgLT1+2C2iTCPvhrnugCIbgT2L\n6gASJXT8FMFCFntAcdKit9yK22BQkgePd+g1JXvILXlqO1rwqCCk9Wphmq1Otw6t\n6WVFFi1jP+MdzEaEY3BolHOAqkvIWc/xcPEFxQqpS5yJoaR31lHDN+waCyzYYI0z\nxYXx1RaDAgMBAAECggEAGYLbIyqX/EjgCC5P3my+QNBTX28GQmdsWs1eAjY6A3GE\n0lGbnGqS2oMuBrBd8PKrUlVEv3R1GBZ9kdGrxuP7YKSSmWFULaEVi5jOiCphoZS9\nu95Xrv6CM6+bnugMaFBfjGKh7dfDrfpj5Yb/G7eYMYS2BR/CSJqXApBcq5byemjR\nU4Go7LYIAWBWLWxdBkvY/n8qLdWpP1JaSgseKKy9yUVLZL+94DvZ3Mj2tZUr+N6b\nb5pxCZg/eI7jQr0r74u1RJ3AVeEvmKthtVf3zFVlP1doLVjcgjVz926jH2lt38OK\nuNqEQAgCNe7EN05oWQA24ygHNud/kSAmd4/Uc5KusQKBgQD0PcDScXlsqRy116bb\nohco6MDouNqQ6vXxwnSYyzD6QLRB2d80TxEIXbivzFmHZhHHxTjm4hqlMSLZVTvV\nAZ0GMANoMZEzrjJ5FBT+tF/NM98nII45VNPEBLK4Um8+TSASjyurmATHjxoZr/VZ\nzA0gZXvR0CZB+5w5INRTRfgJ/wKBgQDDGnLXm4cqoUebfzfc5edc4/8V+8sZ6Vvh\ndxs4Fa3IXpo5Ad0GEwR/62vzYjkRO9PdHK0Ao6owHlss8mKTMer8zlqU7HH58dVK\nKldcWmlgcvbzX+KCS9Xz9eftvaJcvQYGOOh+/GwBRAF0FZ9ODRLmmKZRJ+Zxba0j\nzP28+jXLfQKBgQDR+jFG+yWQJIe5UfByzJSqqAgJS7skccwGD86b+bxeubf/ESdS\n2lLjZWe9Q6sIu9i3bbgwztxnfqnePOfWha+QvUCAmHSkALQF4hz2qO3gBiNoiRWc\n9m+lCwD3dG+NGVNkgU/jEyuwwTeIM/10OPhkDLt5s0Dg40b42l+QRAwt0wKBgQCv\nlUntSAbpEqRDCMbZgf4p1vZmbmhmNWF/E5Xnb3sqbBkXXNnw8YSHKvPH4YnCPLl6\nsKfxf1lWXLtpQ+n61l3Ijl1u0Svx6PYu/NQKRUO4jT454P0UjfNKzu+fQZ6xH1wg\nlW6Hedwpd25nbl4j/Bgadx6WwvXc9vtu0Lk6LWPkcQKBgQClCur9xcsQ7VV1zivf\n8qwJFc+moN8sz1LXXoED9Q1zgisBL3V2o6Rme8CFUur8ezeAzYByXdxOSXNXyD8X\nrJ9fFGdX62etlcFpfD1sFBpNjoh6ZwCvbQfTBN8v2RCSlu5fKTFZ5QDgXydloMJe\nuny6oWVV0b6HmeTGQI5AY8hNxw==\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-fbsvc@fitness-leaderboard-56e48.iam.gserviceaccount.com",
  "client_id": "102101743371114894444",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40fitness-leaderboard-56e48.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}
`;

console.log(Buffer.from(mySecretJson).toString('base64'));