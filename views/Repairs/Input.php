<?php
// File yang memuat sidebar, misalnya V_my_shop.php
$activePage = basename(__FILE__, ".php");
?>

<!doctype html>

<html lang="en" class="light-style layout-navbar-fixed layout-menu-fixed layout-compact" dir="ltr"
    data-theme="theme-default" data-assets-path="../../assets/" data-template="vertical-menu-template"
    data-style="light">

<head>
    <meta charset="utf-8" />
    <meta name="viewport"
        content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0" />

    <title>eCommerce Add Product - Apps | Materialize - Material Design HTML Admin Template</title>

    <meta name="description" content="" />

    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="../../assets/img/favicon/favicon.ico" />

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&ampdisplay=swap"
        rel="stylesheet" />

    <!-- Icons -->
    <link rel="stylesheet" href="../../assets/vendor/fonts/remixicon/remixicon.css" />
    <link rel="stylesheet" href="../../assets/vendor/fonts/flag-icons.css" />

    <!-- Menu waves for no-customizer fix -->
    <link rel="stylesheet" href="../../assets/vendor/libs/node-waves/node-waves.css" />

    <!-- Core CSS -->
    <link rel="stylesheet" href="../../assets/vendor/css/rtl/core.css" class="template-customizer-core-css" />
    <link rel="stylesheet" href="../../assets/vendor/css/rtl/theme-default.css" class="template-customizer-theme-css" />
    <link rel="stylesheet" href="../../assets/css/demo.css" />

    <!-- Vendors CSS -->
    <link rel="stylesheet" href="../../assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css" />
    <link rel="stylesheet" href="../../assets/vendor/libs/typeahead-js/typeahead.css" />
    <link rel="stylesheet" href="../../assets/vendor/libs/quill/typography.css" />
    <link rel="stylesheet" href="../../assets/vendor/libs/quill/katex.css" />
    <link rel="stylesheet" href="../../assets/vendor/libs/quill/editor.css" />
    <link rel="stylesheet" href="../../assets/vendor/libs/select2/select2.css" />
    <link rel="stylesheet" href="../../assets/vendor/libs/dropzone/dropzone.css" />
    <link rel="stylesheet" href="../../assets/vendor/libs/flatpickr/flatpickr.css" />
    <link rel="stylesheet" href="../../assets/vendor/libs/tagify/tagify.css" />

    <!-- Page CSS -->

    <!-- Helpers -->
    <script src="../../assets/vendor/js/helpers.js"></script>
    <!--! Template customizer & Theme config files MUST be included after core stylesheets and helpers.js in the <head> section -->
    <!--? Template customizer: To hide customizer set displayCustomizer value false in config.js.  -->
    <script src="../../assets/vendor/js/template-customizer.js"></script>
    <!--? Config:  Mandatory theme config file contain global vars & default theme options, Set your preferred theme option in this file.  -->
    <script src="../../assets/js/config.js"></script>
</head>

