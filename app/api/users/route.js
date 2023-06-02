// NEXT JS Support the following HTTP Methods:
//
// - GET
// - POST
// - PUT
// - DELETE
// - PATCH
// - HEAD
// - OPTIONS



export async function GET(request) {
    const users = [
        { id: 1, name: 'John' },
        { id: 2, name: 'Jane' },
        { id: 3, name: 'Joe' }
    ];

    return new Response(JSON.stringify(users));
}