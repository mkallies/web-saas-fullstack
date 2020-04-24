export default {
  s3: {
    REGION: process.env.GATSBY_S3_BUCKET_REGION,
    BUCKET: process.env.GATSBY_S3_BUCKET_NAME,
  },
  apiGateway: {
    REGION: process.env.GATSBY_API_GATEWAY_REGION,
    URL: process.env.GATSBY_API_GATEWAY_URL,
  },
  cognito: {
    REGION: process.env.GATSBY_COGNITO_REGION,
    USER_POOL_ID: process.env.GATSBY_COGNITO_USER_POOL_ID,
    APP_CLIENT_ID: process.env.GATSBY_COGNITO_APP_CLIENT_ID,
    IDENTITY_POOL_ID: process.env.GATSBY_IDENTITY_POOL_ID,
  },
}
