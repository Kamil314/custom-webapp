import { Role } from './'
import { usersArray } from './'



export function configureFakeBackend() {



    let users = [
        { id: 1, username: 'rob', password: 'rob', firstName: 'Rob', adres: 'PrettyViewStr', city: 'Den Haag', country: 'Nederland', loanType: 'Type: Hypotheek 300', restLoan: 'Rest schuld: 341.312,-', rente: "Rente: 1,21%", woz: 'WOZ: 500.000,-', role: Role.Consument },
        { id: 1, username: 'john', password: 'john', firstName: 'John', adres: 'UglyViewStr', city: 'Amsterdam', country: 'Nederland', loanType: 'Type: Hypotheek 122', restLoan: 'Rest schuld: 221.312,-', rente: "Rente: 2,21%", woz: 'WOZ: 400.000,-', role: Role.Consument },
        { id: 1, username: 'angel', password: 'angel', firstName: 'Angel', adres: 'UrStr', city: 'Rotterdam', country: 'Nederland', loanType: 'Type: Hypotheek 0122', restLoan: 'Rest schuld: 920.312,-', rente: "Rente: 1,11%", woz: 'WOZ: 700.000,-', role: Role.Consument },
        { id: 1, username: 'sebastian', password: 'sebastian', firstName: 'Sebastian', adres: 'Kalvermarktstraat', city: 'Den Haag', country: 'Nederland', loanType: 'Type: Hypotheek 512', restLoan: 'Rest schuld: 21.312,-', rente: "Rente: 3,23%", woz: 'WOZ: 100.000,-', role: Role.Consument },
        { id: 1, username: 'frank', password: 'frank', firstName: 'Frank', adres: 'Middenstraat', city: 'Zoetermeer', country: 'Nederland', loanType: 'Type: Hypotheek 0612', restLoan: 'Rest schuld: 81.312,-', rente: "Rente: 1,21%", woz: 'WOZ: 1.300.000,-', role: Role.Consument },
        { id: 1, username: 'patryk', password: 'patryk', firstName: 'Patryk', adres: 'Kortstede', city: 'Amsterdam', country: 'Nederland', loanType: 'Type: Hypotheek 15622', restLoan: 'Rest schuld: 811.312,-', rente: "Rente: 1,11%", woz: 'WOZ: 350.000,-', role: Role.Consument },
        { id: 1, username: 'peter', password: 'peter', firstName: 'Peter', adres: 'Winkelstede', city: 'Utrecht', country: 'Nederland', loanType: 'Type: Hypotheek 8322', restLoan: 'Rest schuld: 121.312,-', rente: "Rente: 1,21%", woz: 'WOZ: 800.000,-', role: Role.Consument },
        { id: 1, username: 'miranda', password: 'miranda', firstName: 'Miranda', adres: 'Stede', city: 'Rotterdam', country: 'Nederland', loanType: 'Type: Hypotheek 111', restLoan: 'Rest schuld: 721.111,-', rente: "Rente: 1,21%", woz: 'WOZ: 100.000,-', role: Role.Consument },
        { id: 1, username: 'mohamed', password: 'mohamed', firstName: 'Mohamed', adres: 'Spuistraat', city: 'Den Haag', country: 'Nederland', loanType: 'Type: Hypotheek 821', restLoan: 'Rest schuld: 81.312,-', rente: "Rente: 1,01%", woz: 'WOZ: 800.000,-', role: Role.Consument },
        { id: 2, username: 'gijs', password: 'gijs', firstName: 'Gijs', role: Role.Admin },
        { id: 2, username: 'deon', password: 'deon', firstName: 'Deon', role: Role.Admin },
        { id: 3, username: 'kamil', password: 'kamil', firstName: 'Kamil', adres: 'UrStr', city: 'Rotterdam', country: 'Nederland', loanType: 'Type: Hypotheek 0122', restLoan: 'Rest schuld: 920.312,-', rente: "Rente: 1,11%", woz: 'WOZ: 700.000,-', role: Role.User },
        { id: 3, username: 'sebas', password: 'sebas', firstName: 'Sebas', role: Role.User },
        { id: 3, username: 'wieslaw', password: 'wieslaw', firstName: 'Wieslaw', role: Role.User },
        { id: 3, username: 'andrej', password: 'andrej', firstName: 'Andrej', role: Role.User },
        { id: 3, username: 'angela', password: 'angela', firstName: 'Angela', role: Role.User }
    ];


    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        const authHeader = opts.headers['Authorization'];
        const isLoggedIn = authHeader && authHeader.startsWith('Bearer fake-jwt-token');
        const roleString = isLoggedIn && authHeader.split('.')[1];
        const role = roleString ? Role[roleString] : null;


        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(() => {
                // authenticate - public
                if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
                    const params = JSON.parse(opts.body);
                    const user = users.find(x => x.username === params.username && x.password === params.password);
                    if (!user) return error('Username or password is incorrect');
                    return ok({
                        id: user.id,
                        username: user.username,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        role: user.role,
                        adres: user.adres,
                        city: user.city,
                        country: user.country,
                        loanType: user.loanType,
                        restLoan: user.restLoan,
                        rente: user.rente,
                        woz: user.woz,
                        token: `fake-jwt-token.${user.role}`
                    });
                }

                // get user by id - admin or user (user can only access their own record)
                if (url.match(/\/users\/\d+$/) && opts.method === 'GET') {
                    if (!isLoggedIn) return unauthorised();

                    // get id from request url
                    let urlParts = url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);

                    // only allow normal users access to their own record
                    const currentUser = users.find(x => x.role === role);
                    if (id !== currentUser.id && role !== Role.Admin) return unauthorised();

                    const user = users.find(x => x.id === id);
                    return ok(user);
                }

                // get all users - admin only
                if (url.endsWith('/users') && opts.method === 'GET') {
                    if (role !== Role.Admin) return unauthorised();
                    return ok(users);
                }

                // pass through any requests not handled above
                realFetch(url, opts).then(response => resolve(response));

                // private helper functions

                function ok(body) {
                    resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(body)) })
                }

                function unauthorised() {
                    resolve({ status: 401, text: () => Promise.resolve(JSON.stringify({ message: 'Unauthorised' })) })
                }

                function error(message) {
                    resolve({ status: 400, text: () => Promise.resolve(JSON.stringify({ message })) })
                }
            }, 500);
        });
    }
}