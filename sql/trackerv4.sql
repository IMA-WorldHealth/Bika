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
  (101, 'Kinshasa', 'RDC', 'Kinshasa', 'IMA', '9419614377', 'jniles@example.com', '1', 1010),
  (102, 'Bandundu', 'RDC', 'Kikwit', 'IMAKik', '--', 'jniles@example.com', '1', 22140);
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
  (101, 1010, 0, 'Funds MicroDevru', 1, '100'),
  (101, 22110, 0, 'Prodek Cassava Training', 1, '300'),
  (101, 22140, 1, 'Prodek Cassava Transport', 1, '100'),
  (101, 22150, 0, 'Prodek Cassava Visits', 1, '300'),
  (102, 22310, 0, 'Prodek Legume Training', 1, '200'),
  (102, 22320, 0, 'Prodek Legume Seed', 1, '200');
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
(1, 'jniles', 'K3mb3J@m', 'Jonathan', 'Niles', 'jonathanwniles@gmail.com', 0),
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
  (1000, 1, 1010, 40, 0, '20', 'descrip 1', 3, '2013-07-23', 1, 1, 920.00),
  (1000, 2, 22140, 0, 20, '40', 'descrip 2', 3, '2013-07-23', 1, 1, 930.00),
  (1000, 3, 22310, 100, 0, '0', 'descrip 3', 4, '2013-02-15', 1, 1, 910.00),
  (1000, 4, 22310, 23, 0, '0', 'descrip 4', 5, '2013-03-01', 1, 1, 910.00),
  (1000, 5, 22150, 0, 100, '0', 'descrip 5', 4, '2013-02-15', 1, 1, 910.00);
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