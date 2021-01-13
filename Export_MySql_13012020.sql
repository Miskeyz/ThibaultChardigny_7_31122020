-- phpMyAdmin SQL Dump
-- version 4.9.3
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:8889
-- Généré le :  mer. 13 jan. 2021 à 11:37
-- Version du serveur :  5.7.26
-- Version de PHP :  7.4.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Base de données :  `Groupomania`
--

-- --------------------------------------------------------

--
-- Structure de la table `articles`
--

CREATE TABLE `articles` (
  `id` mediumint(8) UNSIGNED NOT NULL,
  `userId` smallint(5) UNSIGNED NOT NULL,
  `content` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `articles`
--

INSERT INTO `articles` (`id`, `userId`, `content`) VALUES
(26, 49, 'Le Chat domestique est la sous-espèce issue de la domestication du Chat sauvage, mammifère carnivore de la famille des Félidés. Il est l’un des principaux animaux de compagnie et compte aujourd’hui une cinquantaine de races différentes reconnues par les instances de certification.'),
(32, 34, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'),
(41, 48, 'Un terrarium est un milieu confiné imitant le biotope de certaines espèces animales et/ou végétales. Il est l\'équivalent d\'un aquarium dont l\'eau serait remplacée par un substrat de quelques centimètres d\'épaisseur disposé sur le fond.\n');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` smallint(5) UNSIGNED NOT NULL,
  `nom` varchar(20) NOT NULL,
  `prenom` varchar(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `nom`, `prenom`, `email`, `password`, `admin`) VALUES
(34, 'Chardigny', 'Thibault', 'dC5iQGdyb3Vwb21hbmlhLmZy', '$2b$10$H4bp9yq.ApvVLgaIG.TwI.RATTdvZ4NEwGI1mfbMQlWkoYArESr9a', 0),
(48, 'Mandaron', 'Yolaine', 'eW9sYWluZS5tYW5kYXJvbkBncm91cG9tYW5pYS5mcg==', '$2b$10$b.37JnRE0uVYhn/Z3Ma2JuuaLwkRCXMF45oJDljK6DcIMUFd6VNfS', 0),
(49, 'Olly', 'Petitchat', 'b2xseS5wZXRpdGNoYXRAZ3JvdXBvbWFuaWEuZnI=', '$2b$10$XjABbZLa.GvDQFcbo7nv0u0hXjTcOHZv.HJSToowUiHdWuM7LU9AO', 0),
(55, 'admin', 'admin', 'YWRtaW5AZ3JvdXBvbWFuaWEuZnI=', '$2b$10$2EuZC0SaTSPm0kNHP9jUYegZmbWyJbqqphXdoKwA1.6r4LryPyF6C', 1);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `articles`
--
ALTER TABLE `articles`
  MODIFY `id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `articles`
--
ALTER TABLE `articles`
  ADD CONSTRAINT `articles_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE;
