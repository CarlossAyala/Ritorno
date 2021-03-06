CREATE TABLE `dogs` (
`ID` int(6) NOT NULL AUTO_INCREMENT,
`ID_OWNER` int(11) NOT NULL,
`NAME` varchar(30) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
`PHOTO` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
`STATE` varchar(30) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
PRIMARY KEY (`ID`) ,
INDEX `ID_OWNER` (`ID_OWNER` ASC) USING BTREE,
INDEX `NAME` (`NAME` ASC) USING BTREE
)
ENGINE = MyISAM
AUTO_INCREMENT = 110
AVG_ROW_LENGTH = 0
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_spanish_ci
KEY_BLOCK_SIZE = 0
MAX_ROWS = 0
MIN_ROWS = 0
ROW_FORMAT = Dynamic;
CREATE TABLE `mdr` (
`ID` int(6) NOT NULL AUTO_INCREMENT,
`ID_DOG` varchar(6) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
`NAME_DOG` varchar(30) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
`NAME` varchar(40) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
`PHONE` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
`EMAIL` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
`DATE_FOUND` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE CURRENT_TIMESTAMP,
PRIMARY KEY (`ID`) ,
INDEX `ID_DOG` (`ID_DOG` ASC) USING BTREE,
INDEX `NAME_DOG` (`NAME_DOG` ASC) USING BTREE
)
ENGINE = MyISAM
AUTO_INCREMENT = 29
AVG_ROW_LENGTH = 0
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_spanish_ci
COMMENT = 'MDR = Missing Dog Report'
KEY_BLOCK_SIZE = 0
MAX_ROWS = 0
MIN_ROWS = 0
ROW_FORMAT = Dynamic;
CREATE TABLE `owners` (
`ID` int(6) NOT NULL AUTO_INCREMENT,
`NAME` varchar(40) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
`SURNAME` varchar(40) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
`EMAIL` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
`PHONE` int(50) NULL DEFAULT NULL,
`PASSWORD` varchar(200) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
PRIMARY KEY (`ID`) 
)
ENGINE = MyISAM
AUTO_INCREMENT = 28
AVG_ROW_LENGTH = 0
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_spanish_ci
KEY_BLOCK_SIZE = 0
MAX_ROWS = 0
MIN_ROWS = 0
ROW_FORMAT = Dynamic;
