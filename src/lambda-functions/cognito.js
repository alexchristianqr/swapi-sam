const AmazonCognitoIdentity = require("amazon-cognito-identity-js")

/**
 * Función para registrar un usuario de cognito
 * @param event
 * @param context
 * @returns {Promise<{body: string, statusCode: number}>}
 */
async function authSignUp(event, context) {
  try {
    // Logger
    console.log("[authSignUp]", JSON.stringify({ event, context }))

    // Set request
    const body = JSON.parse(event["body"])
    const payload = body?.payload

    // Validar atributos necesarios
    if (!payload["email"] || !payload["password"]) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          success: false,
          message: "No existe el atributo [email,password] en el objeto payload"
        })
      }
    }

    // ENV
    const userPoolId = process.env.USER_POOL_ID
    const userPoolClientId = process.env.USER_POOL_CLIENT_ID
    let attributeList = []

    // Validar grupo de usuario en AWS cognito
    const poolData = {
      UserPoolId: userPoolId, // Your user pool id here
      ClientId: userPoolClientId // Your client id here
    }
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData)

    // Set atributos
    for (let field in payload) {
      // Saltar el campo password o dara error
      if (field === "password") continue

      // Preparar atributos del nuevo usuario
      const newAttribute = new AmazonCognitoIdentity.CognitoUserAttribute({
        Name: field,
        Value: payload[field]
      })

      // Push atributos
      attributeList.push(newAttribute)
    }

    console.log({ attributeList })

    // Registrar nuevo usuario y enviar código de verificación
    try {
      const signUpPromise = new Promise((resolve, reject) => {
        userPool.signUp(payload.email, payload.password, attributeList, null, function (err, result) {
          if (err) {
            // Response error
            reject(err)
          }
          // Response success
          resolve(result)
        })
      })

      const result = await signUpPromise

      // Response success
      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          message: "Registered new auth user cognito",
          result: result.user
        })
      }
    } catch (e) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          success: false,
          message: e.message
        })
      }
    }
  } catch (error) {
    console.error(error)
  }
}

/**
 * Función para confirmar registro de usuario de cognito
 * @param event
 * @param context
 * @returns {Promise<{body: string, statusCode: number}>}
 */
async function authSignUpConfirm(event, context) {
  try {
    // Logger
    console.log("[authSignUpConfirm]", JSON.stringify({ event, context }))

    // Set request
    const body = JSON.parse(event["body"])
    const payload = body?.payload

    // Validar atributos necesarios
    if (!payload["email"] || !payload["codeVerification"]) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          success: false,
          message: "No existe el atributo [email,codeVerification] en el objeto payload"
        })
      }
    }

    // ENV
    const userPoolId = process.env.USER_POOL_ID
    const userPoolClientId = process.env.USER_POOL_CLIENT_ID

    // Validar grupo de usuario en AWS cognito
    const poolData = {
      UserPoolId: userPoolId, // Your user pool id here
      ClientId: userPoolClientId // Your client id here
    }
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData)

    // Validar usuario en AWS cognito
    const userData = {
      Username: payload.email,
      Pool: userPool
    }
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)

    // Confirmar registro de usuario cognito
    try {
      const confirmRegistrationPromise = new Promise((resolve, reject) => {
        // Confirmar código de verificación
        cognitoUser.confirmRegistration(payload.codeVerification, true, function (err, result) {
          if (err) {
            // Response error
            reject(err)
          }
          // Response success
          resolve(result)
        })
      })

      const result = await confirmRegistrationPromise

      // Response success
      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          message: "Confirmed code verification for auth user cognito",
          result: result
        })
      }
    } catch (e) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          success: false,
          message: e.message
        })
      }
    }
  } catch (error) {
    console.error(error)
  }
}

/**
 * Función para reenviar código de verificación para el registro de usuario de cognito
 * @param event
 * @param context
 * @returns {Promise<{body: string, statusCode: number}>}
 */
async function authSignUpResend(event, context) {
  try {
    // Logger
    console.log("[authSignUpResend]", JSON.stringify({ event, context }))

    // Set request
    const body = JSON.parse(event["body"])
    const payload = body?.payload

    // Validar atributos necesarios
    if (!payload["email"]) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          success: false,
          message: "No existe el atributo [email] en el objeto payload"
        })
      }
    }

    // ENV
    const userPoolId = process.env.USER_POOL_ID
    const userPoolClientId = process.env.USER_POOL_CLIENT_ID

    // Validar grupo de usuario en AWS cognito
    const poolData = {
      UserPoolId: userPoolId, // Your user pool id here
      ClientId: userPoolClientId // Your client id here
    }
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData)

    // Validar usuario en AWS cognito
    const userData = {
      Username: payload.email,
      Pool: userPool
    }
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)

    // Reenviar código de verificación
    try {
      const resendConfirmRegistrationPromise = new Promise((resolve, reject) => {
        // Reenviar código de verificación
        cognitoUser.resendConfirmationCode(function (err, result) {
          if (err) {
            // Response error
            reject(err)
          }
          // Response success
          resolve(result)
        })
      })

      const result = await resendConfirmRegistrationPromise

      // Response success
      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          message: "Sent code verification for auth user cognito",
          result: result
        })
      }
    } catch (e) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          success: false,
          message: e.message
        })
      }
    }
  } catch (error) {
    console.error(error)
  }
}

