CREATE DATABASE IF NOT EXISTS `beqaago`
/*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */
/*!80016 DEFAULT ENCRYPTION='N' */
;
USE `beqaago`;
-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: beqaago
-- ------------------------------------------------------
-- Server version	9.4.0
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;
/*!50503 SET NAMES utf8 */
;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */
;
/*!40103 SET TIME_ZONE='+00:00' */
;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */
;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */
;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */
;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */
;
--
-- Table structure for table `users`
--
DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `users`
--
LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */
;
INSERT INTO `users`
VALUES (
    1,
    'Jana Mawla',
    'mawlajana93@gmail.com',
    '$2b$10$ZyRC0Is35tVXHmUfxNhJruugJoG0iIAJvRZwq9NfGrQmLyMj.ZZl2'
  ),
  (
    2,
    'Hassan',
    'hassanshreif@g',
    '$2b$10$9FRZzNWYvgT2fsfqKm2Kl.mEIc/7mDplAGX96h7rs1PsAT4CzqpSS'
  );
/*!40000 ALTER TABLE `users` ENABLE KEYS */
;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */
;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */
;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */
;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */
;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */
;
-- Dump completed on 2025-10-30 17:54:22
DROP TABLE IF EXISTS vendors;
CREATE TABLE vendors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  phone VARCHAR(20),
  location VARCHAR(100),
  image VARCHAR(255) DEFAULT '/images/vendors/default.jpg'
);
INSERT INTO vendors (name, email, phone, location, image)->
VALUES(
    'Chez Toni',
    'toni@cheztoni.com',
    '70123456',
    'Chtaura, Beqaa',
    '/images/vendors/Cheztoni.jpeg'
  ),
->(
    'Z Burger Zahle',
    'info@zburger.com',
    '76889955',
    'Zahle, Beqaa',
    '/images/vendors/Zburger.png'
  ),
->(
    'Al Halabi Restaurant',
    'halabi@restaurant.com',
    '71011223',
    'Ferzol, Beqaa',
    '/images/vendors/Alhalabi.png'
  ),
->(
    'Valley Café',
    'valley@cafe.com',
    '76098765',
    'Taanayel, Beqaa',
    '/images/vendors/valleycafe.jpg'
  ),
->(
    'Manoushe Street',
    'ms@street.com',
    '70112233',
    'Bar Elias, Beqaa',
    '/images/vendors/manoushe.jpg'
  );