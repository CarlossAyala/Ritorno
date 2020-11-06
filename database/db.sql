/*
 Navicat Premium Data Transfer

 Source Server         : XD
 Source Server Type    : MySQL
 Source Server Version : 100410
 Source Host           : localhost:3306
 Source Schema         : ppet

 Target Server Type    : MySQL
 Target Server Version : 100410
 File Encoding         : 65001

 Date: 31/10/2020 22:06:17
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for dogs
-- ----------------------------
DROP TABLE IF EXISTS `dogs`;
CREATE TABLE `dogs`  (
  `ID` int(6) NOT NULL AUTO_INCREMENT,
  `ID_OWNER` int(11) NOT NULL,
  `NAME` varchar(30) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `PHOTO` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `STATE` varchar(30) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`ID`) USING BTREE,
  INDEX `ID_OWNER`(`ID_OWNER`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for mdr
-- ----------------------------
DROP TABLE IF EXISTS `mdr`;
CREATE TABLE `mdr`  (
  `ID` int(6) NOT NULL AUTO_INCREMENT,
  `ID_DOG` int(6) NOT NULL,
  `NAME_DOG` varchar(30) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `NAME` varchar(40) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `PHONE` int(11) NOT NULL,
  `EMAIL` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `DATE_FOUND` datetime(0) NOT NULL,
  PRIMARY KEY (`ID`) USING BTREE,
  INDEX `ID_DOG`(`ID_DOG`) USING BTREE,
  INDEX `NAME_DOG`(`NAME_DOG`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci COMMENT = 'MDR = Missing Dog Report' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for owners
-- ----------------------------
DROP TABLE IF EXISTS `owners`;
CREATE TABLE `owners`  (
  `ID` int(6) NOT NULL AUTO_INCREMENT,
  `NAME` varchar(40) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `SURNAME` varchar(40) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `EMAIL` varchar(30) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `USERNAME` varchar(20) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `PASSWORD` varchar(20) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;