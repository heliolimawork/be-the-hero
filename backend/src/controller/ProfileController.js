const connection = require('../database/connection');

async function index(request, response) {
    
    const logged_ong_id = request.headers.authorization;
    const incidents = await connection('incidents').select('*').where('ong_id', logged_ong_id);
    
    return response.json(incidents);
}

module.exports = {index};