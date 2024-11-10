-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Waktu pembuatan: 25 Okt 2024 pada 11.18
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `epic`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `accessories`
--

CREATE TABLE `accessories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `brand` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `model` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `customers`
--

CREATE TABLE `customers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `data_entries`
--

CREATE TABLE `data_entries` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `data_entries_category_id` bigint(20) UNSIGNED NOT NULL,
  `entry_type` enum('customers','technician','repairs','devices','accessories','spare_parts','tools') NOT NULL,
  `data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`data`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `data_entries_category`
--

CREATE TABLE `data_entries_category` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `data_entries_category`
--

INSERT INTO `data_entries_category` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Customers', '2024-10-25 09:18:13', '2024-10-25 09:18:13'),
(2, 'Technicians', '2024-10-25 09:18:13', '2024-10-25 09:18:13'),
(3, 'Repairs', '2024-10-25 09:18:13', '2024-10-25 09:18:13'),
(4, 'Devices', '2024-10-25 09:18:13', '2024-10-25 09:18:13'),
(5, 'Accessories', '2024-10-25 09:18:13', '2024-10-25 09:18:13'),
(6, 'Spare Parts', '2024-10-25 09:18:13', '2024-10-25 09:18:13'),
(7, 'Tools', '2024-10-25 09:18:13', '2024-10-25 09:18:13');

-- --------------------------------------------------------

--
-- Struktur dari tabel `data_entries_category_field`
--

CREATE TABLE `data_entries_category_field` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `data_entries_category_id` bigint(20) UNSIGNED NOT NULL,
  `field_name` varchar(255) NOT NULL,
  `label` varchar(255) NOT NULL,
  `field_type` enum('text','textarea','number','date','boolean','foreign_id','select') NOT NULL,
  `default` varchar(255) DEFAULT NULL,
  `options` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `data_entries_category_field`
--

INSERT INTO `data_entries_category_field` (`id`, `data_entries_category_id`, `field_name`, `label`, `field_type`, `default`, `options`, `created_at`, `updated_at`) VALUES
(1, 1, 'name', 'Customer Name', 'text', NULL, NULL, '2024-10-25 09:18:13', '2024-10-25 09:18:13'),
(2, 1, 'phone', 'Phone Number', 'text', NULL, NULL, '2024-10-25 09:18:14', '2024-10-25 09:18:14'),
(3, 3, 'entry_date', 'Entry Date', 'date', '2024-10-25 16:18:13', NULL, '2024-10-25 09:18:14', '2024-10-25 09:18:14'),
(4, 3, 'customer_id', 'Customer', 'foreign_id', NULL, NULL, '2024-10-25 09:18:14', '2024-10-25 09:18:14'),
(5, 3, 'cashier', 'Cashier', 'foreign_id', NULL, NULL, '2024-10-25 09:18:14', '2024-10-25 09:18:14'),
(6, 3, 'phone_brand', 'Phone Brand', 'text', NULL, NULL, '2024-10-25 09:18:14', '2024-10-25 09:18:14'),
(7, 3, 'imei_sn_1', 'IMEI/SN 1', 'text', NULL, NULL, '2024-10-25 09:18:14', '2024-10-25 09:18:14'),
(8, 3, 'imei_sn_2', 'IMEI/SN 2', 'text', NULL, NULL, '2024-10-25 09:18:14', '2024-10-25 09:18:14'),
(9, 3, 'damage_description', 'Damage Description', 'textarea', NULL, NULL, '2024-10-25 09:18:14', '2024-10-25 09:18:14'),
(10, 3, 'phone_accessories', 'Phone Accessories', 'textarea', NULL, NULL, '2024-10-25 09:18:14', '2024-10-25 09:18:14'),
(11, 3, 'technician_id', 'Technician', 'foreign_id', NULL, NULL, '2024-10-25 09:18:14', '2024-10-25 09:18:14'),
(12, 3, 'under_warranty', 'Under Warranty', 'select', NULL, '[\"Yes\",\"No\"]', '2024-10-25 09:18:14', '2024-10-25 09:18:14'),
(13, 3, 'warranty_duration', 'Warranty Duration (months)', 'number', NULL, NULL, '2024-10-25 09:18:14', '2024-10-25 09:18:14'),
(14, 3, 'exit_date', 'Exit Date', 'date', NULL, NULL, '2024-10-25 09:18:14', '2024-10-25 09:18:14'),
(15, 3, 'print_type', 'Print Type', 'select', NULL, '[\"JET\",\"Blank\",\"Laser\",\"Inkjet\"]', '2024-10-25 09:18:14', '2024-10-25 09:18:14'),
(16, 4, 'brand', 'Device Brand', 'text', NULL, NULL, '2024-10-25 09:18:14', '2024-10-25 09:18:14'),
(17, 4, 'type', 'Device Type', 'text', NULL, NULL, '2024-10-25 09:18:14', '2024-10-25 09:18:14'),
(18, 4, 'model', 'Device Model ', 'text', NULL, NULL, '2024-10-25 09:18:14', '2024-10-25 09:18:14'),
(19, 4, 'sn', 'Serial Number', 'text', NULL, NULL, '2024-10-25 09:18:14', '2024-10-25 09:18:14'),
(20, 4, 'imei_1', 'IMEI 1', 'text', NULL, NULL, '2024-10-25 09:18:14', '2024-10-25 09:18:14'),
(21, 4, 'imei_2', 'IMEI 2', 'text', NULL, NULL, '2024-10-25 09:18:14', '2024-10-25 09:18:14'),
(22, 4, 'price', 'Price', 'number', NULL, NULL, '2024-10-25 09:18:14', '2024-10-25 09:18:14'),
(23, 4, 'description', 'Description', 'textarea', NULL, NULL, '2024-10-25 09:18:14', '2024-10-25 09:18:14'),
(24, 5, 'name', 'Accessory Name', 'text', NULL, NULL, '2024-10-25 09:18:14', '2024-10-25 09:18:14'),
(25, 5, 'brand', 'Accessory Brand', 'text', NULL, NULL, '2024-10-25 09:18:14', '2024-10-25 09:18:14'),
(26, 5, 'type', 'Accessory Type', 'text', NULL, NULL, '2024-10-25 09:18:14', '2024-10-25 09:18:14'),
(27, 5, 'model', 'Accessory Model', 'text', NULL, NULL, '2024-10-25 09:18:14', '2024-10-25 09:18:14'),
(28, 5, 'price', 'Price', 'number', NULL, NULL, '2024-10-25 09:18:14', '2024-10-25 09:18:14'),
(29, 5, 'description', 'Description', 'textarea', NULL, NULL, '2024-10-25 09:18:14', '2024-10-25 09:18:14'),
(30, 6, 'name', 'Spare Part Name', 'text', NULL, NULL, '2024-10-25 09:18:14', '2024-10-25 09:18:14'),
(31, 6, 'brand', 'Spare Part Brand', 'text', NULL, NULL, '2024-10-25 09:18:14', '2024-10-25 09:18:14'),
(32, 6, 'type', 'Spare Part Type', 'text', NULL, NULL, '2024-10-25 09:18:14', '2024-10-25 09:18:14'),
(33, 6, 'model', 'Spare Part Model', 'text', NULL, NULL, '2024-10-25 09:18:14', '2024-10-25 09:18:14'),
(34, 6, 'price', 'Price', 'number', NULL, NULL, '2024-10-25 09:18:14', '2024-10-25 09:18:14'),
(35, 6, 'description', 'Description', 'textarea', NULL, NULL, '2024-10-25 09:18:14', '2024-10-25 09:18:14'),
(36, 7, 'name', 'Tool Name', 'text', NULL, NULL, '2024-10-25 09:18:14', '2024-10-25 09:18:14'),
(37, 7, 'brand', 'Tool Brand', 'text', NULL, NULL, '2024-10-25 09:18:14', '2024-10-25 09:18:14'),
(38, 7, 'type', 'Tool Type', 'text', NULL, NULL, '2024-10-25 09:18:14', '2024-10-25 09:18:14'),
(39, 7, 'model', 'Tool Model', 'text', NULL, NULL, '2024-10-25 09:18:14', '2024-10-25 09:18:14'),
(40, 7, 'price', 'Price', 'number', NULL, NULL, '2024-10-25 09:18:14', '2024-10-25 09:18:14'),
(41, 7, 'description', 'Description', 'textarea', NULL, NULL, '2024-10-25 09:18:14', '2024-10-25 09:18:14'),
(42, 2, 'name', 'Technician Name', 'text', NULL, NULL, '2024-10-25 09:18:14', '2024-10-25 09:18:14'),
(43, 2, 'speciality', 'Speciality', 'text', NULL, NULL, '2024-10-25 09:18:14', '2024-10-25 09:18:14');

-- --------------------------------------------------------

--
-- Struktur dari tabel `devices`
--

CREATE TABLE `devices` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `brand` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `model` varchar(255) NOT NULL,
  `sn` varchar(255) DEFAULT NULL,
  `imei_1` varchar(255) DEFAULT NULL,
  `imei_2` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `files`
--

CREATE TABLE `files` (
  `id` char(26) NOT NULL,
  `upload_name` varchar(255) DEFAULT NULL,
  `hash_name` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `dir` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_by` char(26) DEFAULT NULL,
  `updated_by` char(26) DEFAULT NULL,
  `deleted_by` char(26) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `forms`
