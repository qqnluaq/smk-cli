export function vueComponent( url, opt ) {
    var m = url.match( /[/]([^/]+)[.]js$/ )

    if ( !opt.template ) {
        var template = url.replace( 'js', 'html' )
        return fetch( template )
            .then( function ( resp ) {
                if ( !resp.ok ) throw Error( `can't load ${ template }` )
                return resp.text()
            } )
            .then( function ( html ) {
                opt.template = html
                console.log( 'component', m[ 1 ] )
                return Vue.component( m[ 1 ], opt )
            } )
    }
    else {
        return Promise.resolve( Vue.component( m[ 1 ], opt ) )
    }
}

export function importComponents( components ) {
    return Promise.all( components.map( function ( c ) {
        return import( c ).then( function ( module ) {
            return module.default
        } )
    } ) )
}