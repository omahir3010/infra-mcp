const roleName = `CognitoAuthenticatedRole-${Date.now()}`; // or use any other string logic
module.exports = ({ userPoolName, appClientName, identityPoolName, callbackUrls, logoutUrls }) => {
    return `
  resource "aws_cognito_user_pool" "example" {
  name = "${userPoolName}"
  
  password_policy {
  minimum_length = 8
  require_uppercase = true
  require_lowercase = true
  require_numbers = true
  require_symbols = true
  }
  
  mfa_configuration = "OFF"
  
  verification_message_template {
  default_email_option = "CONFIRM_WITH_CODE"
  }
  }
  
  resource "aws_cognito_user_pool_client" "example" {
  name = "${appClientName}"
  user_pool_id = aws_cognito_user_pool.example.id
  generate_secret = true
  
  explicit_auth_flows = ["ALLOW_USER_PASSWORD_AUTH", "ALLOW_REFRESH_TOKEN_AUTH"]
  
  allowed_oauth_flows = ["code", "implicit"]
  allowed_oauth_scopes = ["email", "openid", "profile"]
  callback_urls = ${JSON.stringify(callbackUrls)}
  logout_urls = ${JSON.stringify(logoutUrls)}
  }
  
  resource "aws_cognito_identity_pool" "example" {
  identity_pool_name = "${identityPoolName}"
  allow_unauthenticated_identities = false
  
  cognito_identity_providers {
  client_id = aws_cognito_user_pool_client.example.id
  provider_name = aws_cognito_user_pool.example.endpoint
  }
  }
  
  resource "aws_iam_role" "authenticated_role" {
  name = "${roleName}"
  
  assume_role_policy = jsonencode({
  Version = "2012-10-17",
  Statement: [
  {
  Effect: "Allow",
  Principal: {
  Federated: "cognito-identity.amazonaws.com"
  },
  Action: "sts:AssumeRoleWithWebIdentity",
  Condition: {
  StringEquals: {
  "cognito-identity.amazonaws.com:aud": aws_cognito_identity_pool.example.id
  }
  }
  }
  ]
  })
  }
  
  resource "aws_iam_role_policy_attachment" "authenticated_policy" {
  role = aws_iam_role.authenticated_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonCognitoPowerUser"
  }
  `;
  };