--

CREATE TABLE `forms` (
  `id` char(26) NOT NULL,
  `name` varchar(255) NOT NULL,
  `fields` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`fields`)),
  `user_id` char(26) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_by` char(26) DEFAULT NULL,
  `updated_by` char(26) DEFAULT NULL,
  `deleted_by` char(26) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `form_records`
--

CREATE TABLE `form_records` (
  `id` char(26) NOT NULL,
  `form_id` char(26) NOT NULL,
  `fields` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`fields`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_by` char(26) DEFAULT NULL,
  `updated_by` char(26) DEFAULT NULL,
  `deleted_by` char(26) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `invoices`
--

CREATE TABLE `invoices` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `invoice_number` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `customer_id` bigint(20) UNSIGNED NOT NULL,
  `description` varchar(255) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `invoice_items`
--

CREATE TABLE `invoice_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `invoice_id` bigint(20) UNSIGNED NOT NULL,
  `description` varchar(255) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `links`
--

CREATE TABLE `links` (
  `id` char(26) NOT NULL,
  `name` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `real_link` text NOT NULL,
  `visit_count` int(11) NOT NULL DEFAULT 0,
  `last_visited_at` timestamp NULL DEFAULT NULL,
  `bot_protection` varchar(255) DEFAULT NULL,
  `bot_link` varchar(255) DEFAULT NULL,
  `user_id` char(26) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `link_visitors`
--

CREATE TABLE `link_visitors` (
  `id` char(26) NOT NULL,
  `link_id` char(36) NOT NULL,
  `request` text DEFAULT NULL,
  `header` text DEFAULT NULL,
  `device` varchar(255) DEFAULT NULL,
  `platform` varchar(255) DEFAULT NULL,
  `browser` varchar(255) DEFAULT NULL,
  `languages` varchar(255) DEFAULT NULL,
  `ip` varchar(255) DEFAULT NULL,
  `useragent` varchar(255) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_by` char(26) DEFAULT NULL,
  `updated_by` char(26) DEFAULT NULL,
  `deleted_by` char(26) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_users', 1),
