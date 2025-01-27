class ReportController {
    constructor() {
        this.bindEvents();
    }

    bindEvents() {
        $(document).on('submit', '#reportForm', this.handleReportSubmit.bind(this));
        $(document).on('submit', '#editReportForm', this.handleEditReportSubmit.bind(this));
        $(document).on('blur', '#telefono', this.formatPhoneInput.bind(this));
        $(document).on('click', '.viewDetails', this.handleViewDetails.bind(this));
        $(document).on('click', '.editReport', this.handleEditReport.bind(this));
        $(document).on('click', '.deleteReport', this.handleDeleteReport.bind(this));
    }

    formatPhoneInput(event) {
        const input = event.target;
        const phones = input.value.split(',').map(phone => phone.trim());
        input.value = phones.filter(phone => phone !== '').join(', ');
    }

    async handleReportSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const reportData = Object.fromEntries(formData.entries());

        try {
            const response = await reportModel.addReport(reportData);
            if (response.reportId) {
                alert('Reporte creado exitosamente');
                form.reset();
            }
        } catch (error) {
            alert('Error al crear el reporte');
            console.error(error);
        }
    }

    async handleEditReportSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const reportData = Object.fromEntries(formData.entries());

        try {
            const response = await reportModel.updateReport(reportData);
            if (response.message) {
                alert('Reporte actualizado exitosamente');
                form.reset();
            }
        } catch (error) {
            alert('Error al actualizar el reporte');
            console.error(error);
        }
    }

    async handleViewDetails(event) {
        const reportId = $(event.target).data('id');
        try {
            const report = await reportModel.getReportById(reportId);
            // Mostrar detalles del reporte en un modal o en otra vista
            console.log(report);
        } catch (error) {
            alert('Error al obtener los detalles del reporte');
            console.error(error);
        }
    }

    async handleEditReport(event) {
        const reportId = $(event.target).data('id');
        try {
            const report = await reportModel.getReportById(reportId);
            // Cargar los datos del reporte en el formulario para editar
            console.log(report);
        } catch (error) {
            alert('Error al obtener los detalles del reporte');
            console.error(error);
        }
    }

    async handleDeleteReport(event) {
        const reportId = $(event.target).data('id');
        if (confirm('¿Está seguro de que desea eliminar este reporte?')) {
            try {
                await reportModel.deleteReport(reportId);
                alert('Reporte eliminado exitosamente');
                // Actualizar la lista de reportes
                MainView.handleShowAllReports();
            } catch (error) {
                alert('Error al eliminar el reporte');
                console.error(error);
            }
        }
    }

    async handleShowAllReports() {
        try {
            const reports = await reportModel.getAllReports();
            // Render the reports in the UI
            console.log(reports);
        } catch (error) {
            console.error('Error fetching all reports:', error);
        }
    }
}

// Inicializar el controlador
$(document).ready(() => {
    new ReportController();
});