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
INSERT INTO `account` (`enterpriseId`, `id`, `accountLocked`, `accountTxt`, `accountTypeId`, `accountCategory`) VALUES
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
INSERT INTO `fiscalyear` (`enterpriseId`, `id`, `numberOfMonths`, `fiscalYearTxt`, `transactionStartNumber`, `transactionStopNumber`, `fiscalYearNumber`) VALUES
    (101, 2013001, 12, 'The First Fiscal Year of Company 101', 0, 100, 1),
    (102, 2013011, 12, 'The First Fiscal Year of Company 102', 1000, 1100, 1),
    (101, 2014001, 12, 'The Second Fiscal Year of Company 101', 1200, 5000, 1),
    (102, 2014011, 12, 'The Second Fiscal Year of Company 102', 1200, 5000, 1);
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
    (2013001, 1, '2013-07-01', '2013-07-31', '1'),
    (2013001, 2, '2013-08-01', '2013-08-31', '1'),
    (2013001, 3, '2013-09-01', '2013-09-30', '2'),
    (2013001, 4, '2013-10-01', '2013-10-31', '1'),
    (2013001, 5, '2013-11-01', '2013-09-30', '1'),
    (2013011, 6, '2013-07-01', '2013-07-31', '1'),
    (2013011, 7, '2013-08-01', '2013-08-31', '1'),
    (2013011, 8, '2013-09-01', '2013-09-30', '2'),
    (2013011, 9, '2013-10-01', '2013-10-31', '1'),
    (2013011, 10, '2013-11-01', '2013-09-30', '1'),
    (2014001, 20, '2014-10-01', '0000-00-00', '2'),
    (2014001, 21, '2014-11-01', '2014-11-30', '1'),
    (2014001, 22, '2014-12-01', '2014-12-31', '1'),
    (2014011, 23, '2014-01-01', '2014-01-31', '1'),
    (2014011, 24, '2014-02-01', '2014-02-28', '1'),
    (2014011, 25, '2014-03-01', '2014-03-31', '2'),
    (2014011, 26, '2014-04-01', '2014-04-30', '1'),
    (2014011, 27, '2014-05-01', '2014-05-31', '1'),
    (2014011, 28, '2014-06-01', '2014-06-30', '1'),
    (2014011, 29, '2014-07-01', '2014-07-31', '1'),
    (2014011, 30, '2014-08-01', '2014-08-31', '2'),
    (2014011, 31, '2014-09-01', '2014-10-30', '1'),
    (2014011, 32, '2014-10-01', '0000-00-00', '2'),
    (2014011, 33, '2014-11-01', '2014-11-30', '1'),
    (2014011, 34, '2014-12-01', '2014-12-31', '1');

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


CREATE TABLE `debitor` (
  `companyID` int(11) NOT NULL,
  `debitorID` varchar(15) NOT NULL,
  `address1` text,
  `address2` text,
  `city` text,
  `companyNumber` text,
  `contact` text,
  `country` text,
  `dun` varchar(3) DEFAULT NULL,
  `email` text,
  `fax` text,
  `groupID` int(11) DEFAULT NULL,
  `interest` varchar(3) DEFAULT NULL,
  `locked` varchar(3) DEFAULT NULL,
  `maxCredit` varchar(45) DEFAULT NULL,
  `name` text,
  `note` text,
  `ourContact` int(11) DEFAULT NULL,
  `paymentID` int(11) DEFAULT NULL,
  `phone` text,
  `priceGroupID` int(11) DEFAULT NULL,
  `debitorText1` text,
  `debitorText2` text,
  `debitorText3` text,
  `debitorText4` text,
  `debitorText5` text,
  `internetOrder` varchar(3) DEFAULT NULL,
  `international` varchar(3) DEFAULT NULL,
  PRIMARY KEY (`companyID`,`debitorID`)
) ENGINE=InnoDB;

