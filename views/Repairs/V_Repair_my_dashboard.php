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

    <title>Dashboard - eCommerce | Materialize - Material Design HTML Admin Template</title>

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
    <link rel="stylesheet" href="../../assets/vendor/libs/datatables-bs5/datatables.bootstrap5.css" />
    <link rel="stylesheet" href="../../assets/vendor/libs/datatables-responsive-bs5/responsive.bootstrap5.css" />
    <link rel="stylesheet" href="../../assets/vendor/libs/apex-charts/apex-charts.css" />
    <link rel="stylesheet" href="../../assets/vendor/libs/swiper/swiper.css" />

    <!-- Page CSS -->
    <link rel="stylesheet" href="../../assets/vendor/css/pages/cards-statistics.css" />

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
                        <div class="row g-6 mb-6">
                            <!-- Sales Overview-->
                            <div class="col-lg-6">
                                <div class="card h-100">
                                    <div class="card-header">
                                        <div class="d-flex justify-content-between">
                                            <h5 class="mb-1">Sales Overview</h5>
                                            <div class="dropdown">
                                                <button
                                                    class="btn btn-text-secondary rounded-pill text-muted border-0 p-1"
                                                    type="button" id="salesOverview" data-bs-toggle="dropdown"
                                                    aria-haspopup="true" aria-expanded="false">
                                                    <i class="ri-more-2-line ri-20px"></i>
                                                </button>
                                                <div class="dropdown-menu dropdown-menu-end"
                                                    aria-labelledby="salesOverview">
                                                    <a class="dropdown-item" href="javascript:void(0);">Refresh</a>
                                                    <a class="dropdown-item" href="javascript:void(0);">Share</a>
                                                    <a class="dropdown-item" href="javascript:void(0);">Update</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="d-flex align-items-center card-subtitle">
                                            <div class="me-2">Total 42.5k Sales</div>
                                            <div class="d-flex align-items-center text-success">
                                                <p class="mb-0 fw-medium">+18%</p>
                                                <i class="ri-arrow-up-s-line ri-20px"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-body d-flex justify-content-between flex-wrap gap-4">
                                        <div class="d-flex align-items-center gap-3">
                                            <div class="avatar">
                                                <div class="avatar-initial bg-label-primary rounded">
                                                    <i class="ri-user-star-line ri-24px"></i>
                                                </div>
                                            </div>
                                            <div class="card-info">
                                                <h5 class="mb-0">8,458</h5>
                                                <p class="mb-0">New Customers</p>
                                            </div>
                                        </div>
                                        <div class="d-flex align-items-center gap-3">
                                            <div class="avatar">
                                                <div class="avatar-initial bg-label-warning rounded">
                                                    <i class="ri-pie-chart-2-line ri-24px"></i>
                                                </div>
                                            </div>
                                            <div class="card-info">
                                                <h5 class="mb-0">$28.5k</h5>
                                                <p class="mb-0">Total Profit</p>
                                            </div>
                                        </div>
                                        <div class="d-flex align-items-center gap-3">
                                            <div class="avatar">
                                                <div class="avatar-initial bg-label-info rounded">
                                                    <i class="ri-arrow-left-right-line ri-24px"></i>
                                                </div>
                                            </div>
                                            <div class="card-info">
                                                <h5 class="mb-0">2,450k</h5>
                                                <p class="mb-0">New Transactions</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!--/ Sales Overview-->

                            <!-- Ratings -->
                            <div class="col-lg-3 col-sm-6">
                                <div class="card h-100">
                                    <div class="row">
                                        <div class="col-6">
                                            <div class="card-body">
                                                <div class="card-info mb-5">
                                                    <h6 class="mb-2 text-nowrap">Ratings</h6>
                                                    <div class="badge bg-label-primary rounded-pill lh-xs">Year of 2021
                                                    </div>
                                                </div>
                                                <div class="d-flex align-items-center">
                                                    <h4 class="mb-0 me-2">8.14k</h4>
                                                    <p class="mb-0 text-success">+15.6%</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-6 text-end d-flex align-items-end">
                                            <div class="card-body pb-0 pt-7">
                                                <img src="../../assets/img/illustrations/card-ratings-illustration.png"
                                                    alt="Ratings" class="img-fluid" width="95" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!--/ Ratings -->

                            <!-- Sessions -->
                            <div class="col-lg-3 col-sm-6">
                                <div class="card h-100">
                                    <div class="row">
                                        <div class="col-6">
                                            <div class="card-body">
                                                <div class="card-info mb-5">
                                                    <h6 class="mb-2 text-nowrap">Sessions</h6>
                                                    <div class="badge bg-label-success rounded-pill lh-xs">Last Month
                                                    </div>
                                                </div>
                                                <div class="d-flex align-items-center">
                                                    <h4 class="mb-0 me-2">12.2k</h4>
                                                    <p class="mb-0 text-danger">-25.5%</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-6 text-end d-flex align-items-end">
                                            <div class="card-body pb-0 pt-7">
                                                <img src="../../assets/img/illustrations/card-session-illustration.png"
                                                    alt="Ratings" class="img-fluid" width="81" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!--/ Sessions -->

                            <!-- Weekly Sales with bg-->
                            <div class="col-lg-6">
                                <div class="swiper-container swiper-container-horizontal swiper text-bg-primary h-100"
                                    id="swiper-weekly-sales-with-bg">
                                    <div class="swiper-wrapper">
                                        <div class="swiper-slide pb-5">
                                            <div class="row">
                                                <div class="col-12">
                                                    <h5 class="text-white mb-0">Weekly Sales</h5>
                                                    <div class="d-flex align-items-center gap-2">
                                                        <div>Total $23.5k Earning</div>
                                                        <div class="d-flex align-items-center text-success">
                                                            <p class="mb-0 fw-medium">+62%</p>
                                                            <i class="ri-arrow-up-s-line ri-20px mt-n1"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-7 col-md-9 col-12 order-2 order-md-1">
                                                    <h6 class="text-white mt-0 mt-md-4 mb-4 py-1">Mobiles & Computers
                                                    </h6>
                                                    <div class="row g-4">
                                                        <div class="col-sm-6">
                                                            <ul class="list-unstyled mb-0">
                                                                <li class="d-flex mb-5 align-items-center">
                                                                    <p
                                                                        class="mb-0 me-3 weekly-sales-text-bg-primary fw-medium">
                                                                        24</p>
                                                                    <p class="mb-0 text-truncate">Mobiles</p>
                                                                </li>
                                                                <li class="d-flex align-items-center">
                                                                    <p
                                                                        class="mb-0 me-3 weekly-sales-text-bg-primary fw-medium">
                                                                        12</p>
                                                                    <p class="mb-0 text-truncate">Tablets</p>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div class="col-sm-6">
                                                            <ul class="list-unstyled mb-0">
                                                                <li class="d-flex mb-5 align-items-center">
                                                                    <p
                                                                        class="mb-0 me-3 weekly-sales-text-bg-primary fw-medium">
                                                                        50</p>
                                                                    <p class="mb-0 text-truncate">Accessories</p>
                                                                </li>
                                                                <li class="d-flex align-items-center">
                                                                    <p
                                                                        class="mb-0 me-3 weekly-sales-text-bg-primary fw-medium">
                                                                        38</p>
                                                                    <p class="mb-0 text-truncate">Computers</p>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    class="col-lg-5 col-md-3 col-12 order-1 order-md-2 my-2 my-md-0 text-center">
                                                    <img src="../../assets/img/products/card-weekly-sales-phone.png"
                                                        alt="weekly sales" width="230" class="weekly-sales-img" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="swiper-slide pb-5">
                                            <div class="row">
                                                <div class="col-12">
                                                    <h5 class="text-white mb-0">Weekly Sales</h5>
                                                    <div class="d-flex align-items-center gap-2">
                                                        <div>Total $23.5k Earning</div>
                                                        <div class="d-flex align-items-center text-success">
                                                            <p class="mb-0 fw-medium">+62%</p>
                                                            <i class="ri-arrow-up-s-line ri-20px mt-n1"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-7 col-md-9 col-12 order-2 order-md-1">
                                                    <h6 class="text-white mt-0 mt-md-4 mb-4 py-1">Appliances &
                                                        Electronics</h6>
                                                    <div class="row g-4">
                                                        <div class="col-sm-6">
                                                            <ul class="list-unstyled mb-0">
                                                                <li class="d-flex mb-5 align-items-center">
                                                                    <p
                                                                        class="mb-0 me-3 weekly-sales-text-bg-primary fw-medium">
                                                                        16</p>
                                                                    <p class="mb-0 text-truncate">TV's</p>
                                                                </li>
                                                                <li class="d-flex align-items-center">
                                                                    <p
                                                                        class="mb-0 me-3 weekly-sales-text-bg-primary fw-medium">
                                                                        40</p>
                                                                    <p class="mb-0 text-truncate">Speakers</p>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div class="col-sm-6">
                                                            <ul class="list-unstyled mb-0">
                                                                <li class="d-flex mb-5 align-items-center">
                                                                    <p
                                                                        class="mb-0 me-3 weekly-sales-text-bg-primary fw-medium">
                                                                        9</p>
                                                                    <p class="mb-0 text-truncate">Cameras</p>
                                                                </li>
                                                                <li class="d-flex align-items-center">
                                                                    <p
                                                                        class="mb-0 me-3 weekly-sales-text-bg-primary fw-medium">
                                                                        18</p>
                                                                    <p class="mb-0 text-truncate">Consoles</p>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    class="col-lg-5 col-md-3 col-12 order-1 order-md-2 my-2 my-md-0 text-center">
                                                    <img src="../../assets/img/products/card-weekly-sales-controller.png"
                                                        alt="weekly sales" width="230" class="weekly-sales-img" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="swiper-slide pb-5">
                                            <div class="row">
                                                <div class="col-12">
                                                    <h5 class="text-white mb-0">Weekly Sales</h5>
                                                    <div class="d-flex align-items-center gap-2">
                                                        <div>Total $23.5k Earning</div>
                                                        <div class="d-flex align-items-center text-success">
                                                            <p class="mb-0 fw-medium">+62%</p>
                                                            <i class="ri-arrow-up-s-line ri-20px mt-n1"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-7 col-md-9 col-12 order-2 order-md-1">
                                                    <h6 class="text-white mt-0 mt-md-4 mb-4 py-1">Fashion</h6>
                                                    <div class="row g-4">
                                                        <div class="col-sm-6">
                                                            <ul class="list-unstyled mb-0">
                                                                <li class="d-flex mb-5 align-items-center">
                                                                    <p
                                                                        class="mb-0 me-3 weekly-sales-text-bg-primary fw-medium">
                                                                        16</p>
                                                                    <p class="mb-0 text-truncate">TV's</p>
                                                                </li>
                                                                <li class="d-flex align-items-center">
                                                                    <p
                                                                        class="mb-0 me-3 weekly-sales-text-bg-primary fw-medium">
                                                                        40</p>
                                                                    <p class="mb-0 text-truncate">Speakers</p>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div class="col-sm-6">
                                                            <ul class="list-unstyled mb-0">
                                                                <li class="d-flex mb-5 align-items-center">
                                                                    <p
                                                                        class="mb-0 me-3 weekly-sales-text-bg-primary fw-medium">
                                                                        43</p>
                                                                    <p class="mb-0 text-truncate">Shoes</p>
                                                                </li>
                                                                <li class="d-flex align-items-center">
                                                                    <p
                                                                        class="mb-0 me-3 weekly-sales-text-bg-primary fw-medium">
                                                                        7</p>
                                                                    <p class="mb-0 text-truncate">Sun Glasses</p>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    class="col-lg-5 col-md-3 col-12 order-1 order-md-2 my-2 my-md-0 text-center">
                                                    <img src="../../assets/img/products/card-weekly-sales-watch.png"
                                                        alt="weekly sales" width="230" class="weekly-sales-img" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="swiper-pagination"></div>
                                </div>
                            </div>
                            <!--/ Weekly Sales with bg-->

                            <!-- Total Visits -->
                            <div class="col-lg-3 col-sm-6">
                                <div class="card">
                                    <div class="card-header">
                                        <div class="d-flex justify-content-between flex-wrap gap-2">
                                            <p class="d-block mb-0 text-body">Total Visits</p>
                                            <div class="d-flex align-items-center text-success">
                                                <p class="mb-0">+18.4%</p>
                                                <i class="ri-arrow-up-s-line ri-20px"></i>
                                            </div>
                                        </div>
                                        <h4 class="mb-0">$42.5k</h4>
                                    </div>
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-4">
                                                <div class="d-flex gap-2 align-items-center mb-2">
                                                    <div class="avatar avatar-xs flex-shrink-0">
                                                        <div class="avatar-initial rounded bg-label-warning">
                                                            <i class="ri-pie-chart-2-line ri-16px"></i>
                                                        </div>
                                                    </div>
                                                    <p class="mb-0">Mobile</p>
                                                </div>
                                                <h4 class="mb-2">23.5%</h4>
                                                <p class="mb-0">2,890</p>
                                            </div>
                                            <div class="col-4">
                                                <div class="divider divider-vertical">
                                                    <div class="divider-text">
                                                        <span class="badge-divider-bg">VS</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-4 text-end">
                                                <div class="d-flex gap-2 justify-content-end align-items-center mb-2">
                                                    <p class="mb-0">Desktop</p>
                                                    <div class="avatar avatar-xs flex-shrink-0">
                                                        <div class="avatar-initial rounded bg-label-primary">
                                                            <i class="ri-mac-line ri-16px"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                                <h4 class="mb-2">76.5%</h4>
                                                <p class="mb-0">22,465</p>
                                            </div>
                                        </div>
                                        <div class="d-flex align-items-center mt-4">
                                            <div class="progress w-100 rounded" style="height: 8px">
                                                <div class="progress-bar bg-warning" style="width: 20%"
                                                    role="progressbar" aria-valuenow="20" aria-valuemin="0"
                                                    aria-valuemax="100"></div>
                                                <div class="progress-bar bg-primary" role="progressbar"
                                                    style="width: 80%" aria-valuenow="80" aria-valuemin="0"
                                                    aria-valuemax="100"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!--/ Total Visits -->

                            <!-- Sales This Months -->
                            <div class="col-lg-3 col-sm-6">
                                <div class="card h-100">
                                    <div class="card-header">
                                        <h5 class="mb-0">Sales This Month</h5>
                                    </div>
                                    <div class="card-body">
                                        <div class="card-info">
                                            <p class="mb-0">Total Sales This Month</p>
                                            <h5 class="mb-0">$28,450</h5>
                                        </div>
                                        <div id="saleThisMonth"></div>
                                    </div>
                                </div>
                            </div>
                            <!--/ Sales This Months -->
                        </div>
                        <div class="row g-6 mb-6">
                            <!-- Activity Timeline -->
                            <div class="col-12 col-lg-6">
                                <div class="card h-100">
                                    <div class="card-header">
                                        <div class="d-flex justify-content-between">
                                            <h5 class="mb-0">Activity Timeline</h5>
                                        </div>
                                    </div>
                                    <div class="card-body pt-4">
                                        <ul class="timeline card-timeline mb-0">
                                            <li class="timeline-item timeline-item-transparent">
                                                <span class="timeline-point timeline-point-primary"></span>
                                                <div class="timeline-event">
                                                    <div class="timeline-header mb-3">
                                                        <h6 class="mb-0">12 Invoices have been paid</h6>
                                                        <small class="text-muted">12 min ago</small>
                                                    </div>
                                                    <p class="mb-2">Invoices have been paid to the company</p>
                                                    <div class="d-flex align-items-center mb-1">
                                                        <div class="badge bg-lighter rounded-3">
                                                            <img src="../../assets//img/icons/misc/pdf.png" alt="img"
                                                                width="15" class="me-2" />
                                                            <span class="h6 mb-0 text-body">invoices.pdf</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li class="timeline-item timeline-item-transparent">
                                                <span class="timeline-point timeline-point-success"></span>
                                                <div class="timeline-event">
                                                    <div class="timeline-header mb-3">
                                                        <h6 class="mb-0">Client Meeting</h6>
                                                        <small class="text-muted">45 min ago</small>
                                                    </div>
                                                    <p class="mb-2">Project meeting with john @10:15am</p>
                                                    <div class="d-flex justify-content-between flex-wrap gap-2">
                                                        <div class="d-flex flex-wrap align-items-center">
                                                            <div class="avatar avatar-sm me-2">
                                                                <img src="../../assets/img/avatars/1.png" alt="Avatar"
                                                                    class="rounded-circle" />
                                                            </div>
                                                            <div>
                                                                <p class="mb-0 small fw-medium">Lester McCarthy (Client)
                                                                </p>
                                                                <small>CEO of ThemeSelection</small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li class="timeline-item timeline-item-transparent">
                                                <span class="timeline-point timeline-point-info"></span>
                                                <div class="timeline-event">
                                                    <div class="timeline-header mb-3">
                                                        <h6 class="mb-0">Create a new project for client</h6>
                                                        <small class="text-muted">2 Day Ago</small>
                                                    </div>
                                                    <p class="mb-2">6 team members in a project</p>
                                                    <ul class="list-group list-group-flush">
                                                        <li
                                                            class="list-group-item d-flex justify-content-between align-items-center flex-wrap border-top-0 p-0">
                                                            <div class="d-flex flex-wrap align-items-center">
                                                                <ul
                                                                    class="list-unstyled users-list d-flex align-items-center avatar-group m-0 me-2">
                                                                    <li data-bs-toggle="tooltip"
                                                                        data-popup="tooltip-custom"
                                                                        data-bs-placement="top" title="Vinnie Mostowy"
                                                                        class="avatar pull-up">
                                                                        <img class="rounded-circle"
                                                                            src="../../assets/img/avatars/5.png"
                                                                            alt="Avatar" />
                                                                    </li>
                                                                    <li data-bs-toggle="tooltip"
                                                                        data-popup="tooltip-custom"
                                                                        data-bs-placement="top" title="Allen Rieske"
                                                                        class="avatar pull-up">
                                                                        <img class="rounded-circle"
                                                                            src="../../assets/img/avatars/12.png"
                                                                            alt="Avatar" />
                                                                    </li>
                                                                    <li data-bs-toggle="tooltip"
                                                                        data-popup="tooltip-custom"
                                                                        data-bs-placement="top" title="Julee Rossignol"
                                                                        class="avatar pull-up">
                                                                        <img class="rounded-circle"
                                                                            src="../../assets/img/avatars/6.png"
                                                                            alt="Avatar" />
                                                                    </li>
                                                                    <li class="avatar">
                                                                        <span
                                                                            class="avatar-initial rounded-circle pull-up text-heading"
                                                                            data-bs-toggle="tooltip"
                                                                            data-bs-placement="bottom"
                                                                            title="3 more">+3</span>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <!--/ Activity Timeline -->

                            <!-- Top Referral Source Mobile  -->
                            <div class="col-xxl-6">
                                <div class="card h-100">
                                    <div class="card-header d-flex justify-content-between">
                                        <div>
                                            <h5 class="card-title mb-1">Top Referral Sources</h5>
                                            <p class="card-subtitle mb-0">Number of Sales</p>
                                        </div>
                                        <div class="dropdown">
                                            <button class="btn btn-text-secondary rounded-pill text-muted border-0 p-1"
                                                type="button" id="earningReportsTabsId" data-bs-toggle="dropdown"
                                                aria-haspopup="true" aria-expanded="false">
                                                <i class="ri-more-2-line ri-20px"></i>
                                            </button>
                                            <div class="dropdown-menu dropdown-menu-end"
                                                aria-labelledby="earningReportsTabsId">
                                                <a class="dropdown-item" href="javascript:void(0);">View More</a>
                                                <a class="dropdown-item" href="javascript:void(0);">Delete</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-body pb-0">
                                        <ul class="nav nav-tabs nav-tabs-widget pb-6 gap-4 mx-1 d-flex flex-nowrap align-items-center"
                                            role="tablist">
                                            <li class="nav-item">
                                                <a href="javascript:void(0);"
                                                    class="nav-link btn active d-flex flex-column align-items-center justify-content-center"
                                                    role="tab" data-bs-toggle="tab" data-bs-target="#navs-orders-id-1"
                                                    aria-controls="navs-orders-id-1" aria-selected="true">
                                                    <div>
                                                        <img src="../../assets/img/products/apple-iPhone-13.png"
                                                            alt="Mobile" class="img-fluid" />
                                                    </div>
                                                </a>
                                            </li>
                                            <li class="nav-item">
                                                <a href="javascript:void(0);"
                                                    class="nav-link btn d-flex flex-column align-items-center justify-content-center"
                                                    role="tab" data-bs-toggle="tab" data-bs-target="#navs-orders-id-2"
                                                    aria-controls="navs-orders-id-2" aria-selected="false">
                                                    <div>
                                                        <img src="../../assets/img/products/apple-iMac-3k.png"
                                                            alt="Apple iMac 3k" class="img-fluid" />
                                                    </div>
                                                </a>
                                            </li>
                                            <li class="nav-item">
                                                <a href="javascript:void(0);"
                                                    class="nav-link btn d-flex flex-column align-items-center justify-content-center"
                                                    role="tab" data-bs-toggle="tab" data-bs-target="#navs-orders-id-3"
                                                    aria-controls="navs-orders-id-3" aria-selected="false">
                                                    <div>
                                                        <img src="../../assets/img/products/gaming-remote.png"
                                                            alt="Gaming Remote" class="img-fluid" />
                                                    </div>
                                                </a>
                                            </li>
                                            <li class="nav-item">
                                                <a href="javascript:void(0);"
                                                    class="nav-link btn d-flex align-items-center justify-content-center disabled"
                                                    role="tab" data-bs-toggle="tab" aria-selected="false">
                                                    <div class="avatar avatar-sm">
                                                        <div
                                                            class="avatar-initial bg-label-secondary text-body rounded">
                                                            <i class="ri-add-line ri-22px"></i>
                                                        </div>
                                                    </div>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="tab-content p-0">
                                        <div class="tab-pane fade show active" id="navs-orders-id-1" role="tabpanel">
                                            <div class="table-responsive text-nowrap">
                                                <table class="table border-top">
                                                    <thead>
                                                        <tr>
                                                            <th class="bg-transparent border-bottom">Image</th>
                                                            <th class="bg-transparent border-bottom">Name</th>
                                                            <th class="text-end bg-transparent border-bottom">Status
                                                            </th>
                                                            <th class="text-end bg-transparent border-bottom">Revenue
                                                            </th>
                                                            <th class="text-end bg-transparent border-bottom">Profit
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody class="table-border-bottom-0">
                                                        <tr>
                                                            <td>
                                                                <img src="../../assets/img/products/samsung-s22.png"
                                                                    alt="Mobile" width="34" height="34"
                                                                    class="rounded" />
                                                            </td>
                                                            <td>Samsung s22</td>
                                                            <td class="text-end">
                                                                <div class="badge bg-label-primary rounded-pill">Out of
                                                                    Stock</div>
                                                            </td>
                                                            <td class="text-end fw-medium">$12.5k</td>
                                                            <td class="text-success fw-medium text-end">+24%</td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <img src="../../assets/img/products/apple-iPhone-13-pro.png"
                                                                    alt="Mobile" width="34" height="34"
                                                                    class="rounded" />
                                                            </td>
                                                            <td>iPhone 14 Pro</td>
                                                            <td class="text-end">
                                                                <div class="badge bg-label-success rounded-pill">In
                                                                    Stock</div>
                                                            </td>
                                                            <td class="text-end fw-medium">$45k</td>
                                                            <td class="text-danger fw-medium text-end">-18%</td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <img src="../../assets/img/products/oneplus-9-pro.png"
                                                                    alt="Mobile" width="34" height="34"
                                                                    class="rounded" />
                                                            </td>
                                                            <td>Oneplus 9 Pro</td>
                                                            <td class="text-end">
                                                                <div class="badge bg-label-warning rounded-pill">
                                                                    Upcoming</div>
                                                            </td>
                                                            <td class="text-end fw-medium">$98.2k</td>
                                                            <td class="text-success fw-medium text-end">+55%</td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <img src="../../assets/img/products/google-pixel-6.png"
                                                                    alt="Mobile" width="34" height="34"
                                                                    class="rounded" />
                                                            </td>
                                                            <td>Google Pixel 6</td>
                                                            <td class="text-end">
                                                                <div class="badge bg-label-success rounded-pill">In
                                                                    Stock</div>
                                                            </td>
                                                            <td class="text-end fw-medium">$210k</td>
                                                            <td class="text-success fw-medium text-end">+8%</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="navs-orders-id-2" role="tabpanel">
                                            <div class="table-responsive text-nowrap">
                                                <table class="table border-top">
                                                    <thead>
                                                        <tr>
                                                            <th class="bg-transparent border-bottom">Image</th>
                                                            <th class="bg-transparent border-bottom">Name</th>
                                                            <th class="text-end bg-transparent border-bottom">Status
                                                            </th>
                                                            <th class="text-end bg-transparent border-bottom">Revenue
                                                            </th>
                                                            <th class="text-end bg-transparent border-bottom">Profit
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody class="table-border-bottom-0">
                                                        <tr>
                                                            <td>
                                                                <img src="../../assets/img/products/apple-mac-mini.png"
                                                                    alt="Mobile" width="34" height="34"
                                                                    class="rounded" />
                                                            </td>
                                                            <td>Apple Mac Mini</td>
                                                            <td class="text-end">
                                                                <div class="badge bg-label-primary rounded-pill">Out of
                                                                    Stock</div>
                                                            </td>
                                                            <td class="text-end fw-medium">$5,576</td>
                                                            <td class="text-danger fw-medium text-end">-24%</td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <img src="../../assets/img/products/hp-envy-x360.png"
                                                                    alt="Mobile" width="34" height="34"
                                                                    class="rounded" />
                                                            </td>
                                                            <td>Newest HP Envy x360</td>
                                                            <td class="text-end">
                                                                <div class="badge bg-label-info rounded-pill">In Draft
                                                                </div>
                                                            </td>
                                                            <td class="text-end fw-medium">$5</td>
                                                            <td class="text-success fw-medium text-end">+5%</td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <img src="../../assets/img/products/dell-inspiron-3000.png"
                                                                    alt="Mobile" width="34" height="34"
                                                                    class="rounded" />
                                                            </td>
                                                            <td>Dell Inspiron 3000</td>
                                                            <td class="text-end">
                                                                <div class="badge bg-label-success rounded-pill">In
                                                                    Stock</div>
                                                            </td>
                                                            <td class="text-end fw-medium">$850</td>
                                                            <td class="text-danger fw-medium text-end">-12%</td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <img src="../../assets/img/products/apple-iMac-4k.png"
                                                                    alt="Mobile" width="34" height="34"
                                                                    class="rounded" />
                                                            </td>
                                                            <td>Apple iMac 4k</td>
                                                            <td class="text-end">
                                                                <div class="badge bg-label-danger rounded-pill">warning
                                                                </div>
                                                            </td>
                                                            <td class="text-end fw-medium">$857</td>
                                                            <td class="text-danger fw-medium text-end">-5%</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="navs-orders-id-3" role="tabpanel">
                                            <div class="table-responsive text-nowrap">
                                                <table class="table border-top">
                                                    <thead>
                                                        <tr>
                                                            <th class="bg-transparent border-bottom">Image</th>
                                                            <th class="bg-transparent border-bottom">Name</th>
                                                            <th class="text-end bg-transparent border-bottom">Status
                                                            </th>
                                                            <th class="text-end bg-transparent border-bottom">Revenue
                                                            </th>
                                                            <th class="text-end bg-transparent border-bottom">Profit
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody class="table-border-bottom-0">
                                                        <tr>
                                                            <td>
                                                                <img src="../../assets/img/products/sony-play-station-5.png"
                                                                    alt="Mobile" width="34" height="34"
                                                                    class="rounded" />
                                                            </td>
                                                            <td>Sony Play Station 5</td>
                                                            <td class="text-end">
                                                                <div class="badge bg-label-info rounded-pill">In Draft
                                                                </div>
                                                            </td>
                                                            <td class="text-end fw-medium">$5</td>
                                                            <td class="text-success fw-medium text-end">+5%</td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <img src="../../assets/img/products/xbox-series-x.png"
                                                                    alt="Mobile" width="34" height="34"
                                                                    class="rounded" />
                                                            </td>
                                                            <td>XBOX Series X</td>
                                                            <td class="text-end">
                                                                <div class="badge bg-label-primary rounded-pill">Out of
                                                                    Stock</div>
                                                            </td>
                                                            <td class="text-end fw-medium">$5,576</td>
                                                            <td class="text-danger fw-medium text-end">-24%</td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <img src="../../assets/img/products/nintendo-switch.png"
                                                                    alt="Mobile" width="34" height="34"
                                                                    class="rounded" />
                                                            </td>
                                                            <td>Nintendo Switch</td>
                                                            <td class="text-end">
                                                                <div class="badge bg-label-warning rounded-pill">
                                                                    Upcoming</div>
                                                            </td>
                                                            <td class="text-end fw-medium">$2,857</td>
                                                            <td class="text-success fw-medium text-end">+5%</td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <img src="../../assets/img/products/sup-game-box-400.png"
                                                                    alt="Mobile" width="34" height="34"
                                                                    class="rounded" />
                                                            </td>
                                                            <td>SUP Game Box 400</td>
                                                            <td class="text-end">
                                                                <div class="badge bg-label-success rounded-pill">In
                                                                    Stock</div>
                                                            </td>
                                                            <td class="text-end fw-medium">$850</td>
                                                            <td class="text-danger fw-medium text-end">-12%</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!--/ Top Referral Source Mobile -->

                            <!-- Total Impression & Order Chart -->
                            <div class="col-xl-3 col-sm-6 order-sm-1 order-xl-0">
                                <div class="card h-100">
                                    <div class="card-body pb-0">
                                        <div class="d-flex align-items-center gap-4">
                                            <div>
                                                <div class="chart-progress" data-color="primary" data-series="70"
                                                    data-icon="../../assets/img/icons/misc/card-icon-laptop.png"></div>
                                            </div>
                                            <div>
                                                <div class="card-info">
                                                    <div class="d-flex align-items-center gap-2 flex-wrap">
                                                        <h5 class="mb-0">84k</h5>
                                                        <div class="d-flex align-items-center text-danger">
                                                            <p class="mb-0 small">-24%</p>
                                                            <div class="ri-arrow-down-s-line ri-20px"></div>
                                                        </div>
                                                    </div>
                                                    <p class="mb-0 mt-1">Total Impression</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr class="my-4" />
                                    <div class="card-body pt-0">
                                        <div class="d-flex align-items-center gap-4">
                                            <div>
                                                <div class="chart-progress" data-color="warning" data-series="40"
                                                    data-icon="../../assets/img/icons/misc/card-icon-bag.png"></div>
                                            </div>
                                            <div>
                                                <div class="card-info">
                                                    <div class="d-flex align-items-center gap-2 flex-wrap">
                                                        <h5 class="mb-0">22k</h5>
                                                        <div class="d-flex align-items-center text-success">
                                                            <p class="mb-0 small">+15%</p>
                                                            <div class="ri-arrow-up-s-line ri-20px"></div>
                                                        </div>
                                                    </div>
                                                    <p class="mb-0 mt-1">Total Order</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!--/ Total Impression & Order Chart -->

                            <!-- Marketing & Sales-->
                            <div class="col-lg-5">
                                <div class="swiper-container swiper-container-horizontal swiper swiper-sales"
                                    id="swiper-marketing-sales">
                                    <div class="swiper-wrapper">
                                        <div class="swiper-slide card pb-5 shadow-none border-0">
                                            <h5 class="mb-1">Marketing & Sales</h5>
                                            <div class="d-flex align-items-center card-subtitle gap-2">
                                                <div>Total 245.8k Sales</div>
                                                <div class="d-flex align-items-center text-success">
                                                    <p class="mb-0 fw-medium">+25%</p>
                                                    <i class="ri-arrow-up-s-line ri-20px mt-n1"></i>
                                                </div>
                                            </div>
                                            <div class="d-flex align-items-center mt-5">
                                                <img src="../../assets//img/products/card-marketing-expense-logo.png"
                                                    alt="Marketing and sales" width="84" class="rounded-4" />
                                                <div class="d-flex flex-column w-100 ms-6">
                                                    <h6 class="mb-2">Marketing Expense</h6>
                                                    <div class="row d-flex flex-wrap justify-content-between g-4">
                                                        <div class="col-sm-6">
                                                            <ul class="list-unstyled mb-0">
                                                                <li class="d-flex mb-3 align-items-center">
                                                                    <p class="mb-0 me-3 sales-text-bg fw-medium">5k</p>
                                                                    <p class="mb-0 text-truncate">Operating</p>
                                                                </li>
                                                                <li class="d-flex align-items-center">
                                                                    <p class="mb-0 me-3 sales-text-bg fw-medium">6k</p>
                                                                    <p class="mb-0 text-truncate">COGF</p>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div class="col-sm-6">
                                                            <ul class="list-unstyled mb-0">
                                                                <li class="d-flex mb-3 align-items-center">
                                                                    <p class="mb-0 me-3 sales-text-bg fw-medium">2k</p>
                                                                    <p class="mb-0 text-truncate">Financial</p>
                                                                </li>
                                                                <li class="d-flex align-items-center">
                                                                    <p class="mb-0 me-3 sales-text-bg fw-medium">1k</p>
                                                                    <p class="mb-0 text-truncate">Expense</p>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="mt-6">
                                                <button type="button" class="btn btn-sm btn-outline-primary me-3">
                                                    <i class="tf-icons ri-sticky-note-line ri-14px me-1"></i>Details
                                                </button>
                                                <button type="button" class="btn btn-sm btn-primary">
                                                    <i class="tf-icons ri-download-line ri-14px me-1"></i>Report
                                                </button>
                                            </div>
                                        </div>
                                        <div class="swiper-slide card pb-5 shadow-none border-0">
                                            <h5 class="mb-1">Marketing & Sales</h5>
                                            <div class="d-flex align-items-center card-subtitle gap-2">
                                                <div>Total 245.8k Sales</div>
                                                <div class="d-flex align-items-center text-success">
                                                    <p class="mb-0 fw-medium">+25%</p>
                                                    <i class="ri-arrow-up-s-line ri-20px mt-n1"></i>
                                                </div>
                                            </div>
                                            <div class="d-flex align-items-center mt-5">
                                                <img src="../../assets//img/products/card-accounting-logo.png"
                                                    alt="Marketing and sales" width="84" class="rounded-4" />
                                                <div class="d-flex flex-column w-100 ms-6">
                                                    <h6 class="mb-2">Accounting</h6>
                                                    <div class="row d-flex flex-wrap justify-content-between g-4">
                                                        <div class="col-sm-6">
                                                            <ul class="list-unstyled mb-0">
                                                                <li class="d-flex mb-3 align-items-center">
                                                                    <p class="mb-0 me-3 sales-text-bg fw-medium">18</p>
                                                                    <p class="mb-0 text-truncate">Billing</p>
                                                                </li>
                                                                <li class="d-flex align-items-center">
                                                                    <p class="mb-0 me-3 sales-text-bg fw-medium">30</p>
                                                                    <p class="mb-0 text-truncate">Leads</p>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div class="col-sm-6">
                                                            <ul class="list-unstyled mb-0">
                                                                <li class="d-flex mb-3 align-items-center">
                                                                    <p class="mb-0 me-3 sales-text-bg fw-medium">28</p>
                                                                    <p class="mb-0 text-truncate">Sales</p>
                                                                </li>
                                                                <li class="d-flex align-items-center">
                                                                    <p class="mb-0 me-3 sales-text-bg fw-medium">80</p>
                                                                    <p class="mb-0 text-truncate">Impression</p>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="mt-6">
                                                <button type="button" class="btn btn-sm btn-outline-primary me-3">
                                                    <i class="tf-icons ri-sticky-note-line ri-14px me-1"></i>Details
                                                </button>
                                                <button type="button" class="btn btn-sm btn-primary">
                                                    <i class="tf-icons ri-download-line ri-14px me-1"></i>Report
                                                </button>
                                            </div>
                                        </div>
                                        <div class="swiper-slide card pb-5 shadow-none border-0">
                                            <h5 class="mb-1">Marketing & Sales</h5>
                                            <div class="d-flex align-items-center card-subtitle gap-2">
                                                <div>Total 245.8k Sales</div>
                                                <div class="d-flex align-items-center text-success">
                                                    <p class="mb-0 fw-medium">+25%</p>
                                                    <i class="ri-arrow-up-s-line ri-20px mt-n1"></i>
                                                </div>
                                            </div>
                                            <div class="d-flex align-items-center mt-5">
                                                <img src="../../assets//img/products/card-sales-overview-logo.png"
                                                    alt="Marketing and sales" width="84" class="rounded-4" />
                                                <div class="d-flex flex-column w-100 ms-6">
                                                    <h6 class="mb-2">Sales Overview</h6>
                                                    <div class="row d-flex flex-wrap justify-content-between g-4">
                                                        <div class="col-sm-6">
                                                            <ul class="list-unstyled mb-0">
                                                                <li class="d-flex mb-3 align-items-center">
                                                                    <p class="mb-0 me-3 sales-text-bg fw-medium">68</p>
                                                                    <p class="mb-0 text-truncate">Open</p>
                                                                </li>
                                                                <li class="d-flex align-items-center">
                                                                    <p class="mb-0 me-3 sales-text-bg fw-medium">04</p>
                                                                    <p class="mb-0 text-truncate">Lost</p>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div class="col-sm-6">
                                                            <ul class="list-unstyled mb-0">
                                                                <li class="d-flex mb-3 align-items-center">
                                                                    <p class="mb-0 me-3 sales-text-bg fw-medium">52</p>
                                                                    <p class="mb-0 text-truncate">Converted</p>
                                                                </li>
                                                                <li class="d-flex align-items-center">
                                                                    <p class="mb-0 me-3 sales-text-bg fw-medium">12</p>
                                                                    <p class="mb-0 text-truncate">Quotations</p>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="mt-6">
                                                <button type="button" class="btn btn-sm btn-outline-primary me-3">
                                                    <i class="tf-icons ri-sticky-note-line ri-14px me-1"></i>Details
                                                </button>
                                                <button type="button" class="btn btn-sm btn-primary">
                                                    <i class="tf-icons ri-download-line ri-14px me-1"></i>Report
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="swiper-pagination"></div>
                                </div>
                            </div>
                            <!--/ Marketing & Sales-->

                            <!-- Live Visitors-->
                            <div class="col-lg-4 col-sm-6 order-sm-2 order-lg-0">
                                <div class="card h-100">
                                    <div class="card-header">
                                        <div class="d-flex justify-content-between mb-1">
                                            <h5 class="mb-0">Live Visitors</h5>
                                            <div class="d-flex text-success">
                                                <p class="mb-0 me-2">+78.2%</p>
                                                <i class="ri-arrow-up-s-line ri-20px"></i>
                                            </div>
                                        </div>
                                        <p class="card-subtitle mb-0">Total 890 Visitors Are Live</p>
                                    </div>
                                    <div class="card-body">
                                        <div id="liveVisitors"></div>
                                    </div>
                                </div>
                            </div>
                            <!--/ Live Visitors-->
                        </div>
                        <div class="row gy-4">
                            <!-- Roles Datatables -->
                            <div class="col-lg-8 col-12">
                                <div class="card h-100">
                                    <div class="table-responsive rounded-3">
                                        <table class="datatables-ecommerce table table-sm table-border-bottom-0">
                                            <thead>
                                                <tr>
                                                    <th></th>
                                                    <th>User</th>
                                                    <th>Email</th>
                                                    <th>Role</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <!--/ Roles Datatables -->

                            <!-- visits By Day Chart-->
                            <div class="col-12 col-xl-4 col-lg-4">
                                <div class="card h-100">
                                    <div class="card-header">
                                        <div class="d-flex justify-content-between">
                                            <h5 class="mb-1">Visits by Day</h5>
                                            <div class="dropdown">
                                                <button
                                                    class="btn btn-text-secondary rounded-pill text-muted border-0 p-1"
                                                    type="button" id="visitsByDayDropdown" data-bs-toggle="dropdown"
                                                    aria-haspopup="true" aria-expanded="false">
                                                    <i class="ri-more-2-line ri-20px"></i>
                                                </button>
                                                <div class="dropdown-menu dropdown-menu-end"
                                                    aria-labelledby="visitsByDayDropdown">
                                                    <a class="dropdown-item" href="javascript:void(0);">Refresh</a>
                                                    <a class="dropdown-item" href="javascript:void(0);">Update</a>
                                                    <a class="dropdown-item" href="javascript:void(0);">Share</a>
                                                </div>
                                            </div>
                                        </div>
                                        <p class="mb-0 card-subtitle">Total 248.5k Visits</p>
                                    </div>
                                    <div class="card-body">
                                        <div id="visitsByDayChart"></div>
                                        <div class="d-flex justify-content-between mt-4">
                                            <div>
                                                <h6 class="mb-0">Most Visited Day</h6>
                                                <p class="mb-0 small">Total 62.4k Visits on Thursday</p>
                                            </div>
                                            <div class="avatar">
                                                <div class="avatar-initial bg-label-primary rounded">
                                                    <i class="ri-arrow-right-s-line ri-24px scaleX-n1-rtl"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!--/ visits By Day Chart-->
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
    <script src="../../assets/vendor/libs/datatables-bs5/datatables-bootstrap5.js"></script>
    <script src="../../assets/vendor/libs/apex-charts/apexcharts.js"></script>
    <script src="../../assets/vendor/libs/swiper/swiper.js"></script>

    <!-- Main JS -->
    <script src="../../assets/js/main.js"></script>

    <!-- Page JS -->
    <script src="../../assets/js/app-ecommerce-dashboard.js"></script>
</body>

</html>