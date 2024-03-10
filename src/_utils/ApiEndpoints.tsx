export const endpointsPosts = {
    getAll: '/posts',
    create: '/posts',
    deleteOneById: '/posts/',
    getOneById: '/posts/',
    updateOneById: '/posts/',
} as const;

export const endpointsAuth = {
    login: '/auth/login',
    register: '/auth/register'
} as const;

