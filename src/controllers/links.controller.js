const linksCtrl = {};
const pool = require('../database');
const helpers = require('../lib/helpers');

// REPORT PET
linksCtrl.renderReport1 = (req, res) => {
    res.render('links/reports/report1');
};
linksCtrl.sendReport2 = async (req, res) => {
    const  { code } = req.body;
    const consulta = await pool.query('SELECT * FROM dogs WHERE ID = ?', [code]);
    const dog = consulta[0] ;
    if (consulta[0]) {
        return  res.render('links/reports/report2', {dog});
    }else{
        req.flash("message", "No hay ningún perro con este código, inténtalo nuevamente.");
        res.redirect('/report-1');
    }
};
linksCtrl.sendReport3 = async (req, res) => {
    const { name, code, photo} = req.body;
    const dog = {
        name,
        code,
        photo
    };
    return  res.render('links/reports/report3', {dog});
};
linksCtrl.sendReport4 = async (req, res) => {
    const { codeDog, nameDog, photoDog, namePerson, phonePerson, emailPerson} = req.body;
    const view = {
        nameDog,
        codeDog,
        photoDog,
        namePerson,
        phonePerson,
        emailPerson 
    }
    const informe = {
        ID_DOG: codeDog,
        NAME_DOG: nameDog,
        NAME: namePerson,
        PHONE: phonePerson,
        EMAIL: emailPerson
    };
    await pool.query('INSERT INTO mdr set ?', informe);
    return res.render('links/reports/report4', {view});
};


linksCtrl.updateProfile = async (req, res) => {
    const { name , id, surname, email, phone} = req.body;
    const updateUser = {
        name,
        surname,
        email,
        phone
    };
    await pool.query('UPDATE owners set ? WHERE ID = ?', [updateUser, id]);
    req.flash('success', `Se actualizó el perfil correctamente 👍`)
    res.redirect('/profile');
};

linksCtrl.renderMascotas = async (req, res) => {
    const mascotas = await pool.query('SELECT * FROM dogs WHERE ID_OWNER = ?', [req.user.ID]);
    //console.log(mascotas)
    res.render('links/mascotas', {mascotas})
};

linksCtrl.renderNotificaciones = async (req, res) => {
    const state =  'extraviado';

    const dataMiss = await pool.query("select mdr.ID AS numReport, mdr.`NAME` AS namePers, mdr.PHONE AS phonePers, mdr.EMAIL AS emailPers, mdr.DATE_FOUND AS dataFound,dogs.ID AS codeDog, dogs.`NAME` AS nameDog, dogs.PHOTO AS photoDog, dogs.DATE AS dateMiss from mdr join dogs on mdr.ID_DOG=dogs.ID join owners on owners.ID=dogs.ID_OWNER WHERE owners.ID = ? AND dogs.STATE = ?",
    [req.user.ID , state]);


    res.render('links/notify', {dataMiss})
};


linksCtrl.renderAddPet = async (req, res) => {
    const validator = await helpers.checkAddPet(req.user.ID);
    if (validator) {
        console.log('entro')
        const { name, state } = req.body;
        const  img  = '/img/photoDogs/' + req.file.filename;
        const date =  helpers.setDateDog(state);
        const newDog = {
            ID_OWNER: req.user.ID,
            name,
            PHOTO: img,
            STATE: state,
            DATE: date
        };
        await pool.query('INSERT INTO dogs set ?', newDog);
        req.flash('success', `Se añadió a ${name} correctamente ❤`)
        res.redirect('/cuenta/mascotas');
    }else{
        req.flash('message', `Haz alcanzado el límite de mascotas permitidas con tu Plan. Si quieres añadir más mascotas, actualiza tu plan`)
        res.redirect('/cuenta/mascotas');
    }
};

linksCtrl.renderDeletePet = async (req, res) => {
    const { id } = req.params;
    const name = await pool.query('Select NAME FROM dogs WHERE ID = ?', id);
    await pool.query('DELETE FROM dogs WHERE ID = ?', id);
    req.flash('success', `Se eliminó a ${name[0].NAME} correctamente 💔`)
    res.redirect('/cuenta/mascotas');
    
};

linksCtrl.renderGetPlanes = async (req, res) => {
    res.render('links/planes')
};

linksCtrl.setPlanToUser = async (req, res) => {
    console.log(req.params)
    let { plan , subplan } = req.params;
    //Transforma la primera letra a mayuscula XD
    function capitalize(word) {
        return word[0].toUpperCase() + word.slice(1);
    }
    plan = capitalize(plan);
    subplan = capitalize(subplan);
    await pool.query('UPDATE owners set PLAN = ?, SUBPLAN = ? WHERE ID = ?', [plan , subplan, req.user.ID]);
    req.flash('success', `Compraste el Plan ${plan} - ${subplan} ✔️`);
    res.redirect('/cuenta/gastos');
};

linksCtrl.renderMisGastos = async (req, res) => {
    const miPlan = await pool.query('SELECT PLAN, SUBPLAN from owners WHERE ID = ?', [req.user.ID]);;
    const { SUBPLAN } = miPlan[0];
    const subPlan = helpers.getPricePlan(miPlan[0]);
    const price = helpers.getPriceSubplan(SUBPLAN,subPlan);
    miPlan[0].priceSubplan = price;
    res.render('links/gastos', { miPlan });
};

linksCtrl.renderUpdatePet = async (req, res) => {
    const { idDogEdit, nameDogEdit, state} = req.body;
    const  img  = '/img/photoDogs/' + req.file.filename;
    const ID = idDogEdit;
    const date =  helpers.setDateDog(state);
    const updateData = {
        ID_OWNER: req.user.ID,
        NAME: nameDogEdit,
        PHOTO: img,
        STATE: state,
        DATE: date
    };
    await pool.query('UPDATE dogs set ? WHERE ID = ?', [updateData, ID]);
    req.flash('success', `Se actualizó el perfil de ${nameDogEdit} correctamente 👍`)
    res.redirect('/cuenta/mascotas');
};




module.exports = linksCtrl;