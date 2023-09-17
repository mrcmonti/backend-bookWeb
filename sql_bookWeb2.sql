-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: livros
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `autor`
--

DROP TABLE IF EXISTS `autor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `autor` (
  `cod_autor` int NOT NULL AUTO_INCREMENT,
  `nomeAutor` varchar(100) NOT NULL,
  `nacionalidade` varchar(50) NOT NULL,
  PRIMARY KEY (`cod_autor`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `autor`
--

LOCK TABLES `autor` WRITE;
/*!40000 ALTER TABLE `autor` DISABLE KEYS */;
INSERT INTO `autor` VALUES (1,'J.K. Rolling','Britânica');
/*!40000 ALTER TABLE `autor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `emprestimo`
--

DROP TABLE IF EXISTS `emprestimo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emprestimo` (
  `cod_emprestimo` int NOT NULL AUTO_INCREMENT,
  `dataEmprestimo` datetime NOT NULL,
  `dataDevolucao` datetime NOT NULL,
  `cod_livro` int NOT NULL,
  `cpf_usuario` varchar(15) NOT NULL,
  PRIMARY KEY (`cod_emprestimo`),
  KEY `fk-cod_livro_idx` (`cod_livro`),
  KEY `fk cod_usuario_idx` (`cpf_usuario`),
  CONSTRAINT `fk cod_livro` FOREIGN KEY (`cod_livro`) REFERENCES `livro` (`cod_livro`),
  CONSTRAINT `fk cpf_usuario` FOREIGN KEY (`cpf_usuario`) REFERENCES `usuario` (`cpf`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emprestimo`
--

LOCK TABLES `emprestimo` WRITE;
/*!40000 ALTER TABLE `emprestimo` DISABLE KEYS */;
INSERT INTO `emprestimo` VALUES (1,'2023-09-09 00:00:00','2023-09-19 00:00:00',1,'22222222222');
/*!40000 ALTER TABLE `emprestimo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `livro`
--

DROP TABLE IF EXISTS `livro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `livro` (
  `cod_livro` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(100) NOT NULL,
  `cod_autor` int NOT NULL,
  `editora` varchar(50) NOT NULL,
  `genero` varchar(10) NOT NULL,
  `dataPulicacao` datetime NOT NULL,
  `numPaginas` int NOT NULL,
  PRIMARY KEY (`cod_livro`),
  KEY `fk cod_autor_idx` (`cod_autor`),
  CONSTRAINT `fk cod_autor` FOREIGN KEY (`cod_autor`) REFERENCES `autor` (`cod_autor`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `livro`
--

LOCK TABLES `livro` WRITE;
/*!40000 ALTER TABLE `livro` DISABLE KEYS */;
INSERT INTO `livro` VALUES (1,'Harry Potter',1,'Rocco','Fantasia','2000-05-01 00:00:00',250);
/*!40000 ALTER TABLE `livro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `livros_emprestimo`
--

DROP TABLE IF EXISTS `livros_emprestimo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `livros_emprestimo` (
  `cod_emprestimo` int NOT NULL,
  `cod_livro` int NOT NULL,
  PRIMARY KEY (`cod_emprestimo`),
  KEY `fk cod_livro_idx` (`cod_livro`),
  CONSTRAINT `fk cod_emprestimo` FOREIGN KEY (`cod_emprestimo`) REFERENCES `emprestimo` (`cod_emprestimo`),
  CONSTRAINT `fk_cod_livro` FOREIGN KEY (`cod_livro`) REFERENCES `livro` (`cod_livro`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `livros_emprestimo`
--

LOCK TABLES `livros_emprestimo` WRITE;
/*!40000 ALTER TABLE `livros_emprestimo` DISABLE KEYS */;
INSERT INTO `livros_emprestimo` VALUES (1,1);
/*!40000 ALTER TABLE `livros_emprestimo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `nome` varchar(100) NOT NULL,
  `rua` varchar(50) NOT NULL,
  `numero` int NOT NULL,
  `bairro` varchar(50) NOT NULL,
  `estado` varchar(2) NOT NULL,
  `cep` varchar(15) NOT NULL,
  `cpf` varchar(15) NOT NULL,
  `dataNasc` datetime NOT NULL,
  `celular` varchar(12) NOT NULL,
  `email` varchar(50) NOT NULL,
  PRIMARY KEY (`cpf`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES ('Maria da Silva','teste',100,'teste','SP','19570000','22222222222','1995-04-07 00:00:00','18999999999','maria@gmail.com');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'livros'
--

--
-- Dumping routines for database 'livros'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-17 13:06:13
