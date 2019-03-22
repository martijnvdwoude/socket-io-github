import * as request from 'request'

class AuthorizationError extends Error {
    
    name: string = "AuthorizationError"
    code: string

    constructor(code: string, message?: string) {
        super(code)
        this.code = code
        this.message = message === undefined ? "" : message

        this.stack = (<any>new Error()).stack
        Object.setPrototypeOf(this, AuthorizationError.prototype)
    }

}

export function authorize(organization: string) : Function {
    return (socket: { request: { _query: { token: undefined; } | undefined; }; }, next: { (arg0: AuthorizationError): void; (arg0: AuthorizationError): void; (): void; (arg0: AuthorizationError): void; (arg0: AuthorizationError): void; (arg0: AuthorizationError): void; }) => {
        if(socket.request._query === undefined ||
            socket.request._query.token === undefined){
                next(new AuthorizationError('missing_token'))
        } else {
            request({
                url: 'https://api.github.com/user/orgs',
                qs: {
                    'access_token': socket.request._query.token
                },
                headers: {
                    'User-Agent': 'ua',
                }
            }, (err: any, res: any, body: string) => {
                if(err){
                    next(new AuthorizationError('failed_authorization', err))
                } else if(body){
                    let parsedBody = JSON.parse(body)
        
                    if(parsedBody){
                        if(parsedBody.length > 0){
                            const isMemberOfOrganization = parsedBody.some((organizationItem: { login: any; }) => {
                                return organizationItem.login === organization
                            })
                
                            if(isMemberOfOrganization){
                                next()
                            } else {
                                next(new AuthorizationError('not_a_member'))
                            }
                        } else {
                            next(new AuthorizationError('failed_authorization', parsedBody.message))
                        }
                    } else {
                        next(new AuthorizationError('failed_authorization'))
                    }
                }
            })
        }
    }
}