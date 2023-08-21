/**
 * Función para autorizar por bearer token
 * @param event
 * @param context
 * @param callback
 * @returns {Promise<void>}
 */
async function middlewareAuthorizer(event, context, callback) {
  try {
    // Logger
    console.log("[handler.middlewareAuthorizer]", JSON.stringify({ event, context }))

    // Obtiene los valores necesarios del evento de la solicitud
    const token = event.authorizationToken
    const methodArn = event.methodArn

    // Verifica si el token de autorización es válido
    if (token === "Bearer my-auth-token") {
      // Si el token es válido, permite la acción solicitada
      const policy = generatePolicy("*", "Allow", methodArn)
      callback(null, policy)
    } else {
      // Si el token es inválido, niega la acción solicitada
      const policy = generatePolicy("*", "Deny", methodArn)
      callback(null, policy)
    }
  } catch (error) {
    console.error(error)
  }
}

/**
 * Función para generar la política de autorización
 * @param principalId
 * @param effect
 * @param resource
 * @returns {{}}
 */
function generatePolicy(principalId, effect, resource) {
  console.log("[generatePolicy]", { principalId, effect, resource })

  const authResponse = {}
  authResponse.principalId = principalId

  if (!effect && resource) {
    return authResponse
  }

  const policyDocument = {}
  policyDocument.Version = "2012-10-17"
  policyDocument.Statement = []
  const statementOne = {}
  statementOne.Action = "execute-api:Invoke"
  statementOne.Effect = effect
  statementOne.Resource = resource
  policyDocument.Statement[0] = statementOne
  authResponse.policyDocument = policyDocument

  return authResponse
}

exports.handler = function (event, context, callback) {
  return middlewareAuthorizer(event, context, callback)
}
