const BaseUrl = 'https://exam-app.elevate-bootcamp.cloud/api/users' as const;

export class endPoints {
    static readonly profile = `${BaseUrl}/profile`;
    static readonly changePassword = `${BaseUrl}/change-password`;
    static readonly emailReq = `${BaseUrl}/email/request`;
    static readonly emailConfirm = `${BaseUrl}/email/confirm`;
    static readonly deleteAccount = `${BaseUrl}/account`;
}