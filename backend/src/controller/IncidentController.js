const connection = require('../database/connection')
module.exports = {
    async index (request, response) {
        const {page = 1} = request.query;
        const [count] = await connection('incidents').count();

        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((page - 1) * 5)
        .select([ 'incidents.*'
        , 'ongs.name'
        , 'ongs.email'
        , 'ongs.whatsapp'
        , 'ongs.city'
        , 'ongs.uf'] );

        response.header('X-Total-Count', count['count(*)']);
        return response.json(incidents);
    },
    async create (request, response) {
        const {title, description, value} = body = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        return response.json({id});
    },
    async delete (request, response) {
        const {id} = request.params;
        const logged_ong_id = request.headers.authorization;
        console.log('Logged ong id:', logged_ong_id);

        const incident = await connection('incidents')
        .select('*')
        .where('id', id)
        .first();

        if(incident == null){
            return response.status(404).json({error:'incident not found'});
        }

        if(incident.ong_id != logged_ong_id){
            return response.status(401).json({error:'operation not permitted'});
        }

        await connection('incidents').delete().where('id',id);
        return response.status(204).send();

    }

}