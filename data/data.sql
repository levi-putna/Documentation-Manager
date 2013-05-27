SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE SCHEMA IF NOT EXISTS `documentation_manager` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `documentation_manager` ;

-- -----------------------------------------------------
-- Table `documentation_manager`.`document`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `documentation_manager`.`document` ;

CREATE  TABLE IF NOT EXISTS `documentation_manager`.`document` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
  `title` VARCHAR(100) NOT NULL ,
  `descrription` TEXT NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `documentation_manager`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `documentation_manager`.`user` ;

CREATE  TABLE IF NOT EXISTS `documentation_manager`.`user` (
  `id` INT(20) UNSIGNED NOT NULL AUTO_INCREMENT ,
  `email` VARCHAR(100) NOT NULL ,
  `password` VARCHAR(100) NOT NULL ,
  `name` VARCHAR(100) NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `documentation_manager`.`status`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `documentation_manager`.`status` ;

CREATE  TABLE IF NOT EXISTS `documentation_manager`.`status` (
  `id` INT(20) UNSIGNED NOT NULL AUTO_INCREMENT ,
  `text` VARCHAR(45) NOT NULL ,
  `description` VARCHAR(100) NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `documentation_manager`.`section`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `documentation_manager`.`section` ;

CREATE  TABLE IF NOT EXISTS `documentation_manager`.`section` (
  `id` INT(20) UNSIGNED NOT NULL AUTO_INCREMENT ,
  `parent_id` INT(20) UNSIGNED NULL ,
  `document_id` INT(20) UNSIGNED NOT NULL ,
  `title` VARCHAR(100) NOT NULL ,
  `description` TEXT NULL ,
  `content` TEXT NULL ,
  `edited` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  `edited_by` INT(20) UNSIGNED NOT NULL ,
  `status_id` INT(20) UNSIGNED NOT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `section_document_id_idx` (`document_id` ASC) ,
  INDEX `section_parent_id_idx` (`parent_id` ASC) ,
  INDEX `section_edited_by_id_idx` (`edited_by` ASC) ,
  INDEX `section_status_id_idx` (`status_id` ASC) ,
  CONSTRAINT `section_document_id`
    FOREIGN KEY (`document_id` )
    REFERENCES `documentation_manager`.`document` (`id` )
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `section_parent_id`
    FOREIGN KEY (`parent_id` )
    REFERENCES `documentation_manager`.`section` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `section_edited_by_id`
    FOREIGN KEY (`edited_by` )
    REFERENCES `documentation_manager`.`user` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `section_status_id`
    FOREIGN KEY (`status_id` )
    REFERENCES `documentation_manager`.`status` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `documentation_manager`.`tag`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `documentation_manager`.`tag` ;

CREATE  TABLE IF NOT EXISTS `documentation_manager`.`tag` (
  `id` INT(20) UNSIGNED NOT NULL AUTO_INCREMENT ,
  `title` VARCHAR(100) NOT NULL ,
  `description` VARCHAR(255) NULL ,
  `disabled` TINYINT(1) NOT NULL DEFAULT '1' ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `documentation_manager`.`section_tag`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `documentation_manager`.`section_tag` ;

CREATE  TABLE IF NOT EXISTS `documentation_manager`.`section_tag` (
  `section_id` INT(20) UNSIGNED NOT NULL ,
  `tag_id` INT(20) UNSIGNED NOT NULL ,
  PRIMARY KEY (`section_id`, `tag_id`) ,
  INDEX `section_tag_tag_id_idx` (`tag_id` ASC) ,
  CONSTRAINT `section_tag_tag_id`
    FOREIGN KEY (`tag_id` )
    REFERENCES `documentation_manager`.`tag` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `section_tag_section_id`
    FOREIGN KEY (`section_id` )
    REFERENCES `documentation_manager`.`section` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `documentation_manager`.`history`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `documentation_manager`.`history` ;

CREATE  TABLE IF NOT EXISTS `documentation_manager`.`history` (
  `id` INT(20) UNSIGNED NOT NULL AUTO_INCREMENT ,
  `section_id` INT(20) UNSIGNED NOT NULL ,
  `title` VARCHAR(100) NOT NULL ,
  `content` TEXT NULL ,
  `edited` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  `user_id` INT(20) UNSIGNED NOT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `history_section_id_idx` (`section_id` ASC) ,
  INDEX `history_user_id_idx` (`user_id` ASC) ,
  CONSTRAINT `history_section_id`
    FOREIGN KEY (`section_id` )
    REFERENCES `documentation_manager`.`section` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `history_user_id`
    FOREIGN KEY (`user_id` )
    REFERENCES `documentation_manager`.`history` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `documentation_manager` ;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `documentation_manager`.`status`
-- -----------------------------------------------------
START TRANSACTION;
USE `documentation_manager`;
INSERT INTO `documentation_manager`.`status` (`id`, `text`, `description`) VALUES (1, 'Enabled', NULL);
INSERT INTO `documentation_manager`.`status` (`id`, `text`, `description`) VALUES (2, 'Disabled', NULL);

COMMIT;
