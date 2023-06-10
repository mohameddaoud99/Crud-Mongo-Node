const express = require('express');
const tareas = require('../model/tareas');
const router = express.Router();

const model = require('../model/tareas')();

router.get('/', (req, res) => {
    model.find({}, (err, tareas) => {
        if (err) { console.log(err); }

        res.render('index', {
            titulo: 'CRUD MongoDB',
            tareas: tareas
        });
    });
});


router.post('/modifier/:id', async (req, res) => {
    try {
        var tache = await tareas.findById({ _id: req.params.id }).exec();
        tache.titulo = req.body.titulo;
        console.log(tache.descripcion);
        tache.descripcion = req.body.descripcion;
       

        var result = await tache.save();
        res.redirect('/');
    }
    catch (error) {
        res.status(400).send("impossible de modifier la base de données");
    }
});


router.post('/add', (req, res) => {
    let body = req.body;
    body.status = false;

    model.create(body, (err, tareas) => {
        if (err) { console.log(err); }
        res.redirect('/');
    });
});

/*router.get('/hecho/:id', (req, res) => {
    let id = req.params.id;
    model.findById(id, (err, tareas) => {
        if (err) { console.log(err); }
        tareas.status = !tareas.status;
        console.log(tareas);
        tareas.save()
            .then(() => res.redirect('/'))
    });
}); */


router.get('/edit/:id',  (req, res) => {
    try {
        let result =  model.findById({ _id: req.params.id }).exec();
        res.render('modifier', { result: result, id: req.params.id });
        console.log("aaaaaaaaaaa")
    }
    catch (error) {
        res.status(500).send(error);
    }
});


router.get('/eliminar/:id', (req, res) => {
    let id = req.params.id;
    model.remove({ _id: id }, (err, tareas) => {
        if (err) { console.log(err); }
        res.redirect('/');
    });
});

module.exports = router;