(2, '0002_cache', 1),
(3, '0003_jobs', 1),
(4, '0004_settings', 1),
(5, '0005_files', 1),
(6, '0006_links', 1),
(7, '0007_link_visitor', 1),
(8, '0008_forms', 1),
(9, '0009_forms_records', 1),
(10, '0010_customers', 1),
(11, '0011_technicians', 1),
(12, '0012_repairs', 1),
(13, '0013_invoices', 1),
(14, '0013_invoices_items', 1),
(15, '0014_payments', 1),
(16, '0015_accessories', 1),
(17, '0015_devices', 1),
(18, '0015_spare_parts', 1),
(19, '0015_tools', 1),
(20, '0016_warranties', 1),
(21, '0017_refunds', 1),
(22, '0018_data_entries_category', 1),
(23, '0019_data_entries_category_field', 1),
(24, '0020_data_entries', 1),
(25, '0021_products', 1),
(26, '2024_10_13_212552_create_telescope_entries_table', 1),
(27, '2024_10_14_194112_create_test_modal_pages_table', 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `payments`
--

CREATE TABLE `payments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `date` date NOT NULL,
  `repair_id` bigint(20) UNSIGNED NOT NULL,
  `invoice_id` bigint(20) UNSIGNED NOT NULL,
  `sub_total` decimal(10,2) NOT NULL,
  `voucher` decimal(10,2) DEFAULT NULL,
  `total` decimal(10,2) NOT NULL,
  `down_payment` decimal(10,2) DEFAULT NULL,
  `payment_status` enum('pending','paid','partially_paid') NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `permissions`
--

CREATE TABLE `permissions` (
  `id` char(26) NOT NULL,
  `label` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `permissions`
--

INSERT INTO `permissions` (`id`, `label`, `name`, `created_at`, `updated_at`) VALUES
('01JB1FG6TBY35JM82YJ6HB67B7', 'View Dashboard', 'view-dashboard', NULL, NULL),
('01JB1FG6TJJ47GMMM4WYC8JJMQ', 'Create User', 'create-user', NULL, NULL),
('01JB1FG6TPZGB979RDQSHP7VYB', 'Update User', 'update-user', NULL, NULL),
('01JB1FG6TR397TK8HFRG77XAXS', 'View User', 'view-user', NULL, NULL),
('01JB1FG6TWQS9XNE3SRPHHVRHZ', 'Delete User', 'delete-user', NULL, NULL),
('01JB1FG6V0KQNPDVV0HNSDXH1V', 'Create Role', 'create-role', NULL, NULL),
('01JB1FG6V3KHPW5SKMT6ZMM5M2', 'Update Role', 'update-role', NULL, NULL),
('01JB1FG6V618CMQ1AEQWN9Y49T', 'View Role', 'view-role', NULL, NULL),
('01JB1FG6V91DH0VCA188CNDTS1', 'Delete Role', 'delete-role', NULL, NULL),
('01JB1FG6VCQ4GJAJRG62GC01P5', 'View Setting', 'view-setting', NULL, NULL),
('01JB1FG6VFR2G084ENDC9MJF8B', 'View Shortlink', 'view-shortlink', NULL, NULL),
('01JB1FG6VJBFQPBWSMSNS3P5FK', 'Create Custom Form', 'create-custom-form', NULL, NULL),
('01JB1FG6VPD21R59GF4ESGNTZY', 'Update Custom Form', 'update-custom-form', NULL, NULL),
('01JB1FG6VSCSRK67KGZR5WR3RS', 'View Custom Form', 'view-custom-form', NULL, NULL),
('01JB1FG6VXYJF8NM02A4FMGZ42', 'Delete Custom Form', 'delete-custom-form', NULL, NULL),
('01JB1FG6W0XG109934C8ETJJ9X', 'Create Custom Form Record', 'create-custom-form-record', NULL, NULL),
('01JB1FG6W2A4ZKT2XYYJMT4Y8A', 'Update Custom Form Record', 'update-custom-form-record', NULL, NULL),
('01JB1FG6W49CEDZ9EG1RPYDV32', 'View Custom Form Record', 'view-custom-form-record', NULL, NULL),
('01JB1FG6W6ASJSZG6TT7YW5Y2T', 'Delete Custom Form Record', 'delete-custom-form-record', NULL, NULL),
('01JB1FG6W80J55PGKSP7CVDNFA', 'Create Data Entry', 'create-data-entry', NULL, NULL),
('01JB1FG6WBRNVWX8EA5QW83BDT', 'Update Data Entry', 'update-data-entry', NULL, NULL),
('01JB1FG6WD2JVH25FNBS7MSD0D', 'View Data Entry', 'view-data-entry', NULL, NULL),
('01JB1FG6WFEFKHH7DK3DPVSJ5A', 'Delete Data Entry', 'delete-data-entry', NULL, NULL),
('01JB1FG6WHVMYC1CA5MF1VAA23', 'Create Customer', 'create-customer', NULL, NULL),
('01JB1FG6WKVPN7NBA0A5TT3QAS', 'Update Customer', 'update-customer', NULL, NULL),
('01JB1FG6WNBJVC0H179V4EY9W2', 'View Customer', 'view-customer', NULL, NULL),
('01JB1FG6WRZXTF2MZXD1WSXG2P', 'Delete Customer', 'delete-customer', NULL, NULL),
('01JB1FG6WTK8T6GMR26VAYZ27B', 'Create Test Modal Page', 'create-test-modal-page', NULL, NULL),
('01JB1FG6WYTP8QGBQGHJVBF7R3', 'Update Test Modal Page', 'update-test-modal-page', NULL, NULL),
('01JB1FG6X2TAG74DP3ZKXA900E', 'View Test Modal Page', 'view-test-modal-page', NULL, NULL),
('01JB1FG6X4F89R1M6NRB3WPBTN', 'Delete Test Modal Page', 'delete-test-modal-page', NULL, NULL),
('01JB1FG6X7WJDBK80PWD0S3HJR', 'View Products', 'view-products', NULL, NULL),
('01JB1FG6XABBVXTKTR86Y78X1F', 'View Tools', 'view-tools', NULL, NULL),
('01JB1FG6XDXPYP5TJFA4F8FNJD', 'View Spare Parts', 'view-spare-parts', NULL, NULL),
('01JB1FG6XG88CVH34Q5J2J53CY', 'Create Accessories', 'create-accessories', NULL, NULL),
('01JB1FG6XMAG5K29E6SA8PC158', 'Update Accessories', 'update-accessories', NULL, NULL),
('01JB1FG6XS0XZVVY4W9WV073PZ', 'View Accessories', 'view-accessories', NULL, NULL),
('01JB1FG6XWK73PFJR3K8KMQXHN', 'Delete Accessories', 'delete-accessories', NULL, NULL),
('01JB1FG6XZE9Y6HCNRZMBK79TX', 'Create Device', 'create-device', NULL, NULL),
('01JB1FG6Y2QKJNXZEQ90YNRHQR', 'Update Device', 'update-device', NULL, NULL),
('01JB1FG6Y67Q98RMTSKGHHHR19', 'View Device', 'view-device', NULL, NULL),
('01JB1FG6Y99TP43KKJRP663RME', 'Delete Device', 'delete-device', NULL, NULL),
('01JB1FG6YDPSZ0NA4PGJHTGX67', 'View Repairs', 'view-repairs', NULL, NULL),
('01JB1FG6YGJS2SK3ZQMPHM1P3B', 'View Repairs Dashboard', 'view-repairs-dashboard', NULL, NULL),
('01JB1FG6YM94SSJVRD2D62HW8Z', 'View Repairs Data Overview', 'view-repairs-overview', NULL, NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `products`
--

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `category_id` bigint(20) UNSIGNED DEFAULT NULL,
  `type` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `refunds`
--

CREATE TABLE `refunds` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `invoice_id` bigint(20) UNSIGNED NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `date` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `repairs`
--

CREATE TABLE `repairs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `entry_date` date NOT NULL,
  `customer_id` bigint(20) UNSIGNED NOT NULL,
  `invoice_number` varchar(255) DEFAULT NULL,
  `cashier` varchar(255) NOT NULL,
  `phone_brand` varchar(255) NOT NULL,
  `imei_sn_1` varchar(255) DEFAULT NULL,
  `imei_sn_2` varchar(255) DEFAULT NULL,
  `damage_description` text NOT NULL,
  `phone_accessories` text DEFAULT NULL,
  `technician_id` bigint(20) UNSIGNED NOT NULL,
  `under_warranty` tinyint(1) NOT NULL,
  `warranty_duration` int(11) DEFAULT NULL,
  `exit_date` date DEFAULT NULL,
  `print_type` varchar(255) NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `roles`
--

CREATE TABLE `roles` (
  `id` char(26) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_by` char(26) DEFAULT NULL,
  `updated_by` char(26) DEFAULT NULL,
  `deleted_by` char(26) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `roles`
--

INSERT INTO `roles` (`id`, `name`, `created_at`, `updated_at`, `deleted_at`, `created_by`, `updated_by`, `deleted_by`) VALUES
('01jb1fg6yvbhpmkyrwg31vgekh', 'admin', '2024-10-25 09:18:12', '2024-10-25 09:18:12', NULL, NULL, NULL, NULL),
('01jb1fg7xh1ayewa6whnvhj17k', 'guest', '2024-10-25 09:18:13', '2024-10-25 09:18:13', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `role_permissions`
--

CREATE TABLE `role_permissions` (
  `id` char(26) NOT NULL,
  `role_id` char(26) NOT NULL,
  `permission_id` char(26) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `role_permissions`
--

INSERT INTO `role_permissions` (`id`, `role_id`, `permission_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
('01jb1fg72r6af8gg9v4h68gsyy', '01jb1fg6yvbhpmkyrwg31vgekh', '01JB1FG6TBY35JM82YJ6HB67B7', '2024-10-25 09:18:13', '2024-10-25 09:18:13', NULL),
('01jb1fg72zz0ntv90t29ncvasj', '01jb1fg6yvbhpmkyrwg31vgekh', '01JB1FG6TJJ47GMMM4WYC8JJMQ', '2024-10-25 09:18:13', '2024-10-25 09:18:13', NULL),
('01jb1fg7323ykndn14t88yprk3', '01jb1fg6yvbhpmkyrwg31vgekh', '01JB1FG6TPZGB979RDQSHP7VYB', '2024-10-25 09:18:13', '2024-10-25 09:18:13', NULL),
('01jb1fg73577r2qswxkc8yjzf1', '01jb1fg6yvbhpmkyrwg31vgekh', '01JB1FG6TR397TK8HFRG77XAXS', '2024-10-25 09:18:13', '2024-10-25 09:18:13', NULL),
('01jb1fg738g2abcry4k59shn3v', '01jb1fg6yvbhpmkyrwg31vgekh', '01JB1FG6TWQS9XNE3SRPHHVRHZ', '2024-10-25 09:18:13', '2024-10-25 09:18:13', NULL),
('01jb1fg73bpfdn1rmmnvprjawx', '01jb1fg6yvbhpmkyrwg31vgekh', '01JB1FG6V0KQNPDVV0HNSDXH1V', '2024-10-25 09:18:13', '2024-10-25 09:18:13', NULL),
('01jb1fg73ensdgvbsnqg6scqyn', '01jb1fg6yvbhpmkyrwg31vgekh', '01JB1FG6V3KHPW5SKMT6ZMM5M2', '2024-10-25 09:18:13', '2024-10-25 09:18:13', NULL),
('01jb1fg73hke11fzqyjmbz4srr', '01jb1fg6yvbhpmkyrwg31vgekh', '01JB1FG6V618CMQ1AEQWN9Y49T', '2024-10-25 09:18:13', '2024-10-25 09:18:13', NULL),
('01jb1fg73m2zn4cg4y289z945w', '01jb1fg6yvbhpmkyrwg31vgekh', '01JB1FG6V91DH0VCA188CNDTS1', '2024-10-25 09:18:13', '2024-10-25 09:18:13', NULL),
('01jb1fg73qmgcyps9zj3xz7dc3', '01jb1fg6yvbhpmkyrwg31vgekh', '01JB1FG6VCQ4GJAJRG62GC01P5', '2024-10-25 09:18:13', '2024-10-25 09:18:13', NULL),
('01jb1fg73tw3py3t5fe2jwavsq', '01jb1fg6yvbhpmkyrwg31vgekh', '01JB1FG6VFR2G084ENDC9MJF8B', '2024-10-25 09:18:13', '2024-10-25 09:18:13', NULL),
('01jb1fg73wb3j4h500ene64e9t', '01jb1fg6yvbhpmkyrwg31vgekh', '01JB1FG6VJBFQPBWSMSNS3P5FK', '2024-10-25 09:18:13', '2024-10-25 09:18:13', NULL),
('01jb1fg74093hy2kknq5kb03vz', '01jb1fg6yvbhpmkyrwg31vgekh', '01JB1FG6VPD21R59GF4ESGNTZY', '2024-10-25 09:18:13', '2024-10-25 09:18:13', NULL),
('01jb1fg7493h2ap1arx233zjay', '01jb1fg6yvbhpmkyrwg31vgekh', '01JB1FG6VSCSRK67KGZR5WR3RS', '2024-10-25 09:18:13', '2024-10-25 09:18:13', NULL),
('01jb1fg74bcgkht332xp44asvh', '01jb1fg6yvbhpmkyrwg31vgekh', '01JB1FG6VXYJF8NM02A4FMGZ42', '2024-10-25 09:18:13', '2024-10-25 09:18:13', NULL),
('01jb1fg74eqskhwfyvy0cnpext', '01jb1fg6yvbhpmkyrwg31vgekh', '01JB1FG6W0XG109934C8ETJJ9X', '2024-10-25 09:18:13', '2024-10-25 09:18:13', NULL),
('01jb1fg74mzd2922ttfg4d40ek', '01jb1fg6yvbhpmkyrwg31vgekh', '01JB1FG6W2A4ZKT2XYYJMT4Y8A', '2024-10-25 09:18:13', '2024-10-25 09:18:13', NULL),
('01jb1fg7518t9mqvb7k9j9j3x2', '01jb1fg6yvbhpmkyrwg31vgekh', '01JB1FG6W49CEDZ9EG1RPYDV32', '2024-10-25 09:18:13', '2024-10-25 09:18:13', NULL),
('01jb1fg75jnsft8h0eaj8vhcgv', '01jb1fg6yvbhpmkyrwg31vgekh', '01JB1FG6W6ASJSZG6TT7YW5Y2T', '2024-10-25 09:18:13', '2024-10-25 09:18:13', NULL),
('01jb1fg75tqrmhmw8yzaj9hscp', '01jb1fg6yvbhpmkyrwg31vgekh', '01JB1FG6W80J55PGKSP7CVDNFA', '2024-10-25 09:18:13', '2024-10-25 09:18:13', NULL),
('01jb1fg75zqmj8jaep1d74s2k6', '01jb1fg6yvbhpmkyrwg31vgekh', '01JB1FG6WBRNVWX8EA5QW83BDT', '2024-10-25 09:18:13', '2024-10-25 09:18:13', NULL),
('01jb1fg763w2m0z1d6vv8jgkzq', '01jb1fg6yvbhpmkyrwg31vgekh', '01JB1FG6WD2JVH25FNBS7MSD0D', '2024-10-25 09:18:13', '2024-10-25 09:18:13', NULL),
('01jb1fg767qxp3zx46tnm8ths6', '01jb1fg6yvbhpmkyrwg31vgekh', '01JB1FG6WFEFKHH7DK3DPVSJ5A', '2024-10-25 09:18:13', '2024-10-25 09:18:13', NULL),
('01jb1fg76ccj28603hm5kss3m4', '01jb1fg6yvbhpmkyrwg31vgekh', '01JB1FG6WHVMYC1CA5MF1VAA23', '2024-10-25 09:18:13', '2024-10-25 09:18:13', NULL),
('01jb1fg76fvfvkg79xfgff9t9x', '01jb1fg6yvbhpmkyrwg31vgekh', '01JB1FG6WKVPN7NBA0A5TT3QAS', '2024-10-25 09:18:13', '2024-10-25 09:18:13', NULL),
('01jb1fg76khxrfnf8nxv6c2adk', '01jb1fg6yvbhpmkyrwg31vgekh', '01JB1FG6WNBJVC0H179V4EY9W2', '2024-10-25 09:18:13', '2024-10-25 09:18:13', NULL),
('01jb1fg76spj1xw20axd7fpyrb', '01jb1fg6yvbhpmkyrwg31vgekh', '01JB1FG6WRZXTF2MZXD1WSXG2P', '2024-10-25 09:18:13', '2024-10-25 09:18:13', NULL),
('01jb1fg76x6p35rk8x76v75e7w', '01jb1fg6yvbhpmkyrwg31vgekh', '01JB1FG6WTK8T6GMR26VAYZ27B', '2024-10-25 09:18:13', '2024-10-25 09:18:13', NULL),
('01jb1fg76z1206eas6vcy16g5s', '01jb1fg6yvbhpmkyrwg31vgekh', '01JB1FG6WYTP8QGBQGHJVBF7R3', '2024-10-25 09:18:13', '2024-10-25 09:18:13', NULL),
('01jb1fg7731s5ty6q4xdqdqhcg', '01jb1fg6yvbhpmkyrwg31vgekh', '01JB1FG6X2TAG74DP3ZKXA900E', '2024-10-25 09:18:13', '2024-10-25 09:18:13', NULL),
('01jb1fg775dssmssaedny9e0nq', '01jb1fg6yvbhpmkyrwg31vgekh', '01JB1FG6X4F89R1M6NRB3WPBTN', '2024-10-25 09:18:13', '2024-10-25 09:18:13', NULL),
('01jb1fg779e617tnktfa20mes8', '01jb1fg6yvbhpmkyrwg31vgekh', '01JB1FG6X7WJDBK80PWD0S3HJR', '2024-10-25 09:18:13', '2024-10-25 09:18:13', NULL),
('01jb1fg77c8sj23420px43tp51', '01jb1fg6yvbhpmkyrwg31vgekh', '01JB1FG6XABBVXTKTR86Y78X1F', '2024-10-25 09:18:13', '2024-10-25 09:18:13', NULL),
('01jb1fg77fdkehpts3gx568ce0', '01jb1fg6yvbhpmkyrwg31vgekh', '01JB1FG6XDXPYP5TJFA4F8FNJD', '2024-10-25 09:18:13', '2024-10-25 09:18:13', NULL),
('01jb1fg77j2qkajnnck1rw93zc', '01jb1fg6yvbhpmkyrwg31vgekh', '01JB1FG6XG88CVH34Q5J2J53CY', '2024-10-25 09:18:13', '2024-10-25 09:18:13', NULL),
('01jb1fg77pejv5657nyjmfmb5v', '01jb1fg6yvbhpmkyrwg31vgekh', '01JB1FG6XMAG5K29E6SA8PC158', '2024-10-25 09:18:13', '2024-10-25 09:18:13', NULL),
('01jb1fg77wbm9zr86bbzs9hdd4', '01jb1fg6yvbhpmkyrwg31vgekh', '01JB1FG6XS0XZVVY4W9WV073PZ', '2024-10-25 09:18:13', '2024-10-25 09:18:13', NULL),
('01jb1fg7809ehqz8v4zmxrgjk3', '01jb1fg6yvbhpmkyrwg31vgekh', '01JB1FG6XWK73PFJR3K8KMQXHN', '2024-10-25 09:18:13', '2024-10-25 09:18:13', NULL),
('01jb1fg786r9jzm886y839c99g', '01jb1fg6yvbhpmkyrwg31vgekh', '01JB1FG6XZE9Y6HCNRZMBK79TX', '2024-10-25 09:18:13', '2024-10-25 09:18:13', NULL),
('01jb1fg78cnwdcp958tc7c85vg', '01jb1fg6yvbhpmkyrwg31vgekh', '01JB1FG6Y2QKJNXZEQ90YNRHQR', '2024-10-25 09:18:13', '2024-10-25 09:18:13', NULL),
('01jb1fg78fy93ddqwwr8ch9cj3', '01jb1fg6yvbhpmkyrwg31vgekh', '01JB1FG6Y67Q98RMTSKGHHHR19', '2024-10-25 09:18:13', '2024-10-25 09:18:13', NULL),
('01jb1fg78nh54qww4bnex3knex', '01jb1fg6yvbhpmkyrwg31vgekh', '01JB1FG6Y99TP43KKJRP663RME', '2024-10-25 09:18:13', '2024-10-25 09:18:13', NULL),
('01jb1fg78tjxnwj55pn172xsrs', '01jb1fg6yvbhpmkyrwg31vgekh', '01JB1FG6YDPSZ0NA4PGJHTGX67', '2024-10-25 09:18:13', '2024-10-25 09:18:13', NULL),
('01jb1fg78zegb5dxtjnhj29c2h', '01jb1fg6yvbhpmkyrwg31vgekh', '01JB1FG6YGJS2SK3ZQMPHM1P3B', '2024-10-25 09:18:13', '2024-10-25 09:18:13', NULL),
('01jb1fg793j38ps6r7nrewcp66', '01jb1fg6yvbhpmkyrwg31vgekh', '01JB1FG6YM94SSJVRD2D62HW8Z', '2024-10-25 09:18:13', '2024-10-25 09:18:13', NULL),
('01jb1fg7xq9tn0866p58e4986c', '01jb1fg7xh1ayewa6whnvhj17k', '01JB1FG6VFR2G084ENDC9MJF8B', '2024-10-25 09:18:13', '2024-10-25 09:18:13', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` char(26) DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `settings`
--

CREATE TABLE `settings` (
  `id` char(26) NOT NULL,
  `key` varchar(255) NOT NULL,
  `value` text NOT NULL,
  `type` varchar(255) NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `settings`
--

INSERT INTO `settings` (`id`, `key`, `value`, `type`, `deleted_at`, `created_at`, `updated_at`) VALUES
('01JB1FG6SK7XNVJ7EEEPSR6BGH', 'app_name', 'Point Management', 'text', NULL, NULL, NULL),
('01JB1FG6T5ZG18V19TQY5QWJDZ', 'app_logo', '', 'image', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `spare_parts`
--

CREATE TABLE `spare_parts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `brand` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `model` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `technicians`
--

CREATE TABLE `technicians` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `speciality` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `telescope_entries`
--

CREATE TABLE `telescope_entries` (
  `sequence` bigint(20) UNSIGNED NOT NULL,
  `uuid` char(36) NOT NULL,
  `batch_id` char(36) NOT NULL,
  `family_hash` varchar(255) DEFAULT NULL,
  `should_display_on_index` tinyint(1) NOT NULL DEFAULT 1,
  `type` varchar(20) NOT NULL,
  `content` longtext NOT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `telescope_entries`
--

INSERT INTO `telescope_entries` (`sequence`, `uuid`, `batch_id`, `family_hash`, `should_display_on_index`, `type`, `content`, `created_at`) VALUES
(1, '9d542910-4238-4e96-a4b8-df7f52202e7a', '9d542910-49e0-4f14-9afc-7bb75f2462de', NULL, 1, 'command', '{\"command\":\"list\",\"exit_code\":0,\"arguments\":{\"command\":\"list\",\"namespace\":null},\"options\":{\"raw\":false,\"format\":\"txt\",\"short\":false,\"help\":false,\"quiet\":false,\"verbose\":false,\"version\":false,\"ansi\":null,\"no-interaction\":false,\"env\":null},\"hostname\":\"DESKTOP-MSAON6U\"}', '2024-10-25 16:18:37'),
(2, '9d542910-4975-47b0-825d-dbf1e41651d8', '9d542910-4e87-480a-8fd2-f84410bf4a4b', NULL, 1, 'command', '{\"command\":\"list\",\"exit_code\":0,\"arguments\":{\"command\":\"list\",\"namespace\":null},\"options\":{\"raw\":false,\"format\":\"txt\",\"short\":false,\"help\":false,\"quiet\":false,\"verbose\":false,\"version\":false,\"ansi\":null,\"no-interaction\":false,\"env\":null},\"hostname\":\"DESKTOP-MSAON6U\"}', '2024-10-25 16:18:37');

-- --------------------------------------------------------

--
-- Struktur dari tabel `telescope_entries_tags`
--

CREATE TABLE `telescope_entries_tags` (
  `entry_uuid` char(36) NOT NULL,
  `tag` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `telescope_monitoring`
--

CREATE TABLE `telescope_monitoring` (
  `tag` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `test_modal_pages`
--

CREATE TABLE `test_modal_pages` (
  `id` char(26) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_by` char(26) DEFAULT NULL,
  `updated_by` char(26) DEFAULT NULL,
  `deleted_by` char(26) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `tools`
--

CREATE TABLE `tools` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `brand` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `model` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` char(26) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role_id` char(26) DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_by` char(26) DEFAULT NULL,
  `updated_by` char(26) DEFAULT NULL,
  `deleted_by` char(26) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `role_id`, `remember_token`, `created_at`, `updated_at`, `created_by`, `updated_by`, `deleted_by`) VALUES
('01jb1fg7kgtb18c8jxbw4j6jar', 'Super Administrator', 'root@admin.com', NULL, '$2y$12$lkyUBXqD0H7a4vbdItF0TOZd3M8AJOsMHC.aMAwP3mHezfdOXiACe', NULL, NULL, '2024-10-25 09:18:13', '2024-10-25 09:18:13', NULL, NULL, NULL),
('01jb1fg7xbr3qn75yfw47jqt5b', 'Administator', 'admin@admin.com', NULL, '$2y$12$3MYOpXS1DF5GDis9f6xlIOooh/.EIDWS0Fq8.IgMj5TihcHWDD7Jm', '01jb1fg6yvbhpmkyrwg31vgekh', NULL, '2024-10-25 09:18:13', '2024-10-25 09:18:13', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `warranties`
--

CREATE TABLE `warranties` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `repair_id` bigint(20) UNSIGNED NOT NULL,
  `customer_id` bigint(20) UNSIGNED NOT NULL,
  `invoice_id` bigint(20) UNSIGNED NOT NULL,
  `warranty_duration` int(11) NOT NULL,
  `date_claimed` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `accessories`
--
ALTER TABLE `accessories`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indeks untuk tabel `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indeks untuk tabel `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `data_entries`
--
ALTER TABLE `data_entries`
  ADD PRIMARY KEY (`id`),
  ADD KEY `data_entries_data_entries_category_id_foreign` (`data_entries_category_id`);

--
-- Indeks untuk tabel `data_entries_category`
--
ALTER TABLE `data_entries_category`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `data_entries_category_name_unique` (`name`);

--
-- Indeks untuk tabel `data_entries_category_field`
--
ALTER TABLE `data_entries_category_field`
  ADD PRIMARY KEY (`id`),
  ADD KEY `data_entries_category_field_data_entries_category_id_foreign` (`data_entries_category_id`);

--
-- Indeks untuk tabel `devices`
--
ALTER TABLE `devices`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indeks untuk tabel `files`
--
ALTER TABLE `files`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `forms`
--
ALTER TABLE `forms`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `form_records`
--
ALTER TABLE `form_records`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `invoices_invoice_number_unique` (`invoice_number`),
  ADD KEY `invoices_customer_id_foreign` (`customer_id`);

--
-- Indeks untuk tabel `invoice_items`
--
ALTER TABLE `invoice_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `invoice_items_invoice_id_foreign` (`invoice_id`);

--
-- Indeks untuk tabel `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indeks untuk tabel `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `links`
--
ALTER TABLE `links`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `link_visitors`
--
ALTER TABLE `link_visitors`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indeks untuk tabel `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `payments_repair_id_foreign` (`repair_id`),
  ADD KEY `payments_invoice_id_foreign` (`invoice_id`);

--
-- Indeks untuk tabel `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `products_category_id_foreign` (`category_id`);

--
-- Indeks untuk tabel `refunds`
--
ALTER TABLE `refunds`
  ADD PRIMARY KEY (`id`),
  ADD KEY `refunds_invoice_id_foreign` (`invoice_id`);

--
-- Indeks untuk tabel `repairs`
--
ALTER TABLE `repairs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `repairs_customer_id_foreign` (`customer_id`),
  ADD KEY `repairs_technician_id_foreign` (`technician_id`);

--
-- Indeks untuk tabel `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `role_permissions`
--
ALTER TABLE `role_permissions`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indeks untuk tabel `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `spare_parts`
--
ALTER TABLE `spare_parts`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `technicians`
--
ALTER TABLE `technicians`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `telescope_entries`
--
ALTER TABLE `telescope_entries`
  ADD PRIMARY KEY (`sequence`),
  ADD UNIQUE KEY `telescope_entries_uuid_unique` (`uuid`),
  ADD KEY `telescope_entries_batch_id_index` (`batch_id`),
  ADD KEY `telescope_entries_family_hash_index` (`family_hash`),
  ADD KEY `telescope_entries_created_at_index` (`created_at`),
  ADD KEY `telescope_entries_type_should_display_on_index_index` (`type`,`should_display_on_index`);

--
-- Indeks untuk tabel `telescope_entries_tags`
--
ALTER TABLE `telescope_entries_tags`
  ADD PRIMARY KEY (`entry_uuid`,`tag`),
  ADD KEY `telescope_entries_tags_tag_index` (`tag`);

--
-- Indeks untuk tabel `telescope_monitoring`
--
ALTER TABLE `telescope_monitoring`
  ADD PRIMARY KEY (`tag`);

--
-- Indeks untuk tabel `test_modal_pages`
--
ALTER TABLE `test_modal_pages`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `tools`
--
ALTER TABLE `tools`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indeks untuk tabel `warranties`
--
ALTER TABLE `warranties`
  ADD PRIMARY KEY (`id`),
  ADD KEY `warranties_repair_id_foreign` (`repair_id`),
  ADD KEY `warranties_customer_id_foreign` (`customer_id`),
  ADD KEY `warranties_invoice_id_foreign` (`invoice_id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `accessories`
--
ALTER TABLE `accessories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `customers`
--
ALTER TABLE `customers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `data_entries`
--
ALTER TABLE `data_entries`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `data_entries_category`
--
ALTER TABLE `data_entries_category`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT untuk tabel `data_entries_category_field`
--
ALTER TABLE `data_entries_category_field`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT untuk tabel `devices`
--
ALTER TABLE `devices`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `invoices`
--
ALTER TABLE `invoices`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `invoice_items`
--
ALTER TABLE `invoice_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT untuk tabel `payments`
--
ALTER TABLE `payments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `refunds`
--
ALTER TABLE `refunds`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `repairs`
--
ALTER TABLE `repairs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `spare_parts`
--
ALTER TABLE `spare_parts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `technicians`
--
ALTER TABLE `technicians`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `telescope_entries`
--
ALTER TABLE `telescope_entries`
  MODIFY `sequence` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `tools`
--
ALTER TABLE `tools`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `warranties`
--
ALTER TABLE `warranties`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `data_entries`
--
ALTER TABLE `data_entries`
  ADD CONSTRAINT `data_entries_data_entries_category_id_foreign` FOREIGN KEY (`data_entries_category_id`) REFERENCES `data_entries_category` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `data_entries_category_field`
--
ALTER TABLE `data_entries_category_field`
  ADD CONSTRAINT `data_entries_category_field_data_entries_category_id_foreign` FOREIGN KEY (`data_entries_category_id`) REFERENCES `data_entries_category` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `invoices`
--
ALTER TABLE `invoices`
  ADD CONSTRAINT `invoices_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `invoice_items`
--
ALTER TABLE `invoice_items`
  ADD CONSTRAINT `invoice_items_invoice_id_foreign` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_invoice_id_foreign` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `payments_repair_id_foreign` FOREIGN KEY (`repair_id`) REFERENCES `repairs` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `data_entries_category` (`id`) ON DELETE SET NULL;

--
-- Ketidakleluasaan untuk tabel `refunds`
--
ALTER TABLE `refunds`
  ADD CONSTRAINT `refunds_invoice_id_foreign` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `repairs`
--
ALTER TABLE `repairs`
  ADD CONSTRAINT `repairs_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `repairs_technician_id_foreign` FOREIGN KEY (`technician_id`) REFERENCES `technicians` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `telescope_entries_tags`
--
ALTER TABLE `telescope_entries_tags`
  ADD CONSTRAINT `telescope_entries_tags_entry_uuid_foreign` FOREIGN KEY (`entry_uuid`) REFERENCES `telescope_entries` (`uuid`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `warranties`
--
ALTER TABLE `warranties`
  ADD CONSTRAINT `warranties_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `warranties_invoice_id_foreign` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `warranties_repair_id_foreign` FOREIGN KEY (`repair_id`) REFERENCES `repairs` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
