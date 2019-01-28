SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

DROP TABLE IF EXISTS `property`;

CREATE TABLE `property` (
  `link` varchar(255) NOT NULL,
  `market_date` date NOT NULL,
  `location_country` varchar(50) NOT NULL,
  `location_city` varchar(50) NOT NULL,
  `location_address` varchar(255) DEFAULT NULL,
  `location_coordinates_lat` float DEFAULT NULL,
  `location_coordinates_lng` float DEFAULT NULL,
  `size_parcelm2` float DEFAULT NULL,
  `size_grossm2` float DEFAULT NULL,
  `size_netm2` float DEFAULT NULL,
  `size_rooms` float NOT NULL,
  `price_value` float NOT NULL,
  `price_currency` varchar(3) NOT NULL,
  `description` text,
  `title` varchar(255) DEFAULT NULL,
  `images` text,
  `sold` tinyint(4) NOT NULL,
  PRIMARY KEY (`link`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `city_status`;
CREATE TABLE `city_status` (
  `id` varchar(255) NOT NULL,
  `city` varchar(100) NOT NULL,
  `market_date` date NOT NULL,
  `total_price` float NOT NULL,
  `total_count` float NOT NULL,
  `total_m2` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `city_status`
  ADD PRIMARY KEY (`city`,`market_date`),
  ADD UNIQUE KEY `id` (`id`);