const linksCtrl = {};
const pool = require('../database');

// REPORT PET
linksCtrl.renderReport1 = (req, res) => {
    res.render('links/reports/report1');
};
linksCtrl.sendReport2 = async (req, res) => {
    const  { code } = req.body;
    const consulta = await pool.query('SELECT * FROM dogs WHERE ID = ?', [code]);
    const dog = consulta[0] ;
    if (consulta[0] && consulta[0].STATE === 'extraviado') {
        return  res.render('links/reports/report2', {dog});
    }else{
        req.flash("message", "No hay ningún perro extraviado con este código, inténtalo nuevamente.");
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
    res.render('links/mascotas', {mascotas})
};


linksCtrl.renderAddPet = async (req, res) => {
    const { name, state, img } = req.body;
    const pathPhoto = '/img/photoDogs/' + img;
    const newDog = {
        ID_OWNER: req.user.ID,
        name,
        PHOTO: pathPhoto,
        STATE: state
    };
    await pool.query('INSERT INTO dogs set ?', newDog);
    req.flash('success', `Se añadió a ${name} correctamente ❤`)
    res.redirect('/cuenta/mascotas');
};

linksCtrl.renderDeletePet = async (req, res) => {
    const { id } = req.params;
    const name = await pool.query('Select NAME FROM dogs WHERE ID = ?', id);
    await pool.query('DELETE FROM dogs WHERE ID = ?', id);
    req.flash('success', `Se eliminó a ${name[0].NAME} correctamente 💔`)
    res.redirect('/cuenta/mascotas');
    
};

linksCtrl.renderUpdatePet = async (req, res) => {
    const { idDogEdit, nameDogEdit, state} = req.body;
    const ID = idDogEdit;
    const updateData = {
        ID_OWNER: req.user.ID,
        NAME: nameDogEdit,
        PHOTO: 'xd',
        STATE: state
    };
    await pool.query('UPDATE dogs set ? WHERE ID = ?', [updateData, ID]);
    req.flash('success', `Se actualizó el perfil de ${nameDogEdit} correctamente 👍`)
    res.redirect('/cuenta/mascotas');
};




module.exports = linksCtrl;