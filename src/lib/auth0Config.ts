export const auth0Config = {
    clientId: 'QgMeyFpXX8lm2Pe3Mqm7MNW3VxHgjZyj',
    issuer: 'dev-t41xo5ubl6gxw33q.us.auth0.com',
    audience: "http://localhost:8080",
    redirectUri: window.location.origin+"/callback",
    scope: 'openid profile email'
};