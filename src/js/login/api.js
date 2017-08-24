import { unAuthenticatedPost } from '../utilities/rest';

export function login(username, password) {
    // return unAuthenticatedPost('/security/auth/', { username, password });
    return unAuthenticatedPost('/api/security/auth/', { username, password });
}
