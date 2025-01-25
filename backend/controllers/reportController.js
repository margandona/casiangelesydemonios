const { db } = require('../database/firebaseconfig');

exports.createReport = async (req, res) => {
  const {
    nombre, apellido, nickNames, nacionalidad, imagen, CI_or_passport, rut, genero, telefono, email,
    paga_puntual, HabitacionLimpiaYOrdenada, TranquilaYOrdenada, ConsumeMarihuana, ConsumeOtrasDrogas,
    ConsumoAlcoholExesivo, AmenazaPolicia, amenazaExtranjeros, Destrozos, GritaEInsultaArrendador, Robos,
    BuenasRelacionesPasajeros, AvisaConAntisipaciínRetirada, Independiante, privado, llavero, MeteGenteAgena,
    comentario
  } = req.body;
  const creadoPor = req.user.uid;

  try {
    const reportData = {
      nombre, apellido, nickNames, nacionalidad, imagen, CI_or_passport, rut, genero, telefono, email,
      paga_puntual, HabitacionLimpiaYOrdenada, TranquilaYOrdenada, ConsumeMarihuana, ConsumeOtrasDrogas,
      ConsumoAlcoholExesivo, AmenazaPolicia, amenazaExtranjeros, Destrozos, GritaEInsultaArrendador, Robos,
      BuenasRelacionesPasajeros, AvisaConAntisipaciínRetirada, Independiante, privado, llavero, MeteGenteAgena,
      comentario, creadoPor, fechaCreacion: new Date().toISOString()
    };

    const docRef = await db.collection('reports').add(reportData);
    res.status(201).json({ message: 'Report created successfully.', reportId: docRef.id });
  } catch (err) {
    console.error('Error creating report:', err.message);
    res.status(500).json({ error: `Error creating report: ${err.message}` });
  }
};

exports.getReport = async (req, res) => {
  const { id } = req.params;

  try {
    const doc = await db.collection('reports').doc(id).get();
    if (!doc.exists) {
      return res.status(404).json({ error: 'Report not found' });
    }
    res.json({ id: doc.id, ...doc.data() });
  } catch (err) {
    console.error('Error retrieving report:', err.message);
    res.status(500).json({ error: `Error retrieving report: ${err.message}` });
  }
};

exports.getAllReports = async (req, res) => {
  try {
    const snapshot = await db.collection('reports').get();
    const reports = [];
    snapshot.forEach(doc => {
      reports.push({ id: doc.id, ...doc.data() });
    });
    res.json(reports);
  } catch (err) {
    console.error('Error retrieving reports:', err.message);
    res.status(500).json({ error: `Error retrieving reports: ${err.message}` });
  }
};

exports.updateReport = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    await db.collection('reports').doc(id).update(updateData);
    res.json({ message: 'Report updated successfully.' });
  } catch (err) {
    console.error('Error updating report:', err.message);
    res.status(500).json({ error: `Error updating report: ${err.message}` });
  }
};

exports.deleteReport = async (req, res) => {
  const { id } = req.params;

  try {
    await db.collection('reports').doc(id).delete();
    res.json({ message: 'Report deleted successfully.' });
  } catch (err) {
    console.error('Error deleting report:', err.message);
    res.status(500).json({ error: `Error deleting report: ${err.message}` });
  }
};

exports.getReportByCIOrPassport = async (req, res) => {
  const CI_or_passport = req.params.CI_or_passport;
  try {
    const report = await getReportByCIOrPassport(CI_or_passport);
    res.json(report);
  } catch (err) {
    console.error('Error retrieving report by CI or passport:', err.message);
    res.status(500).json({ error: `Error retrieving report by CI or passport: ${err.message}` });
  }
};

exports.searchReports = async (req, res) => {
  const { query } = req.query;
  try {
    const queries = [
      db.collection('reports').where('nombre', '==', query).get(),
      db.collection('reports').where('nickNames', '==', query).get(),
      db.collection('reports').where('telefono', '==', query).get(),
      db.collection('reports').where('email', '==', query).get()
    ];

    const snapshots = await Promise.all(queries);
    const reports = [];
    snapshots.forEach(snapshot => {
      snapshot.forEach(doc => {
        reports.push({ id: doc.id, ...doc.data() });
      });
    });

    if (reports.length === 0) {
      return res.status(404).json({ message: 'No matching reports found' });
    }
    res.json(reports);
  } catch (err) {
    console.error('Error searching reports:', err.message);
    res.status(500).json({ error: `Error searching reports: ${err.message}` });
  }
};
