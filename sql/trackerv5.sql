-- NOTE:
-- TINYINT => 128
-- SMALLINT => 32767
-- MEDIUMINT => 8388607
-- SIGNED/UNSIGNED => (negative) ? SIGNED : UNSIGNED


-- Dumping database structure for bika
DROP DATABASE `bika`;
CREATE DATABASE IF NOT EXISTS `bika`;
USE `bika`;

GRANT ALL ON `bika`.* TO 'bika'@'localhost' IDENTIFIED BY 'HISCongo2013';


-- Dumping structure for table bika.enterprise
CREATE TABLE IF NOT EXISTS `enterprise` (
  `id` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `region` VARCHAR(70) NOT NULL,
  `country` VARCHAR(70) NOT NULL,
  `city` VARCHAR(70) NOT NULL,
  `name` VARCHAR(70) NOT NULL,
  `phone` VARCHAR(20) NOT NULL,
  `email` VARCHAR(70) NOT NULL,
  `type` VARCHAR(70) NOT NULL,
  `cashAccount` MEDIUMINT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

-- Dumping data for table bika.enterprise: ~2 rows (environ)
DELETE FROM `enterprise`;
/*!40000 ALTER TABLE `enterprise` DISABLE KEYS */;
INSERT INTO `enterprise` (`id`, `region`, `country`, `city`, `name`, `phone`, `email`, `type`, `cashAccount`) VALUES
  (101, 'Kinshasa', 'RDC', 'Kinshasa', 'IMA', '9419614377', 'jniles@example.com', '1', 570000),
  (102, 'Bandundu', 'RDC', 'Kikwit', 'IMAKik', '--', 'jniles@example.com', '1', 570000);
/*!40000 ALTER TABLE `enterprise` ENABLE KEYS */;


-- Dumping structure for table bika.accounttype
CREATE TABLE IF NOT EXISTS `accounttype` (
  `id` MEDIUMINT UNSIGNED NOT NULL,
  `type` VARCHAR(35) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

-- Dumping data for table bika.accounttype: ~6 rows (environ)
DELETE FROM `accounttype`;
/*!40000 ALTER TABLE `accounttype` DISABLE KEYS */;
INSERT INTO `accounttype` (`id`, `type`) VALUES
  (1, 'income/expense'),
  (2, 'balance'),
  (3, 'total'),
  (4, 'header'),
  (5, 'title'),
  (6, 'newpage');
/*!40000 ALTER TABLE `accounttype` ENABLE KEYS */;

-- Dumping structure for table bika.account
CREATE TABLE IF NOT EXISTS `account` (
  `enterpriseId` SMALLINT UNSIGNED NOT NULL,
  `id` MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `accountLocked` BOOL NOT NULL,
  `accountTxt` TEXT,
  `accountTypeId` MEDIUMINT UNSIGNED NOT NULL,
  `accountCategory` TEXT NOT NULL,
  PRIMARY KEY (`id`),
  KEY `enterpriseId` (`enterpriseId`),
  KEY `accountTypeId` (`accountTypeId`),
  CONSTRAINT `account_ibfk_1` FOREIGN KEY (`enterpriseId`) REFERENCES `enterprise` (`id`),
  CONSTRAINT `account_ibfk_2` FOREIGN KEY (`accountTypeId`) REFERENCES `accounttype` (`id`)
) ENGINE=InnoDB;

DELETE FROM `account`;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` (`enterpriseId`, `id`, `accountLocked`, `accountTxt`, `accountTypeId`, `accountCategory`) VALUES
(101, 100000, 0, 'capital social', 1, '300'),
(101, 110000, 0, 'reserves', 1, '300'),
(101, 120000, 0, 'report', 1, '300'),
(101, 130000, 0, 'resultat', 1, '300'),
(101, 130100, 0, 'benefice', 1, '300'),
(101, 130200, 0, 'perte', 1, '300'),
(101, 150000, 0, 'subventions d''equipement', 1, '300'),
(101, 150100, 0, 'etat', 1, '300'),
(101, 150200, 0, 'organismes prives outre-mer', 1, '300'),
(101, 160000, 0, 'emprunts et dettes a long terme', 1, '300'),
(101, 170000, 0, 'emprunts et dettes a moyen terme', 1, '300'),
(101, 180000, 0, 'provisions pour charges et pertes', 1, '300'),
(101, 210000, 1, 'terrains', 1, '300'),
(101, 220000, 1, 'immobilisations corporelles', 1, '300'),
(101, 220100, 1, 'batiments et constructions (d''exploitation)', 1, '300'),
(101, 220200, 1, 'batiments residentiels', 1, '300'),
(101, 220300, 1, 'installations d''utilisation generale', 1, '300'),
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
(101, 300200, 1, 'pharmacie d''usage', 1, '300'),
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
(101, 360000, 1, 'socks a l''exterieur', 1, '300'),
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
(101, 410700, 1, 'personnel de l''HE', 1, '300'),
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
(101, 470300, 0, 'compte d''attente a regulariser', 1, '300'),
(101, 480000, 0, 'provision pour depreciation de la classe 3', 1, '300'),
(101, 490000, 0, 'compte d''attente a regulariser', 1, '300'),
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
(101, 700100, 0, 'Pharmacie d''usage', 1, '300'),
(101, 700200, 0, 'Ventes fiches', 1, '300'),
(101, 710000, 0, 'Recettes d''activites', 1, '300'),
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
(101, 760000, 0, 'Subvention d''exploitation', 1, '300'),
(101, 760100, 0, 'Salaire de d''etat', 1, '300'),
(101, 760200, 0, 'Autres subventions de l''etat', 1, '300'),
(101, 760300, 0, 'Subventions organismes prives', 1, '300'),
(101, 760400, 0, 'Subventions locales', 1, '300'),
(101, 760500, 0, 'Autres subventions', 1, '300');

/*!40000 ALTER TABLE `account` ENABLE KEYS */;

--
-- ALTER TABLE FOR ENTERPRISE TO PUT A FOREIGN KEY
--
ALTER TABLE `enterprise` ADD CONSTRAINT `enterprise_ibfk_1` FOREIGN KEY (`cashAccount`) REFERENCES `account` (`id`);


CREATE TABLE IF NOT EXISTS `role` (
  `id` smallint(5) unsigned NOT NULL,
  `name` varchar(60) NOT NULL,
  `description` varchar(140) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `role`
--

INSERT INTO `role` (`id`, `name`, `description`) VALUES
(0, 'Administrator', 'To be finished'),
(1, 'admin', 'Administrateur simple'),
(5, 'Finance', 'The Finance'),
(11, 'Manager', 'Hospital Manager'),
(15, 'Doctor', 'The physicien');

-- CURRENCY is set to a TINYINT under the
-- assumption that we will house less than
-- 128 currencies in this table.

CREATE TABLE IF NOT EXISTS `currency` (
  `id` TINYINT UNSIGNED NOT NULL,
  `name` TEXT NOT NULL,
  `symbol` VARCHAR(15) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

-- Dumping data for table bika.currency: ~3 rows (environ)
DELETE FROM `currency`;
/*!40000 ALTER TABLE `currency` DISABLE KEYS */;
INSERT INTO `currency` (`id`, `name`, `symbol`) VALUES
  (1, 'Franc Congolais', 'FC'),
  (2, 'United States Dollar', 'USD'),
  (3, 'Euro', 'EU');
/*!40000 ALTER TABLE `currency` ENABLE KEYS */;

-- NOTE:
--  User ids only go up to SMALLINT size (should be plenty, I should think)

-- Dumping structure for table bika.user
CREATE TABLE IF NOT EXISTS `user` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(80) NOT NULL,
  `password` varchar(100) NOT NULL,
  `first` text NOT NULL,
  `last` text NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `loggedIn` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

-- Dumping data for table bhika.user: ~1 rows (environ)
DELETE FROM `user`;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`id`, `username`, `password`, `first`, `last`, `email`, `loggedIn`) VALUES
(1, 'jniles', 'j', 'Jonathan', 'Niles', 'jonathanwniles@gmail.com', 0),
(2, 'chris', 'c', 'CHRIS ', 'LOMAME', 'chris@ima.org', 0),
(3, 'rdc', 'r', 'CONGO', 'DEMOCRATIQUE', 'rdc@rdc.cd', 0),
(4, 'docta', 'd', 'Docteur House', 'Machine', 'd@his.cd', 0),
(5, 'compta', 'c', 'Comptable', 'Analytique', 'c@his.cd', 0),
(6, 'manager', 'm', 'Manager', 'Nationale', 'm@his.cd', 0),
(7, 'admin', 'his', 'Simple', 'ADMINISTRATOR', 'admin@his', 1),
(8, 'd1', 'd', 'Docteur Comptable', 'Médecin Economiste', 'dm@his.com', 0),
(9, 'm1', 'm', 'Manager Administrateur', 'Gerant Systeme', 'manage@his.cd', 0),
(10, 'docta1', 'dd', 'Docteur Simple', 'Limité', 'doctasimple@his.cd', 0),
(11, 'admin', 'lmt', 'Administrateur', 'Limite', 'adminlimit@his.com', 0),
(12, 'fin', 'f', 'Financier subalterne', 'Sous Financier', 'finance@his.com', 0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;


CREATE TABLE IF NOT EXISTS `permission` (
  id              MEDIUMINT UNSIGNED NOT NULL,
  userid          SMALLINT UNSIGNED NOT NULL,
  roleid          SMALLINT UNSIGNED NOT NULL,
  enterpriseid    SMALLINT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userid` (`userid`),
  KEY `roleid` (`roleid`),
  KEY `enterpriseid` (`enterpriseid`),
  FOREIGN KEY (`userid`) REFERENCES `user` (`id`),
  FOREIGN KEY (`roleid`) REFERENCES `role` (`id`),
  FOREIGN KEY (`enterpriseid`) REFERENCES `enterprise` (`id`)
) ENGINE=InnoDB;

-- Dumping structure for table bika.fiscalyear
CREATE TABLE IF NOT EXISTS `fiscalyear` (
  `enterpriseId` SMALLINT UNSIGNED NOT NULL,
  `id` MEDIUMINT UNSIGNED NOT NULL,
  `numberOfMonths` MEDIUMINT UNSIGNED NOT NULL,
  `fiscalYearTxt` TEXT NOT NULL,
  `transactionStartNumber` INT UNSIGNED NOT NULL,
  `transactionStopNumber` INT UNSIGNED NOT NULL,
  `fiscalYearNumber` MEDIUMINT NOT NULL,
  PRIMARY KEY (`id`),
  KEY `enterpriseId` (`enterpriseId`),
  CONSTRAINT `fiscalyear_ibfk_1` FOREIGN KEY (`enterpriseId`) REFERENCES `enterprise` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table bika.fiscalyear: ~2 rows (environ)
DELETE FROM `fiscalyear`;
/*!40000 ALTER TABLE `fiscalyear` DISABLE KEYS */;
INSERT INTO `fiscalyear` (`enterpriseId`, `id`, `numberOfMonths`, `fiscalYearTxt`, `transactionStartNumber`, `transactionStopNumber`, `fiscalYearNumber`) VALUES
  (101, 2013001, 12, 'The First Fiscal Year of Company 101', 0, 100, 1),
  (102, 2013011, 12, 'The First Fiscal Year of Company 102', 1000, 1100, 1);
/*!40000 ALTER TABLE `fiscalyear` ENABLE KEYS */;


-- Dumping structure for table bika.journal
CREATE TABLE IF NOT EXISTS `journal` (
  `fiscalYearId` MEDIUMINT UNSIGNED NOT NULL,
  `id` MEDIUMINT UNSIGNED NOT NULL,
  `date` DATE NOT NULL,
  `userid` SMALLINT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fiscalYearId` (`fiscalYearId`),
  KEY  `userid` (`userid`),
  CONSTRAINT `journal_ibfk_1` FOREIGN KEY (`fiscalYearId`) REFERENCES `fiscalyear` (`id`),
  CONSTRAINT `journal_ibfk_2` FOREIGN KEY (`userid`) REFERENCES `user` (`id`)
) ENGINE=InnoDB;

-- Dumping data for table bika.journal: ~1 rows (environ)
DELETE FROM `journal`;
/*!40000 ALTER TABLE `journal` DISABLE KEYS */;
INSERT INTO `journal` (`fiscalYearId`, `id`, `date`, `userid`) VALUES
  (2013001, 1000, '2013-07-23', 1);
/*!40000 ALTER TABLE `journal` ENABLE KEYS */;


--
-- NOTE:
--  SMALLINT limit on periods.  Expecting less than SMALLINT size
--

-- Dumping structure for table bika.period
CREATE TABLE IF NOT EXISTS `period` (
  `fiscalYearId` MEDIUMINT UNSIGNED NOT NULL,
  `id` SMALLINT NOT NULL,
  `periodStart` DATE NOT NULL,
  `periodStop` DATE NOT NULL,
  `order` TEXT NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fiscalYearId` (`fiscalYearId`),
  CONSTRAINT `period_ibfk_1` FOREIGN KEY (`fiscalYearId`) REFERENCES `fiscalyear` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table bika.period: ~1 rows (environ)
DELETE FROM `period`;
/*!40000 ALTER TABLE `period` DISABLE KEYS */;
INSERT INTO `period` (`fiscalYearId`, `id`, `periodStart`, `periodStop`, `order`) VALUES
  (2013001, 1, '2013-07-01', '2013-07-31', '1');
/*!40000 ALTER TABLE `period` ENABLE KEYS */;


--
-- NOTE:
--   We have to re-think what is being put into debit and credit fields.
-- Should they be decimals?  Should they be integers?
--

-- Dumping structure for table bika.transaction
CREATE TABLE IF NOT EXISTS `transaction` (
  `journalId` MEDIUMINT UNSIGNED NOT NULL,
  `lineId` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `accountId` MEDIUMINT UNSIGNED NOT NULL,
  `credit` INT NOT NULL,
  `debit` INT NOT NULL,
  `docId` TINYTEXT NOT NULL,
  `description` TINYTEXT,
  `transNumber` INT UNSIGNED NOT NULL,
  `transDate` DATE NOT NULL,
  `sysCurrency` TINYINT UNSIGNED NOT NULL,
  `transCurrency` TINYINT UNSIGNED NOT NULL,
  `exchangeRate` DECIMAL(6,2) NOT NULL,
  PRIMARY KEY (`lineId`),
  KEY `journalId` (`journalId`),
  KEY `accountId` (`accountId`),
  KEY `sysCurrency` (`sysCurrency`),
  KEY `transCurrency` (`transCurrency`),
  CONSTRAINT `transaction_ibfk_1` FOREIGN KEY (`journalId`) REFERENCES `journal` (`id`),
  CONSTRAINT `transaction_ibfk_2` FOREIGN KEY (`accountId`) REFERENCES `account` (`id`)
) ENGINE=InnoDB;

-- Dumping data for table bika.transaction: ~5 rows (environ)
DELETE FROM `transaction`;
/*!40000 ALTER TABLE `transaction` DISABLE KEYS */;
INSERT INTO `transaction` (`journalId`, `lineId`, `accountId`, `credit`, `debit`, `docId`, `description`, `transNumber`, `transDate`, `sysCurrency`, `transCurrency`, `exchangeRate`) VALUES
  (1000, 1, 220700, 40, 0, '20', 'descrip 1', 3, '2013-07-23', 1, 1, 920.00),
  (1000, 2, 220700, 0, 20, '40', 'descrip 2', 3, '2013-07-23', 1, 1, 930.00),
  (1000, 3, 650100, 100, 0, '0', 'descrip 3', 4, '2013-02-15', 1, 1, 910.00),
  (1000, 4, 711000, 23, 0, '0', 'descrip 4', 5, '2013-03-01', 1, 1, 910.00),
  (1000, 5, 711100, 0, 100, '0', 'descrip 5', 4, '2013-02-15', 1, 1, 910.00);
/*!40000 ALTER TABLE `transaction` ENABLE KEYS */;

-- NOTE:
-- Here, unit parents can only go up to SMALLINT size

-- Dumping structure for table bika.unit
CREATE TABLE IF NOT EXISTS `unit` (
  `id` MEDIUMINT unsigned NOT NULL,
  `name` VARCHAR(30) NOT NULL,
  `desc` TEXT NOT NULL,
  `parent` SMALLINT DEFAULT NULL,
  `hasChildren` BOOL NOT NULL,
  `url` TINYTEXT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

-- Dumping data for table bika.unit: ~20 rows (environ)
DELETE FROM `unit`;
/*!40000 ALTER TABLE `unit` DISABLE KEYS */;
INSERT INTO `unit` (`id`, `name`, `desc`, `parent`, `hasChildren`, `url`) VALUES
(0, 'Root', 'The unseen root node', NULL, 1, ''),
(1, 'Admin', 'The Administration Super-Category', 0, 1, ''),
(2, 'Enterprises', 'Manage the registered enterprises from here', 1, 0, '/units/enterprise/'),
(3, 'Form Manager', 'Manage your forms', 1, 0, '/units/formmanager/'),
(4, 'Users & Permissions', 'Manage user privileges and permissions', 1, 0, '/units/permission/'),
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
(16, 'Pharmacy', 'What''s in your pharmacy?', 15, 0, '/units/pharmacy/'),
(17, 'Laboratory', 'Analyze lab results', 15, 0, '/units/laboratory/'),
(18, 'Surgery', 'Best cuttlery here!', 15, 0, '/units/surgery'),
(19, 'Radiology', 'X-rays, anyone?', 15, 0, '/units/radiology/'),
(20, 'Billing', 'Test pour le sous enfant', 5, 1, NULL),
(21, 'Billing A', 'Sous enfant de Billing', 20, 0, '/html/com'),
(22, 'Billing B', 'Deuxieme fils de Billing', 20, 0, '/html/deux');
/*!40000 ALTER TABLE `unit` ENABLE KEYS */;

-- --------------------------------------------------------

--
-- Structure de la table `unit`
--

CREATE TABLE IF NOT EXISTS `role_unit` (
  `id` smallint unsigned NOT NULL,
  `id_role` smallint unsigned NOT NULL,
  `id_unit` mediumint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_role` (`id_role`),
  KEY `id_unit` (`id_unit`),
  CONSTRAINT `role_unit_ibfk_1` FOREIGN KEY (`id_unit`) REFERENCES `unit` (`id`),
  CONSTRAINT `role_unit_ibfk_2` FOREIGN KEY (`id_role`) REFERENCES `role` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1;

--
-- Contenu de la table `role_unit`
--

INSERT INTO `role_unit` (`id`, `id_role`, `id_unit`) VALUES
(1, 0, 1),
(2, 5, 6),
(3, 5, 7),
(4, 5, 8),
(5, 5, 9),
(6, 5, 10),
(7, 5, 5),
(8, 15, 15),
(9, 15, 16),
(10, 15, 17),
(11, 15, 18),
(12, 15, 19),
(13, 11, 11),
(14, 11, 12),
(15, 11, 13),
(16, 11, 14),
(17, 1, 1),
(18, 1, 2),
(19, 1, 3),
(20, 1, 4),
(21, 5, 20),
(22, 5, 21),
(23, 5, 22);

CREATE TABLE IF NOT EXISTS `user_role` (
  `id` smallint NOT NULL AUTO_INCREMENT,
  `id_role_unit` smallint unsigned NOT NULL,
  `id_user` smallint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_role_unit` (`id_role_unit`,`id_user`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `user_role_ibfk_1` FOREIGN KEY (`id_role_unit`) REFERENCES `role_unit` (`id`),
  CONSTRAINT `user_role_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1;


--
-- Contenu de la table `user_role`
--

INSERT INTO `user_role` (`id`, `id_role_unit`, `id_user`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(9, 2, 5),
(29, 2, 8),
(40, 2, 12),
(10, 3, 5),
(11, 3, 5),
(30, 3, 8),
(12, 4, 5),
(31, 4, 6),
(32, 5, 6),
(39, 5, 12),
(33, 6, 6),
(43, 7, 5),
(36, 7, 8),
(38, 7, 12),
(4, 8, 4),
(24, 8, 8),
(5, 9, 4),
(25, 9, 8),
(6, 10, 4),
(26, 10, 8),
(7, 11, 4),
(27, 11, 8),
(8, 12, 4),
(28, 12, 8),
(20, 13, 6),
(21, 14, 6),
(22, 15, 6),
(23, 16, 6),
(13, 17, 7),
(18, 17, 11),
(14, 18, 7),
(15, 18, 7),
(16, 19, 7),
(17, 20, 7),
(19, 20, 11),
(44, 21, 5),
(41, 21, 8),
(45, 22, 5),
(46, 23, 5),
(42, 23, 8);