<body>
    <!-- Layout wrapper -->
    <div class="layout-wrapper layout-content-navbar">
        <div class="layout-container">
            <!-- Menu -->

            <?php
      include '../Template/V_Sidebar.php';
      ?>


            <!-- Layout container -->
            <div class="layout-page">

                <?php
        include '../Template/V_Navbar.php';
        ?>

                <!-- Content wrapper -->
                <div class="content-wrapper">
                    <!-- Content -->

                    <div class="container-xxl flex-grow-1 container-p-y">
                        <div class="app-ecommerce">
                            <!-- Add Product -->
                            <div
                                class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-6 row-gap-4">
                                <div class="d-flex flex-column justify-content-center">
                                    <h4 class="mb-1">New Repair</h4>
                                    <p class="mb-0">Invoice nanti disini</p>
                                </div>
                                <div class="d-flex align-content-center flex-wrap gap-4">
                                    <button class="btn btn-outline-secondary">Discard</button>
                                    <button class="btn btn-outline-primary">Save draft</button>
                                    <button type="submit" class="btn btn-primary">Add data</button>
                                </div>
                            </div>

                            <div class="row">
                                <!-- First column-->
                                <div class="col-12 col-lg-12">
                                    <!-- Product Information -->
                                    <div class="card mb-6">
                                        <div class="card-header">
                                            <h5 class="card-tile mb-0">Repair information</h5>
                                        </div>
                                        <div class="card-body">
                                            <div class="form-floating form-floating-outline mb-5">
                                                <input type="text" class="form-control" id="ecommerce-product-name"
                                                    placeholder="Product title" name="productTitle"
                                                    aria-label="Product title" />
                                                <label for="ecommerce-product-name">Kasir</label>
                                            </div>
                                            <div class="row mb-5 gx-5">
                                                <div
                                                    class="mb-5 col ecommerce-select2-dropdown d-flex justify-content-between align-items-center">
                                                    <div class="form-floating form-floating-outline w-100 me-4">
                                                        <select id="category-org" class="select2 form-select"
                                                            data-placeholder="Customer Name">
                                                            <option value=""></option>
                                                            <option value="Household">A 089127241929</option>
                                                            <option value="Management">B</option>
                                                            <option value="Electronics">C</option>
                                                            <option value="Office">D</option>
                                                            <option value="Automotive">E</option>
                                                        </select>
                                                        <label for="category-org">Customer</label>
                                                    </div>
                                                    <div>
                                                        <button class="btn btn-outline-primary btn-icon btn-lg"><i
                                                                class="ri-add-line"></i></button>
                                                    </div>
                                                </div>
                                                <div class="form-floating form-floating-outline">
                                                    <select id="select2Basic" class="select2 form-select"
                                                        data-placeholder="Teknisi" data-allow-clear="true">
                                                        <option value="size"></option>
                                                        <option value="color">Jaki</option>
                                                        <option value="color">Jaki</option>
                                                    </select>
                                                    <label for="select2Basic">Teknisi</label>
                                                </div>
                                                <div class="row mb-5 gx-5"></div>
                                                <div class="col">
                                                    <div class="form-floating form-floating-outline">
                                                        <input type="text" class="form-control"
                                                            id="ecommerce-product-sku" placeholder="00000"
                                                            name="productSku" aria-label="Product SKU" />
                                                        <label for="ecommerce-product-sku">Alamat?</label>
                                                    </div>
                                                </div>
                                                <div class="col">
                                                    <div class="form-floating form-floating-outline">
                                                        <input type="text" class="form-control"
                                                            id="ecommerce-product-barcode" placeholder="0123-4567"
                                                            name="productBarcode" aria-label="Product barcode" />
                                                        <label for="ecommerce-product-name">Kontak Wa</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- /Product Information -->
                                <!-- Variants -->
                                <div class="col-12 col-lg-6">
                                    <div class="card mb-6">
                                        <div class="card-header">
                                            <h5 class="card-title mb-0">Specification</h5>
                                        </div>
                                        <div class="card-body">
                                            <form class="form-repeater">
                                                <div data-repeater-list="group-a">
                                                    <div data-repeater-item>
                                                        <div class="row gx-5">
                                                            <div class="mb-6 col-sm-12">
                                                                <div class="form-floating form-floating-outline">
                                                                    <input type="text" id="form-repeater-1-2"
                                                                        class="form-control" placeholder="Enter size" />
                                                                    <label for="form-repeater-1-2">Kerusakan</label>
                                                                </div>
                                                            </div>
                                                            <div class="mb-6 col-sm-6">
                                                                <div class="form-floating form-floating-outline">
                                                                    <input type="text" id="form-repeater-1-2"
                                                                        class="form-control" placeholder="Enter size" />
                                                                    <label for="form-repeater-1-2">Merk HP</label>
                                                                </div>
                                                            </div>
                                                            <div class="mb-6 col-sm-6">
                                                                <div class="form-floating form-floating-outline">
                                                                    <input type="text" id="form-repeater-1-2"
                                                                        class="form-control" placeholder="Enter size" />
                                                                    <label for="form-repeater-1-2">Tipe HP</label>
                                                                </div>
                                                            </div>
                                                            <div class="mb-6 col-sm-12">
                                                                <div class="form-floating form-floating-outline">
                                                                    <input type="text" id="form-repeater-1-2"
                                                                        class="form-control" placeholder="Enter size" />
                                                                    <label for="form-repeater-1-2">IMEI 1</label>
                                                                </div>
                                                            </div>
                                                            <div class="mb-6 col-sm-12">
                                                                <div class="form-floating form-floating-outline">
                                                                    <input type="text" id="form-repeater-1-2"
                                                                        class="form-control" placeholder="Enter size" />
                                                                    <label for="form-repeater-1-2">IMEI 2 (optional)
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div class="mb-6 col-sm-12">
                                                                <div class="form-floating form-floating-outline">
                                                                    <input type="text" id="form-repeater-1-2"
                                                                        class="form-control" placeholder="Enter size" />
                                                                    <label for="form-repeater-1-2">Kelengkapan
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <!-- /Variants -->
                                </div>
                                <!-- Second column -->
                                <div class="col-12 col-lg-6">
                                    <!-- Pricing Card -->
                                    <div class="card mb-6">
                                        <div class="card-header">
                                            <h5 class="card-title mb-0">Pricing</h5>
                                        </div>
                                        <div class="card-body">
                                            <!-- Base Price -->
                                            <div class="mb-6 col-sm-7">
                                                <div class="form-floating form-floating-outline">
                                                    <select id="select2Basic" class="select2 form-select"
                                                        data-placeholder="Option" data-allow-clear="true">
                                                        <option value="size" selected>Voucher</option>
                                                    </select>
                                                    <label for="select2Basic">Option</label>
                                                </div>
                                            </div>

                                            <!-- Discounted Price -->
                                            <div class="mb-6 col-sm-5">
                                                <div class="form-floating form-floating-outline">
                                                    <select id="select2Basic" class="select2 form-select"
                                                        data-placeholder="Option" data-allow-clear="true">
                                                        <option value="size" selected>Cash</option>
                                                        <option value="color">Credit</option>
                                                    </select>
                                                    <label for="select2Basic">Option</label>
                                                </div>
                                            </div>
                                            <div class="mb-6 col-sm-6">
                                                <div class="form-floating form-floating-outline">
                                                    <input type="text" class="form-control" placeholder="Enter size" />
                                                    <label for="form-repeater-1-2">Sub Total</label>
                                                </div>
                                            </div>
                                            <div class="mb-6 col-sm-6">
                                                <div class="form-floating form-floating-outline">
                                                    <input type="text" id="form-repeater-1-2" class="form-control"
                                                        placeholder="Enter size" />
                                                    <label for="form-repeater-1-2">Total</label>
                                                </div>
                                            </div>
                                            <div class="mb-6 col-sm-12">
                                                <div class="form-floating form-floating-outline">
                                                    <input type="text" id="form-repeater-1-2" class="form-control"
                                                        placeholder="Enter size" />
                                                    <label for="form-repeater-1-2">Uang Muka</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- /Pricing Card -->
                            </div>
                            <!-- /Second column -->
                        </div>
                    </div>
                </div>
                <!-- / Content -->

                <!-- Footer -->
                <?php
          include '../Template/V_Footer.php';
          ?>
                <!-- / Footer -->

                <div class="content-backdrop fade"></div>
            </div>
            <!-- Content wrapper -->
        </div>
        <!-- / Layout page -->
    </div>

    <!-- Overlay -->
    <div class="layout-overlay layout-menu-toggle"></div>

    <!-- Drag Target Area To SlideIn Menu On Small Screens -->
    <div class="drag-target"></div>
    </div>
    <!-- / Layout wrapper -->

    <!-- Core JS -->
    <!-- build:js assets/vendor/js/core.js -->
    <script src="../../assets/vendor/libs/jquery/jquery.js"></script>
    <script src="../../assets/vendor/libs/popper/popper.js"></script>
    <script src="../../assets/vendor/js/bootstrap.js"></script>
    <script src="../../assets/vendor/libs/node-waves/node-waves.js"></script>
    <script src="../../assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js"></script>
    <script src="../../assets/vendor/libs/hammer/hammer.js"></script>
    <script src="../../assets/vendor/libs/i18n/i18n.js"></script>
    <script src="../../assets/vendor/libs/typeahead-js/typeahead.js"></script>
    <script src="../../assets/vendor/js/menu.js"></script>

    <!-- endbuild -->

    <!-- Vendors JS -->
    <script src="../../assets/vendor/libs/quill/katex.js"></script>
    <script src="../../assets/vendor/libs/quill/quill.js"></script>
    <script src="../../assets/vendor/libs/select2/select2.js"></script>
    <script src="../../assets/vendor/libs/dropzone/dropzone.js"></script>
    <script src="../../assets/vendor/libs/jquery-repeater/jquery-repeater.js"></script>
    <script src="../../assets/vendor/libs/flatpickr/flatpickr.js"></script>
    <script src="../../assets/vendor/libs/tagify/tagify.js"></script>

    <!-- Main JS -->
    <script src="../../assets/js/main.js"></script>

    <!-- Page JS -->
    <script src="../../assets/js/app-ecommerce-product-add.js"></script>
</body>

</html>