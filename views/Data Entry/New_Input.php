<!-- New Input Modal -->
<div class="modal fade" id="newInputModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">New Input</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <ul class="nav nav-tabs" id="newInputTabs" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="repair-tab" data-bs-toggle="tab" data-bs-target="#repair" type="button" role="tab" aria-controls="repair" aria-selected="true">Repair</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="device-tab" data-bs-toggle="tab" data-bs-target="#device" type="button" role="tab" aria-controls="device" aria-selected="false">Device</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="accessories-tab" data-bs-toggle="tab" data-bs-target="#accessories" type="button" role="tab" aria-controls="accessories" aria-selected="false">Accessories</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="spare-parts-tab" data-bs-toggle="tab" data-bs-target="#spare-parts" type="button" role="tab" aria-controls="spare-parts" aria-selected="false">Spare Parts</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="tools-tab" data-bs-toggle="tab" data-bs-target="#tools" type="button" role="tab" aria-controls="tools" aria-selected="false">Tools</button>
                    </li>
                </ul>
                <div class="tab-content" id="newInputTabContent">
                    <div class="tab-pane fade show active" id="repair" role="tabpanel" aria-labelledby="repair-tab">
                        <form id="repairInputForm" class="mt-3">
                            <div class="mb-3">
                                <label for="repairType" class="form-label">Repair Type</label>
                                <input type="text" class="form-control" id="repairType" name="repairType">
                            </div>
                            <!-- Add more fields as needed -->
                        </form>
                    </div>
                    <div class="tab-pane fade" id="device" role="tabpanel" aria-labelledby="device-tab">
                        <form id="deviceInputForm" class="mt-3">
                            <div class="mb-3">
                                <label for="deviceName" class="form-label">Device Name</label>
                                <input type="text" class="form-control" id="deviceName" name="deviceName">
                            </div>
                            <!-- Add more fields as needed -->
                        </form>
                    </div>
                    <div class="tab-pane fade" id="accessories" role="tabpanel" aria-labelledby="accessories-tab">
                        <form id="accessoriesInputForm" class="mt-3">
                            <div class="mb-3">
                                <label for="accessoryName" class="form-label">Accessory Name</label>
                                <input type="text" class="form-control" id="accessoryName" name="accessoryName">
                            </div>
                            <!-- Add more fields as needed -->
                        </form>
                    </div>
                    <div class="tab-pane fade" id="spare-parts" role="tabpanel" aria-labelledby="spare-parts-tab">
                        <form id="sparePartsInputForm" class="mt-3">
                            <div class="mb-3">
                                <label for="partName" class="form-label">Part Name</label>
                                <input type="text" class="form-control" id="partName" name="partName">
                            </div>
                            <!-- Add more fields as needed -->
                        </form>
                    </div>
                    <div class="tab-pane fade" id="tools" role="tabpanel" aria-labelledby="tools-tab">
                        <form id="toolsInputForm" class="mt-3">
                            <div class="mb-3">
                                <label for="toolName" class="form-label">Tool Name</label>
                                <input type="text" class="form-control" id="toolName" name="toolName">
                            </div>
                            <!-- Add more fields as needed -->
                        </form>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" onclick="submitNewInputForm()">Submit</button>
            </div>
        </div>
    </div>
</div>

<script>
function submitNewInputForm() {
    const activeTab = document.querySelector('#newInputTabContent .tab-pane.active');
    const activeForm = activeTab.querySelector('form');
    
    if (activeForm) {
        console.log('Submitting form:', activeForm.id);
        const formData = new FormData(activeForm);
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }
        // Add your form submission logic here
        // For example, you can use AJAX to send the form data to the server
        // $.ajax({
        //     url: 'process_new_input.php',
        //     type: 'POST',
        //     data: formData,
        //     processData: false,
        //     contentType: false,
        //     success: function(response) {
        //         console.log('Form submitted successfully:', response);
        //         // Handle the response from the server
        //     },
        //     error: function(xhr, status, error) {
        //         console.error('Error submitting form:', error);
        //         // Handle any errors that occurred during submission
        //     }
        // });
    }
}
</script>