INSERT INTO `debitor` (`companyID`,`debitorID`,`address1`,`address2`,`city`,`companyNumber`,`contact`,`country`,`dun`,`email`,`fax`,`groupID`,`interest`,`locked`,`maxCredit`,`name`,`note`,`ourContact`,`paymentID`,`phone`,`priceGroupID`,`debitorText1`,`debitorText2`,`debitorText3`,`debitorText4`,`debitorText5`,`internetOrder`,`international`) VALUES (1,'1','Bandal','masina','Tshikapa','2','e54','Autriche','non','carloscnk@francite.com','454',2,'34','non','344','Carlos','je suis toujours la',212,323,'3454',234,'papa','maman','yaya','koko','noko','44','33'),(2,'3','Lemba','limete','Bunia','3','fxv','République de Corée','d','gered@caramail.com','4556',2,'767','non','55','Gered','ils vont bien depuis longtemps',980,876,'802',789,'jon','cnk','ded','chris','ger','77','86');

DROP TABLE IF EXISTS `country`;

CREATE TABLE `country` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `code` int(3) NOT NULL,
  `country_en` varchar(45) NOT NULL,
  `country_fr` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code_unique` (`code`)
) ENGINE=InnoDB ;

INSERT INTO `country`(`id`,`code`,`country_en`,`country_fr`) VALUES (1,4,'Afghanistan','Afghanistan'),(2,8,'Albania','Albanie'),(3,10,'Antarctica','Antarctique'),(4,12,'Algeria','Algérie'),(5,16,'American Samoa','Samoa Américaines'),(6,20,'Andorra','Andorre'),(7,24,'Angola','Angola'),(8,28,'Antigua and Barbuda','Antigua-et-Barbuda'),(9,31,'Azerbaijan','Azerbaïdjan'),(10,32,'Argentina','Argentine'),(11,36,'Australia','Australie'),(12,40,'Austria','Autriche'),(13,44,'Bahamas','Bahamas'),(14,48,'Bahrain','Bahreïn'),(15,50,'Bangladesh','Bangladesh'),(16,51,'Armenia','Arménie'),(17,52,'Barbados','Barbade'),(18,56,'Belgium','Belgique'),(19,60,'Bermuda','Bermudes'),(20,64,'Bhutan','Bhoutan'),(21,68,'Bolivia','Bolivie'),(22,70,'Bosnia and Herzegovina','Bosnie-Herzégovine'),(23,72,'Botswana','Botswana'),(24,74,'Bouvet Island','Île Bouvet'),(25,76,'Brazil','Brésil'),(26,84,'Belize','Belize'),(27,86,'British Indian Ocean Territory','Territoire Britannique de l\'Océan Indien'),(28,90,'Solomon Islands','Îles Salomon'),(29,92,'British Virgin Islands','Îles Vierges Britanniques'),(30,96,'Brunei Darussalam','Brunéi Darussalam'),(31,100,'Bulgaria','Bulgarie'),(32,104,'Myanmar','Myanmar'),(33,108,'Burundi','Burundi'),(34,112,'Belarus','Bélarus'),(35,116,'Cambodia','Cambodge'),(36,120,'Cameroon','Cameroun'),(37,124,'Canada','Canada'),(38,132,'Cape Verde','Cap-vert'),(39,136,'Cayman Islands','Îles Caïmanes'),(40,140,'Central African','République Centrafricaine'),(41,144,'Sri Lanka','Sri Lanka'),(42,148,'Chad','Tchad'),(43,152,'Chile','Chili'),(44,156,'China','Chine'),(45,158,'Taiwan','Taïwan'),(46,162,'Christmas Island','Île Christmas'),(47,166,'Cocos (Keeling) Islands','Îles Cocos (Keeling)'),(48,170,'Colombia','Colombie'),(49,174,'Comoros','Comores'),(50,175,'Mayotte','Mayotte'),(51,178,'Republic of the Congo','République du Congo'),(52,180,'The Democratic Republic Of The Congo','République Démocratique du Congo'),(53,184,'Cook Islands','Îles Cook'),(54,188,'Costa Rica','Costa Rica'),(55,191,'Croatia','Croatie'),(56,192,'Cuba','Cuba'),(57,196,'Cyprus','Chypre'),(58,203,'Czech Republic','République Tchèque'),(59,204,'Benin','Bénin'),(60,208,'Denmark','Danemark'),(61,212,'Dominica','Dominique'),(62,214,'Dominican Republic','République Dominicaine'),(63,218,'Ecuador','Équateur'),(64,222,'El Salvador','El Salvador'),(65,226,'Equatorial Guinea','Guinée Équatoriale'),(66,231,'Ethiopia','Éthiopie'),(67,232,'Eritrea','Érythrée'),(68,233,'Estonia','Estonie'),(69,234,'Faroe Islands','Îles Féroé'),(70,238,'Falkland Islands','Îles (malvinas) Falkland'),(71,239,'South Georgia and the South Sandwich Islands','Géorgie du Sud et les Îles Sandwich du Sud'),(72,242,'Fiji','Fidji'),(73,246,'Finland','Finlande'),(74,248,'Åland Islands','Îles Åland'),(75,250,'France','France'),(76,254,'French Guiana','Guyane Française'),(77,258,'French Polynesia','Polynésie Française'),(78,260,'French Southern Territories','Terres Australes Françaises'),(79,262,'Djibouti','Djibouti'),(80,266,'Gabon','Gabon'),(81,268,'Georgia','Géorgie'),(82,270,'Gambia','Gambie'),(83,275,'Occupied Palestinian Territory','Territoire Palestinien Occupé'),(84,276,'Germany','Allemagne'),(85,288,'Ghana','Ghana'),(86,292,'Gibraltar','Gibraltar'),(87,296,'Kiribati','Kiribati'),(88,300,'Greece','Grèce'),(89,304,'Greenland','Groenland'),(90,308,'Grenada','Grenade'),(91,312,'Guadeloupe','Guadeloupe'),(92,316,'Guam','Guam'),(93,320,'Guatemala','Guatemala'),(94,324,'Guinea','Guinée'),(95,328,'Guyana','Guyana'),(96,332,'Haiti','Haïti'),(97,334,'Heard Island and McDonald Islands','Îles Heard et Mcdonald'),(98,336,'Vatican City State','Saint-Siège (état de la Cité du Vatican)'),(99,340,'Honduras','Honduras'),(100,344,'Hong Kong','Hong-Kong'),(101,348,'Hungary','Hongrie'),(102,352,'Iceland','Islande'),(103,356,'India','Inde'),(104,360,'Indonesia','Indonésie'),(105,364,'Islamic Republic of Iran','République Islamique d\'Iran'),(106,368,'Iraq','Iraq'),(107,372,'Ireland','Irlande'),(108,376,'Israel','Israël'),(109,380,'Italy','Italie'),(110,384,'Côte d\'Ivoire','Côte d\'Ivoire'),(111,388,'Jamaica','Jamaïque'),(112,392,'Japan','Japon'),(113,398,'Kazakhstan','Kazakhstan'),(114,400,'Jordan','Jordanie'),(115,404,'Kenya','Kenya'),(116,408,'Democratic People\'s Republic of Korea','République Populaire Démocratique de Corée'),(117,410,'Republic of Korea','République de Corée'),(118,414,'Kuwait','Koweït'),(119,417,'Kyrgyzstan','Kirghizistan'),(120,418,'Lao People\'s Democratic Republic','République Démocratique Populaire Lao'),(121,422,'Lebanon','Liban'),(122,426,'Lesotho','Lesotho'),(123,428,'Latvia','Lettonie'),(124,430,'Liberia','Libéria'),(125,434,'Libyan Arab Jamahiriya','Jamahiriya Arabe Libyenne'),(126,438,'Liechtenstein','Liechtenstein'),(127,440,'Lithuania','Lituanie'),(128,442,'Luxembourg','Luxembourg'),(129,446,'Macao','Macao'),(130,450,'Madagascar','Madagascar'),(131,454,'Malawi','Malawi'),(132,458,'Malaysia','Malaisie'),(133,462,'Maldives','Maldives'),(134,466,'Mali','Mali'),(135,470,'Malta','Malte'),(136,474,'Martinique','Martinique'),(137,478,'Mauritania','Mauritanie'),(138,480,'Mauritius','Maurice'),(139,484,'Mexico','Mexique'),(140,492,'Monaco','Monaco'),(141,496,'Mongolia','Mongolie'),(142,498,'Republic of Moldova','République de Moldova'),(143,500,'Montserrat','Montserrat'),(144,504,'Morocco','Maroc'),(145,508,'Mozambique','Mozambique'),(146,512,'Oman','Oman'),(147,516,'Namibia','Namibie'),(148,520,'Nauru','Nauru'),(149,524,'Nepal','Népal'),(150,528,'Netherlands','country-Bas'),(151,530,'Netherlands Antilles','Antilles Néerlandaises'),(152,533,'Aruba','Aruba'),(153,540,'New Caledonia','Nouvelle-Calédonie'),(154,548,'Vanuatu','Vanuatu'),(155,554,'New Zealand','Nouvelle-Zélande'),(156,558,'Nicaragua','Nicaragua'),(157,562,'Niger','Niger'),(158,566,'Nigeria','Nigéria'),(159,570,'Niue','Niué'),(160,574,'Norfolk Island','Île Norfolk'),(161,578,'Norway','Norvège'),(162,580,'Northern Mariana Islands','Îles Mariannes du Nord'),(163,581,'United States Minor Outlying Islands','Îles Mineures Éloignées des États-Unis'),(164,583,'Federated States of Micronesia','États Fédérés de Micronésie'),(165,584,'Marshall Islands','Îles Marshall'),(166,585,'Palau','Palaos'),(167,586,'Pakistan','Pakistan'),(168,591,'Panama','Panama'),(169,598,'Papua New Guinea','Papouasie-Nouvelle-Guinée'),(170,600,'Paraguay','Paraguay'),(171,604,'Peru','Pérou'),(172,608,'Philippines','Philippines'),(173,612,'Pitcairn','Pitcairn'),(174,616,'Poland','Pologne'),(175,620,'Portugal','Portugal'),(176,624,'Guinea-Bissau','Guinée-Bissau'),(177,626,'Timor-Leste','Timor-Leste'),(178,630,'Puerto Rico','Porto Rico'),(179,634,'Qatar','Qatar'),(180,638,'Réunion','Réunion'),(181,642,'Romania','Roumanie'),(182,643,'Russian Federation','Fédération de Russie'),(183,646,'Rwanda','Rwanda'),(184,654,'Saint Helena','Sainte-Hélène'),(185,659,'Saint Kitts and Nevis','Saint-Kitts-et-Nevis'),(186,660,'Anguilla','Anguilla'),(187,662,'Saint Lucia','Sainte-Lucie'),(188,666,'Saint-Pierre and Miquelon','Saint-Pierre-et-Miquelon'),(189,670,'Saint Vincent and the Grenadines','Saint-Vincent-et-les Grenadines'),(190,674,'San Marino','Saint-Marin'),(191,678,'Sao Tome and Principe','Sao Tomé-et-Principe'),(192,682,'Saudi Arabia','Arabie Saoudite'),(193,686,'Senegal','Sénégal'),(194,690,'Seychelles','Seychelles'),(195,694,'Sierra Leone','Sierra Leone'),(196,702,'Singapore','Singapour'),(197,703,'Slovakia','Slovaquie'),(198,704,'Vietnam','Viet Nam'),(199,705,'Slovenia','Slovénie'),(200,706,'Somalia','Somalie'),(201,710,'South Africa','Afrique du Sud'),(202,716,'Zimbabwe','Zimbabwe'),(203,724,'Spain','Espagne'),(204,732,'Western Sahara','Sahara Occidental'),(205,736,'Sudan','Soudan'),(206,740,'Suriname','Suriname'),(207,744,'Svalbard and Jan Mayen','Svalbard etÎle Jan Mayen'),(208,748,'Swaziland','Swaziland'),(209,752,'Sweden','Suède'),(210,756,'Switzerland','Suisse'),(211,760,'Syrian Arab Republic','République Arabe Syrienne'),(212,762,'Tajikistan','Tadjikistan'),(213,764,'Thailand','Thaïlande'),(214,768,'Togo','Togo'),(215,772,'Tokelau','Tokelau'),(216,776,'Tonga','Tonga'),(217,780,'Trinidad and Tobago','Trinité-et-Tobago'),(218,784,'United Arab Emirates','Émirats Arabes Unis'),(219,788,'Tunisia','Tunisie'),(220,792,'Turkey','Turquie'),(221,795,'Turkmenistan','Turkménistan'),(222,796,'Turks and Caicos Islands','Îles Turks et Caïques'),(223,798,'Tuvalu','Tuvalu'),(224,800,'Uganda','Ouganda'),(225,804,'Ukraine','Ukraine'),(226,807,'The Former Yugoslav Republic of Macedonia','L\'ex-République Yougoslave de Macédoine'),(227,818,'Egypt','Égypte'),(228,826,'United Kingdom','Royaume-Uni'),(229,833,'Isle of Man','Île de Man'),(230,834,'United Republic Of Tanzania','République-Unie de Tanzanie'),(231,840,'United States','États-Unis'),(232,850,'U.S. Virgin Islands','Îles Vierges des États-Unis'),(233,854,'Burkina Faso','Burkina Faso'),(234,858,'Uruguay','Uruguay'),(235,860,'Uzbekistan','Ouzbékistan'),(236,862,'Venezuela','Venezuela'),(237,876,'Wallis and Futuna','Wallis et Futuna'),(238,882,'Samoa','Samoa'),(239,887,'Yemen','Yémen'),(240,891,'Serbia and Montenegro','Serbie-et-Monténégro'),(241,894,'Zambia','Zambie');

/* Table bika.location */ 	
DROP TABLE IF EXISTS `location`;

CREATE TABLE `location` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `city` varchar(45) DEFAULT NULL,
  `region` varchar(45) DEFAULT NULL,
  `country_code` smallint(6) NOT NULL,
  PRIMARY KEY (`id`,`country_code`)
) ENGINE=InnoDB;

/*Data for the table `location` */

INSERT INTO `location`(`id`,`city`,`region`,`country_code`) VALUES (1,'Kinshasa','Kinshasa',52),(2,'Lubumbashi','Katanga',52),(3,'Mbuji-Mayi','Kasaï-Oriental',52),(4,'Kananga','Kasaï-Occidental',52),(5,'Kisangani','Orientale',52),(6,'Bukavu','Sud-Kivu',52),(7,'Tshikapa','Kasaï-Occidental',52),(8,'Kolwezi','Katanga',52),(9,'Likasi','Katanga',52),(10,'Goma','Nord-Kivu',52),(11,'Kikwit','Bandundu',52),(12,'Uvira','Sud-Kivu',52),(13,'Bunia','Orientale',52),(14,'Mbandaka','Équateur',52),(15,'Matadi','Bas-Congo',52),(16,'Kabinda','Kasaï-Oriental',52),(17,'Butembo','Nord-Kivu',52),(18,'Mwene-Ditu','Kasaï-Oriental',52),(19,'Isiro','Orientale',52),(20,'Kindu','Maniema',52),(21,'Boma','Bas-Congo',52),(22,'Kamina','Katanga',52),(23,'Gandajika','Kasaï-Oriental',52),(24,'Bandundu','Bandundu',52),(25,'Gemena','Équateur',52),(26,'Kipushi','Katanga',52),(27,'Bumba','Équateur',52),(28,'Mbanza-Ngungu','Bas-Congo',52);
