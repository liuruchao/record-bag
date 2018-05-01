# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.20)
# Database: cAuth
# Generation Time: 2018-05-01 08:44:51 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table cAppinfo
# ------------------------------------------------------------

DROP TABLE IF EXISTS `cAppinfo`;

CREATE TABLE `cAppinfo` (
  `appid` char(36) DEFAULT NULL,
  `secret` char(64) DEFAULT NULL,
  `ip` char(20) DEFAULT NULL,
  `login_duration` int(11) DEFAULT NULL,
  `qcloud_appid` char(64) DEFAULT NULL,
  `session_duration` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `cAppinfo` WRITE;
/*!40000 ALTER TABLE `cAppinfo` DISABLE KEYS */;

INSERT INTO `cAppinfo` (`appid`, `secret`, `ip`, `login_duration`, `qcloud_appid`, `session_duration`)
VALUES
	('wx61e0a43b8f15db03','','119.29.245.230',1000,'1253284644',2000);

/*!40000 ALTER TABLE `cAppinfo` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table cSessionInfo
# ------------------------------------------------------------

DROP TABLE IF EXISTS `cSessionInfo`;

CREATE TABLE `cSessionInfo` (
  `open_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `uuid` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `skey` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_visit_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `session_key` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_info` varchar(2048) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`open_id`),
  KEY `openid` (`open_id`) USING BTREE,
  KEY `skey` (`skey`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='会话管理用户信息';

LOCK TABLES `cSessionInfo` WRITE;
/*!40000 ALTER TABLE `cSessionInfo` DISABLE KEYS */;

INSERT INTO `cSessionInfo` (`open_id`, `uuid`, `skey`, `create_time`, `last_visit_time`, `session_key`, `user_info`)
VALUES
	('oxoP40FIJN8F3NsefGyEbrCmc92o','9a56bc43-96a0-49ca-97be-77a4a06f4916','44b47ce77bbbf9d4ea8317a5b73032bc4d6863d9','2018-05-01 10:41:22','2018-05-01 10:41:22','Iu06qX1vaPC65Srcfj36gQ==','{\"openId\":\"oxoP40FIJN8F3NsefGyEbrCmc92o\",\"nickName\":\"冯忠森\",\"gender\":1,\"language\":\"zh_CN\",\"city\":\"Datong\",\"province\":\"Shanxi\",\"country\":\"China\",\"avatarUrl\":\"https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLxPfREBADOjy5oibrg2fNthagtmicjapvDlibhKiczJV416SEFbygSOOa6iaGzqoSdqs86iaHcI4q3KORA/0\",\"watermark\":{\"timestamp\":1525142479,\"appid\":\"wx61e0a43b8f15db03\"}}');

/*!40000 ALTER TABLE `cSessionInfo` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table t_recode
# ------------------------------------------------------------

DROP TABLE IF EXISTS `t_recode`;

CREATE TABLE `t_recode` (
  `rid` bigint(11) NOT NULL AUTO_INCREMENT,
  `tid` bigint(11) NOT NULL,
  `uuid` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `detail` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `create_time` bigint(11)  NOT NULL DEFAULT 0,
  `last_visit_time` bigint(11)  NOT NULL DEFAULT 0,
  PRIMARY KEY (`rid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='模块记录';



# Dump of table t_template
# ------------------------------------------------------------

DROP TABLE IF EXISTS `t_template`;

CREATE TABLE `t_template` (
  `tid` bigint(11) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fields` varchar(2048) COLLATE utf8mb4_unicode_ci NOT NULL,
  `create_time` bigint(11)  NOT NULL DEFAULT 0,
  `last_visit_time` bigint(11)  NOT NULL DEFAULT 0,
  PRIMARY KEY (`tid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='模块信息';




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
