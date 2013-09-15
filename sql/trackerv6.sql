-- --------------------------------------------------------
-- Hôte:                         127.0.0.1
-- Version du serveur:           5.5.5-10.0.3-MariaDB - mariadb.org binary distribution
-- Serveur OS:                   Win64
-- HeidiSQL Version:             8.0.0.4396
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping database structure for bika
DROP DATABASE IF EXISTS `bika`;
CREATE DATABASE IF NOT EXISTS `bika` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `bika`;


-- Dumping structure for table bika.account
DROP TABLE IF EXISTS `account`;
CREATE TABLE IF NOT EXISTS `account` (
  `enterpriseId` smallint(5) unsigned NOT NULL,
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `accountLocked` tinyint(1) NOT NULL,
  `accountTxt` text,
  `accountTypeId` mediumint(8) unsigned NOT NULL,
  `accountCategory` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `enterpriseId` (`enterpriseId`),
  KEY `accountTypeId` (`accountTypeId`),
  CONSTRAINT `account_ibfk_1` FOREIGN KEY (`enterpriseId`) REFERENCES `enterprise` (`id`),
  CONSTRAINT `account_ibfk_2` FOREIGN KEY (`accountTypeId`) REFERENCES `accounttype` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=760501 DEFAULT CHARSET=utf8;

-- Dumping data for table bika.account: ~197 rows (environ)
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
REPLACE INTO `account` (`enterpriseId`, `id`, `accountLocked`, `accountTxt`, `accountTypeId`, `accountCategory`) VALUES
	(101, 100000, 0, 'capital social', 1, '300'),
	(101, 110000, 0, 'reserves', 1, '300'),
	(101, 120000, 0, 'report', 1, '300'),
	(101, 130000, 0, 'resultat', 1, '300'),
	(101, 130100, 0, 'benefice', 1, '300'),
	(101, 130200, 0, 'perte', 1, '300'),
	(101, 150000, 0, 'subventions d\'equipement', 1, '300'),
	(101, 150100, 0, 'etat', 1, '300'),
	(101, 150200, 0, 'organismes prives outre-mer', 1, '300'),
	(101, 160000, 0, 'emprunts et dettes a long terme', 1, '300'),
	(101, 170000, 0, 'emprunts et dettes a moyen terme', 1, '300'),
	(101, 180000, 0, 'provisions pour charges et pertes', 1, '300'),
	(101, 210000, 1, 'terrains', 1, '300'),
	(101, 220000, 1, 'immobilisations corporelles', 1, '300'),
	(101, 220100, 1, 'batiments et constructions (d\'exploitation)', 1, '300'),
	(101, 220200, 1, 'batiments residentiels', 1, '300'),
	(101, 220300, 1, 'installations d\'utilisation generale', 1, '300'),
	(101, 220400, 1, 'ambulances', 1, '300'),
	(101, 220500, 1, 'autres vehicules', 1, '300'),
	(101, 220600, 1, 'motos', 1, '300'),
	(101, 220700, 1, 'grands materiels hospitaliers', 1, '300'),
	(101, 220800, 1, 'centrales electriques', 1, '300'),
	(101, 220900, 1, 'autres materiels hospitaliers (radios,autoclaves)', 1, '300'),
	(101, 221000, 1, 'mobiliers de services', 1, '300'),
	(101, 221100, 1, 'mobiliers residentiels', 1, '300'),
	(101, 230000, 1, 'immobilisations corporelles en cours', 1, '300'),
	(101, 230100, 1, 'batiment en construction', 1, '300'),
	(101, 230200, 1, 'batiment residentiels en construction', 1, '300'),
	(101, 240000, 1, 'avances et acomptes sur immobilisations en commande', 1, '300'),
	(101, 240100, 1, 'batiments (tous)', 1, '300'),
	(101, 240200, 1, 'materiels (tous)', 1, '300'),
	(101, 240300, 1, 'mobiliers (tous)', 1, '300'),
	(101, 280000, 1, 'amortissemnts et provisions pour depreciation de la classe 2', 1, '300'),
	(101, 280100, 1, 'provision pour depreciation', 1, '300'),
	(101, 300000, 1, 'stocks medicaments et fiches', 1, '300'),
	(101, 300100, 1, 'pharmacie des stocks', 1, '300'),
	(101, 300200, 1, 'pharmacie d\'usage', 1, '300'),
	(101, 300300, 1, 'stock des fiches des malades', 1, '300'),
	(101, 300400, 1, 'fardes chemises pour des malades', 1, '300'),
	(101, 300500, 1, 'materiels', 1, '300'),
	(101, 310000, 1, 'autres matieres et fournitures', 1, '300'),
	(101, 310100, 1, 'planches', 1, '300'),
	(101, 310200, 1, 'toles', 1, '300'),
	(101, 310300, 1, 'ciments', 1, '300'),
	(101, 310400, 1, 'linges (literie)', 1, '300'),
	(101, 310500, 1, 'petrole', 1, '300'),
	(101, 310600, 1, 'carburants et huiles', 1, '300'),
	(101, 310700, 1, 'fournitures de bureau', 1, '300'),
	(101, 310800, 1, 'denrees alimentaires (a distribuer aux malades)', 1, '300'),
	(101, 310900, 1, 'divers stock', 1, '300'),
	(101, 311000, 1, 'pieces des rechanges', 1, '300'),
	(101, 311100, 1, 'cantine HEV', 1, '300'),
	(101, 360000, 1, 'socks a l\'exterieur', 1, '300'),
	(101, 380000, 1, 'provision pour depreciation de la classe 3', 1, '300'),
	(101, 400000, 1, 'fournisseur', 1, '300'),
	(101, 400100, 1, 'pharmacie centrale', 1, '300'),
	(101, 400200, 1, 'VEE', 1, '300'),
	(101, 400300, 1, 'autres fournisseurs', 1, '300'),
	(101, 410000, 1, 'clents', 1, '300'),
	(101, 410100, 1, 'bureau centrale de zone', 1, '300'),
	(101, 410200, 1, 'ITM Vanga', 1, '300'),
	(101, 410300, 1, 'pharmacie centrale', 1, '300'),
	(101, 410400, 1, 'frere CT', 1, '300'),
	(101, 410600, 1, NULL, 1, '300'),
	(101, 410700, 1, 'personnel de l\'HE', 1, '300'),
	(101, 410800, 1, 'autres clents', 1, '300'),
	(101, 410900, 1, 'construction vanga', 1, '300'),
	(101, 411000, 1, 'PAEV/Vanga', 1, '300'),
	(101, 411100, 1, 'ACDI/Lusekele', 1, '300'),
	(101, 411200, 1, 'MAF/Vanga', 1, '300'),
	(101, 420000, 1, 'personnel', 1, '300'),
	(101, 420100, 1, 'avances sur salaires au personnel', 1, '300'),
	(101, 420200, 1, 'remunerations dues', 1, '300'),
	(101, 420300, 1, 'toles pour agents', 1, '300'),
	(101, 430000, 1, 'Etat', 1, '300'),
	(101, 430100, 1, 'CPR', 1, '300'),
	(101, 430200, 1, 'autres taxes', 1, '300'),
	(101, 460000, 0, 'debiteurs et crediteurs divers', 1, '300'),
	(101, 460100, 0, 'INSS', 1, '300'),
	(101, 460200, 0, 'syndicat', 1, '300'),
	(101, 460300, 0, 'debiteurs divers', 1, '300'),
	(101, 460400, 0, 'crediteurs divers', 1, '300'),
	(101, 460500, 0, 'location des livres', 1, '300'),
	(101, 460600, 0, 'salaire agents clemmer', 1, '300'),
	(101, 470000, 0, 'regularisations et charges a etaler', 1, '300'),
	(101, 470100, 0, 'regularisations actives', 1, '300'),
	(101, 470200, 0, 'regularisations passives', 1, '300'),
	(101, 470300, 0, 'compte d\'attente a regulariser', 1, '300'),
	(101, 480000, 0, 'provision pour depreciation de la classe 3', 1, '300'),
	(101, 490000, 0, 'compte d\'attente a regulariser', 1, '300'),
	(101, 510000, 0, 'pret social du personnel', 1, '300'),
	(101, 550000, 0, 'cheque a encaisser (remise cheque)', 1, '300'),
	(101, 560000, 0, 'banque et coopec', 1, '300'),
	(101, 560100, 0, 'BCZ Kikwit', 1, '300'),
	(101, 560200, 0, 'Tresorerie generale', 1, '300'),
	(101, 560300, 0, 'COOPEC', 1, '300'),
	(101, 560400, 0, 'Pharmacie centrale compte epargne', 1, '300'),
	(101, 570000, 0, 'caisse', 1, '300'),
	(101, 590000, 0, 'virement interne', 1, '300'),
	(101, 600000, 0, 'stocks vendus', 1, '300'),
	(101, 600100, 0, 'Medicaments vendus aux malades', 1, '300'),
	(101, 600200, 0, 'Medicaments transferes aux services hospitaliers', 1, '300'),
	(101, 600300, 0, 'fiches vendues(fiches malades et fardes)', 1, '300'),
	(101, 600400, 0, 'Materiels(Rx,...)', 1, '300'),
	(101, 610000, 0, 'Matieres et fournitures consommees', 1, '300'),
	(101, 610100, 0, 'planches consommees', 1, '300'),
	(101, 610200, 0, 'toles consommees', 1, '300'),
	(101, 610300, 0, 'ciments consommes', 1, '300'),
	(101, 610400, 0, 'linges consommees', 1, '300'),
	(101, 610500, 0, 'petrole consomme', 1, '300'),
	(101, 610600, 0, 'carburants et huiles consommes', 1, '300'),
	(101, 610700, 0, 'fourniture de bureau consommees', 1, '300'),
	(101, 610800, 0, 'denrhees alimentaires aux malades', 1, '300'),
	(101, 610900, 0, 'divers consommes', 1, '300'),
	(101, 611000, 0, 'pieces de rechange consommes', 1, '300'),
	(101, 611100, 0, 'Electricite', 1, '300'),
	(101, 611200, 0, 'white cross', 1, '300'),
	(101, 620000, 0, 'transport consomme', 1, '300'),
	(101, 620100, 0, 'transport routier', 1, '300'),
	(101, 620200, 0, 'transport aerien', 1, '300'),
	(101, 620300, 0, 'Transport fluvial', 1, '300'),
	(101, 630000, 0, 'autres services consommes', 1, '300'),
	(101, 630100, 0, 'Honraires des medecins', 1, '300'),
	(101, 630200, 0, 'Entretien des batiments', 1, '300'),
	(101, 630300, 0, 'salaires des journaliers', 1, '300'),
	(101, 630400, 0, 'autres services consommes', 1, '300'),
	(101, 630500, 0, 'frais de mission', 1, '300'),
	(101, 630600, 0, 'Frais bancaires', 1, '300'),
	(101, 630700, 0, 'Frais de reparation', 1, '300'),
	(101, 630800, 0, 'loyers payes', 1, '300'),
	(101, 630900, 0, 'Publicite et annoces', 1, '300'),
	(101, 631000, 0, 'PTT', 1, '300'),
	(101, 640000, 0, 'charges et pertes diverses', 1, '300'),
	(101, 640100, 0, 'soins medicaux aux pensionnes', 1, '300'),
	(101, 640200, 0, 'Assurances de vehicules', 1, '300'),
	(101, 640300, 0, 'Assurances de motos', 1, '300'),
	(101, 640400, 0, 'Dons et liberalites(charges et pertes diverses)', 1, '300'),
	(101, 640500, 0, 'Perte de change', 1, '300'),
	(101, 640600, 0, 'Autres charges et pertes', 1, '300'),
	(101, 640800, 0, 'Contributions', 1, '300'),
	(101, 640900, 0, 'Receptions', 1, '300'),
	(101, 641000, 0, 'Soins aux pauvres', 1, '300'),
	(101, 650000, 0, 'Charge du personnel', 1, '300'),
	(101, 650100, 0, 'Salaires bruts', 1, '300'),
	(101, 650200, 0, 'Decompte final', 1, '300'),
	(101, 650300, 0, 'Soins medicaux aux personnels', 1, '300'),
	(101, 650400, 0, 'Complement slaires aux medecins', 1, '300'),
	(101, 650500, 1, 'Autres personnels missionnaires', 1, '300'),
	(101, 650600, 0, 'INSS(Quote part natiional)', 1, '300'),
	(101, 650700, 0, 'Autres charges du personnel', 1, '300'),
	(101, 650800, 0, 'Conges payes', 1, '300'),
	(101, 650900, 0, 'Pecules de conge', 1, '300'),
	(101, 651000, 0, 'Salaires agents Directeur Clemmer', 1, '300'),
	(101, 651100, 0, 'Subvention CS', 1, '300'),
	(101, 660000, 0, 'Taxes divers', 1, '300'),
	(101, 660100, 0, 'TAxes sur vehicules', 1, '300'),
	(101, 660200, 0, 'Taxes sur motos', 1, '300'),
	(101, 660300, 0, 'Taxes diverses', 1, '300'),
	(101, 670000, 0, 'Interets payes', 1, '300'),
	(101, 680000, 0, 'Dotations aux amortissements et provisions', 1, '300'),
	(101, 680100, 0, 'Batiments et constructions', 1, '300'),
	(101, 680200, 0, 'Batiments residentiels', 1, '300'),
	(101, 681200, 0, 'Autrea dotations et provisions', 1, '300'),
	(101, 700000, 0, 'Vente des medicaments et fiches', 1, '300'),
	(101, 700100, 0, 'Pharmacie d\'usage', 1, '300'),
	(101, 700200, 0, 'Ventes fiches', 1, '300'),
	(101, 710000, 0, 'Recettes d\'activites', 1, '300'),
	(101, 710100, 0, 'Pavillion(medical et chirurgical)', 1, '300'),
	(101, 710200, 0, 'Laboratoire', 1, '300'),
	(101, 710300, 0, 'Radiologie', 1, '300'),
	(101, 710400, 0, 'Chirurgie', 1, '300'),
	(101, 710500, 0, 'Pediatrie', 1, '300'),
	(101, 710600, 0, 'Maternite', 1, '300'),
	(101, 710700, 0, 'consultation polyclinique', 1, '300'),
	(101, 710800, 0, 'Clinique privee', 1, '300'),
	(101, 710900, 0, 'Dentisterie', 1, '300'),
	(101, 711000, 0, 'Ophtalmologie', 1, '300'),
	(101, 711100, 0, 'Administration', 1, '300'),
	(101, 711200, 0, 'Kinesitherapie', 1, '300'),
	(101, 711300, 0, 'Sanatorium', 1, '300'),
	(101, 711400, 0, 'Centre nutritionnel', 1, '300'),
	(101, 711500, 0, 'Sions intensifs', 1, '300'),
	(101, 711619, 0, 'Echographie', 1, '300'),
	(101, 711720, 0, 'ECG', 1, '300'),
	(101, 730000, 0, 'Travail propre et charge a etaler', 1, '300'),
	(101, 730100, 0, 'Travail propre', 1, '300'),
	(101, 730200, 0, 'Charges a etaler', 1, '300'),
	(101, 740000, 0, 'Produits et profits divers', 1, '300'),
	(101, 740100, 0, 'produits divers', 1, '300'),
	(101, 740200, 0, 'Profits divers', 1, '300'),
	(101, 740300, 0, 'Frais de formation', 1, '300'),
	(101, 760000, 0, 'Subvention d\'exploitation', 1, '300'),
	(101, 760100, 0, 'Salaire de d\'etat', 1, '300'),
	(101, 760200, 0, 'Autres subventions de l\'etat', 1, '300'),
	(101, 760300, 0, 'Subventions organismes prives', 1, '300'),
	(101, 760400, 0, 'Subventions locales', 1, '300'),
	(101, 760500, 0, 'Autres subventions', 1, '300');
/*!40000 ALTER TABLE `account` ENABLE KEYS */;


-- Dumping structure for table bika.accounttype
DROP TABLE IF EXISTS `accounttype`;
CREATE TABLE IF NOT EXISTS `accounttype` (
  `id` mediumint(8) unsigned NOT NULL,
  `type` varchar(35) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table bika.accounttype: ~6 rows (environ)
/*!40000 ALTER TABLE `accounttype` DISABLE KEYS */;
REPLACE INTO `accounttype` (`id`, `type`) VALUES
	(1, 'income/expense'),
	(2, 'balance'),
	(3, 'total'),
	(4, 'header'),
	(5, 'title'),
	(6, 'newpage');
/*!40000 ALTER TABLE `accounttype` ENABLE KEYS */;


-- Dumping structure for table bika.currency
DROP TABLE IF EXISTS `currency`;
CREATE TABLE IF NOT EXISTS `currency` (
  `id` tinyint(3) unsigned NOT NULL,
  `name` text NOT NULL,
  `symbol` varchar(15) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table bika.currency: ~3 rows (environ)
/*!40000 ALTER TABLE `currency` DISABLE KEYS */;
REPLACE INTO `currency` (`id`, `name`, `symbol`) VALUES
	(1, 'Franc Congolais', 'FC'),
	(2, 'United States Dollar', 'USD'),
	(3, 'Euro', 'EU');
/*!40000 ALTER TABLE `currency` ENABLE KEYS */;


-- Dumping structure for table bika.enterprise
DROP TABLE IF EXISTS `enterprise`;
CREATE TABLE IF NOT EXISTS `enterprise` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `region` varchar(70) NOT NULL,
  `country` varchar(70) NOT NULL,
  `city` varchar(70) NOT NULL,
  `name` varchar(70) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(70) NOT NULL,
  `type` varchar(70) NOT NULL,
  `cashAccount` mediumint(8) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `enterprise_ibfk_1` (`cashAccount`),
  CONSTRAINT `enterprise_ibfk_1` FOREIGN KEY (`cashAccount`) REFERENCES `account` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=103 DEFAULT CHARSET=utf8;

-- Dumping data for table bika.enterprise: ~2 rows (environ)
/*!40000 ALTER TABLE `enterprise` DISABLE KEYS */;
REPLACE INTO `enterprise` (`id`, `region`, `country`, `city`, `name`, `phone`, `email`, `type`, `cashAccount`) VALUES
	(101, 'Kinshasa', 'RDC', 'Kinshasa', 'IMA', '9419614377', 'jniles@example.com', '1', 570000),
	(102, 'Bandundu', 'RDC', 'Kikwit', 'IMAKik', '--', 'jniles@example.com', '1', 570000);
/*!40000 ALTER TABLE `enterprise` ENABLE KEYS */;


-- Dumping structure for table bika.fiscalyear
DROP TABLE IF EXISTS `fiscalyear`;
CREATE TABLE IF NOT EXISTS `fiscalyear` (
  `enterpriseId` smallint(5) unsigned NOT NULL,
  `id` mediumint(8) unsigned NOT NULL,
  `numberOfMonths` mediumint(8) unsigned NOT NULL,
  `fiscalYearTxt` text NOT NULL,
  `transactionStartNumber` int(10) unsigned NOT NULL,
  `transactionStopNumber` int(10) unsigned NOT NULL,
  `fiscalYearNumber` mediumint(9) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `enterpriseId` (`enterpriseId`),
  CONSTRAINT `fiscalyear_ibfk_1` FOREIGN KEY (`enterpriseId`) REFERENCES `enterprise` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table bika.fiscalyear: ~2 rows (environ)
/*!40000 ALTER TABLE `fiscalyear` DISABLE KEYS */;
REPLACE INTO `fiscalyear` (`enterpriseId`, `id`, `numberOfMonths`, `fiscalYearTxt`, `transactionStartNumber`, `transactionStopNumber`, `fiscalYearNumber`) VALUES
	(101, 2013001, 12, 'The First Fiscal Year of Company 101', 0, 100, 1),
	(102, 2013011, 12, 'The First Fiscal Year of Company 102', 1000, 1100, 1);
/*!40000 ALTER TABLE `fiscalyear` ENABLE KEYS */;


-- Dumping structure for table bika.journal
DROP TABLE IF EXISTS `journal`;
CREATE TABLE IF NOT EXISTS `journal` (
  `fiscalYearId` mediumint(8) unsigned NOT NULL,
  `id` mediumint(8) unsigned NOT NULL,
  `date` date NOT NULL,
  `userid` smallint(5) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fiscalYearId` (`fiscalYearId`),
  KEY `userid` (`userid`),
  CONSTRAINT `journal_ibfk_1` FOREIGN KEY (`fiscalYearId`) REFERENCES `fiscalyear` (`id`),
  CONSTRAINT `journal_ibfk_2` FOREIGN KEY (`userid`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table bika.journal: ~1 rows (environ)
/*!40000 ALTER TABLE `journal` DISABLE KEYS */;
REPLACE INTO `journal` (`fiscalYearId`, `id`, `date`, `userid`) VALUES
	(2013001, 1000, '2013-07-23', 1);
/*!40000 ALTER TABLE `journal` ENABLE KEYS */;


-- Dumping structure for table bika.period
DROP TABLE IF EXISTS `period`;
CREATE TABLE IF NOT EXISTS `period` (
  `fiscalYearId` mediumint(8) unsigned NOT NULL,
  `id` smallint(6) NOT NULL,
  `periodStart` date NOT NULL,
  `periodStop` date NOT NULL,
  `order` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fiscalYearId` (`fiscalYearId`),
  CONSTRAINT `period_ibfk_1` FOREIGN KEY (`fiscalYearId`) REFERENCES `fiscalyear` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table bika.period: ~1 rows (environ)
/*!40000 ALTER TABLE `period` DISABLE KEYS */;
REPLACE INTO `period` (`fiscalYearId`, `id`, `periodStart`, `periodStop`, `order`) VALUES
	(2013001, 1, '2013-07-01', '2013-07-31', '1');
/*!40000 ALTER TABLE `period` ENABLE KEYS */;


-- Dumping structure for table bika.role
DROP TABLE IF EXISTS `role`;
CREATE TABLE IF NOT EXISTS `role` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  `description` varchar(140) DEFAULT NULL,
  `role_head` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- Dumping data for table bika.role: ~5 rows (environ)
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
REPLACE INTO `role` (`id`, `name`, `description`, `role_head`) VALUES
	(1, 'Administrator', 'To be finished', 0),
	(2, 'admin', 'Administrateur simple', 1),
	(3, 'Finance', 'The Finance', 5),
	(4, 'Manager', 'Hospital Manager', 11),
	(5, 'Doctor', 'The physicien', 15);
/*!40000 ALTER TABLE `role` ENABLE KEYS */;


-- Dumping structure for table bika.role_unit
DROP TABLE IF EXISTS `role_unit`;
CREATE TABLE IF NOT EXISTS `role_unit` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `id_role` smallint(5) unsigned NOT NULL,
  `id_unit` mediumint(9) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_role` (`id_role`),
  KEY `id_unit` (`id_unit`),
  CONSTRAINT `role_unit_ibfk_1` FOREIGN KEY (`id_unit`) REFERENCES `unit` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `role_unit_ibfk_2` FOREIGN KEY (`id_role`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

-- Dumping data for table bika.role_unit: ~19 rows (environ)
/*!40000 ALTER TABLE `role_unit` DISABLE KEYS */;
REPLACE INTO `role_unit` (`id`, `id_role`, `id_unit`) VALUES
	(1, 1, 0),
	(3, 2, 2),
	(4, 2, 3),
	(5, 2, 4),
	(6, 3, 6),
	(7, 3, 7),
	(8, 3, 8),
	(9, 3, 9),
	(10, 3, 10),
	(11, 3, 20),
	(12, 3, 21),
	(13, 3, 22),
	(14, 4, 12),
	(15, 4, 13),
	(16, 4, 14),
	(17, 5, 16),
	(18, 5, 17),
	(19, 5, 18),
	(20, 5, 19);
/*!40000 ALTER TABLE `role_unit` ENABLE KEYS */;


-- Dumping structure for table bika.transaction
DROP TABLE IF EXISTS `transaction`;
CREATE TABLE IF NOT EXISTS `transaction` (
  `journalId` mediumint(8) unsigned NOT NULL,
  `lineId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `accountId` mediumint(8) unsigned NOT NULL,
  `credit` int(11) NOT NULL,
  `debit` int(11) NOT NULL,
  `docId` tinytext NOT NULL,
  `description` tinytext,
  `transNumber` int(10) unsigned NOT NULL,
  `transDate` date NOT NULL,
  `sysCurrency` tinyint(3) unsigned NOT NULL,
  `transCurrency` tinyint(3) unsigned NOT NULL,
  `exchangeRate` decimal(6,2) NOT NULL,
  PRIMARY KEY (`lineId`),
  KEY `journalId` (`journalId`),
  KEY `accountId` (`accountId`),
  KEY `sysCurrency` (`sysCurrency`),
  KEY `transCurrency` (`transCurrency`),
  CONSTRAINT `transaction_ibfk_1` FOREIGN KEY (`journalId`) REFERENCES `journal` (`id`),
  CONSTRAINT `transaction_ibfk_2` FOREIGN KEY (`accountId`) REFERENCES `account` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- Dumping data for table bika.transaction: ~5 rows (environ)
/*!40000 ALTER TABLE `transaction` DISABLE KEYS */;
REPLACE INTO `transaction` (`journalId`, `lineId`, `accountId`, `credit`, `debit`, `docId`, `description`, `transNumber`, `transDate`, `sysCurrency`, `transCurrency`, `exchangeRate`) VALUES
	(1000, 1, 220700, 40, 0, '20', 'descrip 1', 3, '2013-07-23', 1, 1, 920.00),
	(1000, 2, 220700, 0, 20, '40', 'descrip 2', 3, '2013-07-23', 1, 1, 930.00),
	(1000, 3, 650100, 100, 0, '0', 'descrip 3', 4, '2013-02-15', 1, 1, 910.00),
	(1000, 4, 711000, 23, 0, '0', 'descrip 4', 5, '2013-03-01', 1, 1, 910.00),
	(1000, 5, 711100, 0, 100, '0', 'descrip 5', 4, '2013-02-15', 1, 1, 910.00);
/*!40000 ALTER TABLE `transaction` ENABLE KEYS */;


-- Dumping structure for table bika.unit
DROP TABLE IF EXISTS `unit`;
CREATE TABLE IF NOT EXISTS `unit` (
  `id` mediumint(9) NOT NULL,
  `name` varchar(30) NOT NULL,
  `desc` text NOT NULL,
  `parent` smallint(6) DEFAULT NULL,
  `hasChildren` tinyint(1) NOT NULL,
  `url` tinytext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table bika.unit: ~25 rows (environ)
/*!40000 ALTER TABLE `unit` DISABLE KEYS */;
REPLACE INTO `unit` (`id`, `name`, `desc`, `parent`, `hasChildren`, `url`) VALUES
	(0, 'Root', 'The unseen root node', NULL, 1, ''),
	(1, 'Admin', 'The Administration Super-Category', 0, 1, ''),
	(2, 'Enterprises', 'Manage the registered enterprises from here', 1, 0, '/units/enterprise/'),
	(3, 'Form Manager', 'Manage your forms', 1, 0, '/units/formmanager/'),
	(4, 'Users & Permissions', 'Manage user privileges and permissions', 1, 0, '/units/permission/ 4'),
	(5, 'Finance', 'The Finance Super-Category', 0, 1, ''),
	(6, 'Accounts', 'The chart of accounts', 5, 0, '/units/accounts/'),
	(7, 'Charts', 'Analyze how your company is doing', 5, 0, '/units/charts/'),
	(8, 'Budgeting', 'Plan your next move', 5, 0, '/units/budgeting/'),
	(9, 'Journal', 'Daily Log', 5, 0, '/units/journal/'),
	(10, 'Reports', 'Do stuff and tell people about it', 5, 0, '/units/reports/'),
	(11, 'Inventory', 'The Inventory Super-Category', 0, 1, ''),
	(12, 'Orders', 'Manage your purchase orders', 11, 0, '/units/orders/'),
	(13, 'Stock', 'What is in stock?', 11, 0, '/units/stock/'),
	(14, 'Timeline', 'Inventory reporting and timeline', 11, 0, '/units/timeline/'),
	(15, 'Hospital', 'The Hospital Super-Category', 0, 1, ''),
	(16, 'Pharmacy', 'What\'s in your pharmacy?', 15, 0, '/units/pharmacy/'),
	(17, 'Laboratory', 'Analyze lab results', 15, 0, '/units/laboratory/'),
	(18, 'Surgery', 'Best cuttlery here!', 15, 0, '/units/surgery'),
	(19, 'Radiology', 'X-rays, anyone?', 15, 0, '/units/radiology/'),
	(20, 'Billing', 'Test pour le sous enfant', 5, 1, NULL),
	(21, 'Billing A', 'Sous enfant de Billing', 20, 0, '/html/com'),
	(22, 'Billing B', 'Deuxieme fils de Billing', 20, 0, '/html/deux'),
	(23, 'Billing C', '3 Fils', 20, 0, 'Lien hypertext'),
	(24, 'Balance', 'The Balance Sheet', 5, 0, '/units/balance/'),
  (25, 'Transaction', 'The Transaction Page', 5, 0, '/units/transaction/'),
  (26, 'Demo', 'Demos of key functionality', 0, 1, ''),
  (27, 'FullGrid', 'Demo: Full-page grid', 26, 0, '/units/demos/fullgrid/'),
  (28, 'PDFedit', 'Demo: PDFeditor', 26, 0, '/units/demos/pdfedit/'),
  (29, 'Graphics', 'Demo: Dojo Charting', 26, 0, '/units/demos/charting/'),
  (30, 'Error', 'Demo: This page doesn\'t exist', 26, 0, '/units/demos/error/'),
  (31, 'Linkage', 'Demo: SelectX updates each other', 26, 0, '/units/demos/linkage/');

/*!40000 ALTER TABLE `unit` ENABLE KEYS */;

-- Dumping structure for table bika.user
DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(80) NOT NULL,
  `password` varchar(100) NOT NULL,
  `first` text NOT NULL,
  `last` text NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `loggedIn` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- Dumping data for table bika.user: ~12 rows (environ)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
REPLACE INTO `user` (`id`, `username`, `password`, `first`, `last`, `email`, `loggedIn`) VALUES
	(1, 'jniles', 'K3mb3J@m', 'Jonathan', 'Niles', 'jonathanwniles@gmail.com', 0),
	(2, 'chris', 'c', 'CHRIS ', 'LOMAME', 'chris@ima.org', 0),
	(3, 'rdc', 'r', 'CONGO', 'DEMOCRATIQUE', 'rdc@rdc.cd', 0),
	(4, 'docta', 'd', 'Docteur House', 'Machine', 'd@his.cd', 0),
	(5, 'compta', 'c', 'Comptable', 'Analytique', 'c@his.cd', 0),
	(6, 'manager', 'm', 'Manager', 'Nationale', 'm@his.cd', 0),
	(7, 'admin', 'his', 'Simple', 'ADMINISTRATOR', 'admin@his', 0),
	(8, 'd1', 'd', 'Docteur Comptable', 'Médecin Economiste', 'dm@his.com', 0),
	(9, 'm1', 'm', 'Manager Administrateur', 'Gerant Systeme', 'manage@his.cd', 0),
	(10, 'docta1', 'dd', 'Docteur Simple', 'Limité', 'doctasimple@his.cd', 0),
	(11, 'admin', 'lmt', 'Administrateur', 'Limite', 'adminlimit@his.com', 0),
	(12, 'fin', 'f', 'Financier subalterne', 'Sous Financier', 'finance@his.com', 0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;


-- Dumping structure for table bika.user_role
DROP TABLE IF EXISTS `user_role`;
CREATE TABLE IF NOT EXISTS `user_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_role` smallint(5) unsigned NOT NULL,
  `id_user` smallint(5) unsigned NOT NULL,
  `allRight` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_role_unit` (`id_role`,`id_user`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `user_role_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_role_ibfk_3` FOREIGN KEY (`id_role`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

-- Dumping data for table bika.user_role: ~12 rows (environ)
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;
REPLACE INTO `user_role` (`id`, `id_role`, `id_user`, `allRight`) VALUES
	(1, 1, 1, 1),
	(2, 1, 2, 1),
	(3, 1, 3, 1),
	(4, 5, 8, 1),
	(5, 3, 8, 1),
	(6, 3, 12, 0),
	(7, 5, 4, 1),
	(8, 3, 5, 1),
	(9, 4, 6, 1),
	(10, 2, 7, 1),
	(11, 4, 9, 1),
	(12, 2, 9, 0);
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;


-- Dumping structure for table bika.user_role_description
DROP TABLE IF EXISTS `user_role_description`;
CREATE TABLE IF NOT EXISTS `user_role_description` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_role_unit` int(5) NOT NULL,
  `id_user` smallint(5) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_role_unit` (`id_role_unit`,`id_user`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `user_role_description_ibfk_1` FOREIGN KEY (`id_role_unit`) REFERENCES `role_unit` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_role_description_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

-- Dumping data for table bika.user_role_description: ~7 rows (environ)
/*!40000 ALTER TABLE `user_role_description` DISABLE KEYS */;
REPLACE INTO `user_role_description` (`id`, `id_role_unit`, `id_user`) VALUES
	(4, 4, 9),
	(5, 5, 9),
	(1, 8, 12),
	(2, 9, 12),
	(3, 10, 12),
	(6, 11, 12),
	(7, 13, 12);
/*!40000 ALTER TABLE `user_role_description` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
