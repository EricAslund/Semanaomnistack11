const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');


describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('should be able to creae new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            /**.set('Authorization', '45sd46') */
            .send({
                name: "APAD2",
                email: "contato@apad.com.br",
                whatsapp: "32991441798",
                city: "juiz de Fora",
                uf: "MG"
            });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});


