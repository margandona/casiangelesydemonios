const reportModel = {
    formatPhoneNumbers: function(phones) {
        return phones.split(',').map(phone => phone.trim()).filter(phone => phone !== '');
    },

    addReport: async function(reportData) {
        if (reportData.telefono) {
            reportData.telefono = this.formatPhoneNumbers(reportData.telefono);
        }
        
        try {
            const response = await fetch('https://casiangelesydemonios.web.app/api/reports', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(reportData)
            });
            return await response.json();
        } catch (error) {
            console.error('Error al crear reporte:', error);
            throw error;
        }
    },

    searchReports: async function(query) {
        try {
            const response = await fetch(`https://casiangelesydemonios.web.app/api/reports/search?query=${encodeURIComponent(query)}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Error al buscar reportes:', error);
            throw error;
        }
    },

    getAllReports: async function() {
        try {
            const response = await fetch('https://casiangelesydemonios.web.app/api/reports', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Error al obtener reportes:', error);
            throw error;
        }
    },

    getReportById: async function(reportId) {
        try {
            const response = await fetch(`https://casiangelesydemonios.web.app/api/reports/${reportId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            return await response.json();
        } catch (error) {
            console.error('Error al obtener el reporte:', error);
            throw error;
        }
    },

    updateReport: async function(reportData) {
        const reportId = reportData.id;
        delete reportData.id;
        try {
            const response = await fetch(`https://casiangelesydemonios.web.app/api/reports/${reportId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(reportData)
            });
            return await response.json();
        } catch (error) {
            console.error('Error al actualizar el reporte:', error);
            throw error;
        }
    },

    deleteReport: async function(reportId) {
        try {
            const response = await fetch(`https://casiangelesydemonios.web.app/api/reports/${reportId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            return await response.json();
        } catch (error) {
            console.error('Error al eliminar el reporte:', error);
            throw error;
        }
    }
};