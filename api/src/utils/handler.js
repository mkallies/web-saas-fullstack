export default function handler(lambdaFunc) {
  return (event, context) => {
    if (event.source === 'serverless-plugin-warmup') {
      return 'pinged'
    }

    return (
      Promise.resolve()
        // Run the Lambda
        .then(() => lambdaFunc(event, context))
        // On success
        .then((responseBody) => [200, responseBody])
        // On failure
        .catch((e) => {
          return [500, { error: e.message }]
        })
        // Return HTTP response
        .then(([statusCode, body]) => ({
          statusCode,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          },
          body: JSON.stringify(body),
        }))
    )
  }
}
