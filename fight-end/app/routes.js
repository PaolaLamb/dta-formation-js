export function routes($routeProvider) {
    $routeProvider
    
    .when('/', {
        template: '<dta-team-getter></dta-team-getter>'
    })

    .when('/equipe/:id', {
        template: '<dta-team></dta-team>'
    })

    .when('/adversaire', {
        template: '<dta-opponent></dta-opponent>'
    })

    .when('/baston', {
        template: '<dta-arena></dta-arena>'
    })

    .otherwise({
        redirectTo: '/'
    })
}