/**
 * Función para iniciar sesión con usuario de cognito
 * @param event
 * @param context
 * @returns {Promise<{body: string, statusCode: number}>}
 */
async function authSignIn(event, context) {
  try {
    // Logger
    console.log("[authSignIn]", JSON.stringify({ event, context }))

    // Set request
    const body = JSON.parse(event["body"])
    const payload = body?.payload

    // Validar atributos necesarios
    if (!payload["email"] || !payload["password"]) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          success: false,
          message: "No existe el atributo [email,password] en el objeto payload"
        })
      }
    }

    // ENV
    const userPoolId = process.env.USER_POOL_ID
    const userPoolClientId = process.env.USER_POOL_CLIENT_ID

    // Validar grupo de usuario en AWS cognito
    const poolData = {
      UserPoolId: userPoolId, // Your user pool id here
      ClientId: userPoolClientId // Your client id here
    }
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData)

    // Validar usuario en AWS cognito
    const userData = {
      Username: payload.email,
      Pool: userPool
    }
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)

    const authenticationData = {
      Username: payload.email,
      Password: payload.password
    }
    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData)

    // Iniciar sesión
    try {
      const signinPromise = new Promise((resolve, reject) => {
        // Obtener atributos del usuario
        cognitoUser.authenticateUser(authenticationDetails, {
          onSuccess: function (result) {
            // Response success
            resolve(result)
          },
          onFailure: function (err) {
            // Response error
            reject(err)
          }
        })
      })

      const response = await signinPromise
      const result = {
        response
      }

      // Response success
      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          message: "Successfully logged for auth user cognito",
          result: result
        })
      }
    } catch (e) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          success: false,
          message: e.message
        })
      }
    }
  } catch (error) {
    console.error(error)
  }
}

/**
 * Función para obtener la sesión del usuario de cognito
 * @param event
 * @param context
 * @returns {Promise<{body: string, statusCode: number}>}
 */
async function authSession(event, context) {
  try {
    // Logger
    console.log("[authSession]", JSON.stringify({ event, context }))

    // Set request
    const body = JSON.parse(event["body"])
    const payload = body?.payload

    // Validar atributos necesarios
    if (!payload["email"]) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          success: false,
          message: "No existe el atributo [email] en el objeto payload"
        })
      }
    }

    // ENV
    const userPoolId = process.env.USER_POOL_ID
    const userPoolClientId = process.env.USER_POOL_CLIENT_ID

    // Validar grupo de usuario en AWS cognito
    const poolData = {
      UserPoolId: userPoolId, // Your user pool id here
      ClientId: userPoolClientId // Your client id here
    }
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData)

    // Validar usuario en AWS cognito
    const userData = {
      Username: payload.email,
      Pool: userPool
    }
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)

    // Sesión del usuario cognito
    try {
      const sesionPromise = new Promise((resolve, reject) => {
        // Obtener atributos del usuario
        cognitoUser.getUserAttributes(function (err, result) {
          if (err) {
            // Response error
            reject(err)
          }
          // Response success
          resolve(result)
        })
      })

      const result = await sesionPromise

      // Response success
      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          message: "Session for auth user cognito",
          result: result
        })
      }
    } catch (e) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          success: false,
          message: e.message
        })
      }
    }
  } catch (error) {
    console.error(error)
  }
}

/**
 * Función para seleccionar un tipo de accion de cognito
 * @param event
 * @param context
 * @returns {Promise<{body: string, statusCode: number}|{body: string, statusCode: number}|undefined>}
 */
async function selectType(event, context) {
  try {
    // Logger
    console.log("[selectType]", JSON.stringify({ event, context }))

    // Set request
    const body = JSON.parse(event["body"])
    const cognito = body?.cognito

    switch (cognito?.path) {
      case "signup":
        return authSignUp(event, context)
      case "signup_confirm":
        return authSignUpConfirm(event, context)
      case "signup_resend_confirm":
        return authSignUpResend(event, context)
      case "signin":
        return authSignIn(event, context)
      case "session":
        return authSession(event, context)
      default:
        return {
          statusCode: 500,
          body: JSON.stringify({
            success: false,
            message: "El path no existe"
          })
        }
    }
  } catch (error) {
    console.error(error)
  }
}

exports.handler = function (event, context) {
  return selectType(event, context)
}
