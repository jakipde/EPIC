    <aside id="layout-menu" class="layout-menu menu-vertical menu bg-menu-theme">
        <div class="app-brand demo">
            <a href="index.php" class="app-brand-link">
                <span class="app-brand-logo demo">
                    <span style="color: var(--bs-primary)">
                        <svg width="268" height="150" viewBox="0 0 38 20" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M30.0944 2.22569C29.0511 0.444187 26.7508 -0.172113 24.9566 0.849138C23.1623 1.87039 22.5536 4.14247 23.5969 5.92397L30.5368 17.7743C31.5801 19.5558 33.8804 20.1721 35.6746 19.1509C37.4689 18.1296 38.0776 15.8575 37.0343 14.076L30.0944 2.22569Z"
                                fill="currentColor" />
                            <path
                                d="M30.171 2.22569C29.1277 0.444187 26.8274 -0.172113 25.0332 0.849138C23.2389 1.87039 22.6302 4.14247 23.6735 5.92397L30.6134 17.7743C31.6567 19.5558 33.957 20.1721 35.7512 19.1509C37.5455 18.1296 38.1542 15.8575 37.1109 14.076L30.171 2.22569Z"
                                fill="url(#paint0_linear_2989_100980)" fill-opacity="0.4" />
                            <path
                                d="M22.9676 2.22569C24.0109 0.444187 26.3112 -0.172113 28.1054 0.849138C29.8996 1.87039 30.5084 4.14247 29.4651 5.92397L22.5251 17.7743C21.4818 19.5558 19.1816 20.1721 17.3873 19.1509C15.5931 18.1296 14.9843 15.8575 16.0276 14.076L22.9676 2.22569Z"
                                fill="currentColor" />
                            <path
                                d="M14.9558 2.22569C13.9125 0.444187 11.6122 -0.172113 9.818 0.849138C8.02377 1.87039 7.41502 4.14247 8.45833 5.92397L15.3983 17.7743C16.4416 19.5558 18.7418 20.1721 20.5361 19.1509C22.3303 18.1296 22.9391 15.8575 21.8958 14.076L14.9558 2.22569Z"
                                fill="currentColor" />
                            <path
                                d="M14.9558 2.22569C13.9125 0.444187 11.6122 -0.172113 9.818 0.849138C8.02377 1.87039 7.41502 4.14247 8.45833 5.92397L15.3983 17.7743C16.4416 19.5558 18.7418 20.1721 20.5361 19.1509C22.3303 18.1296 22.9391 15.8575 21.8958 14.076L14.9558 2.22569Z"
                                fill="url(#paint1_linear_2989_100980)" fill-opacity="0.4" />
                            <path
                                d="M7.82901 2.22569C8.87231 0.444187 11.1726 -0.172113 12.9668 0.849138C14.7611 1.87039 15.3698 4.14247 14.3265 5.92397L7.38656 17.7743C6.34325 19.5558 4.04298 20.1721 2.24875 19.1509C0.454514 18.1296 -0.154233 15.8575 0.88907 14.076L7.82901 2.22569Z"
                                fill="currentColor" />
                            <defs>
                                <linearGradient id="paint0_linear_2989_100980" x1="5.36642" y1="0.849138" x2="10.532"
                                    y2="24.104" gradientUnits="userSpaceOnUse">
                                    <stop offset="0" stop-opacity="1" />
                                    <stop offset="1" stop-opacity="0" />
                                </linearGradient>
                                <linearGradient id="paint1_linear_2989_100980" x1="5.19475" y1="0.849139" x2="10.3357"
                                    y2="24.1155" gradientUnits="userSpaceOnUse">
                                    <stop offset="0" stop-opacity="1" />
                                    <stop offset="1" stop-opacity="0" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </span>
                </span>
                <span class="app-brand-text demo menu-text fw-semibold ms-2">Materialize</span>
            </a>
        </div>

        <div class="menu-inner-shadow"></div>

        <ul class="menu-inner py-1">
            <!-- Home -->
            <li class="menu-item <?php echo ($current_page == 'index.php') ? 'active' : ''; ?>">
                <a href="index.php" class="menu-link">
                    <i class="menu-icon tf-icons ri-home-line"></i>
                    <div data-i18n="Home">Home</div>
                </a>
            </li>

            <!-- My Shop -->
            <li class="menu-item <?php echo ($current_page == 'my_shop.php') ? 'active' : ''; ?>">
                <a href="my_shop.php" class="menu-link">
                    <i class="menu-icon tf-icons ri-store-2-line"></i>
                    <div data-i18n="My Shop">My Shop</div>
                </a>
            </li>

            <!-- Repair -->
            <li class="menu-item <?php echo (strpos($current_page, 'repair_') !== false) ? 'active open' : ''; ?>">
                <a href="javascript:void(0);" class="menu-link menu-toggle">
                    <i class="menu-icon tf-icons ri-tools-fill"></i>
                    <div data-i18n="Repair">Repair</div>
                </a>
                <ul class="menu-sub">
                    <li class="menu-item">
                        <a href="repair_dashboard.php" class="menu-link">
                            <div data-i18n="Repair Dashboard">Repair Dashboard</div>
                        </a>
                    </li>
                    <li class="menu-item">
                        <a href="repair_data_overview.php" class="menu-link">
                            <div data-i18n="Data Overview">Data Overview</div>
                        </a>
                    </li>
                </ul>
            </li>

            <!-- Device -->
            <li class="menu-item <?php echo (strpos($current_page, 'device_') !== false) ? 'active open' : ''; ?>">
                <a href="javascript:void(0);" class="menu-link menu-toggle">
                    <i class="menu-icon tf-icons ri-smartphone-line"></i>
                    <div data-i18n="Device">Device</div>
                </a>
                <ul class="menu-sub">
                    <li class="menu-item">
                        <a href="device_dashboard.php" class="menu-link">
                            <div data-i18n="Device Dashboard">Device Dashboard</div>
                        </a>
                    </li>
                    <li class="menu-item">
                        <a href="device_data_overview.php" class="menu-link">
                            <div data-i18n="Data Overview">Data Overview</div>
                        </a>
                    </li>
                </ul>
            </li>

            <!-- Accessories -->
            <li class="menu-item <?php echo (strpos($current_page, 'accessories_') !== false) ? 'active open' : ''; ?>">
                <a href="javascript:void(0);" class="menu-link menu-toggle">
                    <i class="menu-icon tf-icons ri-headphone-line"></i>
                    <div data-i18n="Accessories">Accessories</div>
                </a>
                <ul class="menu-sub">
                    <li class="menu-item">
                        <a href="accessories_dashboard.php" class="menu-link">
                            <div data-i18n="Accessories Dashboard">Accessories Dashboard</div>
                        </a>
                    </li>
                    <li class="menu-item">
                        <a href="accessories_data_overview.php" class="menu-link">
                            <div data-i18n="Data Overview">Data Overview</div>
                        </a>
                    </li>
                </ul>
            </li>

            <!-- Spare Parts -->
            <li class="menu-item <?php echo (strpos($current_page, 'spare_parts_') !== false) ? 'active open' : ''; ?>">
                <a href="javascript:void(0);" class="menu-link menu-toggle">
                    <i class="menu-icon tf-icons ri-cpu-line"></i>
                    <div data-i18n="Spare Parts">Spare Parts</div>
                </a>
                <ul class="menu-sub">
                    <li class="menu-item">
                        <a href="spare_parts_dashboard.php" class="menu-link">
                            <div data-i18n="Spare Parts Dashboard">Spare Parts Dashboard</div>
                        </a>
                    </li>
                    <li class="menu-item">
                        <a href="spare_parts_data_overview.php" class="menu-link">
                            <div data-i18n="Data Overview">Data Overview</div>
                        </a>
                    </li>
                </ul>
            </li>

            <!-- Tools -->
            <li class="menu-item <?php echo (strpos($current_page, 'tools_') !== false) ? 'active open' : ''; ?>">
                <a href="javascript:void(0);" class="menu-link menu-toggle">
                    <i class="menu-icon tf-icons ri-hammer-line"></i>
                    <div data-i18n="Tools">Tools</div>
                </a>
                <ul class="menu-sub">
                    <li class="menu-item">
                        <a href="tools_dashboard.php" class="menu-link">
                            <div data-i18n="Tools Dashboard">Tools Dashboard</div>
                        </a>
                    </li>
                    <li class="menu-item">
                        <a href="tools_data_overview.php" class="menu-link">
                            <div data-i18n="Data Overview">Data Overview</div>
                        </a>
                    </li>
                </ul>
            </li>

            <!-- Product -->
            <li class="menu-item <?php echo (strpos($current_page, 'product_') !== false) ? 'active open' : ''; ?>">
                <a href="javascript:void(0);" class="menu-link menu-toggle">
                    <i class="menu-icon tf-icons ri-shopping-bag-3-line"></i>
                    <div data-i18n="Product">Product</div>
                </a>
                <ul class="menu-sub">
                    <li class="menu-item">
                        <a href="#" class="menu-link" data-bs-toggle="modal" data-bs-target="#productDashboardModal">
                            <div data-i18n="Product Dashboard">Product Dashboard</div>
                        </a>
                    </li>
                    <li class="menu-item">
                        <a href="#" class="menu-link" data-bs-toggle="modal" data-bs-target="#productDataOverviewModal">
                            <div data-i18n="Product Data Overview">Product Data Overview</div>
                        </a>
                    </li>
                </ul>
            </li>

             <!-- Data Entry -->
            <li class="menu-item <?php echo (strpos($current_page, 'data_entry_') !== false) ? 'active open' : ''; ?>">
                <a href="javascript:void(0);" class="menu-link menu-toggle">
                    <i class="menu-icon tf-icons ri-file-edit-line"></i>
                    <div data-i18n="Data Entry">Data Entry</div>
                </a>
                <ul class="menu-sub">
                    <li class="menu-item">
                        <a href="#" class="menu-link" data-bs-toggle="modal" data-bs-target="#newInputModal">
                            <div data-i18n="New Input">New Input</div>
                        </a>
                    </li>
                    <li class="menu-item">
                        <a href="#" class="menu-link" data-bs-toggle="modal" data-bs-target="#bulkInputModal">
                            <div data-i18n="Bulk Input">Bulk Input</div>
                        </a>
                    </li>
                </ul>
            </li>

            <!-- Warranty -->
            <li class="menu-item <?php echo (strpos($current_page, 'warranty_') !== false) ? 'active open' : ''; ?>">
                <a href="javascript:void(0);" class="menu-link menu-toggle">
                    <i class="menu-icon tf-icons ri-shield-check-line"></i>
                    <div data-i18n="Warranty">Warranty</div>
                </a>
                <ul class="menu-sub">
                    <li class="menu-item">
                        <a href="#" class="menu-link" data-bs-toggle="modal" data-bs-target="#warrantyOverviewModal">
                            <div data-i18n="Overview">Overview</div>
                        </a>
                    </li>
                    <li class="menu-item">
                        <a href="#" class="menu-link" data-bs-toggle="modal" data-bs-target="#warrantyClaimsModal">
                            <div data-i18n="Claims">Claims</div>
                        </a>
                    </li>
                    <li class="menu-item">
                        <a href="#" class="menu-link" data-bs-toggle="modal" data-bs-target="#warrantyReportsModal">
                            <div data-i18n="Reports">Reports</div>
                        </a>
                    </li>
                </ul>
            </li>

            <!-- Sales -->
            <li class="menu-item <?php echo (strpos($current_page, 'sales_') !== false) ? 'active open' : ''; ?>">
                <a href="javascript:void(0);" class="menu-link menu-toggle">
                    <i class="menu-icon tf-icons ri-line-chart-line"></i>
                    <div data-i18n="Sales">Sales</div>
                </a>
                <ul class="menu-sub">
                    <li class="menu-item">
                        <a href="#" class="menu-link" data-bs-toggle="modal" data-bs-target="#salesOverviewModal">
                            <div data-i18n="Overview">Overview</div>
                        </a>
                    </li>
                    <li class="menu-item">
                        <a href="#" class="menu-link" data-bs-toggle="modal" data-bs-target="#salesReportsModal">
                            <div data-i18n="Reports">Reports</div>
                        </a>
                    </li>
                    <li class="menu-item">
                        <a href="#" class="menu-link" data-bs-toggle="modal" data-bs-target="#salesAnalyticsModal">
                            <div data-i18n="Analytics">Analytics</div>
                        </a>
                    </li>
                </ul>
            </li>

        </ul>
    </aside>

    <!-- Include the modals -->
    <?php include_once(__DIR__ . '/../Data Entry/New_Input.php'); ?>
    <?php include_once(__DIR__ . '/../Data Entry/Bulk_Input.php'); ?>

</body>

</html>