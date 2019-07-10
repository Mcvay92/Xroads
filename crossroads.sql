/*
SQLyog Enterprise Trial - MySQL GUI v7.11 
MySQL - 5.5.5-10.1.33-MariaDB : Database - crossroads
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

CREATE DATABASE /*!32312 IF NOT EXISTS*/`crossroads` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;

USE `crossroads`;

/*Table structure for table `postedjobs` */

DROP TABLE IF EXISTS `postedjobs`;

CREATE TABLE `postedjobs` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `StartUp` text,
  `Description` text,
  `SkillsNeeded` text,
  `Qualifications` text,
  `Extra` text,
  `Contact` text,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

/*Data for the table `postedjobs` */

insert  into `postedjobs`(`ID`,`StartUp`,`Description`,`SkillsNeeded`,`Qualifications`,`Extra`,`Contact`) values (1,'addJobTest','addJobTest','math','degree','male','1'),(2,'addJobTest','addJobTest','math','degree','male','1'),(3,'IncreaseByOneTest','IncreaseByOneTest','math','degree','male','1'),(4,'ElementCheck','ElementCheck','math','degree','male','1');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
