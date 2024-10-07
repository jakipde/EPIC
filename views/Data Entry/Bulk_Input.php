<!-- Bulk Input Modal -->
<div class="modal fade" id="bulkInputModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Bulk Input</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <ul class="nav nav-tabs" id="bulkInputTabs" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="device-bulk-tab" data-bs-toggle="tab" data-bs-target="#device-bulk" type="button" role="tab" aria-controls="device-bulk" aria-selected="true">Device</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="accessories-bulk-tab" data-bs-toggle="tab" data-bs-target="#accessories-bulk" type="button" role="tab" aria-controls="accessories-bulk" aria-selected="false">Accessories</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="spare-parts-bulk-tab" data-bs-toggle="tab" data-bs-target="#spare-parts-bulk" type="button" role="tab" aria-controls="spare-parts-bulk" aria-selected="false">Spare Parts</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="tools-bulk-tab" data-bs-toggle="tab" data-bs-target="#tools-bulk" type="button" role="tab" aria-controls="tools-bulk" aria-selected="false">Tools</button>
                    </li>
                </ul>
                <div class="tab-content" id="bulkInputTabContent">
                    <div class="tab-pane fade show active" id="device-bulk" role="tabpanel" aria-labelledby="device-bulk-tab">
                        <form id="deviceBulkInputForm" class="mt-3">
                            <div class="mb-3">
                                <label for="deviceBulkFile" class="form-label">Upload Device CSV</label>
                                <input type="file" class="form-control" id="deviceBulkFile" name="deviceBulkFile" accept=".csv">
                            </div>
                        </form>
                    </div>
                    <div class="tab-pane fade" id="accessories-bulk" role="tabpanel" aria-labelledby="accessories-bulk-tab">
                        <form id="accessoriesBulkInputForm" class="mt-3">
                            <div class="mb-3">
                                <label for="accessoriesBulkFile" class="form-label">Upload Accessories CSV</label>
                                <input type="file" class="form-control" id="accessoriesBulkFile" name="accessoriesBulkFile" accept=".csv">
                            </div>
                        </form>
                    </div>
                    <div class="tab-pane fade" id="spare-parts-bulk" role="tabpanel" aria-labelledby="spare-parts-bulk-tab">
                        <form id="sparePartsBulkInputForm" class="mt-3">
                            <div class="mb-3">
                                <label for="sparePartsBulkFile" class="form-label">Upload Spare Parts CSV</label>
                                <input type="file" class="form-control" id="sparePartsBulkFile" name="sparePartsBulkFile" accept=".csv">
                            </div>
                        </form>
                    </div>
                    <div class="tab-pane fade" id="tools-bulk" role="tabpanel" aria-labelledby="tools-bulk-tab">
                        <form id="toolsBulkInputForm" class="mt-3">
                            <div class="mb-3">
                                <label for="toolsBulkFile" class="form-label">Upload Tools CSV</label>
                                <input type="file" class="form-control" id="toolsBulkFile" name="toolsBulkFile" accept=".csv">
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" onclick="submitBulkInputForm()">Upload</button>
            </div>
        </div>
    </div>
</div>

<script>
function submitBulkInputForm() {
    const activeTab = document.querySelector('#bulkInputTabContent .tab-pane.active');
    const activeForm = activeTab.querySelector('form');
    
    if (activeForm) {
        console.log('Submitting bulk form:', activeForm.id);
        const formData = new FormData(activeForm);
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }
        // Add your bulk form submission logic here
        // For example, you can use AJAX to send the form data to the server
        // $.ajax({
        //     url: 'process_bulk_input.php',
        //     type: 'POST',
        //     data: formData,
        //     processData: false,
        //     contentType: false,
        //     success: function(response) {
        //         console.log('Bulk form submitted successfully:', response);
        //         // Handle the response from the server
        //     },
        //     error: function(xhr, status, error) {
        //         console.error('Error submitting bulk form:', error);
        //         // Handle any errors that occurred during submission
        //     }
        // });
    }
}
</script>